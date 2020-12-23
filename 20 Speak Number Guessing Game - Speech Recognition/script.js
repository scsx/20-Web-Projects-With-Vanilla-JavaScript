const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("Number: " + randomNum);

window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let rec = new window.SpeechRecognition();

// Start recognition and game
rec.start();

function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function writeMessage(msg) {
    msgEl.innerHTML = `
        <div>You said:</div>
        <span class="box">${msg}</span>
    `;
}

function checkNumber(msg) {
    const num = +msg;

    if (Number.isNaN(num)) {
        msgEl.innerHTML = "<div>That's not a number</div>";
        return;
    }

    if (num > 100 || num < 1) {
        msgEl.innerHTML += "<div>Number must be bewteen 1 and 100</div>";
        return;
    }

    if (num === randomNum) {
        document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
    } else if (num > randomNum) {
        msgEl.innerHTML += "<div>GO LOWER</div>";
    } else {
        msgEl.innerHTML += "<div>GO HIGHER</div>";
    }
}

// Speak result
rec.addEventListener("result", onSpeak);

// End SR
rec.addEventListener("end", () => rec.start());

document.body.addEventListener('click', e => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
});