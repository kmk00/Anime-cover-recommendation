import { useState } from "react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar } from "../ui/avatar";
import { Heart } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import type { CharacterEntry, VoiceActor } from "@/types/AnimeDetails";
import LanguageFlag from "./LanguageFlag";

const CharacterCard = ({
  characterData,
}: {
  characterData: CharacterEntry;
}) => {
  const [expanded, setExpanded] = useState(false);
  const { character, role, favorites, voice_actors } = characterData;

  // Group voice actors by language
  const voiceActorsByLanguage: { [key: string]: VoiceActor[] } =
    voice_actors.reduce((acc: { [key: string]: VoiceActor[] }, va) => {
      const language = va.language;
      if (!acc[language]) acc[language] = [];
      acc[language].push(va);
      return acc;
    }, {});

  // Get available languages
  const languages = Object.keys(voiceActorsByLanguage);

  return (
    <Card className="overflow-hidden h-fit transition-all hover:shadow-md gap-2">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-4 items-center">
            <Avatar className="w-24 h-24 rounded-md border">
              <img
                src={character.images.jpg.image_url}
                alt={character.name}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </Avatar>
            <div>
              <CardTitle className="text-lg">{character.name}</CardTitle>
              <CardDescription>
                <Badge variant={role === "Main" ? "default" : "outline"}>
                  {role}
                </Badge>
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Heart size={16} className="fill-rose-500 text-rose-500" />
            <span className="text-xs font-medium text-gray-600">
              {favorites.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        {languages.length === 0 ? (
          <p className="text-sm text-gray-500">No voice actors found</p>
        ) : (
          <Collapsible
            open={expanded}
            onOpenChange={setExpanded}
            className="space-y-2"
          >
            <div className="flex gap-1 mb-2 flex-wrap">
              {languages
                .slice(0, expanded ? languages.length : 3)
                .map((language) => (
                  <LanguageFlag key={language} language={language} />
                ))}
              {!expanded && languages.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{languages.length - 3}
                </Badge>
              )}
            </div>

            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-center w-full py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-md cursor-pointer">
                {expanded ? (
                  <>
                    Show less <ChevronUp size={14} className="ml-1" />
                  </>
                ) : (
                  <>
                    Show voice actors <ChevronDown size={14} className="ml-1" />
                  </>
                )}
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-3">
              <Tabs defaultValue={languages[0]} className="w-full">
                <TabsList className="w-full h-auto flex flex-wrap">
                  {languages.map((language) => (
                    <TabsTrigger
                      key={language}
                      value={language}
                      className="text-xs py-1 px-2 cursor-pointer rounded-md "
                    >
                      {language}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {languages.map((language) => (
                  <TabsContent key={language} value={language} className="mt-2">
                    {voiceActorsByLanguage[language].map((va) => (
                      <div
                        key={va.person.mal_id}
                        className="flex items-center gap-2 py-2"
                      >
                        <Avatar className="h-16 w-16 rounded-full border">
                          <img
                            src={va.person.images.jpg.image_url}
                            alt={va.person.name}
                            className="object-cover w-full h-full"
                            loading="lazy"
                          />
                        </Avatar>
                        <div className="text-sm">{va.person.name}</div>
                      </div>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
