import type { Locale } from "@/lib/i18n";
import { SegmentPage, segmentMeta } from "@/components/sections/SegmentPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/developers">) {
  return segmentMeta("developers", (await params).lang as Locale);
}

export default async function Page({ params }: PageProps<"/[lang]/developers">) {
  return <SegmentPage id="developers" lang={(await params).lang as Locale} />;
}
