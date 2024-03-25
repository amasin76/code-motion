import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { ModeToggle } from '@/components/mode-toggle';
import { Spinner } from '@/components/ui/Spinner';

import fallbackRender from './fallback';
import { Header } from './header';

const clerkPubKey = import.meta.env.VITE_AUTH;

if (!clerkPubKey) {
  throw new Error('Missing publishable key!');
}

const LayoutComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full">
      <ClerkProvider navigate={navigate} publishableKey={clerkPubKey}>
        <Header />
        <div className="flex flex-col">
          <ErrorBoundary fallbackRender={fallbackRender}>
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <span>
                    <Spinner />
                  </span>
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </ErrorBoundary>
          <div className="fixed bottom-2 right-2">
            <ModeToggle />
          </div>
        </div>
      </ClerkProvider>
    </div>
  );
};

export default LayoutComponent;
