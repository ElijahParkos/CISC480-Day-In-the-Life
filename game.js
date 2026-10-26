// TODO: Pull scenarios from scenarios.json file

const textbox = document.getElementById('textbox');
const choice1_btn = document.getElementById('choice1');
const choice2_btn = document.getElementById('choice2');
const choice3_btn = document.getElementById('choice3');
const choice4_btn = document.getElementById('choice4');

choice1_btn.addEventListener('click', progressScenario);
choice2_btn.addEventListener('click', progressScenario);
choice3_btn.addEventListener('click', progressScenario);
choice4_btn.addEventListener('click', progressScenario);

let scenario = 0;
// score keeper
let counts = { low: 0, mid: 0, high: 0 };
function progressScenario() {
    scenario++;
    textbox.textContent = `Scenario ${scenario+1}`;
    choice1_btn.textContent = `Choice ${scenario*4+1}`
    choice2_btn.textContent = `Choice ${scenario*4+2}`
    choice3_btn.textContent = `Choice ${scenario*4+3}`
    choice4_btn.textContent = `Choice ${scenario*4+4}`
}

function recordScore(event) {
    const i = Number(event.target.id.replace('choice', '')) - 1;
    counts[scenarios[scenario - 1].options[i].level]++;

    // after the last scenario, add up the points
    if (scenario === scenarios.length) {
        const total = counts.low * 3 + counts.mid * 2 + counts.high * 1;
        // category names will be changed when we decide and ranges can be adjusted
        let category = 'Most sustainable';                      // 12-15
        if (total <= 7) category = 'Least sustainable';         // <7
        else if (total <= 11) category = 'Somewhat sustainable'; // 8-11

        textbox.textContent = category;
    }
}

[choice1_btn, choice2_btn, choice3_btn, choice4_btn].forEach((btn) =>
    btn.addEventListener('click', recordScore)
);