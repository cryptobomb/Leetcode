import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIsIZfbEksEvhFSAmro-_nAIDRO5ugMhg",
  authDomain: "trash-wise.firebaseapp.com",
  projectId: "trash-wise",
  storageBucket: "trash-wise.appspot.com",
  messagingSenderId: "551053972802",
  appId: "1:551053972802:web:5afd84f95d5b350c2264db",
  measurementId: "G-T8M4T2LQ91"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const names = ["Sachin", "Ruthvik", "Shashank", "Anirudh", "Rishikesh"];

let currentIndex = 0;

function updateRotation() {
    document.getElementById("current-person").textContent = `${names[currentIndex]} should throw the trash now.`;
}

function rotate() {
    currentIndex = (currentIndex + 1) % names.length;
    updateRotation();
    // Update the current index in the Firebase database
    database.ref('rotation').set(currentIndex);
}

document.getElementById("trash-button").addEventListener("click", rotate);

// Listen for changes in the Firebase database and update the rotation
database.ref('rotation').on('value', (snapshot) => {
    if (snapshot.exists()) {
        currentIndex = snapshot.val();
        updateRotation();
    }
});

// Initial rotation message
updateRotation();
