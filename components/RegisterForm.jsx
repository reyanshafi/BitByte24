import React, { useState, useEffect, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import { supabase as supabaseClient } from "../lib/supabaseClient";
import Model from "./Model";
import useRegistrationModel from "../hooks/useRegistrationForm";
import Spinner from "./Spinner";
import InputField from "./InputField";
import ThemeSelector from "./ThemeSelector";
import { departments } from "../constants";
import useTempGateway from "../hooks/useTempGateway";
import { useRegistration } from "../lib/RegistrationContext";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useRegistrationModel();
  const tempGateway = useTempGateway();
  const [totalAmount, setTotalAmount] = useState(199);
  const { setRegistrationId, setEmail } = useRegistration();
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      registrationType: "single",
      defaultTheme: "",
      additionalThemes: [],
      amount: totalAmount,
      participants: [
        {
          fullname: "",
          email: "",
          studentId: "",
          phone: "",
          image: null,
          department: "",
          semester: "",
        },
      ],
    },
  });

  const {
    fields: participantFields,
    append: appendParticipant,
    remove: removeParticipant,
  } = useFieldArray({
    control,
    name: "participants",
  });

  const {
    fields: additionalThemeFields,
    append: appendAdditionalTheme,
    remove: removeAdditionalTheme,
  } = useFieldArray({
    control,
    name: "additionalThemes",
  });

  const registrationType = watch("registrationType");
  const defaultTheme = watch("defaultTheme");
  const additionalThemes = watch("additionalThemes");

  // Event options based on registration type
  const eventOptions = {
    single: ["Find the keyword", "Typing Competition", "Problem Solving"],
    duo: ["Keyboard Jumble", "Mini Hackathon", "IoT Challenge", "Quiz", "Debate"],
    squad: ["BGMI (Gaming)", "Valorant (Gaming)"],
  };

  const updateParticipantFields = useCallback(
    (type) => {
      const participantCount = { single: 1, duo: 2, squad: 4 }[type];
      const currentCount = participantFields.length;

      if (currentCount < participantCount) {
        for (let i = currentCount; i < participantCount; i++) {
          appendParticipant({
            fullname: "",
            email: "",
            phone: "",
            studentId: "",
            image: null,
            department: "",
            semester: "",
          });
        }
      } else if (currentCount > participantCount) {
        for (let i = currentCount - 1; i >= participantCount; i--) {
          removeParticipant(i);
        }
      }
    },
    [appendParticipant, removeParticipant, participantFields.length]
  );

  const calculateTotalAmount = useCallback((type, themeCount) => {
    const baseFees = { single: 199, duo: 399, squad: 799 }[type];
    const additionalFees = { single: 170, duo: 360, squad: 700 }[type] * themeCount;
    return baseFees + additionalFees;
  }, []);

  useEffect(() => {
    updateParticipantFields(registrationType);
  }, [registrationType, updateParticipantFields]);

  useEffect(() => {
    setTotalAmount(calculateTotalAmount(registrationType, additionalThemes.length));
  }, [registrationType, defaultTheme, additionalThemes, calculateTotalAmount]);

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const allThemes = [values.defaultTheme, ...values.additionalThemes];
      const participantsWithImages = await Promise.all(
        values.participants.map(async (p) => {
          const imagePath = await uploadImage(p.image[0], p.fullname, p.email);
          return { ...p, image: imagePath };
        })
      );
      const registrationId = await insertRegistration(values, totalAmount);
      setRegistrationId(registrationId);
      await insertParticipants(participantsWithImages, registrationId);
      if (values.additionalThemes.length > 0) {
        await insertAdditionalThemes(values.additionalThemes, registrationId);
      }
      toast.warn("Data uploaded successfully, proceed to payment...");
      reset();
      onClose();
      tempGateway.onOpen();
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Model
      title="Event Registration Form"
      description="Please fill out the form below to register for the event."
      isOpen={isOpen}
      onChange={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Registration Type:
          </label>
          <select
            {...register("registrationType", { required: true })}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm"
          >
            <option value="single">Single (199 INR)</option>
            <option value="duo">Duo (399 INR)</option>
            <option value="squad">Squad (799 INR)</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Select Event
          </label>
          <select
            {...register("defaultTheme", { required: true })}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm"
          >
            {eventOptions[registrationType]?.map((event, index) => (
              <option value={event} key={index}>
                {event}
              </option>
            ))}
          </select>
        </div>

        {additionalThemeFields.map((field, index) => (
          <ThemeSelector
            key={field.id}
            register={register}
            errors={errors}
            setValue={setValue}
            name={`additionalThemes.${index}`}
            label={`Additional Theme ${index + 1}`}
            remove={() => removeAdditionalTheme(index)}
            isRemovable={true}
            eventOptions={eventOptions[registrationType]} // Filter based on registration type
          />
        ))}

        {additionalThemes.length < 2 && (
          <>
            <p className="text-xs font-normal mt-2">
              You can participate in a maximum of 3 events with some extra discounts for each additional event.
            </p>
            <button
              type="button"
              onClick={() => appendAdditionalTheme("")}
              className="px-3 py-1 mt-0 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Event
            </button>
          </>
        )}

        {participantFields.map((field, index) => (
          <div key={field.id} className="space-y-4 border p-4 rounded-md shadow-md">
            <h3>Member {index + 1}</h3>
            <InputField
              name={`participants.${index}.fullname`}
              label="Full Name"
              register={register}
              errors={errors.participants?.[index] || {}}
              validation={{ required: "Full Name is required!" }}
            />
            <InputField
              name={`participants.${index}.studentId`}
              label="Student Id"
              register={register}
              errors={errors.participants?.[index] || {}}
              validation={{ required: "Student Id is required!" }}
            />
            <InputField
              name={`participants.${index}.email`}
              label="Email"
              register={register}
              errors={errors.participants?.[index] || {}}
              validation={{
                required: "Email is required!",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              }}
            />
            <InputField
              name={`participants.${index}.phone`}
              label="Phone Number"
              register={register}
              errors={errors.participants?.[index] || {}}
              validation={{
                required: "Phone number is required!",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
              }}
            />
          </div>
        ))}

        <div className="my-2 px-2">
          <p className="text-lg font-bold">{`Total: Rs.${totalAmount}`}</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : `Next`}
          </button>
          <button type="button" onClick={() => reset()} className="text-sm text-gray-600">
            Clear
          </button>
        </div>
      </form>
    </Model>
  );
};

export default RegisterForm;
