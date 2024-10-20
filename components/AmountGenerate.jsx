import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const AmountGenerate = () => {
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

  return (
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
  );
};

export default AmountGenerate;
