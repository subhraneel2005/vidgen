"use client"

import { backgroundVideosData } from '@/lib/bg-stock-data'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import { Check } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useVideoStoryStore } from '@/store/useVideoStoryStore'

export default function ChooseBGVideo() {

    const { videoUrl, setVideoUrl } = useVideoStoryStore();


    return (

        <div className='w-full max-w-4xl border border-border rounded-lg py-4 px-8 justify-center items-center flex-1 bg-secondary'>
            <span className='font-bold tracking-tight text-2xl'>Choose background video</span>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mt-4'>
                {backgroundVideosData.map((video) => (
                    <span key={video.id} className='space-y-2 mt-2'>
                        <Label className="flex items-center text-md ml-2">
                            <span>{video.title}</span>

                        </Label>
                        <video onClick={() => setVideoUrl(video)} src={video.url} className={cn("rounded-lg border-2", videoUrl?.id == video.id ? "ring-2 ring-primary ring-offset-2" : "border-border")} controls />
                    </span>
                ))}
            </div>
        </div>
    )
}

