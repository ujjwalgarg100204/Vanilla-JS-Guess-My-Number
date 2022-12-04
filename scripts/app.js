let number = Math.floor(Math.random() * 100 % 20);
const remarks = document.querySelector(".remarks");
const score = document.querySelector("#score");
const highestScore = document.querySelector("#high-score");
const scores = [];

const DEFAULT_COLOR = "hsl(0, 0%, 12%)";

function setBackgroundColor(color) {
    document.querySelector(':root').style.setProperty('--backgroundColor', color);
}

function playAgain() {
    number = Math.floor(Math.random() * 100 % 20);
    remarks.textContent = "Start guessing";
    score.textContent = "20";
    document.querySelector(".number > h1").textContent = "?";
    highestScore.textContent = String(Math.max(...scores) === -Infinity ? 0 : Math.max(...scores));
    document.querySelector("input").value = "0";
    document.querySelector("input").disabled = false;
    setBackgroundColor(DEFAULT_COLOR);
}

/*
Handles all events related to changing of score
 */
function isWinningGuess(guess) {
    if (guess > number)
        remarks.textContent = "📈" + (guess >= number + 5 ? "Too" : "Little") + " High!";
    else if (guess < number)
        remarks.textContent = "📉" + (guess <= number - 5 ? "Too" : "Little") + " Low!";
    else {
        remarks.textContent = "🥳 Correct Answer 🥳";
        document.querySelector(".number > h1").textContent = number;
        return true;
    }
    return false;
}

/*
Game should only work till
    - User wins by guessing the number correctly
    - He gets minimum score possible which is 0, so he will have a max of 20 chances
 */


document.querySelector(".guess").addEventListener("submit", evt => {
    evt.preventDefault();
    const userGuess = Number(document.querySelector("input").value);

    if (isWinningGuess(userGuess)) {
        setBackgroundColor("hsl(107, 47%, 40%)");

        // disable input filed preventing user to put more values
        document.querySelector("input").disabled = true;

        // push current score to scores array, for keeping of the highest score
        scores.push(Number(score.textContent));
    } else {
        // no more chance to get right answer
        if (Number(score.textContent) === 1) {
            setBackgroundColor("red");
            document.querySelector("input").disabled = true;
        }
        score.textContent = String(Number(score.textContent) - 1);
    }
});