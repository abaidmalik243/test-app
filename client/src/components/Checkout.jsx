import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderAction";
import PlaceOrderModal from './PlaceOrder';
import Loader from "./Loader";
import Error from "./Error";
import Success from "./Success";

const Checkout = ({ subTotal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const orderState = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderState;
  const dispatch = useDispatch();
  // const tokenHandler = (token) => {
  //   dispatch(placeOrder(token, subTotal));
  //   console.log(token);
  // };

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  const handlePlaceOrderModal = (value) => {
    setIsOpen(value);
  }

 
  return (
    <>
      {loading && <Loader />}
      {error && <Error error="something went wrong" />}
      {success && <Success success="order placed success" />}
      {/* <StripeCheckout
        amount={subTotal * 100}
        // shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51JZDMcSCvB2iddWcRjlSoeKnxakEJTRMWhz7TBKdW9VaELzeRvVpwD12i7owVOxCzKCuzcXCJXKJwti5YeKYRMdz00HWHxm3IF"
        currency="USD"
      > */}

      <PlaceOrderModal
        subTotal={subTotal}
        isOpen={isOpen}
        handlePlaceOrderModal={handlePlaceOrderModal}
      />
      <Button onClick={() => handlePlaceOrderModal(true)}>Checkout</Button>
      {/* </StripeCheckout> */}
    </>
  );
};

export default Checkout;
