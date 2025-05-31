import { animeApi } from "@/lib/animeApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import CharacterCard from "./CharacterCard";
import scrollToElement from "@/lib/scrolltoElement";
import Loading from "../Loading";
import ErrorComponent from "../ErrorComponent";
import TabHeading from "./TabHeading";

const CharactersTab = ({ animeId }: { animeId: number | string }) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["characters", animeId],
    queryFn: ({ pageParam = 1 }) =>
      animeApi.getCharactersForAnime(animeId, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined;
    },
    initialPageParam: 1,
  });

  // Load more characters on scroll

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Scroll to characters section

  useEffect(() => {
    scrollToElement("tabs-navigation");
  }, []);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <ErrorComponent
        small
        errorMesage={
          error instanceof Error
            ? error.message
            : "Could not fetch characters, try again later"
        }
      />
    );
  }

  if (!data || data.pages[0].data.length === 0) {
    return <ErrorComponent small errorMesage="No characters found" />;
  }

  const allCharacters = data.pages.flatMap((page) => page.data);

  return (
    <main id="characters">
      <TabHeading
        title="Characters"
        subtitle="Learn more about the characters"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {allCharacters.map((charData) => (
          <CharacterCard
            key={`${charData.character.mal_id}-${charData.role}`}
            characterData={charData}
          />
        ))}
      </div>

      <div
        ref={loadMoreRef}
        className="h-10 flex justify-center items-center p-4 mt-2"
      >
        {isFetchingNextPage && (
          <div className="flex items-center gap-2">
            <Loading />
            <span>Loading more...</span>
          </div>
        )}
      </div>
    </main>
  );
};

export default CharactersTab;
