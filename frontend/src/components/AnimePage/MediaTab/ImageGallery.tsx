import scrollToElement from "@/lib/scrolltoElement";
import type { AnimeImageFormats } from "@/types/AnimeDetails";
import { useState } from "react";

const ImageGallery = ({ pictures }: { pictures: AnimeImageFormats[] }) => {
  scrollToElement("media");

  if (!pictures || !pictures.length) return null;

  const [selectedImage, setSelectedImage] = useState<string>(
    pictures[0].webp.large_image_url
  );

  const handleImageClick = (path: string) => {
    setSelectedImage(path);
  };

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">Image Gallery</h2>
      <div className="grid md:grid-cols-[300px_1fr] gap-4">
        <div className="rounded-lg justify-self-center overflow-hidden max-w-[400px] shadow-lg h-fit">
          <img
            src={selectedImage}
            alt="Anime cover"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] h-fit gap-2">
          {pictures.map((picture, index) => (
            <div
              key={index}
              className={`cursor-pointer h-20 w-20 rounded-md overflow-hidden border-2 ${selectedImage === picture.webp.large_image_url ? "border-blue-500" : "border-transparent"}`}
              onClick={() => handleImageClick(picture.webp.large_image_url)}
            >
              <img
                src={picture.webp.small_image_url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
