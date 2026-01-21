"use client"

import { backgroundVideosData } from '@/lib/bg-stock-data'
import { Label } from '../ui/label'
import { useState } from 'react'
import { BackgroundVideo } from '@/types/bg-video'
import { cn } from '@/lib/utils'
import { Check } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export default function ChooseBGVideo() {

    const [selectedBGVideo, setSelectedBGVideo] = useState<BackgroundVideo | null>(null)


    return (

        <div className='w-full max-w-xl border border-border rounded-lg py-4 px-8 justify-center items-center flex-1 bg-secondary'>
            <span className='font-bold tracking-tight text-2xl'>Choose background video</span>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
                {backgroundVideosData.map((video) => (
                    <span key={video.id} className='space-y-2 mt-2'>
                        <Label className="flex items-center text-md ml-2">
                            <span>{video.title}</span>
                            {selectedBGVideo?.id === video.id && (
                                <HugeiconsIcon icon={Check} className="w-6 h-6 text-green-500" />
                            )}
                        </Label>
                        <video onClick={() => setSelectedBGVideo(video)} src={video.url} className={cn("rounded-lg border-2", selectedBGVideo?.id == video.id ? "border-green-500" : "border-border")} controls />
                    </span>
                ))}
            </div>
        </div>
    )
}

