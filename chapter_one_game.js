
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
    summary += `Trauma: ${state.trauma}\n`;
    summary += `Rage: ${state.rage}\n`;
    summary += `Dissociation: ${state.dissociation}\n`;
    summary += `Purpose: ${state.purpose}\n\n`;

    if (state.trauma > 8) {
        narrative.textContent = "🧨 Your foundation cracked under pressure. Survival became your identity.";
        summary += "High trauma paired with low authenticity has led to chronic emotional fatigue, mistrust, and identity confusion. Healing is your next frontier.";
    } else if (state.resilience >= 8 && state.authenticity >= 7) {
        narrative.textContent = "🔥 You found your fire. You stood firm in truth and built something eternal.";
        summary += "You resisted the erasure of self. Your voice, your pain, and your love became one sacred mission.";
    } else {
        narrative.textContent = "🌒 You endured. But the question remains — did you escape or evolve?";
        summary += "Survival without integration. Some cycles were broken. Others were inherited. The next chapter will test your synthesis.";
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
        text: "You're six years old. Your father is gone. Your mother is a NYPD officer raising four boys alone in Brooklyn. Tonight, the house is tense. What do you do?",
        options: [
            { text: "Ask why mom is crying", effects: { authenticity: 2, trauma: 1 }, result: "You broke the silence, but it wasn't welcomed.", next: "recess" },
            { text: "Hug your little brothers", effects: { resilience: 1, purpose: 1 }, result: "You took the role of protector, early.", next: "recess" },
            { text: "Sit in silence and watch TV", effects: { trauma: 1, dissociation: 1 }, result: "You internalized pain through static noise.", next: "recess" },
            { text: "Pretend everything is fine", effects: { dissociation: 2 }, result: "You learned the mask early.", next: "recess" }
        ]
    },
    recess: {
        text: "At school, kids divide by race. You're asked: 'Why is your mom a cop?'",
        options: [
            { text: "She's trying to survive", effects: { authenticity: 1, trauma: 1 }, result: "You defended her with painful truth.", next: "visit" },
            { text: "She's a hero", effects: { resilience: 1, purpose: 1 }, result: "You leaned into strength, even if alone.", next: "visit" },
            { text: "She's not really a cop", effects: { dissociation: 2 }, result: "You disconnected from her identity to avoid rejection.", next: "visit" }
        ]
    },
    visit: {
        text: "Your mom visits school in uniform. Teachers treat you differently.",
        options: [
            { text: "Use it to gain respect", effects: { resilience: 1, rage: 1 }, result: "Power tasted good but felt fake.", next: "alone" },
            { text: "Ask her not to come again", effects: { authenticity: 1, trauma: 2 }, result: "You distanced yourself from love out of fear.", next: "alone" },
            { text: "Say nothing", effects: { trauma: 1, dissociation: 1 }, result: "The weight built silently.", next: "alone" }
        ]
    },
    alone: {
        text: "Your friends ask where your dad is. The air stiffens.",
        options: [
            { text: "Say he left", effects: { authenticity: 2, trauma: 1 }, result: "You embraced the pain head-on.", next: null },
            { text: "Say he's busy working", effects: { dissociation: 2 }, result: "You constructed a fiction to avoid the ache.", next: null },
            { text: "Say nothing and walk away", effects: { trauma: 1, rage: 1 }, result: "You bottled the sorrow and let it calcify.", next: null }
        ]
    }
};

showScene(scenes.start);
