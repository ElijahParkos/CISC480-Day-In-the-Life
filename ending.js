// ending summary that records each choice the player makes
// and shows a summary screen when their path ends.
//
// load this file before game.js in index.html since it must read the 
// current scenario and choice text before game.js swaps in the next one


const choiceHistory = [];

// track choices from user by adding to choiceHistory
function recordChoice(scenario, option) {
    choiceHistory.push({
        question: scenario.text,
        choice: option.text,
        level: option.level // undefined for now, need levels
    });
}

// path is over when the chosen option doesn't point to another scenario
// need next fields in scenarios.json
function isEndOfPath(option) {
    return !option.next;
}

// display choices the player made
// also can put scoring feedback and results info here
function showEndingSummary(rankText) {
    if (document.getElementById('ending-screen')) return;

    // hide the scenario text and the choice buttons
    document.querySelector('.text-container').style.display = 'none';
    document.querySelector('.choice-container').style.display = 'none';

    // make matching
    const endingScreen = document.createElement('div');
    endingScreen.id = 'ending-screen';
    endingScreen.className = 'text-container';
    endingScreen.style.overflowY = 'auto'; 

    const content = document.createElement('div');
    content.className = 'textbox';

    const heading = document.createElement('h1');
    heading.textContent = 'Your day in review';
    content.appendChild(heading);

    if (rankText) {
        const rank = document.createElement('h2');
        rank.textContent = rankText;
        content.appendChild(rank);
    }

    // list choices per scenario
    const list = document.createElement('ol');
    choiceHistory.forEach(function (entry) {
        const item = document.createElement('li');

        const question = document.createElement('p');
        question.textContent = entry.question;

        const choice = document.createElement('p');
        choice.textContent = `You chose: ${entry.choice}`;

        item.appendChild(question);
        item.appendChild(choice);
        list.appendChild(item);
    });
    content.appendChild(list);

    const playAgain = document.createElement('button');
    playAgain.className = 'choice-btn';
    
    playAgain.style.height = 'auto';
    playAgain.style.padding = '1em';
    playAgain.textContent = 'Play again';
    playAgain.addEventListener('click', function () {
        location.reload();
    });
    content.appendChild(playAgain);

    endingScreen.appendChild(content);
    document.querySelector('main').appendChild(endingScreen);
}

// temporary placeholder until scenarios.json is filled in
// right now assume end after 5 choices
const length = 5;
const endingTextbox = document.getElementById('textbox');

document.querySelectorAll('.choice-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        recordChoice({ text: endingTextbox.textContent }, { text: btn.textContent });

        if (choiceHistory.length >= length) {
            showEndingSummary();
        }
    });
});
