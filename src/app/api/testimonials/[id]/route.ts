import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Testimonial } from "@/models";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const testimonial = await Testimonial.findById(params.id);
    if (!testimonial) return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonial" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await req.json();
    const testimonial = await Testimonial.findByIdAndUpdate(params.id, body, { new: true });
    if (!testimonial) return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    return NextResponse.json(testimonial);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const testimonial = await Testimonial.findByIdAndDelete(params.id);
    if (!testimonial) return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
