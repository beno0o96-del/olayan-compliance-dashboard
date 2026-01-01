// Firebase Configuration (Compat Version)
const firebaseConfig = {
    apiKey: "AIzaSyD8sp9EbYr8Jgg2ARvtMuDnL2KD7oLlpuo",
    authDomain: "olayan-compliance-dashboard.firebaseapp.com",
    projectId: "olayan-compliance-dashboard",
    storageBucket: "olayan-compliance-dashboard.firebasestorage.app",
    messagingSenderId: "878848822504",
    appId: "1:878848822504:web:b18d53d820c70aa96c4d5d",
    measurementId: "G-S1H5JJ6HMM"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    
    // Initialize Services
    const db = firebase.firestore();
    const storage = firebase.storage();
    const auth = firebase.auth();
    
    console.log("🔥 Firebase Initialized Successfully");
} else {
    console.error("❌ Firebase SDK not found!");
}
