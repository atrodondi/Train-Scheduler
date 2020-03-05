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

function submitClick() {
  $("#submit").on("click", function() {
    event.preventDefault();
    let name = $("#trainName")
      .val()
      .trim();
    let place = $("#destination")
      .val()
      .trim();
    let first = $("#firstTrain")
      .val()
      .trim();
    let freq = $("#freq")
      .val()
      .trim();
    console.log(name, place, first, freq);

    database.ref().push({
      Train_Name: name,
      Destination: place,
      First_Train: first,
      Frequency: freq
    });
  });
}
submitClick();
