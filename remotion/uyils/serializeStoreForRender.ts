import { useVideoStoryStore } from "../../store/useVideoStoryStore";

export const serializeStoreForRender = () => {
  const store = useVideoStoryStore.getState();
  
  return {
    hook: store.hook,
    story: store.story,
    audioUrl: store.audioUrl,
    videoUrl: store.videoUrl?.url,
    highlightColor: store.highlightColor || "#FF4500",
    captionsPath: store.captionsPath,
  };
};

// For CLI rendering - extracts data and creates props object
export const createRenderProps = async (captionsPath: string) => {
  const fs = await import("fs");
  const path = await import("path");
  
  const absolutePath = path.resolve(process.cwd(), captionsPath);
  const captions = JSON.parse(fs.readFileSync(absolutePath, "utf-8"));
  
  // You can either read from a JSON file or pass this data directly
  return {
    captions,
    audioUrl: "/audios/story-1769672701663_16k.wav",
    hook: "My sister is getting married in a dress I designed for myself and I don't know what to do",
    highlightColor: "#FF4500",
  };
};