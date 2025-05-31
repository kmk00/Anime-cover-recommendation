import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { VideosData, ImageMeta } from "@/types/AnimeDetails";
import { Play } from "lucide-react";
import { useState } from "react";

const VideosSection = ({ videos }: { videos: VideosData }) => {
  const { promo, music_videos } = videos;

  const [selectedVideo, setSelectedVideo] = useState<{
    embed_url: string;
    title: string;
    meta?: ImageMeta;
  } | null>(null);

  const handleVideoClick = ({
    embed_url,
    title,
    meta,
  }: {
    embed_url: string;
    title: string;
    meta?: ImageMeta;
  }) => {
    setSelectedVideo({ embed_url, title, meta });
  };

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">Videos</h2>

      {selectedVideo && (
        <div className="mb-6">
          <Card className="bg-primary/10 backdrop-blur shadow-xl">
            <CardContent className="p-0">
              <div className="relative pb-[56.25%] overflow-hidden">
                <iframe
                  src={selectedVideo.embed_url}
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                  title="Video Player"
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg">{selectedVideo.title}</h3>
                {selectedVideo.title && selectedVideo.title && (
                  <p className="text-gray-500">
                    {selectedVideo.title}{" "}
                    {selectedVideo.meta?.author &&
                      `by ${selectedVideo.meta.author}`}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="promo">
        <TabsList className=" bg-primary/10 mb-4">
          <TabsTrigger
            className="data-[state=active]:bg-primary mr-2 data-[state=active]:text-white"
            value="promo"
          >
            Trailers
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
            value="music_videos"
          >
            Music Videos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="promo" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {promo.map((item, index) => (
              <Card
                key={index}
                className="bg-primary  backdrop-blur shadow-xl  overflow-hidden  transition-all cursor-pointer"
              >
                <CardContent
                  className="p-0"
                  onClick={() =>
                    handleVideoClick({
                      embed_url: item.trailer.embed_url,
                      title: item.title,
                    })
                  }
                >
                  <div className="relative group">
                    <img
                      src={item.trailer.images.large_image_url}
                      alt={item.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="rounded-full bg-blue-600 p-3">
                        <Play size={24} />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-slate-100">{item.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
            {!promo.length && <p>No trailers found</p>}
          </div>
        </TabsContent>

        <TabsContent value="music_videos" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {music_videos.map((item, index) => (
              <Card
                key={index}
                className="bg-slate-900 border-slate-800 overflow-hidden hover:border-slate-700 transition-all cursor-pointer"
              >
                <CardContent
                  className="p-0"
                  onClick={() =>
                    handleVideoClick({
                      embed_url: item.video.embed_url,
                      title: item.title,
                      meta: item.meta,
                    })
                  }
                >
                  <div className="relative group">
                    <img
                      src={item.video.images.large_image_url}
                      alt={item.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="rounded-full bg-blue-600 p-3">
                        <Play size={24} />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-slate-100">{item.title}</h3>
                    <p className="text-sm text-slate-400">
                      {item.meta.title} by {item.meta.author}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {!music_videos.length && <p>No music videos found</p>}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default VideosSection;
