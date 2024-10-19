"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { supabase as supabaseClient } from "../lib/supabaseClient";
import Model from "./Model";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useRegistrationModel from "../hooks/useRegistrationForm";
import Spinner from "./Spinner";

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useRegistrationModel();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onChange = (open) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];

      if (!imageFile) {
        toast.error("Please select an image");
        return;
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`${values.firstname}-${values.email}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        toast.error("Image upload failed");
        return;
      }

      const { error: supabaseError } = await supabaseClient
        .from("users")
        .insert({
          firstname: values.firstname,
          lastname: values.lastname,
          phone: values.phone,
          email: values.email,

          image: imageData.path,
          theme: values.theme,
          semester: values.semester,
          department: values.department,
          payment_done: false,
        });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      toast.success("Form submitted successfully!");
      setIsLoading(false);
      reset();
      onClose();
      router.push("/");
    } catch (error) {
      toast.error("Error", error.message);
    }
  };

  return (
    <Model
      title="Registertation Form"
      description="This information provided will be used for certification purposes.
              So, be careful with what you write!"
      onChange={onChange}
      isOpen={isOpen}
    >
      <form className="z-50" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className=" border-gray-900/10 pb-10">
            <div className="mt-4 flex flex-col gap-y-1 ">
              {/* Firstname */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="firstname"
                  className="block  text-sm font-medium leading-6 text-gray-900"
                >
                  Firstname
                </label>

                <div className="flex rounded-md shadow-sm ring-1 ring-inset  ring-gray-300   sm:max-w-md">
                  <input
                    {...register("firstname", {
                      required: "Firstname is required",
                    })}
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="block placeholder:pl-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900  placeholder:text-gray-400 w-full  sm:text-sm sm:leading-6"
                    placeholder="Jane"
                  />
                </div>
                {errors.firstname && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.firstname.message}
                  </p>
                )}
              </div>

              {/* Lastname */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Lastname
                </label>

                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                  <input
                    {...register("lastname", {
                      required: "Lastname is required",
                    })}
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="block placeholder:pl-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Doe"
                  />
                </div>
                {errors.lastname && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.lastname.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone Number
                </label>

                <div className="flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset  sm:max-w-md">
                  <input
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    type="tel"
                    name="phone"
                    id="phone"
                    className="block flex-1 placeholder:pl-2 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="1234567890"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>

                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    name="email"
                    id="email"
                    className="block placeholder:pl-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="example@domain.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Photo */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Upload Photo
                </label>

                <input
                  {...register("image", { required: "Image is required" })}
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none py-1.5 pl-2 pr-20"
                  placeholder="Upload Photo"
                />
                {errors.image && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Theme */}
              <div className="sm:col-span-4 mt-1">
                <label
                  htmlFor="theme"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Theme
                </label>
                <select
                  {...register("theme", { required: "Please select a theme" })}
                  id="theme"
                  name="theme"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="">Select Theme</option>
                  <option value="coding">Coding</option>
                  <option value="quiz">Quiz</option>
                  <option value="iot challenge">IoT Challenge</option>
                  <option value="workshop">Workshop</option>
                </select>
                {errors.theme && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.theme.message}
                  </p>
                )}
              </div>

              {/* Semester */}
              <div className="sm:col-span-4 mt-1">
                <label
                  htmlFor="semester"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Semester
                </label>
                <select
                  {...register("semester", {
                    required: "Please select a semester",
                  })}
                  id="semester"
                  name="semester"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="">Select Semester</option>
                  <option value="1st">1st</option>
                  <option value="2nd">3rd</option>
                  <option value="3rd">5th</option>
                  <option value="4th">7th</option>
                </select>
                {errors.semester && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.semester.message}
                  </p>
                )}
              </div>

              {/* Department */}
              <div className="sm:col-span-4 mt-1">
                <label
                  htmlFor="department"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Department
                </label>
                <select
                  {...register("department", {
                    required: "Please select a department",
                  })}
                  id="department"
                  name="department"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="">Select Department</option>
                  <option value="cs">CS</option>
                  <option value="maths">Mathematics</option>
                  <option value="commerce">Commerce</option>
                  <option value="business">Business</option>
                  <option value="english">English</option>
                </select>
                {errors.department && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.department.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-x-6 w-full">
          <button
            type="submit"
            className="rounded-lg w-full hover:rounded-lg hover:shadow-md focus:shadow-md bg-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 "
          >
            {isLoading ? <Spinner /> : "Submit"}
          </button>
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => reset()}
          >
            Clear
          </button>
        </div>
      </form>
    </Model>
  );
};

export default RegisterForm;
