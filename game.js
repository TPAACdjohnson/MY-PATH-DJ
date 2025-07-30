const narrative = document.getElementById("narrative");
const choices = document.getElementById("choices");

let state = {
    resilience: 5,
    authenticity: 5,
    trauma: 0,
    history: []
};

function showScene(scene) {
    narrative.textContent = scene.text;
    choices.innerHTML = "";
    scene.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option.text;
        btn.onclick = () => {
            Object.keys(option.effects).forEach(key => state[key] += option.effects[key]);
            state.history.push(option.result);
            if (option.next) showScene(scenes[option.next]);
            else showEnding();
        };
        choices.appendChild(btn);
    });
}

function showEnding() {
    choices.innerHTML = "";
    let summary = "🏁 FINAL OUTCOME:\n\n";
    summary += `Resilience: ${state.resilience}\n`;
    summary += `Authenticity: ${state.authenticity}\n`;
    summary += `Trauma: ${state.trauma}\n\n`;

    if (state.authenticity >= 7 && state.resilience >= 7) {
        narrative.textContent = "🔥 You forged a path of truth and power. Your legacy lives on.";
        summary += "You are grounded in truth and strength. You overcame systemic suppression and personal trauma with grace. Your leadership is both magnetic and healing.";
    } else if (state.trauma > 6) {
        narrative.textContent = "⚠️ Trauma slowed your rise. Healing is now your mission.";
        summary += "Your trauma has calcified into anxiety, depressive tendencies, or dissociation. You may struggle with trust, emotional fatigue, or chronic hypervigilance. Healing must become your first act of leadership.";
    } else {
        narrative.textContent = "🌱 You survived. Now write the next chapter.";
        summary += "You carry unhealed wounds and partial awareness. You may experience imposter syndrome, social fawning, or unresolved grief. Your foundation is shaky but unbroken. You’re at a turning point — rebuild or repeat.";
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

const scenes = {
    start: {
        text: "You're a child in a strict household. You're being unfairly scolded. How do you respond?",
        options: [
            { text: "Fight back", effects: { authenticity: 2, resilience: 1, trauma: 1 }, result: "You stood up for yourself and sparked early defiance.", next: "heritage" },
            { text: "Avoid conflict", effects: { resilience: -1, trauma: 2 }, result: "You escaped, but fear embedded itself deeper.", next: "heritage" },
            { text: "Stay silent", effects: { trauma: 2 }, result: "You froze, protecting yourself by disappearing emotionally.", next: "heritage" },
            { text: "Apologize and please", effects: { trauma: 1, resilience: -1 }, result: "You became the peacemaker at the cost of your voice.", next: "heritage" }
        ]
    },
    heritage: {
        text: "At 12, you see your town erased from a history book. What do you do?",
        options: [
            { text: "Speak up about the erasure", effects: { authenticity: 2, resilience: 1 }, result: "You honored your heritage and sparked your protector path.", next: null },
            { text: "Let it go", effects: { trauma: 2 }, result: "You disengaged, letting silence speak for your pain.", next: null },
            { text: "Internalize quietly", effects: { trauma: 3, resilience: -1 }, result: "The erasure became part of your shame, sowing self-doubt.", next: null },
            { text: "Overachieve for approval", effects: { authenticity: -1, resilience: 1, trauma: 1 }, result: "You turned pain into performance, hiding the wound with excellence.", next: null }
        ]
    }
};

showScene(scenes.start);
