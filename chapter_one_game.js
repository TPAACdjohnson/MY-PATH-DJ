function mergeGameState(state, renderHUD, nextChapterMenu) {
    const narrative = document.getElementById("narrative");
    const choices = document.getElementById("choices");

    narrative.textContent = "📘 Chapter One: Brooklyn Beginnings\n\nYou are a young Black boy in Brooklyn, raised by a single NYPD mother with four sons. Life is loud, fast, and deeply unjust...";

    choices.innerHTML = "";

    const option1 = document.createElement("button");
    option1.textContent = "Stand up to a bully in school";
    option1.onclick = () => {
        state.resilience += 2;
        state.rage += 1;
        renderHUD();
        nextChapterMenu();
    };
    choices.appendChild(option1);

    const option2 = document.createElement("button");
    option2.textContent = "Stay quiet and go home";
    option2.onclick = () => {
        state.dissociation += 1;
        state.trauma += 1;
        renderHUD();
        nextChapterMenu();
    };
    choices.appendChild(option2);
}

// Start the game
 showScene("start");

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

function showScene(scene) {
    // Display the narrative text
    narrative.textContent = scene.text;
    // Clear previous choices
    choices.innerHTML = "";

    // Render each option as a button
    scene.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = opt.text;
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

if (typeof mergeGameState !== "function") {
    showScene("start");
}
