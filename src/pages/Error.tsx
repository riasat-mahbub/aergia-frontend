import Spinner from "@/components/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Error() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl mb-4"></div>
      <h1 className="text-2xl font-bold mb-4">Oops! It seems you encountered an unexpected error.</h1>
      <Spinner />
      <p className="mt-4 text-gray-600">Redirecting you to the Homepage...</p>
    </div>
  );
}
