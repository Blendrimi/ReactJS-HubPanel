// EditOrderModal.tsx
import React, { useState, useEffect } from "react";
import { OrderListDataType } from "../../types";

type EditOrderModalProps = {
  order: OrderListDataType | null;
  onClose: () => void;
  onSave: (updated: OrderListDataType) => void;
};

const EditOrderModal: React.FC<EditOrderModalProps> = ({ order, onClose, onSave }) => {
  const [editedOrder, setEditedOrder] = useState<OrderListDataType>({} as OrderListDataType);

  useEffect(() => {
    if (order) setEditedOrder(order);
  }, [order]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editedOrder?.order_id) {
      alert("Order ID is missing.");
      return;
    }

    onSave({
      ...editedOrder,
      order_id: editedOrder.order_id,
      customer_name: editedOrder.customer_name || "",
      status: editedOrder.status || "",
      product_number: editedOrder.product_number || 0,
      price: editedOrder.price || 0,
      payment_method: editedOrder.payment_method || "",
      delivery_status: editedOrder.delivery_status || "",
      order_date: editedOrder.order_date || new Date().toISOString(),
    });

    // ⛔ DO NOT CLOSE MODAL HERE — it's handled in the parent after successful save
  };

  if (!order) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Order</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
          <input
            name="customer_name"
            value={editedOrder.customer_name ?? ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={editedOrder.status ?? ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Hold">Hold</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
          <input
            name="payment_method"
            value={editedOrder.payment_method ?? ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Status</label>
          <input
            name="delivery_status"
            value={editedOrder.delivery_status ?? ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Count</label>
          <input
            type="number"
            name="product_number"
            value={editedOrder.product_number ?? 0}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={editedOrder.price ?? 0}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
          <input
            type="datetime-local"
            name="order_date"
            value={editedOrder.order_date?.toString().slice(0, 16) ?? ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
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
