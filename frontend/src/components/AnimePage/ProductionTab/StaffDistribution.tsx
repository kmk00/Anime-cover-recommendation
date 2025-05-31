import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { StaffMember } from "@/types/AnimeDetails";
import { User } from "lucide-react";

const StaffDistribution = ({ staff }: { staff: StaffMember[] | undefined }) => {
  if (!staff || staff.length === 0) {
    return <div>No staff found</div>;
  }

  const staffByPosition = staff.reduce(
    (acc, member) => {
      const position = member.positions[0] || "Unknown";
      if (!acc[position]) {
        acc[position] = [];
      }
      acc[position].push(member);
      return acc;
    },
    {} as Record<string, StaffMember[]>
  );

  // Sort alphabetically by position
  const staffByPositionSorted = Object.entries(staffByPosition).sort(
    ([a], [b]) => a.localeCompare(b)
  );

  return (
    <Card className="h-[600px] md:h-fit overflow-auto">
      <CardHeader>
        <CardTitle className="flex justify-between">
          Staff Distributiona
          <User className="h-4 w-4 mr-2 text-gray-500" />
        </CardTitle>
        <CardDescription>{staff.length} Staff Members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {staffByPositionSorted.map(([position]) => (
            <div key={position} className="flex justify-between items-center">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-500" />
                <span>{position}</span>
              </div>
              <Badge>{staffByPosition[position].length}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffDistribution;
