import type { Locale } from "@/lib/i18n";
import { SegmentPage, segmentMeta } from "@/components/sections/SegmentPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/homeowners">) {
  return segmentMeta("homeowners", (await params).lang as Locale);
}

export default async function Page({ params }: PageProps<"/[lang]/homeowners">) {
  return <SegmentPage id="homeowners" lang={(await params).lang as Locale} />;
}
