// ending summary that records each choice the player makes
// and shows a summary screen when their path ends.
//
// load this file before game.js in index.html since it must read the 
// current scenario and choice text before game.js swaps in the next one


const choiceHistory = [];

// track choices from user by adding to choiceHistory
function recordChoice(question, choice, score, best, consequence) {
    choiceHistory.push({ question: question, choice: choice, score: score, best: best, consequence: consequence || '' });
}

// path is over when the chosen option doesn't point to another scenario
// need next fields in scenarios.json
function isEndOfPath(option) {
    return !option.next;
}

// display choices the player made
// also can put scoring feedback and results info here
function showEndingSummary(rankText) {
    //if (document.getElementById('ending-screen')) return;

    // hide the scenario text and the choice buttons
    document.querySelector('.text-container').style.display = 'none';
    document.querySelector('.choice-container').style.display = 'none';

    // make matching
    const endingScreen = document.querySelector('#ending-screen');
    // endingScreen.id = 'ending-screen';
    endingScreen.style.display = 'block';
    endingScreen.className = 'text-container';
    endingScreen.style.overflowY = 'auto'; 

    const content = document.createElement('div');
    content.className = 'textbox';

    const section_heading = document.createElement('h2');
    section_heading.style.textAlign = 'center';
    if (getDayType() == 'Sunday') {
        section_heading.textContent  = 'How was your Sunday?'
    } else {
        section_heading.textContent  = `How was your ${getDayType()} Day?`
    }
    
    content.appendChild(section_heading);


    if (rankText) {
        const rank = document.createElement('h3');
        rank.style.textAlign = 'center';
        rank.textContent = rankText;
        content.appendChild(rank);
    }

    const list_header = document.createElement('h3');
    list_header.textContent = "Let's take a closer look:";
    content.appendChild(list_header);

    // list choices per scenario
    const list = document.createElement('ol');
        choiceHistory.forEach(function (entry) {
        const item = document.createElement('li');

        const question = document.createElement('p');
        question.textContent = entry.question;

        const choice = document.createElement('p');
        choice.textContent = `You chose: ${entry.choice}`;

        const consequence = document.createElement('p');
        consequence.textContent = `Remember: ${entry.consequence}`;

        item.appendChild(question);
        item.appendChild(choice);
        item.appendChild(consequence);


        if (entry.score !== undefined) {
            const score = document.createElement('p');
            score.textContent = `Score: ${entry.score}/${entry.best}`;
            item.appendChild(score);
        }

        list.appendChild(item);
    });
    content.appendChild(list);

    const comment_container = document.createElement('div');
    comment_container.style.display = 'flex';
    comment_container.style.flexDirection = 'column';
    comment_container.style.alignItems = 'center';
    const comment = document.createElement(`h2`);
    comment.textContent = getComment();
    comment.style.textAlign = 'center';
    comment_container.appendChild(comment);


    const playAgain = document.createElement('button');
    playAgain.className = 'choice-btn';
    
    playAgain.style.height = 'auto';
    playAgain.style.padding = '1em';
    playAgain.style.width = '150px';
    playAgain.style.textAlign = 'center';
    playAgain.textContent = 'Play again';
    playAgain.style.minHeight = '0px';
    playAgain.addEventListener('click', function () {
        location.reload();
    });
    comment_container.appendChild(playAgain);
    content.appendChild(comment_container);
    endingScreen.appendChild(content);
    document.querySelector('.banner').appendChild(endingScreen);
}
