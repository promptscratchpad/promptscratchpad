import { useEffect } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { setPageMetadata } from "../seo";

export function Privacy() {
  useEffect(() => {
    setPageMetadata({
      title: "Privacy policy | PromptScratchpad",
      description: "How PromptScratchpad handles analytics, prompts, and other information.",
      url: "https://promptscratchpad.com/privacy",
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f4f0] font-sans text-[#2c2926]">
      <Header />
      <main className="flex-1 bg-[#fbfaf7] px-[58px] py-[52px] max-[720px]:px-4 max-[720px]:py-12">
        <article className="mx-auto max-w-[760px] text-[15px] leading-[1.7] text-[#807a73] [&_a]:text-[#bd4d2e] [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:tracking-[-.7px] [&_li]:mb-2 [&_p]:mb-5 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6">
          <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[1.6px] text-[#bd4d2e]">
            PromptScratchpad
          </p>
          <h1 className="mb-3 text-[42px] font-semibold tracking-[-1.8px] max-[720px]:text-[34px]">
            Privacy policy
          </h1>
          <p className="!mb-10 text-[12px] text-[#a8a198]">Last updated: September 9, 2026</p>

          <p>
            PromptScratchpad is{" "}
            <a href="https://github.com/promptscratchpad/promptscratchpad">Open source</a> and
            maintained by Ian Everall. This policy explains what information PromptScratchpad
            collects, why it collects it, and the choices available to you when you use the website.
          </p>

          <h2>Information you provide</h2>
          <p>
            PromptScratchpad does not require an account and does not ask for your name, email
            address, or other profile information. Prompt fields and generated prompts are handled
            in your browser. The site does not send them to an AI provider or store them on our
            server.
          </p>
          <p>
            If you copy a prompt into another application, that application handles the copied
            content under its own privacy policy. Avoid entering personal, confidential, or
            sensitive information into a prompt unless you are comfortable with how you will use and
            share it.
          </p>

          <h2>PostHog analytics</h2>
          <p>
            PromptScratchpad uses PostHog to understand how the site is used and to find errors.
            PostHog may receive an anonymous identifier, browser and device details, approximate
            usage information, page URLs, referrer information, pageview and pageleave events,
            autocaptured interactions, and technical error data.
          </p>
          <p>
            The app also sends these custom events: selecting a prompt template, resetting a prompt,
            and copying a prompt. Those events contain the prompt template ID. They do not contain
            the rendered prompt or the values entered into prompt fields.
          </p>
          <p>
            The current configuration uses in-memory PostHog persistence, disables person profiles,
            and disables session recording. PostHog processes data according to its own{" "}
            <a href="https://posthog.com/privacy" target="_blank" rel="noreferrer">
              privacy policy
            </a>
            .
          </p>

          <h2>Cookies and browser storage</h2>
          <p>
            PromptScratchpad does not use advertising cookies. When PostHog is enabled, the current
            app configuration keeps its analytics state in memory rather than cookies or local
            storage. Your browser may still store ordinary technical data, such as cached site
            assets, according to your browser settings.
          </p>

          <h2>How we use information</h2>
          <p>We use the information described above to:</p>
          <ul>
            <li>provide the prompt library and render prompts in your browser;</li>
            <li>understand which templates and features are useful;</li>
            <li>monitor reliability and diagnose technical errors; and</li>
            <li>protect the website from misuse.</li>
          </ul>
          <p>We do not sell your personal information or use your prompts to train an AI model.</p>

          <h2>Third-party services</h2>
          <p>
            The site uses PostHog for product analytics. It also loads fonts from Google Fonts.
            Links to GitHub and other external sites are provided for convenience. Those services
            have their own terms and privacy policies, and this policy does not cover their
            practices.
          </p>

          <h2>Your choices and rights</h2>
          <p>
            You can prevent analytics requests by using a browser extension or network setting that
            blocks PostHog, or by disabling JavaScript. You can also clear the page and browser data
            held by your browser. Depending on where you live, you may have rights to request access
            to, correction of, deletion of, or information about personal data associated with you.
          </p>
          <p>
            To ask a privacy question or make a request, contact the project maintainer through the{" "}
            <a href="https://github.com/promptscratchpad/promptscratchpad">
              PromptScratchpad GitHub repository
            </a>
            .
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy when the site, analytics setup, or applicable requirements
            change. The date at the top of this page shows when it was last revised.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
