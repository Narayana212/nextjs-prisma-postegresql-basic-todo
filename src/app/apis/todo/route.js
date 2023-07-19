import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  const todos = await prisma.todo.findMany();
  return NextResponse.json({ message: todos }, { status: 200 });
}

export async function POST(req) {
  const reqbody= await req.json()
  console.log(reqbody)
  try {
    await prisma.todo.create({
      data: {
        content:reqbody.value,
      },
    });
    const todos = await prisma.todo.findMany();
    return NextResponse.json({ message: todos }, { status: 200 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { message: "Error creating todo." },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const reqbody= await req.json()
  console.log(reqbody)
  try {
    await prisma.todo.delete({
      where: {
        id:reqbody.id,
      },
    });

    return NextResponse.json({ message: "Good" }, { status: 200 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { message: "Error creating todo." },
      { status: 500 }
    );
  }
}


