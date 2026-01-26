"use client";

import { HIGHLIGHT_COLORS } from "@/lib/highlight-colors";
import { useVideoStoryStore } from "@/store/useVideoStoryStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PREVIEW_TEXT = "THIS IS HOW IT LOOKS";

export default function ChooseHighlightColor() {
    const { highlightColor, setHighlightColor } = useVideoStoryStore();

    return (
        <div className="w-full max-w-4xl rounded-lg border border-border bg-secondary p-4">
            <span className="text-2xl font-bold tracking-tight">
                Choose highlight color
            </span>

            {/* Grid */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {HIGHLIGHT_COLORS.map((color) => {
                    const isSelected = highlightColor === color.hex;

                    return (
                        <Button
                            key={color.hex}
                            variant="ghost"
                            onClick={() => setHighlightColor(color.hex)}
                            className={cn(
                                "relative h-20 w-full rounded-lg border border-border",
                                "flex items-center justify-center",
                                isSelected && "ring-2 ring-primary ring-offset-2"
                            )}
                        >
                            {/* Text preview */}
                            <span
                                className="rounded-[14px] px-4 py-2 text-lg font-black uppercase tracking-tight text-white"
                                style={{
                                    backgroundColor: color.hex,
                                    textShadow: `
                    -2px -2px 0 #000,
                    2px -2px 0 #000,
                    -2px  2px 0 #000,
                    2px  2px 0 #000
                  `,
                                }}
                            >
                                {PREVIEW_TEXT}
                            </span>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
