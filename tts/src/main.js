const inputBox = document.getElementById("nameInput");
const audioPlayer = document.getElementById("audioPlayer");
const statusMsg = document.getElementById("statusMsg");
const inputBtn = document.getElementById("inputBtn");

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.sarvam.ai/text-to-speech";

inputBox.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const name = inputBox.value.trim();
    if (!name) return;

    statusMsg.textContent = "Generating voice... 🔊";
    audioPlayer.hidden = true;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-subscription-key": API_KEY
        },
        body: JSON.stringify({
          text: name,
          target_language_code: "hi-IN",
          speaker: "anushka",
          pitch: 0,
          pace: 0.7,
          loudness: 2,
          speech_sample_rate: 22050,
          enable_preprocessing: true,
          model: "bulbul:v2"
        })
      });

      const data = await response.json();

      const base64Audio = data?.audios?.[0];
      if (!base64Audio) {
        console.error("Full API response:", data);
        throw new Error("Audio content missing");
      }

      const audioBlob = new Blob(
        [Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0))],
        { type: "audio/wav" }
      );
      const audioURL = URL.createObjectURL(audioBlob);
      audioPlayer.src = audioURL;
      audioPlayer.hidden = false;
      audioPlayer.play();

      statusMsg.textContent = "✔ Voice generated";
    } catch (err) {
      console.error("TTS Error:", err);
      statusMsg.textContent = "❌ Failed to generate speech.";
    }

    inputBox.value = "";
  }
});

inputBtn.addEventListener("click", async (e) => {
    const name = inputBox.value.trim();
    if (!name) return;

    statusMsg.textContent = "Generating voice... 🔊";
    audioPlayer.hidden = true;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-subscription-key": API_KEY
        },
        body: JSON.stringify({
          text: name,
          target_language_code: "hi-IN",
          speaker: "karun",
          pitch: -0.2,
          pace: 0.8,
          loudness: 2.5,
          speech_sample_rate: 24000,
          enable_preprocessing: true,
          model: "bulbul:v2"
        })
      });

      const data = await response.json();

      const base64Audio = data?.audios?.[0];
      if (!base64Audio) {
        console.error("Full API response:", data);
        throw new Error("Audio content missing");
      }

      const audioBlob = new Blob(
        [Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0))],
        { type: "audio/wav" }
      );
      const audioURL = URL.createObjectURL(audioBlob);
      audioPlayer.src = audioURL;
      audioPlayer.hidden = false;
      audioPlayer.play();

      statusMsg.textContent = "✔ Voice generated";
    } catch (err) {
      console.error("TTS Error:", err);
      statusMsg.textContent = "❌ Failed to generate speech.";
    }

    inputBox.value = "";
});
