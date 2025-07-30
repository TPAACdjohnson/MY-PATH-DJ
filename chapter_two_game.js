// Fix any errors in this script
// Check this function for logic errors and improve readability
const scenes = {
    start: {
        text: "CHAPTER TWO: Georgia\n\nAfter your mom divorces her cheating husband, she transfers to the Alpharetta Police Department — becoming the first Black female sergeant. No applause. No celebration. Just more silence. What do you do?",
        options: [
            { text: "Congratulate her and smile", effects: { resilience: 1, purpose: 1 }, result: "You forced a smile. The pain didn’t leave, but you showed up anyway.", next: "school_shift" },
            { text: "Say nothing. Just observe", effects: { dissociation: 1, trauma: 1 }, result: "You withdrew into yourself, again.", next: "school_shift" },
            { text: "Tell your friends", effects: { authenticity: 1 }, result: "You wanted someone to care. They didn’t.", next: "school_shift" }
        ]
    },
    school_shift: {
        text: "You move through three elementary schools, one middle school, and four high schools. Stability is fiction. Friendships dissolve. Where do you lean?",
        options: [
            { text: "Try to fit in fast", effects: { dissociation: 1, rage: 1 }, result: "You became a chameleon, but lost your color.", next: "self_parenting" },
            { text: "Focus on academics", effects: { purpose: 1, trauma: 1 }, result: "You tried to use grades as salvation, but the weight stayed.", next: "self_parenting" },
            { text: "Start protecting your brothers", effects: { resilience: 2 }, result: "You became the anchor for everyone else.", next: "self_parenting" }
        ]
    },
    self_parenting: {
        text: "You cooked, cleaned, and basically raised yourself and your brothers. You weren’t the oldest, but you were the strongest. How do you handle it?",
        options: [
            { text: "Own the role with pride", effects: { purpose: 2, trauma: 1 }, result: "Responsibility became identity. Childhood disappeared.", next: "dad_returns" },
            { text: "Complain quietly", effects: { rage: 1, authenticity: 1 }, result: "You questioned why no one helped. And still kept going.", next: "dad_returns" },
            { text: "Shut down emotionally", effects: { dissociation: 2 }, result: "You numbed the pain, but it never left.", next: "dad_returns" }
        ]
    },
    dad_returns: {
        text: "At 17, your dad comes back. You move in with him, but he doesn’t treat you well. The pain deepens. What do you do?",
        options: [
            { text: "Work a job to survive", effects: { resilience: 1, trauma: 1 }, result: "You became your own provider in high school.", next: "milestones" },
            { text: "Suppress your emotions", effects: { trauma: 2 }, result: "You bottled everything just to avoid exploding.", next: "milestones" },
            { text: "Confront him", effects: { authenticity: 2, rage: 1 }, result: "He didn’t change, but you didn’t shrink.", next: "milestones" }
        ]
    },
    milestones: {
        text: "You missed prom. You couldn’t afford new clothes. You graduated with 8th-grade math. But you scored off the charts on the ASVAB. What does this mean to you?",
        options: [
            { text: "I’m smarter than they knew", effects: { authenticity: 2, resilience: 1 }, result: "You realized no test or teacher could measure your will.", next: null },
            { text: "I’m still not good enough", effects: { trauma: 1, dissociation: 1 }, result: "You doubted yourself even through your win.", next: null },
            { text: "God made a way", effects: { purpose: 2 }, result: "You saw divine fingerprints on your survival.", next: null }
        ]
    }
};

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
            }
        };
        choices.appendChild(btn);
    });
}

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

showScene(scenes.start);
