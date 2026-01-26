"use client"

import { Genre, genreSchema } from '@/types/storyGenre'
import { useState } from 'react'
import { Button } from '../ui/button';
import { generateStory } from '@/app/actions/generate-script';
import { toast } from 'sonner';
import { useVideoStoryStore } from '@/store/useVideoStoryStore';

const genres = genreSchema.options;

export default function ScriptGenerator() {

    const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
    const [loading, setLoading] = useState(false);

    const { setHook, setStory, hook, story } = useVideoStoryStore();

    const handleGenerateScript = async () => {

        setStory("");
        setHook("");

        setLoading(true);
        if (!selectedGenre) {
            toast.error("Please select a genre to continue");
            setLoading(false);
            return
        }

        try {
            const res = await generateStory(selectedGenre);

            setStory(res.story);
            setHook(res.hook);

        } catch (err) {
            console.error("generateScript failed", err);
            toast.error("Failed to generate story. Try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full max-w-xl border border-border rounded-lg p-4 justify-center items-center flex-1 bg-secondary'>
            <span className='font-bold tracking-tight text-2xl'>Pick genre</span>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-4'>
                {genres.map((genre, _id) => (
                    <Button variant={selectedGenre === genre ? "default" : "outline"} key={_id} onClick={() => setSelectedGenre(genre)}>
                        {genre}
                    </Button>
                ))}
            </div>

            <Button
                className="mt-4 flex justify-center"
                onClick={handleGenerateScript}
                disabled={loading}>
                {loading ? "Generating..." : "Generate Story"}
            </Button>

            {story && hook && (
                <div className="mt-6 space-y-4">
                    {/* Hook */}
                    <div className="rounded-lg border border-border bg-background p-4">
                        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Hook
                        </div>
                        <p className="text-sm leading-relaxed">
                            {hook}
                        </p>
                    </div>

                    {/* Script */}
                    <div className="rounded-lg border border-border bg-background p-4">
                        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Script
                        </div>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">
                            {story}
                        </p>
                    </div>
                </div>
            )}

        </div>
    )
}           
