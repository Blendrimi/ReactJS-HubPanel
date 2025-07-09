import { AllCustomerDataType } from "../../types";

type Props = {
  tableData: AllCustomerDataType[];
  handleEdit: (customer: AllCustomerDataType) => void;
  handleDelete: (id: string) => void;
};

const AllCustomerTable = ({ tableData, handleEdit, handleDelete }: Props) => {
  return (
    <table
      className="table table-dashed table-hover digi-dataTable all-product-table"
      id="allProductTable"
    >
      <thead>
        <tr>
          <th className="no-sort">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="markAllProduct"
              />
            </div>
          </th>
          <th>Name</th>
          <th>Username</th>
          <th>Last Active</th>
          <th>Date Registered</th>
          <th>Email</th>
          <th>Orders</th>
          <th>Total Spend</th>
          <th>AOV</th>
          <th>Country / Region</th>
          <th>City</th>
          <th>Region</th>
          <th>Postal Code</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={index}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>
            <td>
              <a href="#">{item.name}</a>
            </td>
            <td>{item.userName}</td>
            <td>{item.lastActive}</td>
            <td>{item.dateRegistered}</td>
            <td>
              <a href="#">{item.email}</a>
            </td>
            <td>{item.orders}</td>
            <td>${Number(item.totalSpend).toFixed(2)}</td>
            <td>${Number(item.aov || 0).toFixed(2)}</td>

            <td>{item.country}</td>
            <td>{item.city}</td>
            <td>{item.region}</td>
            <td>{item.postalCode}</td>
            <td>
              <div className="btn-box d-flex justify-content-center gap-2">
                <button
                  className="btn btn-sm"
                  onClick={() => handleEdit(item)}
                  title="Edit"
                >
                  <i className="fa-light fa-pen"></i>
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => handleDelete(item.id)}
                  title="Delete"
                >
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

export default AllCustomerTable;
