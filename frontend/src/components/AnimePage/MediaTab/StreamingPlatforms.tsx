import { Button } from "@/components/ui/button";
import type { AnimeStreamingPlatform } from "@/types/AnimeDetails";
import { ExternalLink } from "lucide-react";

const StreamingPlatforms = ({
  streaming,
}: {
  streaming: AnimeStreamingPlatform[];
}) => {
  if (!streaming || streaming.length === 0) {
    return null;
  }

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">Watch On</h2>
      <div className="flex flex-wrap gap-3">
        {streaming.map((platform, index) => (
          <a
            key={index}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="flex items-center space-x-2 cursor-pointer">
              <span>{platform.name}</span>
              <ExternalLink size={16} />
            </Button>
          </a>
        ))}
      </div>
    </section>
  );
};

export default StreamingPlatforms;
