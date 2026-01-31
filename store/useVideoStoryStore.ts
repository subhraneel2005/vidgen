import { create } from "zustand";
import { BackgroundVideo } from "@/types/bg-video";
import { persist } from "zustand/middleware";
// REMOVED: import fs from "fs"
// REMOVED: import { Caption } from "@remotion/captions";

interface RenderFinalVideoProps {
  hook: string;
  story: string;
  audioUrl: string;
  videoUrl: string;
  highlightColor: string;
  captionsPath: string; 
}

type VideoStoryState = {
  hook: string;
  story: string;
  audioUrl: string;
  videoUrl: BackgroundVideo | null;
  highlightColor: string;
  captionsPath: string;

  setHook: (hook: string) => void;
  setStory: (story: string) => void;
  setAudioUrl: (url: string) => void;
  setVideoUrl: (video: BackgroundVideo | null) => void;
  setHighlightColor: (color: string) => void;
  setCaptionsPath: (path: string) => void;
  getRenderData: () => RenderFinalVideoProps;
  reset: () => void;
};

export const useVideoStoryStore = create<VideoStoryState>()(
  persist(
    (set, get) => ({
      hook: "",
      story: "",
      audioUrl: "",
      videoUrl: null,
      highlightColor: "",
      captionsPath: "",

      setHook: (hook) => set({ hook }),
      setStory: (story) => set({ story }),
      setAudioUrl: (audioUrl) => set({ audioUrl }),
      setVideoUrl: (videoUrl) => set({ videoUrl }),
      setHighlightColor: (highlightColor) => set({ highlightColor }),
      setCaptionsPath: (path) => set({ captionsPath: path }),

      getRenderData: (): RenderFinalVideoProps => {
        const state = get();

        return {
          hook: state.hook,
          story: state.story,
          audioUrl: state.audioUrl,
          videoUrl: state.videoUrl?.url || "",
          highlightColor: state.highlightColor,
          captionsPath: state.captionsPath, 
        };
      },

      reset: () =>
        set({
          hook: "",
          story: "",
          audioUrl: "",
          videoUrl: null,
          highlightColor: "",
          captionsPath: "",
        }),
    }),
    {
      name: "final-render-data",
    }
  )
);