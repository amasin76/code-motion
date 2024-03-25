import { SignIn } from '@clerk/clerk-react';
import { InfoIcon } from 'lucide-react';
import logo from '@/assets/code-motion.png';

export default function SignInWrapper() {
  return (
    <section className="flex min-h-[calc(100vh-57px)] flex-col items-center justify-center md:flex-row">
      <div className="flex flex-col items-center">
        <div className="hidden flex-col items-center md:flex">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" width={60} />
            <h1 className="text-4xl font-medium">Code Motion</h1>
          </div>
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="design image"
            />
          </div>
        </div>
        <div
          className="mt-4 flex items-center border-l-4 border-blue-300 bg-blue-50 p-4 text-blue-800 dark:border-blue-800 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <InfoIcon />
          <p className="ms-3">Demo Acc | email: test - password: 1234</p>
        </div>
      </div>
      <div className="flex justify-center">
        <SignIn />
      </div>
    </section>
  );
}
