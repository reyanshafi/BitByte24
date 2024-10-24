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
    const baseFees = { single: 199, duo: 350, squad: 650 }[type];
    const additionalEventCount = themeCount;
    const additionalFees =
      { single: 149, duo: 200, squad: 400 }[type] * additionalEventCount;
    return baseFees + additionalFees;
  }, []);

  useEffect(() => {
    updateParticipantFields(registrationType);
  }, [registrationType, updateParticipantFields]);

  useEffect(() => {
    setTotalAmount(
      calculateTotalAmount(registrationType, additionalThemes.length)
    );
  }, [registrationType, defaultTheme, additionalThemes, calculateTotalAmount]);

  const uploadImage = async (file, fullname, email) => {
    const { data, error } = await supabaseClient.storage
      .from("images")
      .upload(`${fullname}-${email}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw new Error(`Image upload failed: ${error.message}`);
    return data.path;
  };

  const fetchThemeIds = async (themeNames) => {
    const { data, error } = await supabaseClient
      .from("themes")
      .select("id, name")
      .in("name", themeNames);

    if (error) throw new Error(`Failed to fetch theme IDs: ${error.message}`);
    return data.reduce(
      (acc, theme) => ({ ...acc, [theme.name]: theme.id }),
      {}
    );
  };

  const onSubmit = async (values) => {
    setIsLoading(true);
    let uploadedImages = [];
    try {
      const allThemes = [values.defaultTheme, ...values.additionalThemes];
      const themeIds = await fetchThemeIds(allThemes);

      const participantsWithImages = await Promise.all(
        values.participants.map(async (p) => {
          const imagePath = await uploadImage(p.image[0], p.fullname, p.email);
          uploadedImages.push(imagePath); // Store the image path
          return {
            ...p,
            image: imagePath,
          };
        })
      );

      // Insert registration
      const { data: registrationData, error: registrationError } =
        await supabaseClient
          .from("registrations")
          .insert({
            registration_type: values.registrationType,
            default_theme_id: themeIds[values.defaultTheme],
            amount: totalAmount,
            payment_done: false,
          })
          .select("id")
          .single();

      if (registrationError)
        throw new Error(
          `Registration insertion failed: ${registrationError.message}`
        );

      const registrationId = registrationData.id;

      setRegistrationId(registrationId);
      // Insert participants
      const { error: participantsError } = await supabaseClient
        .from("participants")
        .insert(
          participantsWithImages.map((participant) => ({
            registration_id: registrationId,
            fullname: participant.fullname,
            email: participant.email,
            student_id: participant.studentId,
            phone: participant.phone,
            image_path: participant.image,
            department: participant.department,
            semester: participant.semester,
          }))
        );

      if (participantsError)
        throw new Error(
          `Participants insertion failed: ${participantsError.message}`
        );

      const newEmails = participantsWithImages.map(
        (participant) => participant.email
      );
      console.log("newEmails", newEmails);
      setEmail((prevEmails) => [...prevEmails, ...newEmails]);
      // Insert additional themes
      if (values.additionalThemes.length > 0) {
        const { error: themesError } = await supabaseClient
          .from("additional_themes")
          .insert(
            values.additionalThemes.map((themeName) => ({
              registration_id: registrationId,
              theme_id: themeIds[themeName],
            }))
          );

        if (themesError)
          throw new Error(
            `Additional themes insertion failed: ${themesError.message}`
          );
      }

      toast.warn("Data uploaded successfully, proceed to payment...");
      reset();
      onClose();
      return tempGateway.onOpen();
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
      if (uploadedImages.length > 0) {
        await Promise.all(
          uploadedImages.map(async (imagePath) => {
            await supabaseClient.storage.from("images").remove([imagePath]);
          })
        );
      }
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
          <label
            htmlFor="registrationType"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Registration Type:
          </label>
          <select
            {...register("registrationType", { required: true })}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="single">Single(199 INR)</option>
            <option value="duo">Duo(350 INR)</option>
            <option value="squad">Squad (650 INR)</option>
          </select>
        </div>

        <ThemeSelector
          register={register}
          errors={errors}
          setValue={setValue}
          name="defaultTheme"
          label="Default Theme"
        />

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
          />
        ))}

        {additionalThemes.length < 2 && (
          <>
            <p className="text-xs font-normal mt-2">
              <span className="text-red-500">*</span>(you can participante in
              maximum 3 themes with some minor extra charges)
            </p>
            <button
              type="button"
              onClick={() => appendAdditionalTheme("")}
              className="px-3 py-1 mt-0 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Theme
            </button>
          </>
        )}

        {participantFields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-4 border p-4 rounded-md shadow-md"
          >
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

            <div className="mt-2">
              <label
                htmlFor="registrationType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Department:
              </label>
              <select
                {...register(`participants.${index}.department`, {
                  required: true,
                })}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {departments?.map((department, index) => (
                  <option value={department} key={index}>
                    {department}
                  </option>
                ))}
              </select>
              {errors.participants?.[index]?.department && (
                <p className="text-red-500 text-sm">
                  {errors.participants[index].department.message}
                </p>
              )}
            </div>
            <div className="mt-2">
              <label
                htmlFor="registrationType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Semester:
              </label>
              <select
                {...register(`participants.${index}.semester`, {
                  required: true,
                })}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="1st">1st</option>
                <option value="3rd">3rd</option>
                <option value="5th">5th</option>
                <option value="7th">7th</option>
                <option value="9th">9th(B. Arch)</option>
              </select>
              {errors.participants?.[index]?.semester && (
                <p className="text-red-500 text-sm">
                  {errors.participants[index].semester.message}
                </p>
              )}
            </div>

            <InputField
              name={`participants.${index}.image`}
              label="Upload Photo"
              type="file"
              accept="image/*"
              register={register}
              errors={errors.participants?.[index] || {}}
              validation={{ required: "Image is required" }}
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
          <button
            type="button"
            onClick={() => reset()}
            className="text-sm text-gray-600"
          >
            Clear
          </button>
        </div>
      </form>
    </Model>
  );
};

export default RegisterForm;