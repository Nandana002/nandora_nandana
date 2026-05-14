import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  category: string;
  image: string;
  description: string;
  detailedDescription?: string;
  client?: string;
  year: string;
  tools: string[];
  tags: string[];
  gallery: string[];
  featured: boolean;
  order: number;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  detailedDescription: { type: String },
  client: { type: String },
  year: { type: String, required: true },
  tools: [{ type: String }],
  tags: [{ type: String }],
  gallery: [{ type: String }],
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
