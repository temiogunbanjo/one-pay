import { NextResponse } from "next/server";

export const respondWithSuccess = (data: object, status: number) => {
  return NextResponse.json(data, {
    status,
  });
};

export const respondWithError = (message: string, status: number) => {
  return NextResponse.json({ message }, { status });
};
