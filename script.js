// // ========== CONFIG ==========
// const API_BASE_URL = "http://127.0.0.1:8000"; // Change to your backend

// // ========== STATE ==========
// let sessionId = null;

// // ========== INIT ==========
// document.getElementById("chatbot-toggle").addEventListener("click", () => {
//     const chatWindow = document.getElementById("chatbot-window");
//     chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
// });

// document.getElementById("chatbot-send").addEventListener("click", sendMessage);
// document.getElementById("chatbot-text").addEventListener("keypress", (e) => {
//     if (e.key === "Enter") sendMessage();
// });

// // On load → restore session or create new
// initSession();

// // ========== FUNCTIONS ==========
// async function initSession() {
//     // Check localStorage first
//     sessionId = localStorage.getItem("chatbotSessionId");

//     if (!sessionId) {
//         try {
//             const res = await fetch(`${API_BASE_URL}/api/new_session`);
//             if (!res.ok) throw new Error("Failed to fetch new session");
//             const data = await res.json();
//             sessionId = data.session_id;
//             localStorage.setItem("chatbotSessionId", sessionId);
//             console.log("New Session ID:", sessionId);
//         } catch (error) {
//             console.error("Failed to start session:", error);
//             appendMessage("AI", "⚠️ Could not start chat session. Please refresh.");
//             return;
//         }
//     }

//     // Load old history from backend
//     loadHistory();
// }

// async function loadHistory() {
//     try {
//         const res = await fetch(`${API_BASE_URL}/api/history?session_id=${sessionId}`);
//         if (!res.ok) throw new Error("Failed to load history");
//         const data = await res.json();
//         const messages = data.messages || [];
//         messages.forEach(msg => appendMessage(msg.sender, msg.text));
//     } catch (error) {
//         console.warn("No history available or failed to load:", error);
//     }
// }

// async function sendMessage() {
//     if (!sessionId) {
//         appendMessage("AI", "⚠️ No session found. Please refresh.");
//         return;
//     }

//     const inputField = document.getElementById("chatbot-text");
//     const userMessage = inputField.value.trim();
//     if (!userMessage) return;

//     appendMessage("You", userMessage);
//     inputField.value = "";
//     inputField.disabled = true; // lock input while waiting

//     try {
//         const response = await fetch(`${API_BASE_URL}/api/chat`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ session_id: sessionId, message: userMessage })
//         });

//         if (!response.ok) {
//             appendMessage("AI", `⚠️ Server error (${response.status})`);
//             return;
//         }

//         const data = await response.json();
//         appendMessage("AI", data.reply);
//     } catch (error) {
//         appendMessage("AI", "⚠️ Network error. Please try again.");
//         console.error("Fetch error:", error);
//     } finally {
//         inputField.disabled = false; // unlock input
//         inputField.focus();
//     }
// }

// function appendMessage(sender, text) {
//     const messages = document.getElementById("chatbot-messages");
//     const msgDiv = document.createElement("div");

//     // Add CSS-friendly classes (style in CSS)
//     msgDiv.className = sender === "You" ? "chat-msg user" : "chat-msg ai";
//     msgDiv.innerHTML = `<b>${sender}:</b> ${text}`;

//     messages.appendChild(msgDiv);
//     messages.scrollTop = messages.scrollHeight;
// }

// ========== CONFIG ==========
const API_BASE_URL = "http://127.0.0.1:8000"; // Change to your backend

// ========== STATE ==========
let sessionId = null;

// ========== INIT ==========
document.getElementById("chatbot-toggle").addEventListener("click", () => {
    const chatWindow = document.getElementById("chatbot-window");
    chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
});

document.getElementById("chatbot-send").addEventListener("click", sendMessage);
document.getElementById("chatbot-text").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

// On load → restore session or create new
initSession();

