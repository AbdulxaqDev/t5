import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { log } from "../features/user/userSlice";

export default function Messengers({
 userMessages,
 setCurrentRecepient = () => {},
}) {
 const [messengerS, setMessengerS] = useState(null);

 useEffect(() => {
  if (userMessages) {
   setMessengerS(
    userMessages.all_messages.map((myMessenger) => ({
     messenger_name: myMessenger.messenger_name,
     messenger_id: myMessenger.messenger_id,
    }))
   );
  }
 }, [userMessages]);

 return (
  <div
   style={{
    height: "100%",
    width: 250,
    overflowY: "scroll",
    border: "#cecece solid 1px",
    borderRadius: "7px",
    direction: "rtl",
   }}
  >
   {messengerS ? (
    messengerS.map((messenger, i) => (
     <ListGroup key={messenger.messenger_id}>
      <ListGroup.Item
       style={{ padding: 0, border: "none", borderBottom: "1px solid #cecece" }}
      >
       <button
        type="button"
        className="btn btn-light"
        style={{
         width: "100%",
         borderRadius: 0,
         padding: "10px 0 10px 10px",
         textAlign: "left",
        }}
        onClick={() => {
         setCurrentRecepient(messenger);
        }}
       >
        {messenger.messenger_name}
       </button>
      </ListGroup.Item>
     </ListGroup>
    ))
   ) : (
    <p>Loading</p>
   )}
  </div>
 );
}
