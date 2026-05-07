import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = createIssueSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { errors: validation.error.flatten() },
                { status: 400 }
            );
        }

        const newIssue = await prisma.issue.create({
            data: validation.data,
        });

        return NextResponse.json(newIssue, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}