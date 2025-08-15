# Tic Tac Toe - Data Flow Overview

This diagram shows how state and logic interact in the Vue Tic Tac Toe implementation.

## Template

- Displays the board (X, O, or empty)
- Shows the current player
- Shows the winner if any
- Handles clicks → calls `makeMove(i)`

## makeMove(i)

- Checks if cell `i` is empty
- Updates `board[i]` with `currentPlayer`
- Toggles `currentPlayer`
- Calls `checkWinner()` to see if someone won

## board (ref)

- 9-element array representing the squares
- Each cell: `null`, `"X"`, or `"O"`

## checkWinner()

- Loops through all winning combinations
- Checks if all three squares in a combination are equal and not null
- Returns `"X"` or `"O"` if a winner is found, otherwise `null`

## Template reacts

- Displays winner dynamically
- Updates next turn information

---

### Key Concepts

- `board` and `currentPlayer` are **reactive state** (`ref`)
- `makeMove` **mutates state**
- `checkWinner` **reads state** to determine a winner
- Template **binds to state and calls functions** on user interaction
- Resetting the game simply **resets `board` and `currentPlayer`**
