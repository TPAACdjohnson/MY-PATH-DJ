function mergeGameState(gameState) {
    // start the game by calling showScene("start");
    window.gameState = gameState;
    showScene("start");
}

// Chapter One Game Data
const chapterOneScenes = {
    start: {
        text: "CHAPTER ONE: Brooklyn Beginnings\n\nYou are 7 years old. Your mother, an NYPD officer, is raising you and your three brothers alone. Your father is gone. You feel his absence in your chest like a ghost that won't leave. It's winter. The apartment is cold. What do you do?",
        options: [
            {
                text: "Help your mom with the chores",
                effects: { resilience: 1, purpose: 1 },
                result: "You take on more than you should. No one thanks you.",
                next: "school_scene"
            },
            {
                text: "Play with your younger brothers",
                effects: { authenticity: 1 },
                result: "You protect their joy with everything you have.",
                next: "school_scene"
            },
            {
                text: "Hide in your room",
                effects: { dissociation: 1, trauma: 1 },
                result: "You escape into silence, but the pain finds you.",
                next: "school_scene"
            }
        ]
    },
    school_scene: {
        text: "You start school. You're one of the only Black boys in your class. Teachers are harsh. Other kids don't understand your world. You're angry, sad, and confused. What do you do?",
        options: [
            {
                text: "Act out in class",
                effects: { rage: 1, trauma: 1 },
                result: "They call you a problem. You’re just trying to be heard.",
                next: "conclusion"
            },
            {
                text: "Try to be invisible",
                effects: { dissociation: 2 },
                result: "No one sees your pain. Not even the teachers.",
                next: "conclusion"
            },
            {
                text: "Focus on reading books",
                effects: { purpose: 2 },
                result: "Books become your escape, your shield, your voice.",
                next: "conclusion"
            }
        ]
    },
    conclusion: {
        text: "Chapter One Concludes. Your earliest wounds begin to shape how you see the world. How do you process it?",
        options: [
            {
                text: "Keep it all inside",
                effects: { trauma: 2 },
                result: "You learn to survive, not thrive.",
                next: null
            },
            {
                text: "Write about it",
                effects: { authenticity: 2, resilience: 1 },
                result: "Your words hold your truth when no one else does.",
                next: null
            },
            {
                text: "Talk to your mom",
                effects: { resilience: 1, dissociation: -1 },
                result: "She’s hurting too, but now you both carry it together.",
                next: null
            }
        ]
    }
};

function showScene(scene) {
    const sceneData = chapterOneScenes[scene];
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
    narrative.textContent += "\n\n✨ You’ve reached the end of Chapter One.";
    choices.innerHTML = "";

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Continue to Chapter Two ⏭️";
    nextBtn.onclick = () => {
        loadScript("chapter_two_game.js");
    };

    const menuBtn = document.createElement("button");
    menuBtn.textContent = "Return to Hub 🧭";
    menuBtn.onclick = () => {
        window.location.reload(); // Reloads the hub
    };

    choices.appendChild(nextBtn);
    choices.appendChild(menuBtn);
}

showScene("start");

};

showScene(scenes.start);
