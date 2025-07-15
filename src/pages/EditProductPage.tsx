import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    sales: "",
    rating: "",
    ratingCount: "",
    published: "",
    sku: "",
    imageUrl: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5102/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Ensure published is in correct format for datetime-local input
        data.published = new Date(data.published).toISOString().slice(0, 16);
        setFormData(data);
      })
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });
      if (selectedImage) {
        form.append("image", selectedImage);
      }

      await fetch(`http://localhost:5102/api/product/${id}`, {
        method: "PUT",
        body: form,
      });

      navigate("/all-product");
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-primary">Edit Product</h2>
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-4">
          {(selectedImage || formData.imageUrl) && (
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : `http://localhost:5102${formData.imageUrl}`
              }
              alt="Product"
              className="rounded shadow w-full h-auto"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-4"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 col-span-8 gap-4"
        >
          {[
            ["name", "Product Name"],
            ["description", "Description"],
            ["price", "Price"],
            ["stock", "Stock"],
            ["sales", "Sales"],
            ["rating", "Rating"],
            ["ratingCount", "Rating Count"],
            ["published", "Published Date"],
            ["sku", "SKU"],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1 text-primary">
                {label}
              </label>
              <input
                type={key === "published" ? "datetime-local" : "text"}
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          ))}
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-purple-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
