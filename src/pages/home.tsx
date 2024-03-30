import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { examples, faqs, features } from '@/data/constant/home';

const Home = () => {
  return (
    <>
      <main className="relative text-gray-800 dark:text-gray-200">
        <section aria-label="hero">
          <div className="relative mx-auto max-w-screen-xl px-4 py-28 md:px-8">
            <div className=" mx-auto max-w-4xl space-y-5 text-center">
              <h1 className="bg-gradient-to-br from-white to-gray-300 bg-clip-text text-center text-4xl font-bold leading-tight text-transparent sm:leading-tight md:text-5xl">
                Present{' '}
                <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                  Your Code
                </span>
                , Like Never Before
              </h1>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
                wow your audience with smooth animation video of code changes
                for easy catch-up. or Customize every aspect of the snap for
                stunning screenshots
              </p>
              <div className="items-center justify-center gap-x-3 sm:flex">
                <Link
                  to={'/studio'}
                  className="mt-3 flex w-full items-center justify-center gap-x-2 rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-medium  duration-150 hover:bg-sky-600 active:bg-sky-600 sm:mt-0 sm:w-auto"
                >
                  Get started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <a
                  className="mt-3 flex w-full items-center justify-center gap-x-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium  duration-150 hover:bg-slate-900 active:bg-slate-500 sm:mt-0 sm:w-auto"
                  href="https://github.com/amasin76/code-motion"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub Repo
                  <GitHubLogoIcon />
                </a>
              </div>
            </div>
            <div
              className="pointer-events-none absolute inset-0 m-auto h-[357px] max-w-xs blur-[118px] sm:max-w-md md:max-w-lg"
              style={{
                background:
                  'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)',
              }}
            ></div>
          </div>
        </section>
        <section aria-label="features">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="mx-auto grid grid-cols-1 gap-6 max-md:max-w-md md:grid-cols-2 md:gap-12 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg bg-slate-900 shadow-lg"
                >
                  <div className="grid gap-2 p-6">
                    <div className="grid size-12 place-content-center rounded-lg bg-slate-950 p-2.5 text-sky-400 shadow-lg shadow-sky-700/50">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="mb-2 flex items-center gap-2 text-xl font-semibold">
                        {feature.title}
                        {feature?.status && (
                          <Badge
                            className="h-fit rounded-lg border-yellow-900 bg-yellow-500/20 text-yellow-600"
                            variant="outline"
                          >
                            soon
                          </Badge>
                        )}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section aria-label="examples">
          <div className="mx-auto my-4 mt-16 max-w-6xl">
            <div className="grid items-center gap-16 px-2 md:grid-cols-2">
              {examples.map((example, index) => (
                <Fragment key={index}>
                  <div
                    className={`shadow-lg shadow-sky-700/20 transition hover:md:scale-105 hover:md:shadow-sky-700/50 ${index % 2 === 0 ? 'md:-rotate-1 md:skew-x-3' : 'md:col-start-2 md:row-start-2 md:rotate-1 md:-skew-x-3'}`}
                  >
                    {example.type === 'image' ? (
                      <img
                        src={example.media}
                        loading="lazy"
                        className="w-full rounded-md object-contain"
                      />
                    ) : (
                      <video
                        loop
                        muted
                        autoPlay
                        className="w-full rounded-md object-contain"
                      >
                        <source src={example.media} type="video/webm" />
                      </video>
                    )}
                  </div>
                  <div
                    className={`${index % 2 !== 0 ? 'justify-self-end md:col-start-1 md:row-start-2' : ''}`}
                  >
                    <h3 className="mb-4 text-2xl font-extrabold">
                      {example.title}
                    </h3>
                    <p className="max-w-[450px] text-sm text-gray-600 dark:text-gray-400">
                      {example.description}
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        <section aria-label="FAQ">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="mb-4 text-center text-2xl font-extrabold sm:text-4xl md:mb-8">
              FAQ
            </h2>
            <Accordion type="single" collapsible className="mx-auto max-w-3xl">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <footer>
        <hr className="border-slate-800" />
        <p className="p-4 text-center text-gray-500">
          Code Motion platform made w/ ❤️ by Bio, source code
          <a
            href="https://github.com/amasin76/code-motion/"
            target="_blank"
            rel="noreferrer"
            className="mx-1 underline"
          >
            GitHub Repo
          </a>
        </p>
      </footer>
    </>
  );
};

export default Home;
