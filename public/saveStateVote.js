"use strict";

(function () {
  var buttons = document.querySelectorAll(".choice button"),
    tallyVal = {
      1: 0,
      2: 0,
      total: 0
    };

  function voteState(choice) {
    tallyVal[choice]++;
    tallyVal["total"]++;
    console.log(tallyVal);
  }

  function barPercentage(node, tallyVal) {
    var choice = node.dataset.choice;
    if (tallyVal[choice]) return (tallyVal[choice] / tallyVal["total"]) * 100;
    return 0;
  }

  function renderBars() {
    var bars = document.getElementsByClassName("bar");
    var percentage;
    for (var i = 0; i < bars.length; i++) {
      percentage = barPercentage(bars[i], tallyVal);
      console.log(percentage);
      bars[i].style.height = percentage.toString() + "%";
    }
  }

  function setup() {
    // Set up event listeners
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (e) {
        voteState(e.target.dataset["choice"]);
        renderBars();
      });
    }
    renderBars();
  }
  setup();
})();
