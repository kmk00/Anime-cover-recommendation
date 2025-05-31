import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRecommendationsStore } from "@/store/recommendations";
import type { AnimeRecommendationsDataResponse } from "@/types/Recommendations";

const ImageUploader = () => {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { setRecommendations } = useRecommendationsStore();

  const analyzeCoverMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("cover", file);
      try {
        return axios.post<AnimeRecommendationsDataResponse>(
          `${import.meta.env.VITE_BACKEND_API}/recommend`,
          formData
        );
      } catch (e) {
        setError("Failed to upload image");
      }
    },
    onSuccess: (data) => {
      if (!data) {
        setError("Failed to upload image");
        return;
      }
      setRecommendations(data.data.results);
      setError(null);
    },
    onError: () => {
      setError("Failed to upload image");
    },
  });

  // "/images/placeholder.jpg"
  const handleImageUpload = (file: File | null) => {
    if (file === null) return;
    setImage(file);
    analyzeCoverMutation.mutate(file);
  };

  const handleSetPreview = (file: File | undefined) => {
    if (file === undefined) {
      setError("Please upload an image file");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type.toLowerCase())) {
      setError("Only JPG, PNG, and WebP images are supported");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setError(null);
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetImage = () => {
    setRecommendations([]);
    setImage(null);
    setImagePreview(null);
    setError(null);
  };

  if (imagePreview) {
    return (
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-center">Analyze your image</h2>
        <div className="mx-auto w-[300px]">
          <div className="flex justify-center items-center p-2">
            <div className="w-[300px] relative overflow-hidden rounded-md ">
              {analyzeCoverMutation.isPending && (
                <div className="absolute top-0 left-0 w-full h-full bg-primary/40 animate-pulse" />
              )}
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex gap-4 mx-2">
            <Button
              className="flex-1 cursor-pointer"
              onClick={() => handleImageUpload(image)}
            >
              {analyzeCoverMutation.isPending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                "Analyze"
              )}
            </Button>
            <Button
              variant="outline"
              className="flex-1 cursor-pointer"
              onClick={resetImage}
            >
              Reset
            </Button>
          </div>
          <div className="mt-2">
            {error && (
              <p className="text-red-500 bg-black/80 rounded-md p-2 text-center">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-center">Upload an image</h2>
      <form className="lg:w-[400px] w-[300px] mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 group">
            <label id="imageLabel" htmlFor="image" className="p-2 ">
              {/* select id and use it and hover */}
              <div
                className={cn(
                  "flex flex-col items-center justify-center gap-2 border-dashed border-2 [&:hover]:border-primary rounded-md p-8 relative cursor-pointer min-h-[400px] lg:min-h-[700px] bg-[url('/images/file-upload.webp')] bg-cover bg-bottom bg-no-repeat  [&:hover]:bg-[url('/images/file-upload2.webp')] [&:hover]:bg-primary/15 transition-all duration-100"
                )}
              >
                {error && (
                  <p className="text-red-500 bg-black/80  rounded-md p-2">
                    {error}
                  </p>
                )}
                <div className="bg-blue-500 z-10 rounded-md p-2 absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
              </div>
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => handleSetPreview(e.target.files?.[0])}
              className="hidden"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ImageUploader;
