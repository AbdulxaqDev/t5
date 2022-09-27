import React, { useState, useEffect } from "react";
import Select from "./Select";
import Spinner from "./Spinner";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

// Connect to socket
export const socket = io.connect(":4000");

export default function MessageBoard({ update = () => {}, allUsersNameAndId }) {
 const [title, setTitle] = useState("");
 const [message, setMessage] = useState("");
 const [recipient, setRecipient] = useState({});
 const [recipientName, setRecipientName] = useState("");

 const navigate = useNavigate();
 let user = JSON.parse(localStorage.getItem("user"));
 const [show, setShow] = useState(false);
 const dispatch = useDispatch();
 const filterMessengers = allUsersNameAndId.filter((msgr) => {
  return msgr.name.toLowerCase().includes(recipientName.toLowerCase());
 });

 let closeSelect = () => {
  setTimeout(() => {
   setShow(false);
  }, 500);
 };

 const clear = () => {
  setRecipient("");
  setTitle("");
  setMessage("");
  setRecipientName("");
 };

 const sendMessage = () => {
  update();
  socket.emit("input", {
   current_user_id: user._id,
   current_user_name: user.name,
   messenger_name: recipient.name,
   messenger_id: recipient._id,
   title: title,
   body: message,
  });
  clear();
  // window.location.reload(false);
 };


 return (
  <div
   style={{
    height: "100%",
    width: 500,
    marginLeft: 50,
    border: "#cecece solid 1px",
    borderRadius: "7px",
   }}
   className="d-flex flex-column justify-content-between"
  >
   <InputGroup className="mb-3">
    <Form.Control
     placeholder="Recipient"
     aria-describedby="basic-addon1"
     type="text"
     value={recipientName}
     onChange={(e) => {
      setShow(true);
      setRecipientName(e.target.value);
     }}
     onBlur={closeSelect}
    />
    <Select
     messengers={filterMessengers}
     selectedMessenger={(mesgr, close) => {
      setRecipient({ ...mesgr });
      setRecipientName(mesgr.name);
      setShow(close);
     }}
     show={show}
    />
   </InputGroup>
   <InputGroup className="mb-3">
    <Form.Control
     placeholder="Title"
     value={title}
     aria-describedby="basic-addon1"
     onChange={(e) => setTitle(e.target.value)}
    />
   </InputGroup>
   <InputGroup style={{ height: "100%" }} className="mb-3">
    <Form.Control
     as="textarea"
     placeholder="Message"
     value={message}
     onChange={(e) => setMessage(e.target.value)}
    />
   </InputGroup>
   <InputGroup>
    <button
     disabled={
      title === "" || message === "" || recipient === "" ? true : false
     }
     type="button"
     className="btn btn-primary"
     style={{ width: "100%" }}
     onClick={sendMessage}
    >
     {user.name} sends
    </button>
   </InputGroup>
  </div>
 );
}
