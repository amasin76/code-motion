import { Link } from 'react-router-dom';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

const Home = () => {
  return (
    <section className="relative">
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-28 md:px-8">
        <div className="mx-auto max-w-4xl space-y-5 text-center">
          <h1 className="bg-gradient-to-br from-white to-gray-300 bg-clip-text text-center text-4xl font-bold leading-tight text-transparent sm:leading-tight md:text-5xl">
            Present{' '}
            <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
              Your Code
            </span>
            , Like Never Before
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            wow your audience with smooth animation video of code changes for
            easy catch-up. or Customize every aspect of the snap for stunning
            screenshots
          </p>
          <div className="items-center justify-center gap-x-3 sm:flex">
            <Link
              to={'/studio'}
              className="mt-3 flex w-full items-center justify-center gap-x-2 rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-medium text-white duration-150 hover:bg-sky-600 active:bg-sky-600 sm:mt-0 sm:w-auto"
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
              className="mt-3 flex w-full items-center justify-center gap-x-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-white duration-150 hover:bg-slate-900 active:bg-slate-500 sm:mt-0 sm:w-auto"
              href="https://github.com/amasin76/code-motion"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Repo
              <GitHubLogoIcon />
            </a>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 m-auto h-[357px] max-w-xs blur-[118px] sm:max-w-md md:max-w-lg"
        style={{
          background:
            'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)',
        }}
      ></div>
    </section>
  );
};

export default Home;
