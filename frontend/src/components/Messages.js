import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";

export default function Mesages({ messages }) {
 const [currentMessages, setCurrenttMessages] = useState(null);

 useEffect(() => {
  if (messages) {
   setCurrenttMessages(messages[0].messages);
   console.log("new messages");
  }
 }, [messages]);

 return (
  <Accordion
   style={{
    height: "100%",
    width: "70%",
    marginLeft: 50,
    border: "#cecece solid 1px",
    borderRadius: "7px",
    overflowY: "scroll",
   }}
  >
   {currentMessages ? (
    currentMessages.map((message, i) => (
     <Accordion.Item eventKey={i} key={i}>
      <Accordion.Header>
       <b>From:</b>
       &nbsp; {message.isMe ? "Me" : messages[0].messenger_name} &nbsp;&nbsp;
       <b>To:</b>
       &nbsp; {message.isMe ? messages[0].messenger_name : "Me"}{" "}
       &nbsp;&nbsp;&nbsp;&nbsp;
       <b>Title:</b> &nbsp; {message.title}
      </Accordion.Header>
      <Accordion.Body className="text-start" style={{widht: "100%", wordWrap: "break-word" }}>
       <p>{message.time}</p>
       <h3>{message.title}</h3>
       <hr />
       {message.body}
      </Accordion.Body>
     </Accordion.Item>
    ))
   ) : (
    <p>Click to person who you emailed before</p>
   )}
  </Accordion>
 );
}
