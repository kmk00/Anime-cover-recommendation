import { animeApi } from "@/lib/animeApi";
import { useQuery } from "@tanstack/react-query";
import ImageGallery from "./ImageGallery";
import StreamingPlatforms from "./StreamingPlatforms";
import VideosSection from "./VideosSection";
import ExternalDataComponent from "./ExternalDataComponent";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/ErrorComponent";
import TabHeading from "../TabHeading";
import scrollToElement from "@/lib/scrolltoElement";

const MediaTab = ({ animeId }: { animeId: string | number }) => {
  const {
    data: animeData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["media", animeId],
    queryFn: () => animeApi.getAllMedia(animeId),
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <ErrorComponent
        errorMesage={` An error loading media: ${error.message}`}
        small
      />
    );
  }

  if (!animeData) {
    return <ErrorComponent errorMesage="No media found" small />;
  }

  const { pictures, streaming, videos } = animeData;

  scrollToElement("tabs-navigation");

  return (
    <main>
      <TabHeading title="Media" subtitle="Images, videos and streaming links" />
      <div className="md:grid grid-cols-[4fr_1fr] gap-4">
        <ImageGallery pictures={pictures.data} />

        <StreamingPlatforms streaming={streaming.data} />
      </div>

      <VideosSection videos={videos.data} />

      <ExternalDataComponent animeId={animeId} />
    </main>
  );
};

export default MediaTab;
