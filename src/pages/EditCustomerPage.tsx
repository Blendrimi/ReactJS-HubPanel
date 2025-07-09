
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCustomerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    lastActive: "",
    dateRegistered: "",
    email: "",
    orders: 0,
    totalSpend: 0,
    aov: 0,
    country: "",
    city: "",
    region: "",
    postalCode: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5051/api/customer/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Failed to fetch customer:", err));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5051/api/customer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      navigate("/all-customer");
    } catch (err) {
      console.error("Failed to update customer:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Customer</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {[
          ["name", "Enter full name"],
          ["username", "Enter username"],
          ["email", "example@domain.com"],
          ["lastActive", ""],
          ["dateRegistered", ""],
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
              type={["orders", "totalSpend", "aov"].includes(key)
                ? "number"
                : ["lastActive", "dateRegistered"].includes(key)
                ? "datetime-local"
                : "text"}
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

export default EditCustomerPage;
