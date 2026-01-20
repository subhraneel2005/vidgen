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
  ![Architecture Diagram 1](https://raw.githubusercontent.com/subhraneel2005/vidgen/main/public/prototype-hld/flow1.png)
  
  ### flow 2 focuses on audio generation module using elevenlabs api
  ![Architecture Diagram 2](https://raw.githubusercontent.com/subhraneel2005/vidgen/main/public/prototype-hld/flow2.png)

  ### flow 3 focuses on final video compilation which includes 
  - transcription generation using local whisper model
  - reddit overlay generation
  - and compiling the whole video server side from remotion and showing it on the nextjs dashboard

  ![Architecture Diagram 3](https://raw.githubusercontent.com/subhraneel2005/vidgen/main/public/prototype-hld/flow3.png)

  ### this is future plan for generateScript module
  ![Architecture Diagram 4](https://raw.githubusercontent.com/subhraneel2005/vidgen/main/public/prototype-hld/generateAudioPlan.png)
  
    #### validate input
    - check if the genre is valid (coincidences, friendship, or betrayal)
    - if invalid, throw error and stop

    #### check cache first
    - look for previously generated story for this genre
    - if found in cache and not expired (less than 1 hour old), return it immediately
    - if not found, continue to generation


    #### try model 1: gemini 2.5 flash
    - attempt to generate story using gemini
    - if succeeds, move to validation
    - if fails with 503 overload error, retry up to 2 times with exponential backoff (1s, 2s, 4s)
    - if fails with rate limit or other errors, skip to next model


    #### try model 2: grok beta
    - if gemini fails completely, try grok as backup
    - same retry logic (up to 2 retries with 2s wait between attempts)
    - if fails, move to next model


    #### try model 3: gpt 4o mini
    - last ai model attempt, most reliable option
    - same retry logic as grok
    - if this also fails, use fallback template


    #### fallback safety net
    - if all three ai models fail, use pre written template story for the requested genre
    - ensures system never crashes
    - user always gets a story even during complete api outages


    #### validate output schema
    - check if generated story has correct format and required fields
    - if schema validation fails, force use of fallback template
    - this prevents malformed data from breaking the app


    #### add metadata
    - calculate character count of the story
    - estimate audio duration based on character count (roughly 1000 characters per minute)
    - attach this metadata to the story object


    #### cache the result
    - save successful story to cache with 1 hour expiration time
    - next request for same genre will use cached version
    - reduces api calls and improves response time


    #### log metrics and return
    - log which model was used successfully
    - log total generation time
    - log retry count if any
    - return the completed story object to caller

### key benefits of this approach:
- never crashes due to multiple fallback layers
- fast response when cache hits
- cost effective by trying cheaper models first
- resilient against api failures and rate limits
- fully observable with detailed logging at each step

## todos

- [ ✅ ] install whisper-cpp locally using `@remotion/install-whisper-cpp`
- [ ✅ ] generate captions from audio file using whisper
- [ ✅ ] display captions using `@remotion/captions`
- [ ✅ ] create reddit style overlay using react component and remotion
- [ ✅ ] implement gemini-api using ai-sdk for script generation
- [ ✅ ] implement elevenlabs-api for audio generation
- [ ] build the UI interface
- [ ] bundle and render the video, server-side forn local download

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
