
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const steps = [
  { title: "Order Placed", status: "placed" },
  { title: "Processing", status: "processing" },
  { title: "Shipped", status: "shipped" },
  { title: "Delivered", status: "delivered" },
];

const carIcon = new L.Icon({
  iconUrl: "/img/car-icon.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const route: [number, number][] = [
  [42.6629, 21.1655],
  [42.6635, 21.1670],
  [42.6640, 21.1685],
  [42.6648, 21.1700],
  [42.6655, 21.1715],
  [42.6662, 21.1730]
];

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Info");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5054/api/order/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder({
          order_id: data.id,
          customer_name: data.customer,
          status: data.status,
          payment_method: data.payment,
          delivery_status: data.delivery,
          product_number: data.count,
          price: data.price,
          order_date: data.date,
        });
      })
      .catch((err) => {
        setError("Failed to fetch order");
        console.error("Failed to fetch order:", err);
      });
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < route.length - 1 ? prevIndex + 1 : prevIndex
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStepIndex = () => {
    switch (order?.delivery_status?.toLowerCase()) {
      case "processing": return 1;
      case "shipped": return 2;
      case "delivered": return 3;
      default: return 0;
    }
  };

  const activeStep = getStepIndex();
  const vehiclePosition = route[currentIndex];

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 text-center relative flex flex-col items-center">
              <div className="relative flex items-center justify-center w-full">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 ${index <= activeStep ? "bg-green-500 text-white border-green-500" : "bg-white border-gray-300"}`}>
                  {index < activeStep ? <CheckCircleIcon className="w-6 h-6 text-white" /> : <span className="text-sm font-bold">{index + 1}</span>}
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-full h-1">
                    <div className={`h-full w-full ${index < activeStep ? "bg-green-500" : "bg-gray-300"}`} />
                  </div>
                )}
              </div>
              <div className={`text-xs mt-2 ${index === activeStep ? "font-semibold text-green-600" : "text-gray-500"}`}>{step.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {["Info", "Map"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "Info" ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div><label className="block text-sm font-medium mb-1">Order ID</label><div className="px-3 py-2 border border-gray-200 rounded bg-gray-50">{order.order_id}</div></div>
            <div><label className="block text-sm font-medium mb-1">Customer Name</label><div className="px-3 py-2 border border-gray-200 rounded bg-gray-50">{order.customer_name}</div></div>
            <div><label className="block text-sm font-medium mb-1">Status</label><div className="px-3 py-2 border border-gray-200 rounded bg-gray-50">{order.status}</div></div>
            <div><label className="block text-sm font-medium mb-1">Product Number</label><div className="px-3 py-2 border border-gray-200 rounded bg-gray-50">{order.product_number}</div></div>
            <div><label className="block text-sm font-medium mb-1">Price</label><div className="px-3 py-2 border border-gray-200 rounded bg-gray-50">${order.price}</div></div>
            <div><label className="block text-sm font-medium mb-1">Payment Method</label><div className="px-3 py-2 border border-gray-200 rounded bg-gray-50">{order.payment_method}</div></div>
            <div><label className="block text-sm font-medium mb-1">Delivery Status</label><div className="px-3 py-2 border border-gray-200 rounded bg-gray-50">{order.delivery_status}</div></div>
            <div><label className="block text-sm font-medium mb-1">Order Date</label><div className="px-3 py-2 border border-gray-200 rounded bg-gray-50">{order.order_date}</div></div>
          </div>
        </>
      ) : (
        <div className="h-96 rounded border border-gray-300 overflow-hidden">
          <MapContainer center={vehiclePosition} zoom={14} scrollWheelZoom={true} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline positions={route} color="blue" />
            <Marker position={vehiclePosition} icon={carIcon} />
          </MapContainer>
        </div>
      )}

      <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => navigate("/order")}>Back</button>
    </div>
  );
};

export default OrderDetailsPage;
