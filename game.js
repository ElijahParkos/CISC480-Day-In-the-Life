async function fetchJSONFromFile(url) {
    try {
        const file = await fetch(url);
        if(!file.ok) throw new Error("Error fetching file");
        const data = await file.text();
        return JSON.parse(data);
    } catch(err) {
        console.error(err);
    }
}

async function init() {
    let scenarios_data = await fetchJSONFromFile('./scenarios.json');

    const textbox = document.getElementById('textbox');
    const choice1_btn = document.getElementById('choice1');
    const choice2_btn = document.getElementById('choice2');
    const choice3_btn = document.getElementById('choice3');
    const choice4_btn = document.getElementById('choice4');

    choice1_btn.addEventListener('click', progressScenario);
    choice2_btn.addEventListener('click', progressScenario);
    choice3_btn.addEventListener('click', progressScenario);
    choice4_btn.addEventListener('click', progressScenario);

    let scenario = -1;
    function progressScenario() {
        scenario++;
        const currentScenario = scenarios_data[`Scenario${scenario}`];
        if(currentScenario) {
            textbox.textContent = currentScenario.Text;
            choice1_btn.textContent = currentScenario.Choice1;
            choice2_btn.textContent = currentScenario.Choice2;
            choice3_btn.textContent = currentScenario.Choice3;
            choice4_btn.textContent = currentScenario.Choice4;
        } else {
            textbox.textContent = `Scenario ${scenario+1}`;
            choice1_btn.textContent = `Choice ${scenario*4+1}`;
            choice2_btn.textContent = `Choice ${scenario*4+2}`;
            choice3_btn.textContent = `Choice ${scenario*4+3}`;
            choice4_btn.textContent = `Choice ${scenario*4+4}`;
        }
    }
    progressScenario();
}


init();