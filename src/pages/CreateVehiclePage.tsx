
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

interface Vehicle {
  plateNumber: string;
  brand: string;
  model: string;
  year: number | '';
  color: string;
  type: string;
  registrationDate: Date | null;
  ownerName: string;
  ownerEmail: string;
  city: string;
  region: string;
  vin: string;
  status: string;
}

const initialVehicle: Vehicle = {
  plateNumber: "",
  brand: "",
  model: "",
  year: '',
  color: "",
  type: "",
  registrationDate: null,
  ownerName: "",
  ownerEmail: "",
  city: "",
  region: "",
  vin: "",
  status: "",
};

const CreateVehiclePage: React.FC = () => {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle>(initialVehicle);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "year") {
      setVehicle((prev) => ({ ...prev, year: value === '' ? '' : Number(value) }));
    } else {
      setVehicle((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setVehicle((prev) => ({ ...prev, registrationDate: date }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...vehicle,
        registrationDate: vehicle.registrationDate ? vehicle.registrationDate.toISOString() : null,
        year: vehicle.year === '' ? 0 : vehicle.year,
      };
      const response = await fetch("http://localhost:5093/api/Vehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to create vehicle");
      }
      const result = await response.json();
      alert("Vehicle created successfully!");
      console.log(result);
      navigate("/vehicle");
    } catch (error) {
      alert("An error occurred while creating the vehicle.");
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Vehicle</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {[
          ["plateNumber", "Enter plate number"],
          ["brand", "Enter brand"],
          ["model", "Enter model"],
          ["year", "Enter year"],
          ["color", "Enter color"],
          ["type", "Enter type"],
          ["ownerName", "Enter owner name"],
          ["ownerEmail", "example@domain.com"],
          ["city", "Enter city"],
          ["region", "Enter region"],
          ["vin", "Enter VIN"],
          ["status", "Enter status"],
        ].map(([key, placeholder]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={key === "year" ? "number" : key === "ownerEmail" ? "email" : "text"}
              name={key}
              value={key === "year" ? (vehicle.year === '' ? '' : vehicle.year) : (vehicle as any)[key]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium mb-1">Registration Date</label>
          <DateTimePicker
            onChange={handleDateChange}
            value={vehicle.registrationDate}
            className="w-full"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Vehicle
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVehiclePage;
