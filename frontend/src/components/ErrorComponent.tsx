import { cn } from "@/lib/utils";

const ErrorComponent = ({
  errorMesage,
  small,
}: {
  errorMesage?: string;
  small?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center p-8 w-full",
        !small && "h-screen"
      )}
    >
      <img src="/images/error.gif" alt="404" className="w-1/3" />
      <h2 className="text-2xl font-bold">An error occurred</h2>
      <p className="underline">{errorMesage}</p>
    </div>
  );
};

export default ErrorComponent;
