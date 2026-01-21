import { backgroundVideoSchema } from "@/types/bg-video";
import z from "zod";

export const backgroundVideosData = z.array(backgroundVideoSchema).parse([
    {
        id: 1,
        url: "https://res.cloudinary.com/dvqafp9v0/video/upload/v1769025534/minecraft-parkour-1_btxbpa.mp4",
        title: "minecraft-parkour-1"
    },
    {
        id: 2,
        url: "https://res.cloudinary.com/dvqafp9v0/video/upload/v1769025840/minecraft-parkour-2_z75oy8.mp4",
        title: "minecraft-parkour-2"
    },
    {
        id: 3,
        url: "https://res.cloudinary.com/dvqafp9v0/video/upload/v1769026727/minecraft-parkour-3_nmbakd.mp4",
        title: "minecraft-parkour-3"
    },
    {
        id: 4,
        url: "https://res.cloudinary.com/dvqafp9v0/video/upload/v1769027384/minecraft-parkour-4_pfxiwe.mp4",
        title: "minecraft-parkour-4"
    },
])