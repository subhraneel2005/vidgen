"use client";

import { useVideoStoryStore } from "@/store/useVideoStoryStore";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { generateCaptions } from "@/remotion/scripts/generate-captions";

export default function GenerateCaptions() {
    const { audioUrl, setCaptionsPath, captionsPath } = useVideoStoryStore();
    const [loading, setLoading] = useState(false);

    const handleGenerateCaptions = async () => {
        if (!audioUrl) {
            toast.error("Generate audio first");
            return;
        }

        setLoading(true);
        try {
            const { captionsPath } = await generateCaptions(`public/${audioUrl}`);
            setCaptionsPath(captionsPath);
        } catch {
            toast.error("Failed to generate captions");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-xl border border-border rounded-lg p-4 bg-secondary">
            <span className="font-bold text-2xl">Generate captions</span>

            {audioUrl ? (
                <Button
                    onClick={handleGenerateCaptions}
                    disabled={loading}
                    className="mt-3"
                >
                    {loading ? "Generating..." : "Generate Captions"}
                </Button>
            ) : (
                <p className="text-yellow-500 mt-3">Generate audio first</p>
            )}

            {captionsPath && (
                <p className="mt-2 text-sm text-green-500">
                    Captions saved at: {captionsPath}
                </p>
            )}
        </div>
    );
}
