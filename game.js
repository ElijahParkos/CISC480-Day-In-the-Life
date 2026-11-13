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
    const scenario = scenarios[current];
    const option = scenarios.Options[i];
    showConsequence(i);

    // skip the day selection screen so it isn't scored or listed in the summary
    if (current !== scenarios.Start) {
        recordChoice(scenario.Text, option['Choice' + (i + 1)], option.score);
        scoreChoice(option);
    }
    
    if (option.Next) {
        showScenario(option.Next);
    } else {
        showEndingSummary(getCategory());
    }
}

// Scoring
let earnedPoints = 0;
let bestPossible = 0;
let worstPossible = 0;

// returns the scores of a scenario's options as an array
function getScores(scenario) {
    return scenario.Options
        .map(function (opt) { return opt.score; })
        .filter(function (s) { return typeof s === 'number'; });
}

// call with the scenario on screen and the option the player picked
function scoreChoice(scenario, option) {
    if (typeof option.score !== 'number') return;
    const scores = getScores(scenario);
    earnedPoints = earnedPoints + option.score;
    bestPossible = bestPossible + Math.max(...scores);
    worstPossible = worstPossible + Math.min(...scores);
}

function getPercent() {
    if (bestPossible === worstPossible) return 100;
    return Math.round((earnedPoints - worstPossible) / (bestPossible - worstPossible) * 100);
}

// call when the end of a path is reached
function getCategory() {
    if (bestPossible === 0) return '';
    const percent = getPercent();
    // cutoffs split 0-100% into thirds, adjust as needed
    if (percent >= 67) return `Most sustainable: ${percent}%`;
    if (percent >= 34) return `Somewhat sustainable: ${percent}%`;
    return `Least sustainable: ${percent}%`;
}
