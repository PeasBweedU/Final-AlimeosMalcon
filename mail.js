const firebaseConfig = {
    apiKey: "AIzaSyA43iJbOgXeb3bEVPWPmduPIF1KoJIa9g8",
    authDomain: "contactform-horizons.firebaseapp.com",
    databaseURL: "https://contactform-horizons-default-rtdb.firebaseio.com",
    projectId: "contactform-horizons",
    storageBucket: "contactform-horizons.firebasestorage.app",
    messagingSenderId: "569337161265",
    appId: "1:569337161265:web:c2cdd801385a951d6bd710"
  };

firebase.initializeApp(firebaseConfig);

// Reference to the Realtime Database
var contactFormDB = firebase.database().ref("contactForm");

// Event listener for form submission
document.getElementById("contactForm").addEventListener("submit", submitForm);

// Submit form function
function submitForm(e) {
  e.preventDefault(); // Prevent form from refreshing the page

  // Fetch values from the form fields
  var name = getElementVal("name");
  var Email = getElementVal("Email");
  var phonenum = getElementVal("phonenum");
  var age = getElementVal("age");

  // Get the selected gender
  var gender = document.querySelector('input[name="mygender"]:checked')?.id || "Not selected";

  // Get departure and return dates
  var dateDeparture = getElementVal("dateDeparture");
  var dateReturn = getElementVal("dateReturn");

  // Get selected destinations
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

  // Get the selected package
  var packageType = document.querySelector('input[name="locations"]:checked')?.id || "Not selected";

  // Check if terms and conditions are accepted
  var termsAccepted = document.getElementById("termsandcondi").checked ? "Accepted" : "Not Accepted";

  // Save messages to Firebase
  saveMessages(name, Email, phonenum, age, gender, dateDeparture, dateReturn, destinationString, packageType, termsAccepted);

  // Show success message
  alert("You've successfully registered!");

  // Reset the form after successful submission
  document.getElementById("contactForm").reset();
}

// Save messages to Firebase function
function saveMessages(name, Email, phonenum, age, gender, dateDeparture, dateReturn, destinationString, packageType, termsAccepted) {
  contactFormDB.push()
    .set({
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
    })
    .then(() => {
      console.log("Data saved successfully to Firebase!");
    })
    .catch((error) => {
      console.error("Error saving data to Firebase:", error);
    });
}

// Helper function to get form field values by ID
const getElementVal = (id) => {
  return document.getElementById(id).value;
};
