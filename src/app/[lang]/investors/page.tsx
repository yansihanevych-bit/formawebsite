import type { Locale } from "@/lib/i18n";
import { SegmentPage, segmentMeta } from "@/components/sections/SegmentPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/investors">) {
  return segmentMeta("investors", (await params).lang as Locale);
}

export default async function Page({ params }: PageProps<"/[lang]/investors">) {
  return <SegmentPage id="investors" lang={(await params).lang as Locale} />;
}
