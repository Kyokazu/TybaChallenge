import mongoose from "mongoose";

const tokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  expiredAt: { type: Date, required: true },
});

export const tokenBlacklist = mongoose.model(
  "TokenBlacklist",
  tokenBlacklistSchema
);
