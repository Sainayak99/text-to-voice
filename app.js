// ─── Get elements from the page ───────────────────────────────────────────────
const textInput = document.getElementById("text-input");
const speakBtn  = document.getElementById("speak-btn");
const stopBtn   = document.getElementById("stop-btn");
const statusBox = document.getElementById("status-box");

// ─── The Web Speech API ───────────────────────────────────────────────────────
const synth = window.speechSynthesis;

// ─── Helper: update the status box ────────────────────────────────────────────
function setStatus(message, type) {
  statusBox.textContent = message;
  statusBox.className = "status";
  if (type) statusBox.classList.add(type);
}

// ─── Helper: toggle buttons ───────────────────────────────────────────────────
function setButtons(speaking) {
  speakBtn.disabled = speaking;
  stopBtn.disabled  = !speaking;
}

// ─── SPEAK button ─────────────────────────────────────────────────────────────
speakBtn.addEventListener("click", function() {

  const text = textInput.value.trim();

  if (text === "") {
    setStatus("Please type something first.", "error");
    return;
  }

  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.onstart = function() {
    setStatus("Speaking...", "speaking");
    setButtons(true);
  };

  utterance.onend = function() {
    setStatus("Ready");
    setButtons(false);
  };

  utterance.onerror = function(event) {
    setStatus("Error: " + event.error, "error");
    setButtons(false);
  };

  synth.speak(utterance);
});

// ─── STOP button ──────────────────────────────────────────────────────────────
stopBtn.addEventListener("click", function() {
  synth.cancel();
  setStatus("Ready");
  setButtons(false);
});