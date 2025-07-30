// story_hub.js (updated with state continuity and cumulative evaluation)
// Fix any errors in this script
// Check this function for logic errors and improve readability

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
    {
        title: "Chapter One: Brooklyn Beginnings",
        file: "chapter_one_game.js"
    },
    {
        title: "Chapter Two: Georgia Fire",
        file: "chapter_two_game.js"
    }
];

chapters.forEach(chapter => {
    const btn = document.createElement("button");
    btn.textContent = chapter.title;
    btn.onclick = () => {
        loadScript(chapter.file);
    };
    choices.appendChild(btn);
});

function loadScript(file) {
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

// This function can be called from chapter files to integrate stats into the story
function updateGameState(updates) {
    for (const key in updates) {
        if (gameState.hasOwnProperty(key)) {
            gameState[key] += updates[key];
        }
    }
}

// Optionally show final conclusion once all chapters are completed
function showFinalConclusion() {
    const totalScore = gameState.resilience + gameState.authenticity + gameState.purpose - gameState.trauma - gameState.rage - gameState.dissociation;
    narrative.textContent = "🧭 FINAL PATHWAY\n\n";
    let result = "";

    if (totalScore >= 10) {
        result = "🕊️ You transformed your suffering into sacred strength. A healer. A builder. A legacy born of fire.";
    } else if (totalScore >= 3) {
        result = "🌘 You endured and adapted. You're still walking, but healing is incomplete. The journey continues.";
    } else {
        result = "🧨 The trauma calcified into armor. Protection became isolation. You survived, but not whole.";
    }

    narrative.textContent += result + "\n\n" + JSON.stringify(gameState, null, 2);
    choices.innerHTML = "";
}