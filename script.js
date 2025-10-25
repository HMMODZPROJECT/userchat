import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// === CONFIG FIREBASE ===
const firebaseConfig = {
  apiKey: "AIzaSyD-TJQjlc3-5l4IcrxMu8RNSh-WBIjhMrA",
  authDomain: "notifikasihmmodz.firebaseapp.com",
  databaseURL: "https://notifikasihmmodz-default-rtdb.firebaseio.com/",
  projectId: "notifikasihmmodz",
  storageBucket: "notifikasihmmodz.firebasestorage.app",
  messagingSenderId: "831702914137",
  appId: "1:831702914137:web:30a76af3a3630ea2474d48",
  measurementId: "G-JW1HW1CLKJ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "globalChat");

const chatMessages = document.getElementById("chatMessages");
const sendBtn = document.getElementById("sendBtn");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("messageInput");

// === KIRIM PESAN ===
sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const username = usernameInput.value.trim() || "Anon";
  const message = messageInput.value.trim();
  if (message !== "") {
    push(chatRef, {
      name: username,
      text: message,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
      })
    });
    messageInput.value = "";
  }
}

// === AMBIL PESAN REALTIME ===
onChildAdded(chatRef, (data) => {
  const msg = data.val();
  const div = document.createElement("div");
  div.classList.add("message");
  if (msg.name.toLowerCase() === "admin") {
    div.classList.add("admin");
  } else {
    div.classList.add("user");
  }
  div.innerHTML = `<strong>${msg.name}</strong><br>${msg.text}<span>${msg.time}</span>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});