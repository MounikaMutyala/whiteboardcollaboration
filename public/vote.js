function voteForLeaderFunction() {
  var socket = io();
  socket.on("voting", onVotingUserEvent);
  onVotingUserEvent();

  function onVotingUserEvent() {
    var user = prompt("Enter your name.");
    var vote = prompt("Who you wanna vote to? Choose one:", "");
    var data = [{ user, vote }];
    console.log("user", data);
    console.log("vote", data);
    console.log(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch("/scores", options).then(response => {
      console.log(response);
    });
    voteUserAction(data);
  }

  function voteUserAction(data) {
    //voting scores calculation
    var scores = data.reduce((accVal, curVal) => {
      if (!accVal[curVal.vote]) {
        accVal[curVal.vote] = 1;
      } else {
        accVal[curVal.vote]++;
      }
      return accVal;
    }, {});

    console.log(scores);

    var sortScores = [];
    for (var person in scores) {
      sortScores.push([person, scores[person]]);
    }

    sortScores.sort(function (b, a) {
      return a[1] - b[1];
    });
    console.log(sortScores);
    if (sortScores.length > 0) {
      console.log(sortScores[0][0] + " will be the leader.");
    } else {
      console.log("No leader is choosen");
    }

    if (!socket.emit) {
      return;
    }
    socket.emit("voting", sortScores);
  }
}
