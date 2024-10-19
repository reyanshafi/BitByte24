import Model from "./Model";
import useAboutModel from "../hooks/useAboutModel";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
const About = () => {
  const { isOpen, onClose } = useAboutModel();
  const { control, watch, handleSubmit } = useForm();
  const [totalAmount, setTotalAmount] = useState(0);

  // Registration fees for each type
  const registrationFees = {
    single: 199,
    duo: 349,
    squad: 649,
  };

  // Watch for changes in registration type and events
  const selectedType = watch("registrationType", "single");
  const selectedEvents = watch("events", []);

  // Function to calculate total amount
  const calculateTotalAmount = () => {
    const baseAmount = registrationFees[selectedType] || 0;
    const eventCount = selectedEvents.length;

    let total = baseAmount;
    let previousAmount = baseAmount;

    // Apply the discount for additional events
    for (let i = 1; i < eventCount; i++) {
      const discountedPrice = previousAmount * 0.9;
      total += discountedPrice;
      previousAmount = discountedPrice;
    }

    return total;
  };

  // Handle form submission
  const onSubmit = (data) => {
    const total = calculateTotalAmount();
    setTotalAmount(total);
    alert(`Registration successful! Total amount: $${total.toFixed(2)}`);
  };

  const onChange = (open) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Model
      title="About BitByte"
      description="Technical event in Islamic University of Science & Technology, where students from different branches are compete to solve real-world problems."
      onChange={onChange}
      isOpen={isOpen}
      type="about"
    >
      {/* <h2>Activities</h2>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="rounded-t-lg"
            src="/docs/images/blog/image-1.jpg"
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="rounded-t-lg"
            src="/docs/images/blog/image-1.jpg"
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div> */}

      {/* Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        <h2 className="text-lg font-bold">Event Registration</h2>

        {/* Registration Type Selection */}
        <div>
          <label>Registration Type:</label>
          <Controller
            control={control}
            name="registrationType"
            defaultValue="single"
            render={({ field }) => (
              <select {...field} className="border p-2 rounded">
                <option value="single">Single - $199</option>
                <option value="duo">Duo - $349</option>
                <option value="squad">Squad - $649</option>
              </select>
            )}
          />
        </div>

        {/* Events Selection */}
        <div>
          <label>Events:</label>
          <Controller
            control={control}
            name="events"
            defaultValue={[]}
            render={({ field }) => (
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="event1"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.checked
                          ? [...field.value, e.target.value]
                          : field.value.filter((val) => val !== e.target.value)
                      )
                    }
                  />
                  Event 1
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="event2"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.checked
                          ? [...field.value, e.target.value]
                          : field.value.filter((val) => val !== e.target.value)
                      )
                    }
                  />
                  Event 2
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="event3"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.checked
                          ? [...field.value, e.target.value]
                          : field.value.filter((val) => val !== e.target.value)
                      )
                    }
                  />
                  Event 3
                </label>
                {/* Repeat for up to 8 events */}
              </div>
            )}
          />
        </div>

        {/* Calculate Total Button */}
        <button
          type="button"
          onClick={() => setTotalAmount(calculateTotalAmount())}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Calculate Total
        </button>

        {/* Display Total Amount */}
        <div className="text-lg font-semibold">
          Total Amount: ${totalAmount.toFixed(2)}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </Model>
  );
};

export default About;
