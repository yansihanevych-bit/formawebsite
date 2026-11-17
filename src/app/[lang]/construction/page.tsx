import type { Locale } from "@/lib/i18n";
import { SegmentPage, segmentMeta } from "@/components/sections/SegmentPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/construction">) {
  return segmentMeta("construction", (await params).lang as Locale);
}

export default async function Page({ params }: PageProps<"/[lang]/construction">) {
  return <SegmentPage id="construction" lang={(await params).lang as Locale} />;
}
