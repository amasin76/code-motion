import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { ModeToggle } from '@/components/mode-toggle';

import fallbackRender from './fallback';
import { Header } from './header';

const LayoutComponent = () => {
  return (
    <div className="h-full w-full">
      <Header />
      <div className="flex flex-col">
        <ErrorBoundary fallbackRender={fallbackRender}>
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <span>Loading...</span>
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
    </div>
  );
};

export default LayoutComponent;
