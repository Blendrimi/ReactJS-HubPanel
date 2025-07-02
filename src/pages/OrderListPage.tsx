import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setOrders, deleteOrder } from "../redux/features/ordersSlice";

import TableHeader from "../components/header/table-header/TableHeader";
import TableFilter2 from "../components/filter/TableFilter2";
import OrderListTable from "../components/table/OrderListTable";
import TableBottomControls from "../components/utils/TableBottomControls";
import OrderEditModal from "../components/modal/OrderEditModal";

import { orderListHeaderData } from "../data";
import { OrderListDataType } from "../types";

const OrderListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderListDataType | null>(null);

  useEffect(() => {
    fetch("http://localhost:5054/api/order")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setOrders(data));
      })
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5054/api/order/${id}`, {
        method: "DELETE",
      });
      const updatedOrders = orders.filter((order) => order.id !== id);
      dispatch(setOrders(updatedOrders));
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  const handleEditClick = (order: OrderListDataType) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
  };

const handleSaveOrder = async (updatedOrder: OrderListDataType) => {
  try {
    const payload = {
      id: updatedOrder.order_id,
      customer: updatedOrder.customer_name,
      status: updatedOrder.status,
      payment: updatedOrder.payment_method,
      delivery: updatedOrder.delivery_status,
      count: updatedOrder.product_number,
      price: updatedOrder.price,
      date: updatedOrder.order_date,
    };

    const response = await fetch(`http://localhost:5054/api/order/${updatedOrder.order_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Update failed: " + JSON.stringify(errorData.errors));
    }

    const result = await response.json();

    const updatedOrders = orders.map((order) =>
      order.id === result.id
        ? {
            ...order,
            customer: result.customer,
            status: result.status,
            payment: result.payment,
            delivery: result.delivery,
            count: result.count,
            price: result.price,
            date: result.date,
          }
        : order
    );

    dispatch(setOrders(updatedOrders));

    // ✅ Close the modal AFTER successful save
    setEditModalOpen(false);
    setSelectedOrder(null);
  } catch (err) {
    console.error("Failed to update order:", err);
    alert("Failed to update order: " + err);
    setEditModalOpen(false); // Ensure modal closes even on error
    setSelectedOrder(null);
  }
};

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = orders.slice(indexOfFirstData, indexOfLastData).map((order) => ({
    order_id: order.id,
    customer_name: order.customer,
    product_number: order.count,
    price: order.price,
    payment_method: order.payment,
    delivery_status: order.delivery,
    order_date: order.date,
    status: order.status,
  }));

  const totalPages = Math.ceil(orders.length / dataPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="row g-4">
        <div className="col-12">
          <div className="panel">
            <TableHeader tableHeading="All Order" tableHeaderData={orderListHeaderData} />
            <div className="panel-body">
              <TableFilter2 showMultipleAction showOrder showDatePicker />
              <OrderListTable
                tableData={currentData}
                handleDelete={handleDelete}
                handleEdit={handleEditClick}
              />
              <TableBottomControls
                indexOfFirstData={indexOfFirstData}
                indexOfLastData={indexOfLastData}
                dataList={orders}
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
                pageNumbers={pageNumbers}
              />
            </div>
          </div>
        </div>
      </div>

      <OrderEditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        order={selectedOrder}
        onSave={handleSaveOrder}
      />
    </>
  );
};

export default OrderListPage;