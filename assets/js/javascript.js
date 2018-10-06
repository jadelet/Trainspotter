var tFrequency
var firstTrain


// First Time (pushed back 1 year to make sure it comes before current time)
var firstTrainConverted = moment(firstTrain, "ddhh:mm").subtract(1, "days");
console.log(firstTrainConverted);

// Current Time

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm")); 

var config = {
  apiKey: "AIzaSyBG1qcRZ5gII3qwchd7151UkHT9c43q9mQ",
  authDomain: "trainspotter-ae8f9.firebaseapp.com",
  databaseURL: "https://trainspotter-ae8f9.firebaseio.com",
  projectId: "trainspotter-ae8f9",
  storageBucket: "trainspotter-ae8f9.appspot.com",
  messagingSenderId: "807106396715"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#new-train-btn").on("click", function (event) {
  event.preventDefault();
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "hh:mm").format("X");
  var tFrequency = $("#frequency-input").val().trim();

  var newGrice = {
    name: trainName,
    dest: destination,
    start: firstTrain,
    freq: tFrequency
  };

  database.ref().push(newGrice);

  console.log(newGrice.name);
  console.log(newGrice.dest);
  console.log(newGrice.start);
  console.log(newGrice.freq);

  alert("Train spotted");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().start;
  var tFrequency = childSnapshot.val().freq;

  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(tFrequency);

   var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  console.log(firstTrainConverted);
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(tFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain)
  );

  // Append the new row to the table
  $("#schedule-table > tbody").append(newRow);
});