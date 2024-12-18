const firebaseConfig = {
  apiKey: "AIzaSyA43iJbOgXeb3bEVPWPmduPIF1KoJIa9g8",
  authDomain: "contactform-horizons.firebaseapp.com",
  databaseURL: "https://contactform-horizons-default-rtdb.firebaseio.com",
  projectId: "contactform-horizons",
  storageBucket: "contactform-horizons.firebasestorage.app",
  messagingSenderId: "569337161265",
  appId: "1:569337161265:web:c2cdd801385a951d6bd710",
};

firebase.initializeApp(firebaseConfig);

var contactFormDB = firebase.database().ref("contactForm");

// Add an event listener for the form submission
document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault(); // Prevent form from refreshing the page

  // Fetch values from the form
  var name = getElementVal("name");
  var Email = getElementVal("Email");
  var phonenum = getElementVal("phonenum");
  var age = getElementVal("age");

  var gender = document.querySelector('input[name="mygender"]:checked')?.id || "Not selected";
  var dateDeparture = getElementVal("dateDeparture");
  var dateReturn = getElementVal("dateReturn");

  var destinations = [];
  if (document.getElementById("bora").checked) destinations.push("Boracay");
  if (document.getElementById("kash").checked) destinations.push("Kashmir");
  if (document.getElementById("istan").checked) destinations.push("Istanbul");
  if (document.getElementById("par").checked) destinations.push("Paris");
  if (document.getElementById("bal").checked) destinations.push("Bali");
  if (document.getElementById("dub").checked) destinations.push("Dubai");
  if (document.getElementById("gen").checked) destinations.push("Geneva");
  if (document.getElementById("port").checked) destinations.push("Port Blair");
  if (document.getElementById("rom").checked) destinations.push("Rome");
  var destinationString = destinations.join(", ");

  var packageType = document.querySelector('input[name="locations"]:checked')?.id || "Not selected";
  var termsAccepted = document.getElementById("termsandcondi").checked ? "Accepted" : "Not Accepted";

  // Save the data to Firebase
  saveMessages(name, Email, phonenum, age, gender, dateDeparture, dateReturn, destinationString, packageType, termsAccepted);

  // Display success message
  alert("You've successfully registered!");

  // Reset the form after successful submission
  document.getElementById("contactForm").reset();
}

function saveMessages(name, Email, phonenum, age, gender, dateDeparture, dateReturn, destinationString, packageType, termsAccepted) {
  contactFormDB.push().set({
    name: name,
    email: Email,
    phone: phonenum,
    age: age,
    gender: gender,
    departure: dateDeparture,
    return: dateReturn,
    destinations: destinationString,
    package: packageType,
    terms: termsAccepted,
  });
}

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
