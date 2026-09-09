import { Footer } from "./Footer";
import { Header } from "./Header";

const packages = [
  { name: "React", license: "MIT", repository: "https://github.com/facebook/react" },
  {
    name: "React DOM",
    license: "MIT",
    repository: "https://github.com/facebook/react",
  },
  {
    name: "React Router DOM",
    license: "MIT",
    repository: "https://github.com/remix-run/react-router",
  },
  {
    name: "PostHog React",
    license: "MIT",
    repository: "https://github.com/PostHog/posthog-js",
  },
  {
    name: "PostHog JS",
    license: "Apache-2.0 / MIT",
    repository: "https://github.com/PostHog/posthog-js",
  },
  {
    name: "Lucide React",
    license: "ISC",
    repository: "https://github.com/lucide-icons/lucide",
  },
  {
    name: "Tailwind CSS",
    license: "MIT",
    repository: "https://github.com/tailwindlabs/tailwindcss",
  },
  {
    name: "Vite+",
    license: "MIT",
    repository: "https://github.com/voidzero-dev/vite-plus",
  },
  {
    name: "Vitest",
    license: "MIT",
    repository: "https://github.com/vitest-dev/vitest",
  },
  {
    name: "TypeScript",
    license: "Apache-2.0",
    repository: "https://github.com/microsoft/TypeScript",
  },
];

export function About() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6f4f0] font-sans text-[#2c2926]">
      <Header />
      <main className="flex-1 bg-[#fbfaf7] px-[58px] py-[52px] max-[720px]:px-4 max-[720px]:py-12">
        <div className="mx-auto max-w-[760px]">
          <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[1.6px] text-[#bd4d2e]">
            About PromptScratchpad
          </p>
          <h1 className="mb-6 text-[42px] font-semibold tracking-[-1.8px] max-[720px]:text-[34px]">
            Better prompts, one field at a time.
          </h1>
          <div className="grid gap-5 text-[15px] leading-[1.7] text-[#807a73]">
            <p>
              PromptScratchpad turns community-built prompt templates into useful forms. Fill in the
              details, preview the result, and copy the finished prompt into the AI tool you already
              use.
            </p>
            <p>
              Templates are designed to be shared, improved, and contributed through the project’s
              prompt repository. Each one describes its fields, defaults, and output in a format the
              app can load automatically.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[8px] border border-[#dfdbd4] bg-white p-5">
              <h2 className="mb-2 text-[15px] font-semibold text-[#2c2926]">Built for reuse</h2>
              <p className="text-[13px] leading-[1.6] text-[#807a73]">
                Keep good prompt structure separate from the details that change each time.
              </p>
            </div>
            <div className="rounded-[8px] border border-[#dfdbd4] bg-white p-5">
              <h2 className="mb-2 text-[15px] font-semibold text-[#2c2926]">
                Open to contributions
              </h2>
              <p className="text-[13px] leading-[1.6] text-[#807a73]">
                Add a template, improve an existing one, and share the result with the community.
              </p>
            </div>
          </div>
          <section className="mt-14" aria-labelledby="licenses-heading">
            <p className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[1.6px] text-[#bd4d2e]">
              Open source
            </p>
            <h2 id="licenses-heading" className="mb-5 text-[22px] font-semibold tracking-[-.7px]">
              Package licenses
            </h2>
            <div className="overflow-hidden rounded-[8px] border border-[#dfdbd4] bg-white">
              {packages.map((packageInfo) => (
                <div
                  className="flex items-center justify-between gap-5 border-b border-[#eeeae4] px-5 py-4 last:border-b-0 max-[520px]:items-start max-[520px]:gap-3 max-[520px]:flex-col"
                  key={packageInfo.name}
                >
                  <a
                    className="text-[13px] font-semibold text-[#2c2926] hover:text-[#bd4d2e]"
                    href={packageInfo.repository}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {packageInfo.name}
                  </a>
                  <span className="font-mono text-[11px] text-[#807a73]">
                    {packageInfo.license}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-[1.5] text-[#a8a198]">
              Package names link to their source repositories. License details are provided by the
              package authors.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
