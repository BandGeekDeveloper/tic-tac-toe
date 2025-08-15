<script setup lang="ts">
import { ref, watch } from "vue";

// this confirms the existence of the board
const board = ref(Array(9).fill(null));

// this sets the current player to "X"
// it will toggle between "X" and "O" after each move
// this is used to determine whose turn it is
const currentPlayer = ref("X");

// this checks the board for a winner or draw
const checkWinner = () => {
  // possible 3 in a row combinations
  const winnningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const combination of winnningCombinations) {
    const [a, b, c] = combination;
    if (
      board.value[a] !== null &&
      board.value[a] === board.value[b] &&
      board.value[a] === board.value[c]
    ) {
      return board.value[a]; // 'X' or 'O'
    }
  }
  // If no winner and no empty cells, it's a draw
  if (!board.value.includes(null)) {
    return "draw";
  }
  return null;
};
// when a player makes a move it checks if the cell is empty
// if it is the value is set to the current player
// the current player toggles between "X" and "O"
const makeMove = (i: number) => {
  // Prevent moves if game is over
  if (checkWinner() || board.value[i]) {
    return;
  }
  board.value[i] = currentPlayer.value;
  currentPlayer.value = currentPlayer.value === "X" ? "O" : "X";
};

// counts the number of wins for each player

const xWins = ref(0);
const oWins = ref(0);
const draws = ref(0);
const lastResult = ref(null);

watch(
  () => checkWinner(),
  (newResult: null) => {
    if (
      (newResult === "X" || newResult === "O" || newResult === "draw") &&
      lastResult.value !== newResult
    ) {
      countWins(newResult);
      lastResult.value = newResult;
    }
    // Reset lastResult when board is reset
    if (newResult === null) lastResult.value = null;
  }
);

const countWins = (winner: string) => {
  // Logic to count wins for 'X', 'O', and draws
  if (winner === "X") {
    xWins.value++;
  } else if (winner === "O") {
    oWins.value++;
  } else if (winner === "draw") {
    draws.value++;
  }
  return { xWins, oWins, draws };
};

const resetGame = () => {
  board.value = Array(9).fill(null);
  currentPlayer.value = "X";
  lastResult.value = null;
};
</script>

<template>
  <div>
    <div>
      <!--Title and instructions of the game-->
      <h1 class="text-center text-5xl p-8">Tic Tac <span class="text-orange-500">Toe</span></h1>
      <p class="text-center text-xl p-4">
        <span class="text-orange-500 text-2xl font-bold">Instructions:</span>
        Each player takes turns placing an X or O on the board, aiming to outsmart their opponent.
        The first player to get three of their marks in a row—horizontally, vertically, or
        diagonally—wins the game. If the board fills up without either player achieving this, it’s
        called a Cat’s game and ends in a draw.
      </p>
      <div class="flex flex-col items-center justify-between">
        <h3>X Wins: {{ xWins }}</h3>
        <h3>O Wins: {{ oWins }}</h3>
        <h3>Draws: {{ draws }}</h3>
      </div>
      <!--Game Board-->
      <div class="grid grid-rows-3 grid-cols-3 w-96 mx-auto py-8">
        <!--Each cell of the board is a button that calls makeMove when clicked-->
        <!--The cell is disabled if it already has a value-->
        <!--The cell displays the value of the current player-->
        <!--The cell has a border that is removed for the top, bottom, left, and right edges to create a grid-->
        <!--The cell has a hover effect that changes the background color-->
        <!--The cell has a text size of 4xl to make the X's and O's large-->
        <!--The cell has a flexbox to center the X's and O's-->
        <div
          v-for="(cell, i) in board"
          :key="i"
          class="border h-32 w-32 flex items-center justify-center"
          :class="{
            'border-t-0': i < 3,
            'border-b-0': i > 5,
            'border-s-0': i % 3 === 0,
            'border-e-0': i % 3 === 2,
          }"
        >
          <button
            class="h-full w-full cursor-pointer hover:bg-gray-100 text-4xl"
            @click="makeMove(i)"
            :disabled="cell || checkWinner()"
          >
            <span :class="cell === 'X' ? 'text-orange-500' : cell === 'O' ? 'text-black' : ''">
              {{ cell }}
            </span>
          </button>
        </div>
      </div>
    </div>
    <div>
      <!--Display the current player-->
      <p class="text-center text-2xl p-4">
        Current Player:
        <span class="font-bold" :class="currentPlayer === 'X' ? 'text-orange-500' : 'text-black'">{{
          currentPlayer
        }}</span>
      </p>
      <!--Display the winner or draw if there is one-->
      <p class="text-center text-2xl p-4" v-if="checkWinner() === 'X' || checkWinner() === 'O'">
        Winner:
        <span class="font-bold" :class="checkWinner() === 'X' ? 'text-orange-500' : 'text-black'">
          {{ checkWinner() }}
        </span>
      </p>
      <p class="text-center text-2xl p-4" v-else-if="checkWinner() === 'draw'">
        <span class="font-bold text-gray-500">Cat's game! It's a draw.</span>
      </p>
    </div>
    <div class="text-center p-4">
      <!--Button to reset the game-->
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        @click="resetGame()"
      >
        Reset Game
      </button>
    </div>
  </div>
</template>

<style scoped></style>
