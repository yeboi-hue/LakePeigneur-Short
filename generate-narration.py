#!/usr/bin/env python3
import asyncio
from pathlib import Path
import edge_tts

ROOT = Path(__file__).resolve().parents[1]
TEXT = (ROOT / "public" / "narration.txt").read_text(encoding="utf-8").strip()
OUT = ROOT / "public" / "narration.mp3"

async def main():
    communicate = edge_tts.Communicate(TEXT, "en-US-GuyNeural", rate="+7%", volume="+0%", pitch="-1Hz")
    await communicate.save(str(OUT))
    print(f"Generated narration: {OUT}")

if __name__ == "__main__":
    asyncio.run(main())
