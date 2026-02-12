#!/bin/bash
# Chat with OpenClaw agent locally

echo "=== OpenClaw Terminal Chat ==="
echo "Type your messages below. Press Ctrl+C to exit."
echo "================================"
echo ""

SESSION_ID="terminal-chat"

while true; do
    echo -n "You: "
    read -r message
    
    if [ -z "$message" ]; then
        continue
    fi
    
    echo "Bot: "
    # Use --local to run embedded agent
    docker compose run --rm openclaw-cli agent --local --session-id "$SESSION_ID" --message "$message"
    echo ""
done