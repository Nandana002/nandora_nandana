import mongoose, { Schema, model, models } from "mongoose";

// --- Project Model ---
const ProjectSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  detailedDescription: { type: String },
  image: { type: String, required: true },
  images: [{ type: String }],
  client: { type: String },
  year: { type: String },
  tags: [{ type: String }],
  tools: [{ type: String }],
  url: { type: String },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ["Live", "Draft", "Archived"], default: "Live" },
}, { timestamps: true });

export const Project = models.Project || model("Project", ProjectSchema);

// --- Booking Model ---
const BookingSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  service: { type: String },
  budget: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ["pending", "reviewed", "completed"], default: "pending" },
}, { timestamps: true });

export const Booking = models.Booking || model("Booking", BookingSchema);

// --- Testimonial Model ---
const TestimonialSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  rating: { type: Number, default: 5 },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
}, { timestamps: true });

export const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema);

// --- Category Model ---
const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
}, { timestamps: true });

export const Category = models.Category || model("Category", CategorySchema);

// --- Service Model ---
const ServiceSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String },
  tags: [{ type: String }],
}, { timestamps: true });

export const Service = models.Service || model("Service", ServiceSchema);
