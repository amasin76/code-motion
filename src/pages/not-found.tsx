import { NavLink } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';

const NotFound = () => {
  return (
    <main className="flex min-h-[calc(100vh-57px)] flex-col items-center justify-center">
      <h1 className="mb-4 text-5xl font-bold">
        4
        <span role="img" aria-label="Crying Face">
          😢
        </span>
        4
      </h1>
      <h1 className="text-3xl font-semibold">Oops! Page not found</h1>
      <p className="text-sm text-muted-foreground">
        We are sorry, but the page you requested was not found
      </p>
      <NavLink
        to="/"
        className={`mt-12 ${buttonVariants({ variant: 'secondary' })}`}
      >
        Back to Home
      </NavLink>
    </main>
  );
};

export default NotFound;
