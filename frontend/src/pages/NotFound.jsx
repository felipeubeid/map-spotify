import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <FaExclamationTriangle className="text-5xl text-foreground mb-4 block mx-auto" />
        <h1 className="text-4xl text-foreground font-semibold mb-4">404</h1>
        <p className="text-xl text-foreground font-semibold mb-8">Page not found</p>
        <a
          href="/"
          className="px-8 py-4 bg-green text-background font-semibold rounded-full hover:bg-accent/90 
          transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
