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
function progressScenario() {
    scenario++;
    textbox.textContent = `Scenario ${scenario+1}`;
    choice1_btn.textContent = `Choice ${scenario*4+1}`
    choice2_btn.textContent = `Choice ${scenario*4+2}`
    choice3_btn.textContent = `Choice ${scenario*4+3}`
    choice4_btn.textContent = `Choice ${scenario*4+4}`
}