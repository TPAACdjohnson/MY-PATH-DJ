const narrative = document.getElementById("narrative");
const choices = document.getElementById("choices");

let gameState = {
  resilience: 0,
  authenticity: 0,
  trauma: 0,
  rage: 0,
  dissociation: 0,
  purpose: 0,
  chapterHistory: []
};

// Reset UI
narrative.textContent = "📖 Choose Your Chapter to Begin";
choices.innerHTML = "";

// Define chapters
const chapters = [
  { title: "Chapter One: Brooklyn Beginnings", file: "chapter_one_game.js", id: "chapter1" },
  { title: "Chapter Two: Georgia Fire", file: "chapter_two_game.js", id: "chapter2" },
  { title: "Chapter Three: Navy Rebirth", file: "chapter_three_game.js", id: "chapter3" }
];

// Create buttons for each chapter
chapters.forEach(ch => {
  const btn = document.createElement("button");
  btn.textContent = ch.title;
  btn.onclick = () => {
    if (!gameState.chapterHistory.includes(ch.id)) {
      loadChapterScript(ch.file, ch.id);
    } else {
      alert("You’ve already completed this chapter.");
    }
  };
  choices.appendChild(btn);
});

function loadScript(file) {
    const existing = document.querySelector(`script[src="${file}"]`);
    if (existing) existing.remove(); // Remove previous chapter script

    const script = document.createElement("script");
    script.src = file;
    script.onload = () => {
        if (typeof mergeGameState === 'function') {
            mergeGameState(gameState);
        }
    };
    document.body.appendChild(script);
    narrative.textContent = "Loading " + file + "...";
    choices.innerHTML = "";
}

// Used by chapters to update state
function updateGameState(updates) {
  for (const key in updates) {
    if (gameState.hasOwnProperty(key)) {
      gameState[key] += updates[key];
    }
  }
}

// Called once all chapters are completed
function showFinalConclusion() {
  const { resilience, authenticity, trauma, rage, dissociation, purpose } = gameState;
  const totalScore = resilience + authenticity + purpose - trauma - rage - dissociation;

  let result = "";
  if (totalScore >= 10) {
    result = "🕊️ You transformed pain into purpose. A healer. A force of peace. Legacy in motion.";
  } else if (totalScore >= 3) {
    result = "🌒 You endured. You adapted. The wounds still whisper, but the light still flickers.";
  } else {
    result = "🧨 Survival came at a cost. You wore armor that no longer fits. The journey is not done.";
  }

  narrative.textContent = `🧭 FINAL CONCLUSION\n\n${result}\n\n🧠 Mental Profile:\n${JSON.stringify(gameState, null, 2)}`;
  choices.innerHTML = "";

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "🔄 Restart Game";
  restartBtn.onclick = () => location.reload();
  choices.appendChild(restartBtn);
}
