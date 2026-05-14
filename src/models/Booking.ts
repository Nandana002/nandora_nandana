import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  deadline: string;
  message: string;
  status: "pending" | "reviewed" | "completed";
}

const BookingSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  budget: { type: String },
  deadline: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ["pending", "reviewed", "completed"], default: "pending" },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
