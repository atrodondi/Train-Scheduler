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
//need to write a code that on load sets the HTML of the train schedule from database
//then we can call it on page load, then once again after a new train is added
function pageLoad() {}

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
      console.log(name, place, first, freq);
    }
  });
}
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val().Train_Name);
  console.log(childSnapshot.val().Destination);
  console.log(childSnapshot.val().First_Train);
  console.log(childSnapshot.val().Frequency);
  $("#schedule").prepend(
    "<tr><th scope='row'>" +
      childSnapshot.val().Train_Name +
      " </th><td>" +
      childSnapshot.val().Destination +
      " <td>" +
      childSnapshot.val().First_Train +
      " </td> </td> <td>" +
      childSnapshot.val().Frequency +
      " </td> <td>Some moment.js function</td></tr>"
  );
});
submitClick();
