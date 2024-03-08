import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { ModeToggle } from '@/components/mode-toggle';

import fallbackRender from './fallback';
import { Header } from './header';

const LayoutComponent = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex flex-col">
        <ErrorBoundary fallbackRender={fallbackRender}>
          <Suspense
            fallback={
              <div className="w-full h-full flex justify-center items-center">
                <span>Loading...</span>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
        <div className="fixed bottom-4 right-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default LayoutComponent;
