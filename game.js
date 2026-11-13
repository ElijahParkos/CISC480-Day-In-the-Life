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

let scenarios = {};   // loaded from scenarios.json
let current = null;   // id of the scenario on screen

fetch('./scenarios.json')
    .then((res) => res.json())
    .then((data) => {
        scenarios = data;
        showScenario(data.Start);
    });

function showScenario(id) {
    current = id;
    const s = scenarios[id];

    textbox.textContent = s.Text;
    choice1_btn.textContent = s.Options[0].Choice1;
    choice2_btn.textContent = s.Options[1].Choice2;
    choice3_btn.textContent = s.Options[2].Choice3;
    choice4_btn.textContent = s.Options[3].Choice4;
}

function progressScenario(event) {
    const i = Number(event.target.id.replace('choice', '')) - 1;
    const option = scenarios[current].Options[i];

    scoreChoice(option);
    if (option.Next) {
        showScenario(option.Next);
    } else {
        textbox.textContent = getCategory();
    }
}

// Scoring
// Score keeper for each level of sustainability
// let counts = { low: 0, low_mid: 0, mid: 0, high_mid: 0, high: 0 };
scores = []

// call with the option the player picked
function scoreChoice(option) {
    // counts[option.level]++;
    scores.push(option.level)
}

// call when the end of a path is reached
function getCategory() {
    // const answered = counts.low + counts.low_mid + counts.mid + counts.high_mid + counts.high;
    // if (answered === 0) return '';
    // const average = (counts.low * 1 + counts.low_mid * 2 + counts.mid * 3 + counts.high_mid * 4 + counts.high * 5) / answered;
    const sum = scores.reduce((x, y) => x + y, 0);
    const average = sum / scores.length;

    // category names can be changed when and cutoffs can be adjusted
    if (average >= 3.4) return 'Great job acting sustainably!';
    if (average >= 1.7) return 'Keep up the good work, and keep learning about sustainable actions you can take in your day!';
    return 'Your actions could be more sustainable, so keep learning about sustainable actions you can take in your day!';
}


function showConsequence(selected_option) {
    const consequence_text = document.querySelector('#consequence');
    const option = scenarios[current].Options[selected_option];
    if(!("Consequence" in option)) return;
    consequence_text.textContent = option.Consequence;
    const dialog = document.querySelector('dialog');
    dialog.showModal();
}

function closeConsequence() {
    const dialog = document.querySelector('dialog');
    dialog.close();
}