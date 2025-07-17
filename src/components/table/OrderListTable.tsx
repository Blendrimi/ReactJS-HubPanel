import { Link, useNavigate } from "react-router-dom";
import { OrderListDataType } from "../../types";

type Props = {
  tableData: OrderListDataType[];
  handleDelete: (id: string) => void;
  handleEdit: (order: OrderListDataType) => void;
};

const OrderListTable = ({ tableData, handleDelete, handleEdit }: Props) => {
  const navigate = useNavigate();
  const handleDetails = (order: OrderListDataType) => {
    navigate(`/order-details/${order.order_id}`);
  };
  const getBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "badge bg-success text-white";
      case "pending":
        return "badge bg-warning text-dark";
      case "canceled":
        return "badge bg-danger text-white";
      case "courier":
        return "badge bg-info text-white";
      default:
        return "badge bg-secondary text-white";
    }
  };

  return (
    <table
      className="table table-dashed table-hover digi-dataTable all-product-table"
      id="allProductTable"
    >
      <thead>
        <tr>
          <th className="no-sort">
            <div className="form-check d-flex pe-2">
              <input className="form-check-input" type="checkbox" />
            </div>
          </th>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Product</th>
          <th>Price</th>
          <th>Payment Method</th>
          <th>Delivery Status</th>
          <th>Order Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item) => (
          <tr key={item.order_id}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>
            <td>
              <Link to="/invoices">#{item.order_id}</Link>
            </td>
            <td>{item.customer_name}</td>
            <td>
              <span
                className={
                  item.status === "Hold"
                    ? "text-warning"
                    : item.status === "Pending"
                    ? "text-danger"
                    : "text-success"
                }
              >
                {item.status}
              </span>
            </td>
            <td>{item.product_number}</td>
            <td>${item.price}</td>
            <td>{item.payment_method}</td>
            <td>
              <span className={getBadgeClass(item.delivery_status)}>
                {item.delivery_status}
              </span>
            </td>
            <td>{item.order_date} - 01:05 PM</td>
            <td>
              <div className="btn-box flex gap-2">
                <button type="button" onClick={() => handleDetails(item)}>
                  <i className="fa-light fa-eye"></i>
                </button>
                <button type="button" onClick={() => handleEdit(item)}>
                  <i className="fa-light fa-pen"></i>
                </button>
                <button type="button" onClick={() => handleDelete(item.order_id)}>
                  <i className="fa-light fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderListTable;
