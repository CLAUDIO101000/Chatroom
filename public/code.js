(function () {
    const app = document.querySelector(".app");
    const socket = io("https://your-heroku-app.herokuapp.com");

    let uname;
    let profileImage = "images/user.png";

    app.querySelector(".join-screen #join-user").addEventListener("click", function () {
        let username = app.querySelector(".join-screen #username").value;
        const profileImageInput = app.querySelector(".join-screen #profile-image-input").files[0];
        if (username.length == 0) {
            displayError("Username cannot be empty");
            return;
        }
        if (profileImageInput) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage = e.target.result;
                socket.emit("newuser", { username, profileImage });
                uname = username;
                app.querySelector(".join-screen").classList.remove("active");
                app.querySelector(".chat-screen").classList.add("active");
            };
            reader.readAsDataURL(profileImageInput);
        } else {
            socket.emit("newuser", { username, profileImage });
            uname = username;
            app.querySelector(".join-screen").classList.remove("active");
            app.querySelector(".chat-screen").classList.add("active");
        }
    });

    app.querySelector(".chat-screen #send-message").addEventListener("click", function () {
        let message = app.querySelector(".chat-screen #message-input").value;
        if (message.length == 0) {
            displayError("Message cannot be empty");
            return;
        }
        if (!profileImage) {
            displayError("Profile image not loaded");
            return;
        }
        renderMessage("my", {
            username: uname,
            text: message,
            profileImage
        });
        socket.emit("chat", {
            username: uname,
            text: message,
            profileImage
        });
        app.querySelector(".chat-screen #message-input").value = "";
    });

    app.querySelector(".chat-screen #send-image").addEventListener("click", function () {
        app.querySelector(".chat-screen #image-input").click();
    });

    app.querySelector(".chat-screen #image-input").addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const maxSize = 2 * 1024 * 1024;
            if (file.size > maxSize) {
                displayError("Image size should not exceed 2MB");
                return;
            }
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    const maxWidth = 800; 
                    const maxHeight = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    const resizedImage = canvas.toDataURL("image/jpeg", 0.7); // Adjust quality if needed

                    const imageData = {
                        username: uname,
                        src: resizedImage,
                        profileImage
                    };
                    renderMessage("my-image", imageData);
                    socket.emit("image", imageData);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    app.querySelector(".chat-screen #exit-chat").addEventListener("click", function () {
        socket.emit("exituser", uname);
        window.location.href = window.location.href;
    });

    socket.on("update", function (update) {
        renderMessage("update", update);
    });

    socket.on("chat", function (message) {
        if (message.username !== uname) {
            renderMessage("other", message);
        }
    });

    socket.on("image", function (imageData) {
        if (imageData.username !== uname) {
            renderMessage("other-image", imageData);
        }
    });

    socket.on("error", function (err) {
        displayError("Socket error: " + err);
    });

    function renderMessage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .messages");
        if (type == "my") {
            let el = document.createElement("div");
            el.setAttribute("class", "message my-message");
            el.innerHTML = `<div><div class="profile-container"><div class="profile-image"><img src="${message.profileImage}" alt="Profile Image"></div><div class="name">You</div></div><div class="text">${message.text}</div></div>`;
            messageContainer.appendChild(el);
        } else if (type == "other") {
            let el = document.createElement("div");
            el.setAttribute("class", "message other-message");
            el.innerHTML = `<div><div class="profile-container"><div class="profile-image"><img src="${message.profileImage}" alt="Profile Image"></div><div class="name">${message.username}</div></div><div class="text">${message.text}</div></div>`;
            messageContainer.appendChild(el);
        } else if (type == "my-image") {
            let el = document.createElement("div");
            el.setAttribute("class", "message my-message");
            el.innerHTML = `<div><div class="profile-container"><div class="profile-image"><img src="${message.profileImage}" alt="Profile Image"></div><div class="name">You</div></div><div class="image"><img src="${message.src}" alt="Image"></div></div>`;
            messageContainer.appendChild(el);
        } else if (type == "other-image") {
            let el = document.createElement("div");
            el.setAttribute("class", "message other-message");
            el.innerHTML = `<div><div class="profile-container"><div class="profile-image"><img src="${message.profileImage}" alt="Profile Image"></div><div class="name">${message.username}</div></div><div class="image"><img src="${message.src}" alt="Image"></div></div>`;
            messageContainer.appendChild(el);
        } else if (type == "update") {
            let el = document.createElement("div");
            el.setAttribute("class", "update");
            el.innerText = message;
            messageContainer.appendChild(el);
        }
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }

    function displayError(message) {
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = message;
        setTimeout(() => {
            errorMessage.textContent = "";
        }, 3000);
    }
})();