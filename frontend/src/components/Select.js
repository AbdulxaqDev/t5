import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

export default function Select({
 messengers = [1, 2],
 selectedMessenger = () => { },
 show=false
}) {
 return (
  <div
   className="select border-2 rounded"
   style={{
    width: "100%",
    height: 300,
    overflowY: "scroll",
    position: "absolute",
    top: 40,
    left: 1,
    display: show? "" : "none"
   }}
  >
   {messengers.map((messenger, i) => (
    <ListGroup key={messenger._id}>
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
       onClick={() => selectedMessenger(messenger, false)}
      >
       {messenger.name}
      </button>
     </ListGroup.Item>
    </ListGroup>
   ))}
  </div>
 );
}
