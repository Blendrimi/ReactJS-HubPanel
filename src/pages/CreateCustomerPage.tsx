
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const CreateCustomerPage = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: "",
    username: "",
    email: "",
    lastActive: new Date(),
    dateRegistered: new Date(),
    orders: 0,
    totalSpend: 0,
    aov: 0,
    country: "",
    city: "",
    region: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5051/api/Customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        throw new Error("Failed to create customer");
      }

      const result = await response.json();
      alert("Customer created successfully!");
      console.log(result);
      navigate("/all-customer");
    } catch (error) {
      alert("An error occurred while creating the customer.");
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Customer</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {[
          ["name", "Enter full name"],
          ["username", "Enter username"],
          ["email", "example@domain.com"],
          ["orders", "0"],
          ["totalSpend", "0"],
          ["aov", "0"],
          ["country", ""],
          ["city", ""],
          ["region", ""],
          ["postalCode", ""],
        ].map(([key, placeholder]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={["orders", "totalSpend", "aov"].includes(key) ? "number" : "text"}
              name={key}
              value={customer[key]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium mb-1">Last Active</label>
          <DateTimePicker
            onChange={(val) => handleDateChange("lastActive", val)}
            value={customer.lastActive}
            className="w-full"
            calendarClassName="text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date Registered</label>
          <DateTimePicker
            onChange={(val) => handleDateChange("dateRegistered", val)}
            value={customer.dateRegistered}
            className="w-full"
            calendarClassName="text-sm"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomerPage;
