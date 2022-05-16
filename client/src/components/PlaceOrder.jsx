import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const PlaceOrder = ({ subTotal, isOpen, handlePlaceOrderModal }) => {
    const [name, setName] = useState('');
    const [phn, setPhn] = useState('');
    const [location, setLocation] = useState('');
    const [validated, setValidated] = useState(false);
    const [isPayed, setIsPayed] = useState(false);

    const orderState = useSelector((state) => state.placeOrderReducer);
    const { loading, error, success } = orderState;
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();

            event.stopPropagation();
        }
        // handlePlaceOrderModal(false);

        setValidated(true);
    };
    console.log("isOpen ", isOpen);
    return (
        <>
            <Modal show={isOpen} onHide={() => handlePlaceOrderModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Place Order</Modal.Title> Total: {subTotal}
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter name"
                                value={name}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhn">
                            <Form.Label>Phone#</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={phn}
                                onChange={(e) => setPhn(e.target.value)}
                                placeholder="Contact Number"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLocation">
                            <Form.Label>Phone#</Form.Label>
                            <Form.Control
                                required
                                className="textFeedback"
                                as="textarea"
                                rows="3"
                                placeholder="Location"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                type="text"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" checked={isPayed} onChange={e => setIsPayed(e.target.checked)} label="Do you want to pay now?" />
                        </Form.Group>

                        {isPayed ?
                            <Form.Text className="text-muted">
                                JazzCash: 0312-3456789
                            </Form.Text>

                            : null}
                        <Button variant="primary" style={{ float: 'right' }} type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PlaceOrder;
