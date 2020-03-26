//initialize firebase
var firebaseConfig = {
  apiKey: "AIzaSyB1Ije9D0QD_kYnF4Wc_tgsqsS-Ym0PFd0",
  authDomain: "first-project-9264f.firebaseapp.com",
  databaseURL: "https://first-project-9264f.firebaseio.com",
  projectId: "first-project-9264f",
  storageBucket: "first-project-9264f.appspot.com",
  messagingSenderId: "775514312949",
  appId: "1:775514312949:web:ad4a9a39bc59555b62b5bc",
  measurementId: "G-QLZXCP083P"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var name = "";
var place = "";
var first;
var freq = 0;

//function that control Submit button
function submitClick() {
  $("#submit").on("click", function() {
    event.preventDefault();
    if (
      ($("#trainName").val() == "") |
      ($("#destination").val() == "") |
      ($("#firstTrain").val() == "") |
      ($("#freq").val() == "")
    ) {
      alert(
        "Type something into the empty boxes to add train info, it appears you are missing some information!"
      );
    } else {
      //grabbing the values from input
      name = $("#trainName")
        .val()
        .trim();

      place = $("#destination")
        .val()
        .trim();
      first = $("#firstTrain")
        .val()
        .trim();
      freq = $("#freq")
        .val()
        .trim();
      //storing them in database
      database.ref().push({
        Train_Name: name,
        Destination: place,
        First_Train: first,
        Frequency: freq
      });
      //clearing input boxes after train is added
      $("#trainName").val("");
      $("#destination").val("");
      $("#firstTrain").val("");
      $("#freq").val("");
      alert("New Train Added!");
    }
  });
}
//when the page loads, each train object in the database populates the page. When a new train is added, it is pushed to the DOM at the top of the Train Schedule
database.ref().on("child_added", function(childSnapshot) {
  let train = childSnapshot.val().Train_Name;
  let place = childSnapshot.val().Destination;
  let first = childSnapshot.val().First_Train;
  let freq = childSnapshot.val().Frequency;
  //realized i needed to format the given start time to make it a time from today, not just some time that couldnt be computed, i kept getting invalid date.
  let diff = moment
    .duration(moment().diff(moment(first, "HH:mm")), "milliseconds")
    .asMinutes();
  let timeLeft = freq - (Math.floor(diff) % freq);
  //lots of googling, stack overflow searching. came up on Conditional(ternary) operator. So here is where the issue of first train time on today issue was solved. if the diff is positive, meaning first train has come already(diff = difference of time between now and first train time), then we add the time until the next train to right now, and get the arrival time. if diff is negative, as in the first time hasnt happened yet, the next arrival is the first train time, whenever that is
  let arrival =
    diff > 0 ? moment().add(timeLeft, "minutes") : moment(first, "HH:mm");
  let minLeft = Math.ceil(
    moment.duration(moment(arrival).diff(moment()), "milliseconds").asMinutes()
  );

  $("#schedule").prepend(
    "<tr><td scope='row'>" +
      train +
      " </td><td>" +
      place +
      " <td>" +
      freq +
      " </td> </td> <td>" +
      arrival.format("hh:mm A") +
      " </td> <td>" +
      minLeft +
      "</td></tr>"
  );
});
submitClick();
