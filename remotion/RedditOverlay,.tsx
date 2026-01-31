import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Heart, Share, VerifiedIcon } from "lucide-react";

const BADGE_DATA = [
  {
    id: 1,
    name: "Silver",
    url: "https://www.redditstatic.com/gold/awards/icon/silver_32.png",
    count: 5,
  },
  {
    id: 2,
    name: "Gold",
    url: "https://www.redditstatic.com/gold/awards/icon/gold_32.png",
    count: 2,
  },
  {
    id: 3,
    name: "Platinum",
    url: "https://www.redditstatic.com/gold/awards/icon/platinum_32.png",
    count: 1,
  },
];

const RedditOverlay = ({ hook }: { hook: string }) => {
  return (
    <Card className="max-w-full border-none shadow-lg bg-white overflow-hidden rounded-4xl">
      <CardHeader className="flex flex-row items-start gap-3 space-y-0 p-4 pb-2">
        <div className="relative">
          <Avatar className="w-25 h-25 border-none">
            <AvatarImage
              src="https://www.logo.wine/a/logo/Reddit/Reddit-Logomark-White-Dark-Background-Logo.wine.svg"
              alt="AskReddit"
              className="bg-[#FF4500] p-1.5"
            />
          </Avatar>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="font-extrabold text-[42px] text-zinc-900">
              AskReddit
            </span>
            <span className="flex size-10 items-center justify-center rounded-full bg-background">
              <VerifiedIcon className="size-full fill-blue-500 text-white" />
            </span>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            {BADGE_DATA.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-1 p-1 rounded cursor-help"
                title={badge.name}
              >
                <img
                  src={badge.url}
                  alt={badge.name}
                  className="w-12 h-12 object-contain"
                />
                <span className="text-3xl font-bold text-gray-500">
                  {badge.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 py-2">
        <h1 className="text-[42px] font-extrabold leading-[1.2] text-zinc-900 tracking-tight">
          {hook}
        </h1>
      </CardContent>

      <CardFooter className="flex justify-between items-center px-4 py-4 mt-2">
        <div className="flex items-center gap-2 text-zinc-400 group cursor-pointer">
          <Heart className="w-12 h-12 stroke-[1.5px]" />
          <span className="text-xl font-medium">99+</span>
        </div>

        <div className="flex items-center gap-2 text-zinc-400 group cursor-pointer">
          <Share className="w-12 h-12 stroke-[1.5px]" />
          <span className="text-xl font-medium">99+</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RedditOverlay;