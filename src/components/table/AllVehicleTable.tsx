// AllVehicleTable.jsx
// Table for displaying vehicle data, modeled after AllCustomerTable layout

import React from "react";

/**
 * @typedef {Object} VehicleDataType
 * @property {string} id
 * @property {string} plateNumber
 * @property {string} brand
 * @property {string} model
 * @property {string|number} year
 * @property {string} color
 * @property {string} type
 * @property {string} registrationDate
 * @property {string} owner
 * @property {string} email
 * @property {string} city
 * @property {string} region
 * @property {string} status
 */

/**
 * @param {{
 *   tableData: VehicleDataType[],
 *   handleEdit: (vehicle: VehicleDataType) => void,
 *   handleDelete: (id: string) => void
 * }} props
 */
const AllVehicleTable = ({ tableData, handleEdit, handleDelete }) => {
  return (
    <div className="panel-body">
      {/* Tabs */}
      <div className="d-flex gap-2 flex-wrap mb-4">
        <button className="btn btn-light btn-sm">All ({tableData.length})</button>
        <button className="btn btn-light btn-sm">Pending (0)</button>
        <button className="btn btn-light btn-sm">Draft (0)</button>
        <button className="btn btn-light btn-sm">Trash (0)</button>
      </div>

      {/* Bulk Action + Filters */}
      <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
        <div className="d-flex gap-2">
          <select className="form-select form-select-sm w-auto">
            <option>Bulk action</option>
            <option>Delete</option>
          </select>
          <button className="btn btn-sm btn-primary">Apply</button>
        </div>
        <select className="form-select form-select-sm w-auto">
          <option>Select Status</option>
        </select>
        <input type="date" className="form-control form-control-sm w-auto" />
        <button className="btn btn-sm btn-secondary">Filter</button>
        <button className="btn btn-sm btn-primary">+ Create</button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-dashed table-hover digi-dataTable all-product-table" id="allVehicleTable">
          <thead>
            <tr>
              <th className="no-sort">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="markAllVehicle" />
                </div>
              </th>
              <th>Plate Number</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Color</th>
              <th>Type</th>
              <th>Registration Date</th>
              <th>Owner</th>
              <th>Email</th>
              <th>City</th>
              <th>Region</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan="14" className="text-center text-muted py-4">
                  No vehicles found.
                </td>
              </tr>
            ) : (
              tableData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                  </td>
                  <td>{item.plateNumber}</td>
                  <td>{item.brand}</td>
                  <td>{item.model}</td>
                  <td>{item.year}</td>
                  <td>{item.color}</td>
                  <td>{item.type}</td>
                  <td>{item.registrationDate}</td>
                  <td>{item.owner || item.vehicleOwner || item.vehicle_owner || item.ownerName || item.owner_name || ""}</td>
                  <td>{item.email || item.ownerEmail || item.owner_email || ""}</td>
                  <td>{item.city}</td>
                  <td>{item.region}</td>
                  <td>{item.status}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Summary */}
      <div className="mt-3">
        <small>
          Showing {tableData.length > 0 ? `1 to ${tableData.length}` : 0} of {tableData.length}
        </small>
      </div>
    </div>
  );
};

export default AllVehicleTable;
