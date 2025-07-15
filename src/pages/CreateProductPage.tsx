
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProductPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    sales: "",
    rating: "",
    ratingCount: "",
    sku: "",
    publishedDate: "",
    imageFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("Name", formData.name);
    data.append("Description", formData.description);
    data.append("Price", parseInt(formData.price) || 0);
    data.append("Stock", parseInt(formData.stock) || 0);
    data.append("Sales", parseInt(formData.sales) || 0);
    data.append("Rating", parseInt(formData.rating) || 0);
    data.append("RatingCount", parseInt(formData.ratingCount) || 0);
    data.append("SKU", formData.sku);
    data.append("PublishedDate", formData.publishedDate);
    if (formData.imageFile) {
      data.append("ImageFile", formData.imageFile);
    }

    try {
      const res = await fetch("http://localhost:5102/api/product", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        navigate("/all-product");
      } else {
        console.error("❌ Failed to create product");
      }
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  return (
    <div className="panel">
      <div className="panel-body">
        <h4 className="mb-4">Create Product</h4>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <label>Product Name</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Description</label>
              <input type="text" name="description" className="form-control" value={formData.description} onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label>Price</label>
              <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label>Stock</label>
              <input type="number" name="stock" className="form-control" value={formData.stock} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label>Sales</label>
              <input type="number" name="sales" className="form-control" value={formData.sales} onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label>Rating</label>
              <input type="number" name="rating" className="form-control" value={formData.rating} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label>Rating Count</label>
              <input type="number" name="ratingCount" className="form-control" value={formData.ratingCount} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label>SKU</label>
              <input type="text" name="sku" className="form-control" value={formData.sku} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <label>Published Date</label>
              <input type="datetime-local" name="publishedDate" className="form-control" value={formData.publishedDate} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Choose Image</label>
              <input type="file" name="imageFile" className="form-control" accept="image/*" onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4">Save Product</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
