# s16-challenge
Development of the challenge of the 16th seminar in UPM's master of Artificial Intelligence.

# Participants
Anas 
Adrian
Yumeng
Francisco
Juanma
Raúl
Yeray


# Tasks
| Task                                   | Responsible               |
|----------------------------------------|---------------------------|
| Music                                  | Adrián                    |
| Backgrounds                            | Anas                      |
| LLM monsters and rewards prompts       | Yumeng, Juanma, Raul      |
| Model testing                          | Yumeng, Juanma, Raul      |
| Interface / Code                       | Fran                     |



# Prompts

 Task   | Prompt | Purpose |
| ------ | ----- | ----- | 
| Task | Person | Purpose |

# LLM Deployment

This project utilizes a Large Language Model (LLM) running locally and privately, ensuring data sovereignty and secure remote access.

## Model Specifications
* **Model:** `Gemma4-e2b` 
* **Quantization:** **6-bit (Q6_K)**. This configuration strikes an optimal balance, preserving most of the original model's accuracy while significantly reducing memory usage and boosting inference speed.
* **Hardware:** Hosted on a **Local Desktop** (Nvidia RTX 2060 6Gb GPU).

## Connectivity & Networking (Tailscale VPN)
To allow access to the model from outside the local network without exposing ports to the public internet, we use a **Mesh VPN** powered by **Tailscale**:

* **Security:** All traffic is end-to-end encrypted using the WireGuard protocol.
* **Remote Access:** The server is visible only to authorized devices within the private network (*tailnet*).
* **MagicDNS:** The service can be accessed using the machine's hostname (e.g., `http://my-desktop:11434`) or its private Tailscale IP address.

## Server Stack
* **Inference Engine:** [Ollama / llama.cpp / LocalAI]
* **Endpoint:** `http://<TAILSCALE_IP>:<PORT>/v1`
* **Protocol:** OpenAI API compatible for plug-and-play integration.

## Quick Start
To interact with the API from a remote device connected to the same VPN:

```bash
curl http://<YOUR_TAILSCALE_IP>:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemma",
    "messages": [{"role": "user", "content": "Hello, how does this deployment work?"}]
  }'

# Installation guide

Install ollama and Node.js
Run 
```
ollama pull deepseek-1r:1.5b # Different model if you change the serve.js model 
```
In the terminal, travel to /dungeon-crawler and Run
```
npm install
node server.js
```
