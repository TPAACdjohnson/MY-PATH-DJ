import { chapterOne } from './chapters/chapter_one_game.js';
import { chapterTwo } from './chapters/chapter_two_game.js';

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
    currentChapterIndex: 0
};

const chapters = [
    { title: "Chapter One: Brooklyn Beginnings", func: chapterOne },
    { title: "Chapter Two: Georgia Fire", func: chapterTwo }
];

function renderMainMenu() {
    narrative.textContent = "📖 Choose Your Chapter to Begin";
    choices.innerHTML = "";

    chapters.forEach((chapter, i) => {
        const btn = document.createElement("button");
        btn.textContent = chapter.title;
        btn.onclick = () => {
            gameState.currentChapterIndex = i;
            chapter.func(gameState, renderHUD, nextChapterMenu);
        };
        choices.appendChild(btn);
    });

    renderHUD();
}

function nextChapterMenu() {
    choices.innerHTML = "";

    if (gameState.currentChapterIndex < chapters.length - 1) {
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "➡️ Proceed to Next Chapter";
        nextBtn.onclick = () => {
            gameState.currentChapterIndex++;
            chapters[gameState.currentChapterIndex].func(gameState, renderHUD, nextChapterMenu);
        };
        choices.appendChild(nextBtn);
    } else {
        const finishBtn = document.createElement("button");
        finishBtn.textContent = "🏁 Conclude Game";
        finishBtn.onclick = showFinalConclusion;
        choices.appendChild(finishBtn);
    }

    const returnBtn = document.createElement("button");
    returnBtn.textContent = "🔙 Return to Menu";
    returnBtn.onclick = renderMainMenu;
    choices.appendChild(returnBtn);
}

function renderHUD() {
    hud.innerHTML = `
        Resilience: ${gameState.resilience} |
        Authenticity: ${gameState.authenticity} |
        Trauma: ${gameState.trauma} |
        Rage: ${gameState.rage} |
        Dissociation: ${gameState.dissociation} |
        Purpose: ${gameState.purpose}
    `;
}

function showFinalConclusion() {
    narrative.textContent = "🧭 FINAL PATHWAY\n\n";
    const score = gameState.resilience + gameState.authenticity + gameState.purpose
                - gameState.trauma - gameState.rage - gameState.dissociation;

    if (score >= 10) {
        narrative.textContent += "🕊️ You transformed your suffering into sacred strength. A healer. A builder. A legacy born of fire.";
    } else if (score >= 3) {
        narrative.textContent += "🌘 You endured and adapted. You're still walking, but healing is incomplete. The journey continues.";
    } else {
        narrative.textContent += "🧨 The trauma calcified into armor. Protection became isolation. You survived, but not whole.";
    }

    renderHUD();
    choices.innerHTML = "";
}

renderMainMenu();