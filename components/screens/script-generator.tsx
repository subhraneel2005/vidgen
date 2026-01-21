"use client"

import { genreSchema } from '@/types/storyGenre'
import React, { useState } from 'react'
import { Button } from '../ui/button';
import z from 'zod';

const genres = genreSchema.options;

export default function ScriptGenerator() {

    const [selectedGenre, setSelectedGenre] = useState<z.infer<typeof genreSchema> | null>(null)

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
        </div>
    )
}           
