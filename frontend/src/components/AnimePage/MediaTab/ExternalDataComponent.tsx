import { animeApi } from "@/lib/animeApi";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../ui/button";
import Loading from "@/components/Loading";
import { ExternalLink } from "lucide-react";

const ExternalDataComponent = ({ animeId }: { animeId: string | number }) => {
  const {
    data: externalData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["external", animeId],
    queryFn: () => animeApi.getExternalInfo(animeId),
  });

  if (isLoading) return <Loading />;

  if (isError) return <div>Error: {error.message}</div>;

  if (!externalData || externalData.data.length === 0) return null;

  return (
    <div>
      <div className="">
        <h2 className="text-xl font-bold mb-4 ">External Links</h2>
        <ul className="flex gap-4 flex-wrap ">
          {externalData.data.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <Button className="cursor-pointer" variant="default">
                  {link.name}
                  <ExternalLink size={16} />
                </Button>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExternalDataComponent;
