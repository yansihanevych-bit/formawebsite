import type { Locale } from "@/lib/i18n";
import { SegmentPage, segmentMeta } from "@/components/sections/SegmentPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/real-estate">) {
  return segmentMeta("realEstate", (await params).lang as Locale);
}

export default async function Page({ params }: PageProps<"/[lang]/real-estate">) {
  return <SegmentPage id="realEstate" lang={(await params).lang as Locale} />;
}
