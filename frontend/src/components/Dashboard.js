import React, { useEffect, useState } from "react";
import Messengers from "./Messengers";
import MessageBoard from "./MessageBoard";
import Mesages from "./Messages";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Spinner from "./Spinner";
import { socket } from "./MessageBoard";

export default function Dashboard() {
 let user = JSON.parse(localStorage.getItem("user"));

 const dispatch = useDispatch();
 const { isError, isSuccess, isLoading, message, allMessages } = useSelector(
  (state) => state.user
 );
 const [userMessages, setUserMessages] = useState(null);
 const [chec, setChec] = useState("");
 const [allUsers, setAllUsers] = useState(null);
 const [currentRecipientMessages, setCurrentRecipientMessages] = useState(null);

 useEffect(() => {
  if (isError) {
   toast.error(message);
  }

  if (isSuccess && allMessages) {
   toast.info("Email is sent");
  }

  dispatch(reset());
 }, [isError, isSuccess, message, allMessages]);

 let update = () => {
  socket.emit("output", user._id);
  socket.on("output", ({ userData, allUsersNameAndId }) => {
   localStorage.setItem("allMessages", JSON.stringify(userData));
   setUserMessages(JSON.parse(JSON.stringify(userData)));
   setAllUsers(JSON.parse(JSON.stringify(allUsersNameAndId)));
  });
 };
 useEffect(() => {
  if (socket !== undefined) {
   socket.emit("output", user._id);
   socket.on("output", ({ userData, allUsersNameAndId }) => {
    localStorage.setItem("allMessages", JSON.stringify(userData));
    setUserMessages(JSON.parse(JSON.stringify(userData)));
    setAllUsers(JSON.parse(JSON.stringify(allUsersNameAndId)));
   });
   socket.on("status", (status) => {
    toast.success(status.message);
   });
  }
 }, []);

 const setCurrentRecepient = (currentRecipient) => {
  setCurrentRecipientMessages(
   userMessages.all_messages.filter(
    (messenger) => messenger.messenger_id === currentRecipient.messenger_id
   )
  );
 };

 socket.on("check", ({ sender, recipient_id }) => {
  if (recipient_id === user._id) {
   toast.info(`You have new message from ${sender}`).then(() => {
    window.location.reload(false);
   });
  }
 });

 return (
  <div
   style={{ height: "100vh", widht: "100vw", padding: 30 }}
   className="d-flex justify-content-start align-items-center"
  >
   <Messengers
    userMessages={userMessages}
    setCurrentRecepient={setCurrentRecepient}
   />
   <MessageBoard
    update={update}
    userMessages={userMessages}
    allUsersNameAndId={allUsers ? allUsers.map((allUser) => allUser) : []}
   />
   <Mesages
    messages={currentRecipientMessages ? currentRecipientMessages : null}
   />
  </div>
 );
}
