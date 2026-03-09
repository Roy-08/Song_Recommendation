import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/mongodb";
import User from "@/app/lib/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "peakbot_secret_key_2026";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, avatar } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name || "Google User",
        email,
        provider: "google",
        avatar: avatar || "",
      });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    return NextResponse.json({
      user: { id: user._id, name: user.name, email: user.email, provider: "google", avatar: user.avatar },
      token,
    });
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}