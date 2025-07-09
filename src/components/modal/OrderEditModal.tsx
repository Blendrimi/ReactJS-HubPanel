import React, { useState, useEffect } from "react";
import { OrderListDataType } from "../../types";

type EditOrderModalProps = {
  order: OrderListDataType | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: OrderListDataType) => void;
};

const initialFormState: OrderListDataType = {
  order_id: "",
  customer_name: "",
  status: "Pending",
  payment_method: "",
  delivery_status: "",
  product_number: 0,
  price: 0,
  order_date: new Date().toISOString().slice(0, 16), // 'yyyy-MM-ddTHH:mm'
};

const EditOrderModal: React.FC<EditOrderModalProps> = ({
  order,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedOrder, setEditedOrder] = useState<OrderListDataType>(initialFormState);

  useEffect(() => {
    if (order) {
      setEditedOrder(order);
    } else {
      setEditedOrder(initialFormState);
    }
  }, [order, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editedOrder.customer_name || !editedOrder.payment_method || !editedOrder.delivery_status) {
      alert("Please fill in all required fields.");
      return;
    }

    const formattedOrder = {
      ...editedOrder,
      order_id: editedOrder.order_id,
      customer_name: editedOrder.customer_name.trim(),
      status: editedOrder.status,
      payment_method: editedOrder.payment_method,
      delivery_status: editedOrder.delivery_status,
      product_number: Number(editedOrder.product_number),
      price: Number(editedOrder.price),
      order_date: editedOrder.order_date,
    };

    onSave(formattedOrder);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {order ? "Edit Order" : "Create Order"}
        </h2>

        {[
          { label: "Customer Name", name: "customer_name", type: "text" },
          { label: "Payment Method", name: "payment_method", type: "text" },
          { label: "Delivery Status", name: "delivery_status", type: "text" },
          { label: "Product Count", name: "product_number", type: "number" },
          { label: "Price", name: "price", type: "number" },
          { label: "Order Date", name: "order_date", type: "datetime-local" },
        ].map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={
                field.name === "order_date"
                  ? editedOrder[field.name]?.toString().slice(0, 16) ?? ""
                  : editedOrder[field.name] ?? ""
              }
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={editedOrder.status ?? "Pending"}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Hold">Hold</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;
