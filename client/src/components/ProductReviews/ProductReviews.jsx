import React, { useState ,useEffect} from "react";
import { Container, Modal, Button, Form } from "react-bootstrap";
import "./product-review.css";
import axios from "axios";
import { FaStar,FaStarHalfAlt,FaRegStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {toast,Toaster} from "react-hot-toast";
const ProductReviews = ({ selectedProduct ,fetchData}) => {
  const [listSelected, setListSelected] = useState("desc");
  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
 const { id } = useParams();
  const handleCloseModal = () => {
    setShowModal(false);
    setRating(0);
  };


  const handleShowModal = () => setShowModal(true);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const userId = localStorage.getItem("id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(rating === 0 || review === ""){ 
      toast.error("All fields are required!");
      return;
    }
    try{
      const response = await axios.post(`http://localhost:5000/api/v1/product/${id}/ratings`,{
        star: rating,
        comment: review,
        userId: userId,
      });
      const data = await response   
      if(data?.data?.status === 200){
        toast.success(data?.data?.msg);
        setReview("");
        setRating(0);
        fetchData();   
      }
      else{
        toast.error(data?.data?.msg);
        setReview("");
        setRating(0);
      }
    }
    catch (error) {
      console.error(error);
    }

    handleCloseModal();
  };

  return (
    <section className="product-reviews p-12">
      <Container>
        <Toaster />
        <ul>
          <li
            style={{
              color: listSelected === "desc" ? "black" : "#9c9b9b",
            }}
            onClick={() => setListSelected("desc")}
          >
            Description
          </li>
          <li
            style={{
              color: listSelected === "rev" ? "black" : "#9c9b9b",
            }}
            onClick={() => setListSelected("rev")}
          >
            Reviews ({selectedProduct?.ratings?.length})
          </li>
        </ul>
        {listSelected === "desc" ? (
          <p>
            {selectedProduct?.description ? (
              selectedProduct?.description
            ) : (
              <div className="w-full py-12 flex items-center justify-center">
                <h2>Description not available</h2>
              </div>
            )}
          </p>
        ) : selectedProduct?.ratings?.length > 0 ? (
          <div>
          <div className="grid grid-cols-4">
            {selectedProduct?.ratings?.map((rate) => (
              <div
                className="rate-comment mt-3 bg-gray-200 ml-4 p-3 max-w-200px overflow-hidden overflow-ellipsis"
                key={rate.rating}
              >
                <span className="font-bold">{rate?.name}</span>
                <span className="flex mt-2">
                {Array.from({ length: Math.floor(rate?.star) }, (_, index) => (
                    <FaStar key={index} className="text-yellow-500 ml-1" />
                  ))}

                  {/* Half star */}
                  {rate?.star % 1 !== 0 && (
                    <FaStarHalfAlt className="text-yellow-500 ml-1" />
                  )}

                  {/* Empty stars */}
                  {Array.from({ length: Math.floor(5 - rate?.star) }, (_, index) => (
                    <FaRegStar key={index} className="ml-1" />
                  ))}
                </span>
                <p className="mt-2">{rate.comment}</p>
              </div>
            ))}
            </div>         
            </div>           
          </div>
        ) : (
          <div className="w-full py-12 flex items-center justify-center">
            <h2>No reviews yet</h2>
          </div>

        )
        
        }
          <button
          className="bg-blue-500 rounded-md px-4 py-2 text-white m-4"
          onClick={handleShowModal}
        >
          Add Your Review
        </button>
       
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Your Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="reviewTextarea">
                <Form.Label>Your Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={review}
                  onChange={handleReviewChange}
                />
              </Form.Group>
              <Form.Group controlId="ratingStars" className="my-4">
                <Form.Label>Rating</Form.Label>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className="text-yellow-500 cursor-pointer"
                      onClick={() => handleRatingChange(index + 1)}
                      style={{ marginRight: "5px" }}
                      color={rating > index ? "#ffc107" : "#e4e5e9"}
                    />
                  ))}
                </div>
              </Form.Group>
              <button variant="primary" type="button" onClick={handleSubmit} className="bg-blue-500 text-white rounded-md px-4 py-2">
                Submit
              </button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </section>
  );
};

export default ProductReviews;
