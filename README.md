# 🚀 Live Collaborative Code Editor

A real-time, browser-based collaborative code editor built with the MERN stack. Have you ever wanted to code with your team simultaneously in a shared environment, just like in Google Docs? This application makes it possible, allowing multiple users to join a room and see code changes synced live across all screens.

🔗 **Live Demo:** [https://code-editor-pink-ten.vercel.app/](https://code-editor-pink-ten.vercel.app/)

---

## 🔧 Getting Started

Follow these instructions to run the project locally.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Swaymbhu-git/CODE-EDITOR-MASTER.git](https://github.com/Swaymbhu-git/CODE-EDITOR-MASTER.git)
    cd CODE-EDITOR-MASTER
    ```

2.  **Install all dependencies:**
    ```bash
    npm install
    ```

3.  **Run the Application:**
    You need to run the backend server and the frontend client in two separate terminals.

    * **Run the Backend Server:**
        ```bash
        npm run server:dev
        ```
        The server will be running on `http://localhost:5001`.

    * **Run the Frontend Client:**
        ```bash
        npm run dev
        ```
        The application will be live at the address provided by Vite (usually `http://localhost:5173`).

## ✨ Features

* **Real-time Code Syncing:** Code updates instantly across all clients in the room using a WebSocket-based sync layer.
* **Shared Rooms:** Users can create a new room with a unique ID or join an existing one.
* **Live Participant List:** See who's currently connected and coding in the room with live avatars.
* **Username Assignment:** Users are prompted for a username before entering a room.
* **Copy Room ID:** Easily share the room ID with a single click to invite collaborators.
* **Real-time Notifications:** Receive toast notifications when users join or leave the room.
* **Server-Authoritative State:** The backend acts as the single source of truth for code, ensuring new users are instantly synced with the latest version.

## 🛠️ Tech Stack

#### Frontend:
* **Framework:** React 19
* **Build Tool:** Vite
* **Real-time Communication:** Socket.IO Client
* **Routing:** React Router DOM
* **UI Components:** React Avatar, React Hot Toast
* **Code Editor:** CodeMirror

#### Backend:
* **Runtime:** Node.js
* **Framework:** Express.js
* **Real-time Communication:** Socket.IO
* **Module System:** ES Modules

## ☁️ Deployment

This full-stack application is deployed entirely on **Vercel**. 

## 👤 Author

**Himanshu Patel**
* **GitHub:** [@Swaymbhu-git](https://github.com/Swaymbhu-git)
* **LinkedIn:** [linkedin.com/in/himanshu-patel](https://linkedin.com/in/himanshu-patel)

## 📜 License

This project is licensed under the MIT License.