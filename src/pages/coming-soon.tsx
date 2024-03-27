import { NavLink } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';

const ComingSoon = () => {
  return (
    <main className="flex min-h-[calc(100vh-57px)] flex-col items-center justify-center">
      <span role="img" aria-label="Crying Face" className="mb-4 text-5xl">
        🧩
      </span>
      <h1 className="animate-pulse text-3xl font-semibold"> Coming Soon</h1>
      <p className="text-sm text-muted-foreground">
        We are Almost there. Stay tuned!
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

export default ComingSoon;
