# Chatroom Application

This is a real-time chatroom application built with Node.js, Express, and Socket.io. Users can join the chatroom with a username and an optional profile image, send messages, and share images in real-time.

## Features

- Real-time messaging
- Image sharing
- User profile images
- Responsive design

## Technologies Used

- Node.js
- Express
- Socket.io
- HTML
- CSS
- JavaScript

## Getting Started

### Prerequisites

- Node.js installed on your machine
- A GitHub account
- A Heroku account (or any other hosting service for Node.js applications)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/chatroom.git
    cd chatroom
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `Procfile` for Heroku:

    ```plaintext
    web: node server.js
    ```

4. Deploy the server to Heroku (or any other hosting service):

    ```bash
    heroku create
    git push heroku main
    ```

5. Update the WebSocket URL in `public/code.js` to point to your deployed server:

    ```javascript
    const socket = io("https://your-heroku-app.herokuapp.com");
    ```

6. Deploy the static files to GitHub Pages:

    - Create a new repository on GitHub.
    - Push the `public` folder to the `gh-pages` branch of your repository.
    - Go to the repository settings and enable GitHub Pages to serve from the `gh-pages` branch.

### Running Locally

1. Start the server:

    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:5000`.

## Usage

1. Open the application in your browser.
2. Enter a username and optionally upload a profile image.
3. Click "Join" to enter the chatroom.
4. Send messages and share images with other users in real-time.

## File Structure

```
chatroom/
├── public/
│   ├── style.css
│   ├── index.html
│   ├── code.js
│   └── images/
│       └── user.png
├── server.js
├── Procfile
└── README.md
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Socket.io](https://socket.io/)
- [Express](https://expressjs.com/)
- [Heroku](https://www.heroku.com/)
- [GitHub Pages](https://pages.github.com/)

## Author

- **RANAIVOSON Nantenaina Claudio**
  - Email: ranaivosonclaudio@gmail.com
  - Phone: +261 32 43 372 46
