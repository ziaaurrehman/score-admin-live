import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
});

const Notification = mongoose.model("Notifications", notificationSchema);

export default Notification;
