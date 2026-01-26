import { create } from "zustand";
import { BackgroundVideo } from "@/types/bg-video";

type VideoStoryState = {
  hook: string;
  story: string;
  audioUrl: string;
  videoUrl: BackgroundVideo | null;
  highlightColor: string;

  setHook: (hook: string) => void;
  setStory: (story: string) => void;
  setAudioUrl: (url: string) => void;
  setVideoUrl: (video: BackgroundVideo | null) => void;
  setHighlightColor: (color: string) => void;
  reset: () => void;
};

export const useVideoStoryStore = create<VideoStoryState>((set) => ({
  hook: "",
  story: "",
  audioUrl: "",
  videoUrl: null,
  highlightColor: "",

  setHook: (hook) => set({ hook }),
  setStory: (story) => set({ story }),
  setAudioUrl: (audioUrl) => set({ audioUrl }),
  setVideoUrl: (videoUrl) => set({ videoUrl }),
  setHighlightColor: (highlightColor) => set({ highlightColor }),

  reset: () =>
    set({
      hook: "",
      story: "",
      audioUrl: "",
      videoUrl: null,
      highlightColor: "",
    }),
}));
