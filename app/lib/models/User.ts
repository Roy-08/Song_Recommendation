import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  provider: "email" | "google";
  avatar?: string;
  moodHistory: { mood: string; timestamp: Date }[];
  songHistory: { songId: string; genre: string; timestamp: Date }[];
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  provider: { type: String, enum: ["email", "google"], default: "email" },
  avatar: { type: String },
  moodHistory: [{ mood: String, timestamp: { type: Date, default: Date.now } }],
  songHistory: [{ songId: String, genre: String, timestamp: { type: Date, default: Date.now } }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);