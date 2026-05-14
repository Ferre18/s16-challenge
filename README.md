# ★ Super Dungeons & Prompt ★
> *A dungeon crawler where your words are your weapons.*

**Super Dungeons & Prompts** is a text-based dungeon crawler RPG developed as part of the **16th Seminar Challenge at UPM's Master in Artificial Intelligence**. Players create a character and battle through procedurally generated encounters — but instead of clicking buttons, they *describe* their actions in plain text. The game uses a locally-hosted LLM to validate, narrate, and resolve every action in real time.

---

## 👥 Team

| Name | Role |
|---|---|
| Adrián | Music |
| Anas | Backgrounds |
| Yumeng | LLM prompts & model testing |
| Juanma | LLM prompts & model testing |
| Raúl | LLM prompts & model testing |
| Francisco | Interface & code |
| Yeray | *(TBD)* |

---

## 🎮 How It Works

1. **Create your character** — choose a name, class, race, and level.
2. **Explore biomes** — each run takes you through multiple environments, each with unique monsters.
3. **Combat via prompts** — type what your character does. The LLM validates your action, resolves combat, narrates the outcome, and adjusts HP accordingly.
4. **Collect rewards** — defeated monsters drop items. Choose one per fight and carry it forward.
5. **Survive the boss** — every biome ends with a boss encounter. Conquer it to advance.

> Actions are validated: you can't cast spells your class doesn't know, or use items you don't have. Creativity is rewarded — exploiting weaknesses and using the environment gives real combat advantages.

---

## 🧠 Prompt System

The game uses **six distinct LLM calls** per session, each with a carefully engineered prompt:

| Task | Prompt | Purpose |
|---|---|---|
| Character Sheet | `buildCharacterPrompt()` | Generates D&D 5e-accurate attributes and AC from race/class/level using Point Buy |
| Monster Generation | `buildMonsterPrompt()` | Creates a unique enemy with HP, strengths, weaknesses, and a loot pool scaled to difficulty |
| Room Narration | `buildRoomNarrationPrompt()` | Atmospheric scene-setting intro filtered through the player's class and race perspective |
| Action Validation | `buildValidationPrompt()` | Checks whether a player's declared action is physically/narratively possible (returns `true`/`false`) |
| Combat Resolution | `buildCombatPrompt()` | Evaluates the action against enemy strengths/weaknesses, computes damage, returns narration and result |
| Victory Narration | `buildVictoryNarrationPrompt()` | Describes the aftermath of a fight based on player HP, status effects, and environment |

---

## 🖥️ LLM Deployment

The game runs against a **locally-hosted LLM**, ensuring data sovereignty and zero external API costs.

### Model

| Field | Value |
|---|---|
| Model | `Gemma4-e2b` |
| Quantization | Q6_K (6-bit) |
| Hardware | Local desktop — NVIDIA RTX 2060 6 GB |

**Why Q6_K?** This quantization level preserves most of the original model's accuracy while cutting VRAM requirements and improving inference speed — a practical balance for real-time interactive use.

### Networking — Tailscale VPN

To expose the local server to the team without opening public ports:

- **Encryption:** WireGuard end-to-end encryption
- **Access control:** Only authorized devices on the private tailnet can reach the server
- **MagicDNS:** Accessible via hostname (e.g. `http://my-desktop:11434`) or private Tailscale IP

### Server Stack

| Component | Detail |
|---|---|
| Inference engine | Ollama |
| Endpoint | `http://<TAILSCALE_IP>:<PORT>/v1` |
| Protocol | OpenAI-compatible REST API |

**Test the API:**
```bash
curl http://<YOUR_TAILSCALE_IP>:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemma",
    "messages": [{"role": "user", "content": "Hello, how does this deployment work?"}]
  }'
```

---

## 🚀 Installation & Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Ollama](https://ollama.com/)

### 1. Pull a model

```bash
ollama pull deepseek-r1:1.5b
# Or whichever model is configured in server.js
```

### 2. Install dependencies & start the server

```bash
cd dungeon-crawler
npm install
node server.js
```

### 3. Open the game

Navigate to `http://localhost:<PORT>` in your browser (default port set in `server.js`).

> **Changing the model:** Update the model name in `server.js` and pull the corresponding model with `ollama pull <model-name>`.

---

## 🗂️ Project Structure

```
dungeon-crawler/
├── server.js          # Express server + LLM proxy endpoint
├── index.html         # Main game UI (self-contained)
├── backgrounds.json   # Biome definitions (name, description, image path, mood)
├── public/
│   └── music/
│       ├── standard/  # Standard battle tracks (WAV)
│       └── boss/      # Boss battle tracks (WAV)
└── package.json
```

---

## ⚙️ Adding Content

### New backgrounds / biomes

Edit `backgrounds.json`. Each entry follows this schema:

```json
{
  "path": "https://... or /local/path.jpg",
  "name": "Biome Name",
  "description": "Atmospheric description used in LLM prompts.",
  "mood": "one adjective pair, e.g. cold and desolate"
}
```

### New music tracks

Drop `.wav` files into `public/music/standard/` or `public/music/boss/` and register the filename in the `tracks` object inside `index.html`:

```js
const tracks = {
  standard: ['standard_battle_1.wav', 'standard_battle_2.wav', /* ... */],
  boss:     ['boss_battle_1.wav', /* ... */],
};
```

---

## 📄 License

Academic project — UPM Master in Artificial Intelligence, Seminar 16.