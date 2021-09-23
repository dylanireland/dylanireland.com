var cmdTyper = document.getElementById("cmd-typer");
var cmdOutput = document.getElementById("cmd-output");

var texts = ["whoami", "./role --of dylan", "python3 languages_known.py", "python3 other_knowledge.py"];
var answers = ["\"Dylan Ireland\"", "\"Software Engineer\"", ">>> [\"Python\", \"Swift\", \"JavaScript\", \"HTML/CSS\"]", ">>> [\"Git\", \"REST APIs\", \"Blockchain/Web3\", \"LAMP Servers\", \"Bash CLI\"]"];
var totalTexts = texts.length;
var charIndex = 0;
var time = 100;

if (window.innerHeight / window.innerWidth >= 1) {
  cmdTyper.innerHTML = "dyl@host$ "
}

var initialLength = cmdTyper.innerHTML.length;

function showAnswer(tIndex) {
  cmdOutput.innerHTML = answers[tIndex];
}

var write_text = function(tIndex) {
  var text = texts[tIndex];
  cmdTyper.innerHTML = cmdTyper.innerHTML.slice(0, initialLength + charIndex) + text[charIndex];
  if (charIndex < text.length - 1) {
    charIndex++;
    setTimeout(function() {
      write_text(tIndex)
    }, time);
  } else {
    charIndex = 0;
    cursor = document.getElementsByClassName("blinking-cursor")[0];
    cursor.classList.remove("blinking-cursor");
    cursor.classList.add("paused");

    setTimeout(function() {
      showAnswer(tIndex);
      cursor.classList.remove("paused");
      cursor.classList.add("blinking-cursor");
    }, 750);

    setTimeout(function() {
      if (tIndex == texts.length - 1) {
        tIndex = -1;
      }
      write_text(tIndex + 1)
    }, 4000);
  }
}
setTimeout(function() {
  write_text(0)
}, time);
