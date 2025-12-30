# XO Game (Tic-Tac-Toe)

A modern, neon-themed Tic-Tac-Toe game built with HTML, CSS, and JavaScript.

## Features

-   **Two Game Modes**:
    -   **Player vs Player (PvP)**: Play against a friend on the same device.
    -   **Player vs Computer (PvC)**: Play against a basic AI opponent.
-   **Modern UI**: Dark theme with neon accents and smooth animations.
-   **Responsive Design**: Works perfectly on both desktop and mobile devices.
-   **Game Logic**: Automatic win/draw detection and turn switching.

## How to Run

You can run this game in two ways:

### Method 1: Direct Open (Easiest)
1.  Navigate to the project folder.
2.  Double-click the `index.html` file.
3.  The game will open in your default web browser.

### Method 2: Local Server (Recommended)
If you have Python installed, you can run a local server for a better experience:

1.  Open a terminal/command prompt in the project folder.
2.  Run the following command:
    ```bash
    python -m http.server 8000
    ```
3.  Open your browser and go to `http://localhost:8000`.

## How to Play

1.  **Select a Mode** from the start screen (PvP or PvC).
2.  **Click on a cell** in the 3x3 grid to place your mark (**X** goes first).
3.  **The Goal**: Get three of your symbols in a row, column, or diagonal to win.
4.  If the board fills up with no winner, the game ends in a **Draw**.
5.  Use the **Reset Game** button to clear the board or **Back to Menu** to change modes.

## Technologies Used

-   **HTML5**: Structure and content.
-   **CSS3**: Styling, Flexbox, Grid, and Animations.
-   **JavaScript (ES6+)**: Game logic and DOM manipulation.
-   **Google Fonts**: Typography (Fredoka).
