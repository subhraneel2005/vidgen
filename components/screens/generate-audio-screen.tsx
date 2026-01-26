"use client"

import { generateAudio } from '@/app/actions/generate-audio';
import { useState } from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { useVideoStoryStore } from '@/store/useVideoStoryStore';
import { Alert } from '../ui/alert';

export default function GenerateAudio() {

    const [loading, setLoading] = useState(false);

    const { setAudioUrl, audioUrl, story } = useVideoStoryStore();

    const handleGenerateAudio = async () => {
        setLoading(true);
        if (!story) {
            toast.error("No story generated!");
            setLoading(false);
            return;
        }

        try {
            const res = await generateAudio(story);
            setAudioUrl(res.audio.url);

        } catch (err) {
            console.error(err);
            toast.error("Failed to generate audio");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full max-w-xl border border-border rounded-lg p-4 justify-center items-center flex-1 bg-secondary'>
            <span className='font-bold tracking-tight text-2xl'>Generate audio</span>

            {story ? <Button onClick={handleGenerateAudio} disabled={loading} className="flex justify-center mt-2">
                {loading ? "Generating..." : "Generate Audio"}
            </Button> : <Alert variant={"destructive"} className='mt-2'>Generate script first</Alert>}

            {audioUrl && (
                <audio className="mt-4 w-full" controls src={audioUrl} />
            )}
        </div>
    )
}
