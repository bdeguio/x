// app/api/follows/[userId]/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  const userId = context.params.userId;
  return NextResponse.json({ hello: `User is ${userId}` });
}
