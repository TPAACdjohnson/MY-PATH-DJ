// story_hub.js (stable build)

const narrative = document.getElementById("narrative");
const choices = document.getElementById("choices");
const hud = document.getElementById("hud");

let gameState = {
    resilience: 0,
    authenticity: 0,
    trauma: 0,
    rage: 0,
    dissociation: 0,
    purpose: 0,
    chapterHistory: [],
    currentChapterIndex: null
};

const chapters = [
    { title: "Chapter One: Brooklyn Beginnings", file: "chapter_one_game.js" },
    { title: "Chapter Two: Georgia Fire", file: "chapter_two_game.js" },
    { title: "Chapter Three: Navy & Rebirth", file: "chapter_three_game.js" }
];

function loadChapter(index) {
    gameState.currentChapterIndex = index;
    const file = chapters[index].file;
    const script = document.createElement("script");
    script.src = file;
    script.onload = () => {
        if (typeof mergeGameState === "function") {
            mergeGameState(gameState, renderHUD, nextChapterMenu);
        } else {
            narrative.textContent = "❌ Chapter failed to load: missing mergeGameState()";
        }
    };
    document.body.appendChild(script);
    narrative.textContent = "⏳ Loading " + chapters[index].title + "...";
    choices.innerHTML = "";
}

function renderMainMenu() {
    narrative.textContent = "🎮 Choose Your Chapter to Begin";
    choices.innerHTML = "";
    chapters.forEach((ch, i) => {
        const btn = document.createElement("button");
        btn.textContent = ch.title;
        btn.onclick = () => loadChapter(i);
        choices.appendChild(btn);
    });
    renderHUD();
}

function renderHUD() {
    hud.innerHTML = `
        🧠 Resilience: ${gameState.resilience} | 💬 Authenticity: ${gameState.authenticity} | 
        💢 Rage: ${gameState.rage} | 😶 Dissociation: ${gameState.dissociation} | 
        🕯️ Purpose: ${gameState.purpose} | 🩸 Trauma: ${gameState.trauma}
    `;
}

function nextChapterMenu() {
    choices.innerHTML = "";

    if (gameState.currentChapterIndex < chapters.length - 1) {
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "➡️ Proceed to Next Chapter";
        nextBtn.onclick = () => loadChapter(gameState.currentChapterIndex + 1);
        choices.appendChild(nextBtn);
    } else {
        const finishBtn = document.createElement("button");
        finishBtn.textContent = "🏁 Conclude Game";
        finishBtn.onclick = () => showFinalConclusion();
        choices.appendChild(finishBtn);
    }

    const returnBtn = document.createElement("button");
    returnBtn.textContent = "🔙 Return to Menu";
    returnBtn.onclick = renderMainMenu;
    choices.appendChild(returnBtn);

    renderHUD();
}

function updateGameState(updates) {
    for (const key in updates) {
        if (gameState.hasOwnProperty(key)) {
            gameState[key] += updates[key];
        }
    }
    renderHUD();
}

function showFinalConclusion() {
    const totalScore = gameState.resilience + gameState.authenticity + gameState.purpose - gameState.trauma - gameState.rage - gameState.dissociation;
    let result = "";

    if (totalScore >= 10) {
        result = "🕊️ You transformed your suffering into sacred strength. A healer. A builder. A legacy born of fire.";
    } else if (totalScore >= 3) {
        result = "🌘 You endured and adapted. You're still walking, but healing is incomplete. The journey continues.";
    } else {
        result = "🧨 The trauma calcified into armor. Protection became isolation. You survived, but not whole.";
    }

    narrative.textContent = "🧭 FINAL PATHWAY\n\n" + result + "\n\n" + JSON.stringify(gameState, null, 2);
    choices.innerHTML = "";
    renderHUD();
}

// Initial launch
renderMainMenu();
// Ensure the game state is initialized