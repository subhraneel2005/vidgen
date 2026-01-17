# Vidgen

![node-version](https://img.shields.io/badge/node-%3E%3D18.17.0-brightgreen)
![issues](https://img.shields.io/github/issues/subhraneel2005/vidgen)
![license](https://img.shields.io/badge/license-mit-blue)
![build](https://img.shields.io/badge/build-passing-brightgreen)
![pnpm](https://img.shields.io/badge/package%20manager-pnpm-yellow)

## description

create viral tiktoks/reels/shorts easily with single prompt with subtitles all in one single browser

vidgen is a modern media web application built with next.js and typescript. it is made for working with audio, video, and creating custom compositions. it is modular, extendable and provides reusable components for simple and fast development.

this application streamlines media workflows. you can generate videos, work with audio, and use advanced video rendering through integration with remotion.

## tech stack

- next.js
- remotion
- openai whisper
- shadcn
- tailwindcss

## features

- web-based media processing
- reusable and consistent ui components
- video composition and rendering tools
- modern fast development stack

## high level architecture for initial prototype
  
  ### flow 1 focuses on script generation module using ai-sdk + gemini 2.5 flash
- https://github.com/subhraneel2005/vidgen/public/prototype-hld/flow1.png

  ### flow 2 focuses on audio generation module using elevenlabs api
- https://github.com/subhraneel2005/vidgen/public/prototype-hld/flow2.png

  ### flow 3 focuses on final video compilation which includes 
  - transcription generation using local whisper model
  - reddit overlay generation
  - and compiling the whole video server side from remotion and showing it on the nextjs dashboard 
- https://github.com/subhraneel2005/vidgen/public/prototype-hld/flow3.png

## todos

- [ ✅ ] install whisper-cpp locally using `@remotion/install-whisper-cpp`
- [ ✅ ] generate captions from audio file using whisper
- [ ✅ ] display captions using `@remotion/captions`
- [ ✅ ] create reddit style overlay using react component and remotion
- [ ] implement gemini-api using ai-sdk for script generation
- [ ] implement elevenlabs-api for audio generation
- [ ] build nextjs dashboard for storyGenerator

  ### reference docs:
  - https://www.remotion.dev/docs/captions/caption
  - https://www.remotion.dev/docs/install-whisper-cpp/ (done)

## contributing

contributions are welcome. fork the repository, make a branch for your changes, and create a pull request.

## license

this project uses the mit license.

---

<div align="center">
  <p>Created with ❤️ by <a href="https://twitter.com/subhraneeltwt">Subhraneel</a></p>
  <p>
    <a href="https://github.com/subhraneel2005">GitHub</a> •
    <a href="https://twitter.com/subhraneeltwt">X (Twitter)</a>
  </p>
</div>
