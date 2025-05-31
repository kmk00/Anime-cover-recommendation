import { cn } from "@/lib/utils";

const Loading = ({ dark }: { dark?: boolean }) => {
  return (
    // Make white
    <div className="flex justify-center items-center p-8">
      <div
        className={cn(
          "animate-spin rounded-full h-16 w-16  border-b-2",
          dark ? "border-white" : "border-black"
        )}
      ></div>
    </div>
  );
};

export default Loading;
