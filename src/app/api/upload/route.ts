import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

const ALLOWED = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/zip",
  "application/x-zip-compressed",
  "application/acad",
  "image/vnd.dwg",
  "application/dwg",
  "application/octet-stream", // DWG часто приходит так
];

/** Форма спрашивает, включена ли загрузка файлов */
export async function GET() {
  return NextResponse.json({ enabled: !!process.env.BLOB_READ_WRITE_TOKEN });
}

/** Клиентская загрузка в Vercel Blob: сервер только выдаёт токен, файл идёт напрямую в хранилище (обход лимита 4.5 MB) */
export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ error: "uploads_disabled" }, { status: 503 });
  const body = (await request.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("leads/")) throw new Error("bad path");
        return {
          allowedContentTypes: ALLOWED,
          maximumSizeInBytes: 50 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("[upload]", blob.pathname);
      },
    });
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
