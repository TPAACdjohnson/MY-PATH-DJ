
function mergeGameState(existingState) {
    window.gameState = existingState;
}

// Chapter Two Game Data
const chapterTwoScenes = {

    start: {
        text: "CHAPTER TWO: Georgia Fire\n\nYour mother has just become the first Black female sergeant in Alpharetta PD. No parades, no promotions—just silence. Meanwhile, her second marriage collapses from betrayal. You and your four brothers are raising yourselves. You're the middle child, but the leader. What now?",
        options: [
            {
                text: "Take charge of the house",
                effects: { resilience: 2, trauma: 1 },
                result: "You become the cook, cleaner, caretaker. No childhood left.",
                next: "school_mobility"
            },
            {
                text: "Escape outside with neighborhood friends",
                effects: { authenticity: 1, dissociation: 1 },
                result: "The streets become your classroom, your comfort zone.",
                next: "school_mobility"
            },
            {
                text: "Withdraw and watch TV/games alone",
                effects: { dissociation: 2 },
                result: "Fantasy worlds fill in for the love you lack.",
                next: "school_mobility"
            }
        ]
    },
    school_mobility: {
        text: "You attend three elementary schools, one middle school, and four high schools. You’ve had to adapt over and over. At 17, you move in with your dad—who abandoned you, and now mistreats you. What do you do?",
        options: [
            {
                text: "Push through in silence",
                effects: { trauma: 2 },
                result: "You learn to grind with grit, not joy.",
                next: "prom_and_work"
            },
            {
                text: "Get a job to survive",
                effects: { resilience: 2, purpose: 1 },
                result: "You sacrifice your youth just to eat and clothe yourself.",
                next: "prom_and_work"
            },
            {
                text: "Run away or lash out",
                effects: { rage: 2 },
                result: "Anger simmers, school suffers, and no one intervenes.",
                next: "prom_and_work"
            }
        ]
    },
    prom_and_work: {
        text: "You skip prom to work. You graduate with an 8th-grade math level. No scholarships. But somehow, you crush the ASVAB and qualify for Navy air traffic control. What happens next?",
        options: [
            {
                text: "Feel proud, but disconnected",
                effects: { purpose: 2, dissociation: 1 },
                result: "You’re a success story nobody claps for.",
                next: null
            },
            {
                text: "Doubt yourself even more",
                effects: { trauma: 1, authenticity: 1 },
                result: "Imposter syndrome settles deep, despite your strength.",
                next: null
            },
            {
                text: "Vow to prove everyone wrong",
                effects: { resilience: 1, rage: 1 },
                result: "Your grind becomes a weapon.",
                next: null
            }
        ]
    }
};

<<<<<<< HEAD
// Assume state, narrative, and choices are defined elsewhere or add them if needed
const narrative = document.getElementById("narrative");
const choices = document.getElementById("choices");

let state = {
    resilience: 4,
    authenticity: 3,
    trauma: 3,
    rage: 2,
    dissociation: 2,
    purpose: 1,
    history: []
};

function showScene(scene) {
    // Display the narrative text
    narrative.textContent = scene.text;
    // Clear previous choices
    choices.innerHTML = "";

    // Render each option as a button
    scene.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option.text;
        btn.onclick = () => {
            // Safely apply effects if present
            if (option.effects && typeof option.effects === "object") {
                Object.entries(option.effects).forEach(([key, value]) => {
                    if (state.hasOwnProperty(key) && typeof value === "number") {
                        state[key] += value;
                    }
                });
            }
            // Record the result
            state.history.push(option.result);

            // Move to the next scene or show ending
            if (option.next && scenes[option.next]) {
                showScene(scenes[option.next]);
            } else {
                showEnding();
=======
function showScene(scene) {
    const sceneData = chapterTwoScenes[scene];
    narrative.textContent = sceneData.text;
    choices.innerHTML = "";

    sceneData.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option.text;
        btn.onclick = () => {
            updateGameState(option.effects);
            narrative.textContent = option.result;
            if (option.next) {
                setTimeout(() => showScene(option.next), 1500);
            } else {
                setTimeout(() => showChapterEndOptions(), 1500);
>>>>>>> eddcb2ba3cb25136921acb2c631727fc085c5e2a
            }
        };
        choices.appendChild(btn);
    });
}

<<<<<<< HEAD
function showEnding() {
    choices.innerHTML = "";
    let summary = "🏁 FINAL OUTCOME:\n\n";
    summary += `Resilience: ${state.resilience}\n`;
    summary += `Authenticity: ${state.authenticity}\n`;
    summary += `Trauma: ${state.trauma}\n`;
    summary += `Rage: ${state.rage}\n`;
    summary += `Dissociation: ${state.dissociation}\n`;
    summary += `Purpose: ${state.purpose}\n\n`;

    if (state.trauma > 8) {
        narrative.textContent = "🧨 The pain overwhelmed you. Survival became your only language.";
        summary += "High trauma and low authenticity led to deep wounds. Healing is still possible.";
    } else if (state.resilience >= 8 && state.authenticity >= 7) {
        narrative.textContent = "🔥 You found your strength and truth. You built a new foundation.";
        summary += "You resisted erasure and claimed your story.";
    } else {
        narrative.textContent = "🌒 You endured. The journey continues.";
        summary += "Some cycles were broken. Others remain. The next chapter awaits.";
    }

    const resultBlock = document.createElement("pre");
    resultBlock.textContent = summary;
    narrative.appendChild(resultBlock);

    const historyList = document.createElement("ul");
    state.history.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = entry;
        historyList.appendChild(li);
    });

    const historyTitle = document.createElement("h3");
    historyTitle.textContent = "🧠 Decision History:";
    narrative.appendChild(historyTitle);
    narrative.appendChild(historyList);
}

=======
function showChapterEndOptions() {
    narrative.textContent += "\\n\\n📘 Chapter Complete.";
    choices.innerHTML = "";

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "➡️ Continue to Next Chapter";
    nextBtn.onclick = () => {
        loadScript("chapter_TWO_game.js"); // Update per chapter
    };

    const hubBtn = document.createElement("button");
    hubBtn.textContent = "🧭 Return to Menu";
    hubBtn.onclick = () => {
        location.reload();
    };

    choices.appendChild(nextBtn);
    choices.appendChild(hubBtn);
}

showScene("start");


>>>>>>> eddcb2ba3cb25136921acb2c631727fc085c5e2a
showScene(scenes.start);
