
const narrative = document.getElementById("narrative");
const choices = document.getElementById("choices");

let state = {
    resilience: 5,
    authenticity: 5,
    trauma: 0
};

function showScene(scene) {
    narrative.textContent = scene.text;
    choices.innerHTML = "";
    scene.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option.text;
        btn.onclick = () => {
            Object.keys(option.effects).forEach(key => state[key] += option.effects[key]);
            if (option.next) showScene(scenes[option.next]);
            else showEnding();
        };
        choices.appendChild(btn);
    });
}

function showEnding() {
    choices.innerHTML = "";
    if (state.authenticity >= 7 && state.resilience >= 7) {
        narrative.textContent = "🔥 You forged a path of truth and power. Your legacy lives on.";
    } else if (state.trauma > 6) {
        narrative.textContent = "⚠️ Trauma slowed your rise. Healing is now your mission.";
    } else {
        narrative.textContent = "🌱 You survived. Now write the next chapter.";
    }
}

const scenes = {
    start: {
        text: "You're a child in a strict household. You're being unfairly scolded. How do you respond?",
        options: [
            { text: "Fight back", effects: { authenticity: 2, resilience: 1, trauma: 1 }, next: "heritage" },
            { text: "Avoid conflict", effects: { resilience: -1, trauma: 2 }, next: "heritage" },
            { text: "Stay silent", effects: { trauma: 2 }, next: "heritage" },
            { text: "Apologize and please", effects: { trauma: 1, resilience: -1 }, next: "heritage" }
        ]
    },
    heritage: {
        text: "At 12, you see your town erased from a history book. What do you do?",
        options: [
            { text: "Speak up about the erasure", effects: { authenticity: 2, resilience: 1 }, next: null },
            { text: "Let it go", effects: { trauma: 2 }, next: null },
            { text: "Internalize quietly", effects: { trauma: 3, resilience: -1 }, next: null },
            { text: "Overachieve for approval", effects: { authenticity: -1, resilience: 1, trauma: 1 }, next: null }
        ]
    }
};

showScene(scenes.start);
