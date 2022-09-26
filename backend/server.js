const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { Server } = require("socket.io");

const { User } = require("./models/userModel");

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongooseDB
connectDB().then((response) => {
 if (response) {
  const date = () => { 
   const d = new Date()
   return `${d.getDay()}-${d.getMonth()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
  }
  //Connect to Socket.io
  const client = new Server(4000);

  client.on("connection", (socket) => {
   // Create function to send status
   sendStatus = function (s) {
    socket.emit("status", s);
   };

   // Handle input events
   socket.on("input", async function (data) {
    const { current_user_id, messenger_name, messenger_id, isMe, title, body } =
     data;

    // Check details are not empty
    if (
     messenger_name == "" ||
     messenger_id == "" ||
     title === "" ||
     body === ""
    ) {
     // Send error status
     sendStatus(
      "You did not choose messenger or enter message title or message body. Plase fill all above"
     );
    } else {
     // Check messenger existes
     const isMessengerExists = await User.find({
      _id: current_user_id,
      "all_messages.messenger_id": messenger_id,
     });
     if (isMessengerExists) {
      // add messenger message to user list
      User.findOneAndUpdate(
       { _id: current_user_id, "all_messages.messenger_id": messenger_id },
       { $push: { messages: { isMe, title, body, time: date() } } }
      );
     } else {
      User.findOneAndUpdate(
       { _id: current_user_id },
       {
        $push: {
         all_messages: {
          messenger_name,
          messenger_id,
          messages: [
           {
            isMe,
            title,
            body,
            time: date()
           },
          ],
         },
        },
       },
       (err, messenger) => {
        client.emit("output", [data]);
        sendStatus({
         message: "Message sent",
         clear: true,
        });
       }
      );
     }
    }
   });
  });
 }
});

app.put("/gmail/user", async (req, res) => {
 const { name } = req.body;
 if (!name) {
  return res.status(400).json({ message: "Invalid credentials" });
 }

 const user = await User.create({ name });
 if (user) {
  res.status(201).json({
   _id: user.id,
   name: user.name,
  });
 } else {
  res.status(400).json({ message: "Invalid credentials" });
 }
});

app.get("/gmail/user/:id", async (req, res) => {
 const id = req.params.id;
 if (!id) {
  return res
   .status(400)
   .json({ message: "Invalid credentials, not included user ID" });
 }

 const user = await User.findById({ _id: id });
 if (user) {
  res.status(201).json(user);
 } else {
  res.status(400).json({ message: "Invalid credentials" });
 }
});

// app.use("/api/auth", require("./routes/authRoutes"));

// // Serve frontend
// if (process.env.NODE_ENV === "production") {
//  app.use(express.static(path.join(__dirname, "../frontend/build")))
//  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
// } else {
//  app.get('/', (req, res) => res.send("Please set to production"))
// }

// app.use(errorHandler)

app.listen(port, () => {
 console.log(`Server started on port ${port}`);
});


