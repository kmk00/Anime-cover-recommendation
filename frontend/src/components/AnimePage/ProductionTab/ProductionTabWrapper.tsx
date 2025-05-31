import { useQuery } from "@tanstack/react-query";
import ProductionTab from "./ProductionTab";
import { animeApi } from "@/lib/animeApi";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/ErrorComponent";

const ProductionTabWrapper = ({ animeId }: { animeId: string | number }) => {
  const {
    data: productionDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productionDetails", animeId],
    queryFn: () => animeApi.getProductionDeteails(animeId),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorComponent
        errorMesage="Error loading production details, try again later."
        small
      />
    );
  }

  const episodes = productionDetails?.episodes.data;
  const staff = productionDetails?.staff.data;

  return <ProductionTab episodes={episodes} staff={staff} />;
};

export default ProductionTabWrapper;
