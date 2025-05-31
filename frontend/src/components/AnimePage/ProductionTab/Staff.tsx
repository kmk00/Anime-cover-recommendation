import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import scrollToElement from "@/lib/scrolltoElement";

import type { StaffMember } from "@/types/AnimeDetails";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useState } from "react";

const Staff = ({ staff }: { staff: StaffMember[] | undefined }) => {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(
    "Director"
  );

  const handlePositionClick = (position: string) => {
    setSelectedPosition(position);
  };

  if (!staff || staff.length === 0) {
    return <div>No staff found</div>;
  }

  // Group staff members by their positions
  const staffPositionsArray: string[] = [];

  staff.forEach((member) => {
    member.positions.forEach((position) => {
      if (!staffPositionsArray.includes(position)) {
        staffPositionsArray.push(position);
      }
    });
  });

  // Filter out the selected position
  const filteredStaff = selectedPosition
    ? staff.filter((member) => member.positions.includes(selectedPosition))
    : staff;

  // Sort the positions alphabetically
  staffPositionsArray.sort((a, b) => a.localeCompare(b));

  scrollToElement("tabs-navigation");

  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-[auto_minmax(0,_1fr)_minmax(0,_300px)] gap-6">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">
          Staff Members - {selectedPosition}
        </h2>
        <div className="space-y-4 h-[700px] px-1 md:h-full overflow-y-auto">
          {filteredStaff ? (
            filteredStaff.map((member, index) => (
              <Card key={index} className="overflow-hidden gap-2">
                <CardHeader>
                  <div className="flex items-center flex-wrap gap-y-2">
                    <Avatar className="mr-4 w-16 h-16">
                      <AvatarImage
                        src={member.person.images.jpg.image_url}
                        alt={member.person.name}
                        className="object-cover"
                      />
                      <AvatarFallback>{member.person.name}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{member.person.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 ">
                    {member.positions.map((position, index) => (
                      <button
                        key={index}
                        onClick={() => handlePositionClick(position)}
                        className="cursor-pointer"
                      >
                        <Badge>{position}</Badge>
                      </button>
                    ))}
                  </div>
                  <a
                    href={member.person.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Badge className="mt-2" variant="outline">
                      See more
                    </Badge>
                  </a>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center p-6">
              No staff found for the selected position
            </div>
          )}
        </div>
      </div>
      <div className="md:col-span-1 ">
        <h2>Positions list</h2>
        <div className="flex flex-wrap gap-2">
          {staffPositionsArray.map((position, index) => (
            <div key={index} className="flex w-fit">
              <button
                onClick={() => handlePositionClick(position)}
                className="cursor-pointer "
              >
                <Badge className="mb-2">{position}</Badge>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Staff;
