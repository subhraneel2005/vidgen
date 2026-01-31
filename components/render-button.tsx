'use client';

import { useVideoStoryStore } from '@/store/useVideoStoryStore';
import { useState } from 'react';
import { Button } from './ui/button';

export function RenderButton() {
    const [isRendering, setIsRendering] = useState(false);
    const getRenderData = useVideoStoryStore(state => state.getRenderData);

    const handleRender = async () => {
        setIsRendering(true);

        // get plain json from zustand
        const renderData = getRenderData();

        // send to /api/render-video
        const response = await fetch('/api/render-video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(renderData) // <-- this is plain json data no zustand
        });

        const result = await response.json();
        console.log('Video rendered:', result.videoPath);

        setIsRendering(false);
    };

    return (
        <Button onClick={handleRender} disabled={isRendering}>
            {isRendering ? 'Rendering...' : 'Generate Final Video'}
        </Button>
    );
}