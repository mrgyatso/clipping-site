import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Header, PageIntro } from "@/components/site-shell";
import { caseStudies } from "@/data/site";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();

  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow={`${study.vertical} / anonymized`}
          title={study.title}
          description={study.summary}
        />
        <article className="content-page">
          <div className="case-meta">
            <span>Goal: {study.campaignGoal}</span>
            <span>Duration: {study.durationDays} days</span>
            <span>Approved clips: {study.approvedClips}</span>
            <span>Verified views: {study.verifiedViews.toLocaleString()}</span>
            <span>Platforms: {study.platforms.join(", ")}</span>
            <span>Budget: {study.budgetBand}</span>
          </div>
          <h2>Measurement methodology</h2>
          <p>{study.measurementMethodology}</p>
          <p>
            This record describes one campaign. It is evidence of delivery and
            observed performance, not a promise of future views.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
