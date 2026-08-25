<img width="1916" height="902" alt="Screenshot 2026-08-20 160917" src="https://github.com/user-attachments/assets/fbca4a50-33e2-4241-be42-feebb1200402" />

# Frameo - Screen Recorder 📹
Frameo is a simple browser-based screen reorder i built to make recording my content easier. The goal was to create something lightweight that lets me capture my screen and preview the recording without needing a complicated setup. 

I built Frameo because I needed a simple screen recorder for creating content while I learn and build.This isn't meant to be the most advanced screen recorder. 

It's simply a project I thought of, a problem I had, and something I decided to build. This is **version 1**.

## Tech Stack
- React
- Javascript
- CSS

## Features
- Record screen of choice
- Preview caputred screen
- Record responsive/mobile views
- Simple lightweight interface

## Process
I started this project because I wanted a simple way to record myself while building projects.

At first, I wanted to build a lot more functionality than I actually needed. I considered things like advanced cropping and other features before properly testing the basic Screen Capture API.

After experimenting with the browser APIs, I realized that some of the complexity I had imagined wasn't necessary.

So I focused on getting the core functionality working first:

**Capture → Display → Record → Preview**

Once the core functionality worked, I decided to leave more advanced features for future updates instead of trying to build everything into the first version.

## What I learnt
This project taught me a lot about browser APIs and, more importantly, how I approach problems as a developer.

### Screen Capture API

I learned how browsers can capture a user's screen using the Screen Capture API.

### MediaStream

The captured screen isn't returned as a normal video file. It is provided as a MediaStream, which changed how I needed to handle the preview.

> srcObject

I learned that a MediaStream needs to be assigned to a video's srcObject rather than treated like a normal video source.

> useRef

I also learned how useRef can be used to access DOM elements such as the video element when working with things like srcObject.

### Simplicity

One of my biggest lessons was that I shouldn't create a complicated solution before proving that I need one.

I spent time thinking about complex cropping functionality before realizing the browser already handled part of what I needed.

### Learning Through Errors

The project also reminded me that errors aren't just obstacles.

Every error I encountered gave me a better understanding of how the technology actually works.

## Improvements/Updates
- Video trimming and basic editing
- Templates for recordings
- Better recording controls
- More precise recording/cropping options
- Audio controls
- Recording downloads
- Improved UI/UX
- More recording formats/options
- Possibly cloud storage and sharing

For now, I'm intentionally keeping these as **future improvements** rather than trying to put everything into the first version.

## Running project
1. Clone the repository
``` 
git clone https://github.com/Caleb-Bako/Frameo.git
```

2. Install dependencies
```
npm install 
```

3. Start the development server
```
npm run dev
```

Video Preview
