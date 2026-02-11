# OpenClaw RPG Life Dashboard

A gamified habit tracker that turns your daily activities into RPG-style character progression. Level up your real-life stats by completing daily tasks!

## What We Built

An interactive web dashboard where you track habits and gain XP in four core stats:
- **Strength** - Earned through exercise and physical activity
- **Intelligence** - Gained from reading and learning
- **Creativity** - Rewarded for creative work and projects
- **Social** - Increased through socializing and connecting with others

Each stat has its own level and XP progress bar. As you log activities, you gain XP and level up with satisfying animations. Your overall Character Level is the sum of all four stats.

## How We Made This

### Setup
- Set up a Docker container with OpenClaw (Claude Code agent)
- Used WhatsApp to communicate with the AI agent
- Agent built the entire dashboard as a single-page web app

### The Prompt We Used

```
Hey! I want you to build me an RPG Life Dashboard - a gamified habit tracker.
What it is:
A single-page web app where I can track daily habits and level up RPG-style stats.
Features needed:

4 Character Stats (each starts at Level 1 with 0 XP):

Strength (for exercise)
Intelligence (for reading/learning)
Creativity (for creative work)
Social (for socializing)


For each stat, display:

Current level number
Visual XP progress bar
XP amount (e.g., "45/100 XP")


Action buttons to log activities:

"Exercised 30min" → +20 Strength XP
"Read 1 hour" → +25 Intelligence XP
"Created something" → +20 Creativity XP
"Socialized" → +15 Social XP


Leveling system:

Level 1→2 needs 100 XP
Level 2→3 needs 200 XP
Level 3→4 needs 300 XP (and so on)
When leveling up, show a celebration animation/message
XP bar resets after leveling


Show total "Character Level" (sum of all 4 stat levels)
Save progress using browser localStorage so it persists
Add a reset button to clear all progress

Style: Make it look game-like and fun with nice colors, smooth animations on the progress bars, and a clean layout.
Build it as a single HTML file with inline CSS and JavaScript so I can just open it in my browser!
```
