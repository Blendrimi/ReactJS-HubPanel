import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditVehiclePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    plateNumber: "",
    brand: "",
    model: "",
    year: "",
    color: "",
    type: "",
    registrationDate: "",
    ownerName: "",
    ownerEmail: "",
    city: "",
    region: "",
    vin: "",
    status: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5093/api/vehicle/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched vehicle data:", data);
        setFormData({
          id: data.id,
          plateNumber: data.plateNumber || "",
          brand: data.brand || "",
          model: data.model || "",
          year: data.year || "",
          color: data.color || "",
          type: data.type || "",
          registrationDate: data.registrationDate ? data.registrationDate.slice(0, 10) : "",
          ownerName: data.ownerName || "",
          ownerEmail: data.ownerEmail || "",
          city: data.city || "",
          region: data.region || "",
          vin: data.vin || "",
          status: data.status || "",
        });
      })
      .catch((err) => console.error("Failed to fetch vehicle:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5093/api/vehicle/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to update vehicle");
      navigate("/vehicle");
    } catch (err) {
      console.error("Failed to update vehicle:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Vehicle</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {[
          ["plateNumber", "Enter plate number"],
          ["brand", "Enter brand"],
          ["model", "Enter model"],
          ["year", "Enter year"],
          ["color", "Enter color"],
          ["type", "Enter type"],
          ["registrationDate", "YYYY-MM-DD"],
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
              type={key === "year" ? "number" : key === "registrationDate" ? "date" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVehiclePage;
