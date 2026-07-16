import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header, PageIntro } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ClipWave about managed clipping campaigns.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const email = process.env.LEADS_TO_EMAIL;

  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Contact"
          title="Start with the campaign-fit form."
          description="It gives us the source, budget, readiness, and timing context needed to respond usefully."
        />
        <section className="content-page">
          <div className="contact-card">
            <h2>Campaign inquiries</h2>
            <p>
              Use the{" "}
              <Link href="/#qualification">campaign-fit form</Link> for the
              fastest route. Qualified submissions can schedule immediately
              after successful delivery.
            </p>
            {email ? (
              <>
                <h2>General contact</h2>
                <p>
                  Email <a href={`mailto:${email}`}>{email}</a>.
                </p>
              </>
            ) : (
              <p>
                A public general-contact address has not been configured, so no
                placeholder email is shown.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
