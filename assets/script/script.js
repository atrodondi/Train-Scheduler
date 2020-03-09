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
      console.log(name, place, first, freq);
    }
  });
}
//so added an interval...issue is it doesnt populate page until first interval, makes sense. it also duplicates, doesnt update. so need to fix that. need to write condition if it is inputting the same item, don't
database.ref().on("child_added", function(childSnapshot) {
  let train = childSnapshot.val().Train_Name;
  let place = childSnapshot.val().Destination;
  let first = childSnapshot.val().First_Train;
  let freq = childSnapshot.val().Frequency;
  let diff = moment
    .duration(moment().diff(moment(first, "HH:mm")), "milliseconds")
    .asMinutes();
  let timeLeft = freq - (Math.floor(diff) % freq);
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
