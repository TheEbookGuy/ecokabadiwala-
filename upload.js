import { auth, db, storage } from "./firebase-config.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


const uploadBtn = document.getElementById("uploadBtn");
const imageInput = document.getElementById("imageInput");
const message = document.getElementById("message");

let currentUser = null;


// Check login
onAuthStateChanged(auth, (user) => {

    if (user) {
        currentUser = user;
        console.log("Logged in:", user.email);
    } else {
        currentUser = null;
        console.log("No user logged in.");
    }

});


// Upload image
uploadBtn.addEventListener("click", async () => {

    if (!currentUser) {
        message.textContent = "Please login first.";
        return;
    }

    const file = imageInput.files[0];

    if (!file) {
        message.textContent = "Please select an image.";
        return;
    }

    // Check image
    if (!file.type.startsWith("image/")) {
        message.textContent = "Please select a valid image.";
        return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
        message.textContent = "Image must be smaller than 5 MB.";
        return;
    }


    try {

        message.textContent = "Uploading...";


        // Create unique filename
        const fileName = Date.now() + "_" + file.name;


        // Firebase Storage location
        const imageRef = ref(
            storage,
            `users/${currentUser.uid}/${fileName}`
        );


        // Upload image
        await uploadBytes(imageRef, file);


        // Get image URL
        const imageUrl = await getDownloadURL(imageRef);


        // Save information in Firestore
        await addDoc(collection(db, "uploads"), {

            userId: currentUser.uid,

            name: currentUser.displayName || "",

            email: currentUser.email,

            imageUrl: imageUrl,

            fileName: file.name,

            uploadedAt: serverTimestamp()

        });


        message.textContent = "Image uploaded successfully!";

        console.log("Image URL:", imageUrl);


    } catch (error) {

        console.error("Upload error:", error);

        message.textContent =
            "Upload failed: " + error.message;

    }

});