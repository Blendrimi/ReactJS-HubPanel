
import { useEffect, useState } from "react";
import TableFilter2 from "../components/filter/TableFilter2";
import TableHeader from "../components/header/table-header/TableHeader";
import AllProductTable from "../components/table/AllProductTable";
import TableBottomControls from "../components/utils/TableBottomControls";
import { useNavigate } from "react-router-dom";

const AllProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5102/api/product")
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.map((product) => ({
          ...product,
          imageUrl: product.imageUrl
            ? `http://localhost:5102${product.imageUrl}`
            : ""
        }));
        setDataList(updatedData);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataList.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(dataList.length / dataPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleDelete = (id: number) => {
    const updatedDataList = dataList.filter((item) => item.id !== id);
    setDataList(updatedDataList);
  };

  const handleEdit = (product: any) => {
    navigate(`/edit-product/${product.id}`);
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader
            tableHeading="All Products"
            tableHeaderData={[
              { id: 1, inputId: "product", label: "Product" },
              { id: 2, inputId: "sku", label: "SKU" },
              { id: 3, inputId: "stock", label: "Stock" },
              { id: 4, inputId: "price", label: "Price" },
              { id: 5, inputId: "sales", label: "Sales" },
              { id: 6, inputId: "rating", label: "Rating" },
              { id: 7, inputId: "published", label: "Published" },
              { id: 8, inputId: "action", label: "Action" },
            ]}
          />

          <div className="panel-body">
            <div className="product-table-quantity d-flex justify-content-between align-items-center mb-4">
              <ul className="mb-0">
                <li className="text-white">All ({dataList.length})</li>
              </ul>
              <div className="btn-box d-md-flex d-none gap-2">
                <button className="btn btn-sm btn-icon btn-light">
                  <i className="ti ti-file-spreadsheet"></i>
                </button>
                <button className="btn btn-sm btn-icon btn-light">
                  <i className="ti ti-file-type-pdf"></i>
                </button>
                <button
                  className="btn btn-sm btn-primary d-flex align-items-center"
                  onClick={() => navigate("/create-product")}
                >
                  <i className="ti ti-plus me-1"></i> Create
                </button>
              </div>
            </div>

            <TableFilter2 showCategory showProductType showProductStock />

            <div className="table-responsive">
              <AllProductTable
                tableData={currentData}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </div>

            <TableBottomControls
              indexOfFirstData={indexOfFirstData}
              indexOfLastData={indexOfLastData}
              dataList={dataList}
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              pageNumbers={pageNumbers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductPage;
