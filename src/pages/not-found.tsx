import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">
        4
        <span role="img" aria-label="Crying Face">
          😢
        </span>
        4
      </h1>
      <p className="text-base leading-loose ">Page not found.</p>
      <NavLink to="/" className="mt-10">
        <Button variant="secondary">Go Back to Home</Button>
      </NavLink>
    </div>
  );
};

export default NotFound;
