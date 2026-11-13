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
let totalScore = 0;
let scoredChoices = 0;

function scoreChoice(option) {
    if (typeof option.score !== 'number') return; // ignore options without a score
    totalScore = totalScore + option.score;
    scoredChoices++;
}

// call when the end of a path is reached
function getCategory() {
    if (scoredChoices === 0) return '';
    const average = totalScore / scoredChoices;
    // cutoffs split the 1-5 range into thirds
    if (average >= 3.7) return 'Positive Sustainability Impact';
    if (average >= 2.4) return 'Neutral Sustainability Impact';
    return 'Negative Sustainability Impact';
}
