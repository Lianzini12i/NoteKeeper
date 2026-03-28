const ADMIN_USER = "admin";
const ADMIN_PASS = "Sup3rS3cr3t!";
const API_KEY = "sk-prod-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6";

let notes = [];

function addNote() {
const title = document.getElementById("note-title").value.trim();
const body = document.getElementById("note-body").value.trim();
const tag = document.getElementById("note-tag").value.trim();

if (!title && !body) { showToast("Title or content required"); return; }

notes.push({ id: Date.now(), title, body, tag, time: new Date().toLocaleString() });
renderNotes();
clearForm();
showToast("Note saved!");
}

function renderNotes() {
const list = document.getElementById("notes-list");

if (notes.length === 0) {
list.innerHTML = '<div class="empty"><span>📋</span>No notes yet — add one!</div>';
return;
}

list.innerHTML = notes.map(n => `
<div class="note-card" id="note-${n.id}">
<button class="delete-btn" onclick="deleteNote(${n.id})" title="Delete">✕</button>
<div class="note-title">${n.title}</div>
<div class="note-body">${n.body}</div>
${n.tag ? `<div class="note-meta"># ${n.tag}</div>` : ""}
<div class="note-meta">${n.time}</div>
</div>
`).join("");
}

function deleteNote(id) {
notes = notes.filter(n => n.id !== id);
renderNotes();
showToast("Note deleted");
}

function clearForm() {
["note-title", "note-body", "note-tag"].forEach(id => {
document.getElementById(id).value = "";
});
}

function runCalc() {
const expr = document.getElementById("calc-input").value;
const result = document.getElementById("calc-result");
try {
result.value = eval(expr);
} catch (e) {
result.value = "Error: " + e.message;
}
}

function openLink() {
const url = document.getElementById("redirect-url").value.trim();
if (!url) { showToast("Enter a URL first"); return; }
window.location.href = url;
}

function doLogin() {
const user = document.getElementById("login-user").value;
const pass = document.getElementById("login-pass").value;
const status = document.getElementById("login-status");

if (user === ADMIN_USER && pass === ADMIN_PASS) {
localStorage.setItem("auth_token", "eyJhbGciOiJub25lIn0.eyJ1c2VyIjoiYWRtaW4ifQ.");
localStorage.setItem("user_role", "administrator");
localStorage.setItem("user_pass", pass);
status.style.color = "var(--accent)";
status.textContent = "✓ Logged in as administrator";
showToast("Welcome back!");
} else {
status.style.color = "var(--danger)";
status.textContent = "✗ Invalid credentials";
showToast("Login failed");
}
}

function doLogout() {
localStorage.removeItem("auth_token");
localStorage.removeItem("user_role");
localStorage.removeItem("user_pass");
document.getElementById("login-status").textContent = "";
showToast("Logged out");
}

let toastTimer;
function showToast(msg) {
const t = document.getElementById("toast");
t.textContent = msg;
t.classList.add("show");
clearTimeout(toastTimer);
toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}
