import React from 'react'
import { testAudioGenerator } from './actions'

export default async function Page() {
    const audio = await testAudioGenerator()
  return (
    <div>
      <h2 className='text-xl font-bold tracking-[-1.2px]'>Audio generated</h2>
      <audio controls src={audio.url}>
        your browser doesn&apos;t support the audio element
      </audio>
      <span>format: {audio.format}</span>
      <span>mediatype: {audio.mediaType}</span>
    </div>
  )
}
