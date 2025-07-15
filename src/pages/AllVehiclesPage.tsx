// AllVehiclesPage.tsx — adjusted to match AllCustomerPage design pattern
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllVehicleTable from "../components/table/AllVehicleTable";
import { AllVehicleDataType } from "../types";

const AllVehiclesPage = () => {
  const [vehicles, setVehicles] = useState<AllVehicleDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5093/api/vehicle")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch vehicles");
        return res.json();
      })
      .then((data) => {
        setVehicles(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (vehicle: AllVehicleDataType) => {
    navigate(`/edit-vehicle/${vehicle.id}`);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      await fetch(`http://localhost:5093/api/vehicle/${id}`, { method: "DELETE" });
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      alert("Failed to delete vehicle.");
    }
  };

  return (
    <div className="panel">
      <div className="panel-header d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">All Vehicles</h5>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-3 align-items-end">
        <div className="btn-box">
          <button className="btn btn-sm btn-primary" onClick={() => navigate("/create-vehicle")}>+ Create</button>
        </div>
      </div>

      <div className="table-responsive">
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : error ? (
          <div className="p-4 text-danger text-center">{error}</div>
        ) : (
          <AllVehicleTable
            tableData={vehicles}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default AllVehiclesPage;
