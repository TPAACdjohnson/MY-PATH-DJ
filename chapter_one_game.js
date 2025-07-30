
function mergeGameState(existingState) {
    window.gameState = existingState;
    showScene("start");
}

const chapterOneScenes = {
    start: {
        text: "CHAPTER ONE: Brooklyn Beginnings\n\nYou’re a young Black boy in Brooklyn. No father. Four brothers. Your mother, a NYPD officer, raises you all while fighting battles at work and home. One night, you hear your mom crying. What do you do?",
        options: [
            {
                text: "Stay in your bed. Say nothing.",
                effects: { dissociation: 1 },
                result: "You learn early to keep pain private. But it eats you silently.",
                next: "school"
            },
            {
                text: "Go to her, comfort her.",
                effects: { resilience: 1, authenticity: 1 },
                result: "She hugs you like you’re her equal. You feel old too young.",
                next: "school"
            },
            {
                text: "Cry too, but alone.",
                effects: { trauma: 1 },
                result: "Your tears become invisible ink in your story.",
                next: "school"
            }
        ]
    },
    school: {
        text: "At school, you're the quiet one. They call you 'gifted' one day and 'problem' the next. Today a teacher accuses you of cheating. What do you do?",
        options: [
            {
                text: "Argue back. You know your worth.",
                effects: { rage: 1, authenticity: 1 },
                result: "You speak up. You’re sent to the office anyway.",
                next: "conclusion"
            },
            {
                text: "Say nothing. Just take the punishment.",
                effects: { dissociation: 1, trauma: 1 },
                result: "You learn silence sometimes keeps you safe. But not whole.",
                next: "conclusion"
            },
            {
                text: "Ask the teacher why she thinks that.",
                effects: { resilience: 1 },
                result: "She’s stunned. No one's ever asked. She reconsiders.",
                next: "conclusion"
            }
        ]
    },
    conclusion: {
        text: "You go home that night. You think about your brothers. You think about who you’re becoming. You’re not a child anymore. Just a survivor with a soft heart under all that armor.",
        options: []
    }
};

function showScene(sceneId) {
    const scene = chapterOneScenes[sceneId];
    narrative.textContent = scene.text;
    choices.innerHTML = "";

    if (scene.options.length === 0) {
        showChapterEndOptions();
        return;
    }

    scene.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt.text;
        btn.onclick = () => {
            updateGameState(opt.effects);
            narrative.textContent = opt.result;
            if (opt.next) {
                setTimeout(() => showScene(opt.next), 1500);
            } else {
                setTimeout(showChapterEndOptions, 1500);
            }
        };
        choices.appendChild(btn);
    });
}

function showChapterEndOptions() {
    narrative.textContent += "\n\n📘 Chapter One Complete.";
    choices.innerHTML = "";

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "➡️ Continue to Chapter Two";
    nextBtn.onclick = () => {
        loadScript("chapter_two_game.js");
    };

    const hubBtn = document.createElement("button");
    hubBtn.textContent = "🧭 Return to Hub";
    hubBtn.onclick = () => {
        location.reload();
    };

    choices.appendChild(nextBtn);
    choices.appendChild(hubBtn);
}

if (typeof mergeGameState !== "function") {
    showScene("start");
}
