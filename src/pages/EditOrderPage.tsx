import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const EditOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    order_id: "",
    customer_name: "",
    status: "",
    payment_method: "",
    delivery_status: "",
    product_number: 1,
    price: 0,
    order_date: new Date(),
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5054/api/order/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          order_id: data.id,
          customer_name: data.customer,
          status: data.status,
          payment_method: data.payment,
          delivery_status: data.delivery,
          product_number: data.count,
          price: data.price,
          order_date: data.date ? new Date(data.date) : new Date(),
        });
      })
      .catch((err) => {
        setError("Failed to fetch order");
        console.error("Failed to fetch order:", err);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "product_number" || name === "price" ? Number(value) : value,
    });
  };

  const handleDateChange = (val: Date | Date[] | null) => {
    setFormData({ ...formData, order_date: val as Date });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: formData.order_id,
      customer: formData.customer_name,
      status: formData.status,
      payment: formData.payment_method,
      delivery: formData.delivery_status,
      count: formData.product_number,
      price: formData.price,
      date: formData.order_date,
    };
    try {
      const response = await fetch(`http://localhost:5054/api/order/${id}` , {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to update order");
      }
      navigate("/order");
    } catch (err) {
      setError("Failed to update order");
      console.error("Failed to update order:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Order</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Customer</label>
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            placeholder="Enter customer name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Payment</label>
          <input
            type="text"
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            placeholder="Enter payment method"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Delivery</label>
          <input
            type="text"
            name="delivery_status"
            value={formData.delivery_status}
            onChange={handleChange}
            placeholder="Enter delivery status"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Count</label>
          <input
            type="number"
            name="product_number"
            value={formData.product_number}
            onChange={handleChange}
            min={1}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min={0}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <DateTimePicker
            onChange={handleDateChange}
            value={formData.order_date}
            className="w-full"
          />
        </div>
        <div className="col-span-2">
          {error && <div className="text-red-600 mb-2">{error}</div>}
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

export default EditOrderPage;