// ========== FUNCTIONS ==========
async function initSession() {
    // Try to reuse existing session
    sessionId = localStorage.getItem("chatbotSessionId");

    if (!sessionId) {
        try {
            const res = await fetch(`${API_BASE_URL}/api/new_session`);
            if (!res.ok) throw new Error("Failed to fetch new session");
            const data = await res.json();
            sessionId = data.session_id;
            localStorage.setItem("chatbotSessionId", sessionId);
            console.log("New Session ID:", sessionId);
        } catch (error) {
            console.error("Failed to start session:", error);
            appendMessage("AI", "⚠️ Could not start chat session. Please refresh.");
            return;
        }
    }

    // Load old history for this session
    await loadHistory();
}

async function loadHistory() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/history?session_id=${sessionId}`);
        if (!res.ok) throw new Error("Failed to load history");
        const data = await res.json();

        // Clear chat window before reloading messages
        const messages = document.getElementById("chatbot-messages");
        messages.innerHTML = "";

        // Render stored messages
        (data.messages || []).forEach(msg => appendMessage(msg.sender, msg.text));
    } catch (error) {
        console.warn("No history available or failed to load:", error);
    }
}

async function sendMessage() {
    if (!sessionId) {
        appendMessage("AI", "⚠️ No session found. Please refresh.");
        return;
    }

    const inputField = document.getElementById("chatbot-text");
    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    appendMessage("You", userMessage);
    inputField.value = "";
    inputField.disabled = true; // lock input while waiting

    try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id: sessionId, message: userMessage })
        });

        if (!response.ok) {
            appendMessage("AI", `⚠️ Server error (${response.status})`);
            return;
        }

        const data = await response.json();
        appendMessage("AI", data.reply);
    } catch (error) {
        appendMessage("AI", "⚠️ Network error. Please try again.");
        console.error("Fetch error:", error);
    } finally {
        inputField.disabled = false; // unlock input
        inputField.focus();
    }
}

function appendMessage(sender, text) {
    const messages = document.getElementById("chatbot-messages");
    const msgDiv = document.createElement("div");

    // Add CSS-friendly classes (style in CSS)
    msgDiv.className = sender === "You" ? "chat-msg user" : "chat-msg ai";
    msgDiv.innerHTML = `<b>${sender}:</b> ${text}`;

    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
}

// // Publication 
// async function loadPublications() {
//   const response = await fetch("publications.json"); // your JSON file
//   const data = await response.json();
//   const container = document.getElementById("publications");

//   for (const [category, entries] of Object.entries(data.Publications)) {
//     const section = document.createElement("div");
//     section.innerHTML = `<h2>${category}</h2>`;

//     if (Array.isArray(entries)) {
//       entries.forEach(item => {
//         section.appendChild(renderItem(item));
//       });
//     } else {
//       for (const [year, papers] of Object.entries(entries)) {
//         papers.forEach(paper => {
//           section.appendChild(renderItem({ year, ...paper }));
//         });
//       }
//     }

//     container.appendChild(section);
//   }
// }

// function renderItem(item) {
//   const div = document.createElement("div");
//   div.className = "pub-item";

//   let authors = item.authors ? `<span>${item.authors}</span>, ` : "";
//   let title = item.title ? `"${item.title}"` : "";
//   let journal = item.journal ? `<em>${item.journal}</em>` : "";
//   let details = [item.volume_issue, item.date, item.issue]
//     .filter(Boolean).join(", ");

//   let note = "";
//   if (item.note) {
//     if (item.note.includes("SCI")) {
//       note = `<span class="note-green">(${item.note})</span>`;
//     } else if (item.note.includes("E-SCI")) {
//       note = `<span class="note-blue">(${item.note})</span>`;
//     } else {
//       note = `<span class="note-gray">(${item.note})</span>`;
//     }
//   }

//   div.innerHTML = `
//     <p>
//       <strong>${item.year}:</strong> 
//       ${authors}${title} ${journal}
//       ${details ? `, <span class="text-gray">${details}</span>` : ""}
//       ${note}
//     </p>
//   `;

//   return div;
// }

// loadPublications();
