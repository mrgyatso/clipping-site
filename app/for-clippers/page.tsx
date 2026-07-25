import type { Metadata } from "next";
import { TrackedLink } from "@/components/interactive";
import { Footer, Header } from "@/components/site-shell";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "For Clippers",
  description:
    "Join the Second Wind clipper community on Whop and Discord for campaign opportunities, briefs, and updates.",
  alternates: { canonical: "/for-clippers" },
};

function WhopMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48">
      <path d="M8 13h8l8 13 8-13h8L24 39 8 13Z" />
      <path d="M16 9h16l-8 13-8-13Z" />
    </svg>
  );
}

function DiscordMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48">
      <path d="M35.7 12.5a28 28 0 0 0-7-2.2l-.9 1.9a25 25 0 0 0-7.6 0l-1-1.9a28 28 0 0 0-7 2.2C7.8 19 6.7 25.3 7.3 31.4a29 29 0 0 0 8.6 4.3l2.1-2.9a18 18 0 0 1-3.3-1.6l.8-.6a20 20 0 0 0 17 0l.8.6a18 18 0 0 1-3.3 1.6l2.1 2.9a29 29 0 0 0 8.6-4.3c.7-7.1-1.2-13.3-5-18.9ZM18.5 28.7c-2 0-3.6-1.9-3.6-4.2s1.6-4.2 3.6-4.2 3.7 1.9 3.6 4.2c0 2.3-1.6 4.2-3.6 4.2Zm11 0c-2 0-3.6-1.9-3.6-4.2s1.6-4.2 3.6-4.2 3.7 1.9 3.6 4.2c0 2.3-1.6 4.2-3.6 4.2Z" />
    </svg>
  );
}

const isPlaceholder = (url: string) => url === "#";

export default function ForClippersPage() {
  const linksArePlaceholders =
    isPlaceholder(siteConfig.whopUrl) || isPlaceholder(siteConfig.discordUrl);

  return (
    <>
      <Header />
      <main className="clipper-landing">
        <section className="clipper-community">
          <span className="kicker light">For clippers</span>
          <h1>Turn great moments into reach.</h1>
          <p>
            Join the Second Wind clipper community to find campaign opportunities,
            follow active briefs, connect with other creators, and stay close to
            new work as it opens.
          </p>

          <div className="clipper-perks">
            <article>
              <span>01</span>
              <h2>Content supplied</h2>
              <p>Work from campaign-ready long-form footage supplied through Second Wind.</p>
            </article>
            <article>
              <span>02</span>
              <h2>No client prospecting</h2>
              <p>We source the campaigns and centralize each brief, so you can focus on the work.</p>
            </article>
            <article>
              <span>03</span>
              <h2>Performance-based upside</h2>
              <p>Earn against verified campaign results under terms disclosed before you participate.</p>
            </article>
          </div>

          <div className="community-links" id="community-links">
            <TrackedLink
              className="community-link whop-link"
              event="clipper_whop_click"
              href={siteConfig.whopUrl}
              rel={isPlaceholder(siteConfig.whopUrl) ? undefined : "noreferrer"}
              target={isPlaceholder(siteConfig.whopUrl) ? undefined : "_blank"}
            >
              <span className="community-mark"><WhopMark /></span>
              <span>
                <small>Campaign access</small>
                <strong>Visit our Whop</strong>
              </span>
              <b aria-hidden="true">↗</b>
            </TrackedLink>

            <TrackedLink
              className="community-link discord-link"
              event="clipper_discord_click"
              href={siteConfig.discordUrl}
              rel={isPlaceholder(siteConfig.discordUrl) ? undefined : "noreferrer"}
              target={isPlaceholder(siteConfig.discordUrl) ? undefined : "_blank"}
            >
              <span className="community-mark"><DiscordMark /></span>
              <span>
                <small>Community and updates</small>
                <strong>Join our Discord</strong>
              </span>
              <b aria-hidden="true">↗</b>
            </TrackedLink>
          </div>

          {linksArePlaceholders && (
            <p className="community-note">
              Community destinations are being connected. Check back shortly.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
