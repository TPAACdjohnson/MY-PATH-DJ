function mergeGameState(existingState) {
    window.gameState = existingState;
}

const chapterThreeScenes = {
    start: {
        text: "CHAPTER THREE: Navy Rebirth\n\nYou’ve enlisted. Air traffic control. Structure. Discipline. Finally, a bed that’s yours and a job with purpose. But it’s not peace. The silence is louder. Faith is a flicker. What do you do?",
        options: [
            {
                text: "Embrace the discipline, bury emotion",
                effects: { resilience: 2, dissociation: 1 },
                result: "You become a model sailor, but emotions rot beneath the surface.",
                next: "isolation"
            },
            {
                text: "Write prayers and poetry at night",
                effects: { authenticity: 2, purpose: 1 },
                result: "Faith becomes your lifeline. You begin to hear God again.",
                next: "isolation"
            },
            {
                text: "Smoke, drink, detach to survive",
                effects: { trauma: 2, rage: 1 },
                result: "It numbs you. Until it doesn’t.",
                next: "isolation"
            }
        ]
    },
    isolation: {
        text: "The loneliness in your soul deepens. No family visits. Your mind starts replaying old wounds. One night, you break. What happens?",
        options: [
            {
                text: "Cry out to God in your bunk",
                effects: { purpose: 2, trauma: -1 },
                result: "Your spirit shakes. Something ancient wakes inside you.",
                next: "spiritual_fire"
            },
            {
                text: "Fight someone for no reason",
                effects: { rage: 2 },
                result: "You snap. They restrain you. Nobody asks why.",
                next: "spiritual_fire"
            },
            {
                text: "Ask to see a psychologist",
                effects: { authenticity: 1, resilience: 1 },
                result: "You begin to confront demons. The healing is slow, but real.",
                next: "spiritual_fire"
            }
        ]
    },
    spiritual_fire: {
        text: "You awaken in the chapel alone. You speak to no one. But the air is different. You are burning, but not consumed. This is the moment that changed everything. What do you do?",
        options: [
            {
                text: "Surrender fully to divine purpose",
                effects: { purpose: 3, authenticity: 2 },
                result: "You walk out reborn. Not perfect—anchored.",
                next: null
            },
            {
                text: "Question if this is just psychosis",
                effects: { dissociation: 2, trauma: 1 },
                result: "You don’t trust the light yet. But you remember it.",
                next: null
            },
            {
                text: "Commit to helping others after this",
                effects: { purpose: 2, resilience: 1 },
                result: "Your pain becomes your ministry.",
                next: null
            }
        ]
    }
};

const narrative = document.getElementById("narrative");
const choices = document.getElementById("choices");

function applyEffects(effects) {
    if (!window.gameState || typeof effects !== "object") return;
    Object.entries(effects).forEach(([key, value]) => {
        if (window.gameState.hasOwnProperty(key) && typeof value === "number") {
            window.gameState[key] += value;
        }
    });
}

function showScene(sceneKey) {
    if (!narrative || !choices) return;
    const scene = chapterThreeScenes[sceneKey];
    if (!scene) {
        narrative.textContent = "Scene not found.";
        choices.innerHTML = "";
        return;
    }

    narrative.textContent = scene.text;
    choices.innerHTML = "";

    scene.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option.text;
        btn.onclick = () => {
            applyEffects(option.effects);

            // Record the result in history if available
            if (window.gameState && Array.isArray(window.gameState.history)) {
                window.gameState.history.push(option.result);
            }

            // Show result as a temporary message, then move on
            narrative.textContent = option.result;
            choices.innerHTML = "";
            setTimeout(() => {
                if (option.next && chapterThreeScenes[option.next]) {
                    showScene(option.next);
                } else {
                    showChapterEndOptions();
                }
            }, 1500);
        };
        choices.appendChild(btn);
    });
}

function showChapterEndOptions() {
    narrative.textContent += "\n\n🛐 Chapter Three Complete.";
    choices.innerHTML = "";

    const menuBtn = document.createElement("button");
    menuBtn.textContent = "Return to Hub 🧭";
    menuBtn.onclick = () => {
        window.location.reload();
    };

    choices.appendChild(menuBtn);
}

showScene("start");


function mergeGameState(existingState) {
    window.gameState = existingState;
}

const chapterThreeScenes = {
    start: {
        text: "CHAPTER THREE: Navy Rebirth\n\nYou’ve enlisted. Air traffic control. Structure. Discipline. Finally, a bed that’s yours and a job with purpose. But it’s not peace. The silence is louder. Faith is a flicker. What do you do?",
        options: [
            {
                text: "Embrace the discipline, bury emotion",
                effects: { resilience: 2, dissociation: 1 },
                result: "You become a model sailor, but emotions rot beneath the surface.",
                next: "isolation"
            },
            {
                text: "Write prayers and poetry at night",
                effects: { authenticity: 2, purpose: 1 },
                result: "Faith becomes your lifeline. You begin to hear God again.",
                next: "isolation"
            },
            {
                text: "Smoke, drink, detach to survive",
                effects: { trauma: 2, rage: 1 },
                result: "It numbs you. Until it doesn’t.",
                next: "isolation"
            }
        ]
    },
    isolation: {
        text: "The loneliness in your soul deepens. No family visits. Your mind starts replaying old wounds. One night, you break. What happens?",
        options: [
            {
                text: "Cry out to God in your bunk",
                effects: { purpose: 2, trauma: -1 },
                result: "Your spirit shakes. Something ancient wakes inside you.",
                next: "spiritual_fire"
            },
            {
                text: "Fight someone for no reason",
                effects: { rage: 2 },
                result: "You snap. They restrain you. Nobody asks why.",
                next: "spiritual_fire"
            },
            {
                text: "Ask to see a psychologist",
                effects: { authenticity: 1, resilience: 1 },
                result: "You begin to confront demons. The healing is slow, but real.",
                next: "spiritual_fire"
            }
        ]
    },
    spiritual_fire: {
        text: "You awaken in the chapel alone. You speak to no one. But the air is different. You are burning, but not consumed. This is the moment that changed everything. What do you do?",
        options: [
            {
                text: "Surrender fully to divine purpose",
                effects: { purpose: 3, authenticity: 2 },
                result: "You walk out reborn. Not perfect—anchored.",
                next: null
            },
            {
                text: "Question if this is just psychosis",
                effects: { dissociation: 2, trauma: 1 },
                result: "You don’t trust the light yet. But you remember it.",
                next: null
            },
            {
                text: "Commit to helping others after this",
                effects: { purpose: 2, resilience: 1 },
                result: "Your pain becomes your ministry.",
                next: null
            }
        ]
    }
};

function showScene(scene) {
    const sceneData = chapterThreeScenes[scene];
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
            }
        };
        choices.appendChild(btn);
    });
}

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
