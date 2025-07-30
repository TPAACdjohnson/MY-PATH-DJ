<<<<<<< HEAD
// story_hub.js (updated with state continuity and cumulative evaluation)
// Fix any errors in this script
// Check this function for logic errors and improve readability

=======
// story_hub.js (with HUD, chapter nav, and proper state update)
>>>>>>> eddcb2ba3cb25136921acb2c631727fc085c5e2a
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

narrative.textContent = "📖 Choose Your Chapter to Begin";
choices.innerHTML = "";

const chapters = [
    { title: "Chapter One: Brooklyn Beginnings", file: "chapter_one_game.js" },
    { title: "Chapter Two: Georgia Fire", file: "chapter_two_game.js" },
    { title: "Chapter Three: Navy Flame", file: "chapter_three_game.js" }
];

// Create menu buttons for chapters
chapters.forEach((chapter, index) => {
    const btn = document.createElement("button");
    btn.textContent = chapter.title;
    btn.onclick = () => {
        loadScript(chapter.file);
    };
    choices.appendChild(btn);
});

function loadScript(file) {
    // Remove any previous chapter script
    const existing = document.querySelector(`script[src="${file}"]`);
    if (existing) existing.remove();

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
    renderStats(); // Show HUD on chapter load
}

function updateGameState(updates) {
    for (const key in updates) {
        if (gameState.hasOwnProperty(key)) {
            gameState[key] += updates[key];
        }
    }
    renderStats();
}

function renderStats() {
    const statsDiv = document.getElementById("stats");
    if (!statsDiv) return;

    statsDiv.innerHTML = `
        <strong>🧠 Resilience:</strong> ${gameState.resilience} |
        <strong>💔 Trauma:</strong> ${gameState.trauma} |
        <strong>🔥 Authenticity:</strong> ${gameState.authenticity} |
        <strong>😤 Rage:</strong> ${gameState.rage} |
        <strong>🌪 Dissociation:</strong> ${gameState.dissociation} |
        <strong>✝️ Purpose:</strong> ${gameState.purpose}
    `;
}

function showFinalConclusion() {
    const totalSc
