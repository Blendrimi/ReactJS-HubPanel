
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setOrders } from "../redux/features/ordersSlice";

import TableHeader from "../components/header/table-header/TableHeader";
import TableFilter2 from "../components/filter/TableFilter2";
import OrderListTable from "../components/table/OrderListTable";
import TableBottomControls from "../components/utils/TableBottomControls";

import { orderListHeaderData } from "../data";
import { OrderListDataType } from "../types";

const OrderListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  useEffect(() => {
    fetch("http://localhost:5054/api/order")
      .then((res) => res.json())
      .then((data) => dispatch(setOrders(data)))
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5054/api/order/${id}`, { method: "DELETE" });
      const updatedOrders = orders.filter((order) => order.id !== id);
      dispatch(setOrders(updatedOrders));
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  const navigate = useNavigate();
  const handleEditClick = (order: OrderListDataType) => {
    navigate(`/edit-order/${order.order_id}`);
  };

  const handleCreateClick = () => {
    navigate("/create-order");
  };

  const handleSaveOrder = async (updatedOrder: OrderListDataType) => {
    const isEdit = !!updatedOrder.order_id;

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

    try {
      const url = isEdit
        ? `http://localhost:5054/api/order/${updatedOrder.order_id}`
        : `http://localhost:5054/api/order`;

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error((errorData.errors && JSON.stringify(errorData.errors)) || "Save failed");
      }

      const result = await response.json();

      const updatedOrders = isEdit
        ? orders.map((order) =>
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
          )
        : [...orders, result];

      dispatch(setOrders(updatedOrders));
    } catch (err) {
      console.error("Failed to save order:", err);
      alert("Failed to save order: " + err);
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
        <div className="col-12" style={{ paddingTop: "12px" }}>
          <div className="panel">
            <div className="flex justify-between items-center mb-4">
              <TableHeader tableHeading="All Order" tableHeaderData={orderListHeaderData} />
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                onClick={handleCreateClick}
              >
                + Create Order
              </button>
            </div>

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
    </>
  );
};

export default OrderListPage;
