import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableFilter2 from "../components/filter/TableFilter2";
import TableHeader from "../components/header/table-header/TableHeader";
import AllCustomerTable from "../components/table/AllCustomerTable";
import TableBottomControls from "../components/utils/TableBottomControls";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { RootState, AppDispatch } from "../redux/store";
import { setCustomers } from "../redux/features/customersSlice";
import { allCustomerHeaderData } from "../data";
import { AllCustomerDataType } from "../types";

const AllCustomerPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const customers = useSelector((state: RootState) => state.customers.customers);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:5051/api/customer")
      .then((res) => res.json())
      .then((data: AllCustomerDataType[]) => {
        dispatch(setCustomers(data));
      })
      .catch((err) => console.error("Failed to fetch customers:", err));
  }, [dispatch]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = customers.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(customers.length / dataPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5051/api/customer/${id}`, {
        method: "DELETE",
      });
      dispatch(setCustomers(customers.filter((c) => c.id !== id)));
    } catch (err) {
      console.error("Failed to delete customer:", err);
    }
  };

  const handleEdit = (customer: AllCustomerDataType) => {
    navigate(`/edit-customer/${customer.id}`);
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader
            tableHeading="All Customer"
            tableHeaderData={allCustomerHeaderData}
          />

          <div className="panel-body">
            <div className="product-table-quantity d-flex justify-content-between align-items-center mb-4">
              <ul className="mb-0">
                <li className="text-white">All ({customers.length})</li>
                <li>Pending (19)</li>
                <li>Draft (05)</li>
                <li>Trush (05)</li>
              </ul>

              <div className="btn-box d-md-flex d-none gap-2">
                <button className="btn btn-sm btn-icon btn-light" id="downloadExcel">
                  <i className="ti ti-file-spreadsheet"></i>
                </button>
                <button className="btn btn-sm btn-icon btn-light" id="downloadPdf">
                  <i className="ti ti-file-type-pdf"></i>
                </button>
                <button
                  className="btn btn-sm btn-primary d-flex align-items-center"
                  onClick={() => navigate("/create-customer")}
                >
                  <i className="ti ti-plus me-1"></i> Create
                </button>
              </div>
            </div>

            <TableFilter2 showDatePicker showStatus />

            <div className="table-responsive">
              <OverlayScrollbarsComponent>
                <AllCustomerTable
                  tableData={currentData}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </OverlayScrollbarsComponent>
            </div>

            <TableBottomControls
              indexOfFirstData={indexOfFirstData}
              indexOfLastData={indexOfLastData}
              dataList={customers}
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

export default AllCustomerPage;
