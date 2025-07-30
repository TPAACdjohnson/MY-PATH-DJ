export function chapterOne(state, renderHUD, nextChapterMenu) {
    const narrative = document.getElementById("narrative");
    const choices = document.getElementById("choices");

    narrative.textContent = "📘 Chapter One: Brooklyn Beginnings\n\nNo father. Four boys. One NYPD mother. The streets of Brooklyn press in. You must choose how to survive — and what kind of soul you become.";

    choices.innerHTML = "";

    const options = [
        {
            text: "Protect your brothers with food and stories",
            effect: { resilience: 2, authenticity: 1 }
        },
        {
            text: "Get in a fight after being disrespected",
            effect: { rage: 2, trauma: 1 }
        },
        {
            text: "Shut down emotionally and zone out",
            effect: { dissociation: 2, trauma: 1 }
        }
    ];

    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt.text;
        btn.onclick = () => {
            for (const stat in opt.effect) {
                state[stat] += opt.effect[stat];
            }
            renderHUD();
            nextChapterMenu();
        };
        choices.appendChild(btn);
    });
}
