import AnimePage from "@/components/AnimePage/AnimePage";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { animeApi } from "@/lib/animeApi";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/ErrorComponent";

export const Route = createFileRoute("/anime/$animeId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { animeId } = Route.useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["anime", animeId],
    queryFn: () => animeApi.getAnimeInfoAll(animeId),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center p-8 w-full h-screen">
        <Loading />
        <p>Loading...</p>
      </div>
    );
  }
  if (isError) {
    return <ErrorComponent errorMesage={error.message} />;
  }

  if (!data) {
    return <ErrorComponent errorMesage="No data found" />;
  }

  return <AnimePage animeDetails={data.data} />;
}
