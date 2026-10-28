const textbox = document.getElementById('textbox');
const choice1_btn = document.getElementById('choice1');
const choice2_btn = document.getElementById('choice2');
const choice3_btn = document.getElementById('choice3');
const choice4_btn = document.getElementById('choice4');

choice1_btn.addEventListener('click', progressScenario);
choice2_btn.addEventListener('click', progressScenario);
choice3_btn.addEventListener('click', progressScenario);
choice4_btn.addEventListener('click', progressScenario);

const close_popup_btn = document.getElementById('close-popup');
close_popup_btn.addEventListener('click', closeConsequence);

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
    showConsequence(i);
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
let counts = { low: 0, mid: 0, high: 0 };

// call with the option the player picked
function scoreChoice(option) {
    counts[option.level]++;
}

// call when the end of a path is reached
function getCategory() {
    const answered = counts.low + counts.mid + counts.high;
    if (answered === 0) return '';
    const average = (counts.low * 1 + counts.mid * 2 + counts.high * 3) / answered;
    // category names can be changed when and cutoffs can be adjusted
    if (average >= 2.4) return 'Most sustainable';
    if (average >= 1.6) return 'Somewhat sustainable';
    return 'Least sustainable';
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