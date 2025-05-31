import scrollToElement from "@/lib/scrolltoElement";
import { Card, CardContent } from "../ui/card";
import TabHeading from "./TabHeading";
import { cn } from "@/lib/utils";

interface OverviewTabProps {
  overview: string;
}

const OverviewTab = ({ overview }: OverviewTabProps) => {
  if (!overview || overview.trim() === "")
    return (
      <main id="overview">
        <TabHeading title="Overview" subtitle="Learn more about this anime" />
        <Card>
          <CardContent>No overview found</CardContent>
        </Card>
      </main>
    );

  scrollToElement("tabs-navigation");

  const paragraphs = overview.split("\n").map((para, index) => (
    <p
      className={cn({
        "mb-2": index !== overview.split("\n").length - 1,
        "italic text-slate-600 text-sm":
          index === overview.split("\n").length - 1,
      })}
      key={index}
    >
      {para}
    </p>
  ));

  return (
    <main id="overview">
      <TabHeading title="Overview" subtitle="Learn more about this anime" />
      <Card>
        <CardContent>{paragraphs}</CardContent>
      </Card>
    </main>
  );
};

export default OverviewTab;
