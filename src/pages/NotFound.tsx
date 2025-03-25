
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import GlassCard from "@/components/GlassCard";
import CustomButton from "@/components/CustomButton";
import SakuraBackground from "@/components/SakuraBackground";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      <SakuraBackground petalsCount={10} />
      
      <div className="absolute top-6 left-6 z-10">
        <Logo />
      </div>
      
      <GlassCard className="text-center max-w-md w-full z-10 animate-scale-in">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
        <CustomButton asChild>
          <Link to="/">Return to Home</Link>
        </CustomButton>
      </GlassCard>
    </div>
  );
};

export default NotFound;
