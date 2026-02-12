#!/bin/bash
# Chat with OpenClaw agent locally - workspace only

echo "=== OpenClaw Terminal Chat ==="
echo "All file operations happen in: /home/node/.openclaw/workspace/"
echo "Type your messages below. Press Ctrl+C to exit."
echo "================================"
echo ""

SESSION_ID="terminal-chat"
WORKSPACE="/home/node/.openclaw/workspace"

while true; do
    echo -n "You: "
    read -r message
    
    if [ -z "$message" ]; then
        continue
    fi
    
    # Prepend workspace context to every message
    full_message="Working directory: $WORKSPACE
    
$message"
    
    echo "Bot: "
    docker compose run --rm openclaw-cli agent --local --session-id "$SESSION_ID" --message "$full_message"
    echo ""
done
```
