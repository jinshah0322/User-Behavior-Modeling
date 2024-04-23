import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProductAsync, fetchProductsAsync } from "./productSlice";
import UpdateModal from "./UpdateModel";
import { Pagination } from "antd";
import Loader from "../../../components/Loader/Loader";
import { fetchCategoriesAsync } from "../category/categorySlice";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { productList, loading } = useSelector((state) => state.product);
  const categoryList = useSelector((state) => state.category.categoryList);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pagination, setPagination] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const [image , setImage] = useState("")
  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const handlePaginationChange = (page) => {
    setPagination(page);
  };

  const displayProducts = productList.slice(skip, skip + limit);

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: selectedProduct._id,
      title: e.target.product.value,
      price: e.target.price.value,
      category: e.target.category.value,
      description: e.target.des.value,
      brand: e.target.company.value,
      quantity: e.target.quantity.value,
    };

    const file = e.target.image.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        updatedProduct.image = base64String;

        dispatch(updateProductAsync({
          productId: selectedProduct._id,
          productData: updatedProduct,
        })).then(() => {
          dispatch(fetchProductsAsync());
          closeModal();
        }).catch((error) => {
          console.error("Error updating product:", error);
        });
      };
      reader.readAsDataURL(file);
    } else {
      dispatch(updateProductAsync({
        productId: selectedProduct._id,
        productData: updatedProduct,
      })).then(() => {
        dispatch(fetchProductsAsync());
        closeModal();
      }).catch((error) => {
        console.error("Error updating product:", error);
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchProductsAsync()).then(() => {
      setTotalCount(productList.length);
    });
  }, [dispatch, productList.length]);

  useEffect(() => {
    setSkip((pagination - 1) * limit);
  }, [pagination, limit]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : productList && productList.length > 0 ? (
        <>
          <h2 className="mt-4 text-xl font-semibold">Product Table</h2>
          <table className="w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Brand</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Sold</th>
                <th className="px-4 py-2 text-left">Rating</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayProducts.map((product, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="px-4 py-2">{skip + index + 1}</td>
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">
                    {
                      categoryList.find((cat) => cat.id === product.category)
                        ?.name
                    }
                  </td>
                  <td className="px-4 py-2 max-w-xs overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {product.description}
                  </td>
                  <td className="px-4 py-2">{product.brand}</td>
                  <td className="px-4 py-2">{product.quantity}</td>
                  <td className="px-4 py-2">{product.sold}</td>
                  <td className="px-4 py-2">{product.totalrating}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openModal(product)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <div className="text-center">
            <p className="text-4xl text-gray-700 font-bold mb-4">Oops!</p>
            <p className="text-lg text-red-600">No records found.</p>
          </div>
        </div>
      )}
      {productList && productList.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            current={pagination}
            total={totalCount}
            pageSize={limit}
            onChange={handlePaginationChange}
          />
        </div>
      )}
      {selectedProduct && (
        <UpdateModal
          selectedProduct={selectedProduct}
          closeModal={closeModal}
          handleUpdate={handleUpdate}
          categoryList={categoryList}
          handleImageChange={handleImageChange}
        />
      )}
    </div>
  );
};

export default UpdateProduct