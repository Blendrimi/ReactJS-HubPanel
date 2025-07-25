import { Link } from "react-router-dom";
import { AllProductDataType } from "../../types";

type Props = {
  tableData: AllProductDataType[];
  handleDelete: (id: number) => void;
};

const AllProductTable = ({ tableData, handleDelete }: Props) => {
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
          <th>Product</th>
          <th>SKU</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Sales</th>
          <th>Rating</th>
          <th>Published</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item) => (
          <tr key={item.id}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>
            <td>
              <div className="table-product-card">
                <div className="part-img">
                  <img src={item.imageUrl} alt="Product" />
                </div>
                <div className="part-txt">
                  <span className="product-name">{item.name}</span>
                </div>
              </div>
            </td>
            <td>CSJ{item.sku}</td>
            <td>{item.stock}</td>
            <td>${item.price}</td>
            <td>{item.sales}</td>
            <td>
              <div className="rating">
                <div className="star">
                  <i className="fa-sharp fa-solid fa-star starred"></i>
                  <i className="fa-sharp fa-solid fa-star starred"></i>
                  <i className="fa-sharp fa-solid fa-star starred"></i>
                  <i className="fa-sharp fa-solid fa-star starred"></i>
                  <i className="fa-sharp fa-solid fa-star"></i>
                </div>
                <div className="rating-amount mt-2">({item.ratingCount})</div>
              </div>
            </td>
            <td>{item.published}</td>
            <td>
              <div className="btn-box">
                <Link to={`/view-product/${item.id}`}>
                  <i className="fa-light fa-eye"></i>
                </Link>
                <Link to={`/edit-product/${item.id}`}>
                  <i className="fa-light fa-pen"></i>
                </Link>
                <button onClick={() => handleDelete(item.id)}>
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

export default AllProductTable;
