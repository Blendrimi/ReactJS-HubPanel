import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const CreateOrderPage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    customer_name: "",
    product_number: 1,
    price: 0,
    payment_method: "",
    delivery_status: "",
    status: "",
    order_date: new Date(),
  });
  const [error, setError] = useState("");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: name === "product_number" || name === "price" ? Number(value) : value });
  };

  const handleDateChange = (val: Date | Date[] | null) => {
    setOrder({ ...order, order_date: val as Date });
  };

  const validate = () => {
    if (!order.customer_name || !order.product_number || !order.status || !order.order_date) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      customer: order.customer_name,
      status: order.status,
      payment: order.payment_method,
      delivery: order.delivery_status,
      count: order.product_number,
      price: order.price,
      date: order.order_date,
    };
    try {
      const response = await fetch("http://localhost:5054/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to create order");
      }
      await response.json();
      alert("Order created successfully!");
      navigate("/order");
    } catch (error) {
      setError("An error occurred while creating the order.");
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Order</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Customer Name</label>
          <input
            type="text"
            name="customer_name"
            value={order.customer_name}
            onChange={handleChange}
            placeholder="Enter customer name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Product Number</label>
          <input
            type="number"
            name="product_number"
            value={order.product_number}
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
            value={order.price}
            onChange={handleChange}
            min={0}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <input
            type="text"
            name="payment_method"
            value={order.payment_method}
            onChange={handleChange}
            placeholder="Enter payment method"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Delivery Status</label>
          <input
            type="text"
            name="delivery_status"
            value={order.delivery_status}
            onChange={handleChange}
            placeholder="Enter delivery status"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={order.status}
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
          <label className="block text-sm font-medium mb-1">Order Date</label>
          <DateTimePicker
            onChange={handleDateChange}
            value={order.order_date}
            className="w-full"
          />
        </div>
        <div className="col-span-2">
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrderPage;
