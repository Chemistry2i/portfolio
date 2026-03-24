import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="text-center relative z-10 px-4">
        <div className="text-8xl sm:text-9xl font-bold gradient-text mb-2">404</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-md mx-auto">
          Looks like you've wandered into uncharted territory. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
          >
            <i className="fas fa-home" />
            Back to Home
          </Link>
          <Link
            to="/blog"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors inline-flex items-center justify-center gap-2"
          >
            <i className="fas fa-book" />
            Read Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
