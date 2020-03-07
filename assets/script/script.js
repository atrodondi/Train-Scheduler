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
      $("#trainName").val("");
      $("#destination").val("");
      $("#firstTrain").val("");
      $("#freq").val("");
      console.log(name, place, first, freq);
    }
  });
}
//apparently, the child_added listener triggers once for each child in the database(looked it up in the documentation because i couldnt figure out how the dom was populating on document load), AND if a child is ever added..so we stumbled upon a fast/most efficient in this case, way to pop the DOM with our firebase data...lucky us hah
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val().Train_Name);
  console.log(childSnapshot.val().Destination);
  let first = childSnapshot.val().First_Train;
  let freq = childSnapshot.val().Frequency;
  let timeLeft = moment().diff(moment.unix(parseInt(first)), "minutes") % freq;
  let minLeft = freq - timeLeft;
  console.log(minLeft);
  let x = parseInt(minLeft);
  console.log(x);
  $("#schedule").prepend(
    "<tr><td scope='row'>" +
      childSnapshot.val().Train_Name +
      " </td><td>" +
      childSnapshot.val().Destination +
      " <td>" +
      childSnapshot.val().Frequency +
      " </td> </td> <td>" +
      childSnapshot.val().Frequency +
      " </td> <td>" +
      minLeft +
      "</td></tr>"
  );
});
submitClick();
