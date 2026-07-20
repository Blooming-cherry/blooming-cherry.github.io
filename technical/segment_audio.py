import whisper, subprocess, os, json, re

AUDIO_IN = "sagiri_voice.m4a"
AUDIO_WAV = "sagiri_voice.wav"
OUT_DIR = "sagiri_segments"
FFMPEG = r"C:\Users\admin\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe"

os.makedirs(OUT_DIR, exist_ok=True)

# 1. Convert
if not os.path.exists(AUDIO_WAV):
    subprocess.run([FFMPEG, "-i", AUDIO_IN, "-ar", "16000", "-ac", "1", AUDIO_WAV, "-y"], check=True)

# 2. Transcribe with word timestamps
print("Loading small model...")
model = whisper.load_model("small")
print("Transcribing...")
result = model.transcribe(AUDIO_WAV, word_timestamps=True, language="ja", verbose=False)

# 3. Split into sentences at Japanese punctuation marks
all_words = []
for seg in result["segments"]:
    for w in seg.get("words", []):
        all_words.append(w)

# Re-split at punctuation: 。！？♪ … and commas for short breaks
segments = []
current_words = []
for w in all_words:
    t = w["word"].strip()
    current_words.append(w)
    if re.search(r'[。！？♪…]', t) or (re.search(r'[、，]', t) and len(current_words) >= 5):
        text = "".join(w["word"] for w in current_words).strip()
        start = current_words[0]["start"]
        end = current_words[-1]["end"]
        if end - start >= 0.5 and text:
            segments.append({"text": text, "start": start, "end": end})
        current_words = []

# Don't forget remaining words
if current_words:
    text = "".join(w["word"] for w in current_words).strip()
    start = current_words[0]["start"]
    end = current_words[-1]["end"]
    if end - start >= 0.5 and text:
        segments.append({"text": text, "start": start, "end": end})

print(f"\nFound {len(segments)} sentence-level segments:\n")
for i, s in enumerate(segments):
    has_jp = bool(re.search(r'[ぁ-んァ-ン一-龥]', s["text"]))
    lang = "ja" if has_jp else "??"
    print(f"  [{i:02d}] {s['start']:.1f}s-{s['end']:.1f}s [{lang}] {s['text']}")

# 4. Export
print(f"\nSaving to {OUT_DIR}/ ...")
for i, s in enumerate(segments):
    out_file = os.path.join(OUT_DIR, f"{i:02d}.wav")
    subprocess.run([FFMPEG, "-i", AUDIO_WAV, "-ss", str(s["start"]), "-to", str(s["end"]),
                    "-ar", "44100", "-ac", "1", out_file, "-y"], capture_output=True)

with open(os.path.join(OUT_DIR, "metadata.json"), "w", encoding="utf-8") as f:
    json.dump(segments, f, ensure_ascii=False, indent=2)

print("Done!")
