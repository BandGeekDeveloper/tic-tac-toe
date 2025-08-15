<script setup lang="ts">
import { ref } from "vue";

// this confirms the existence of the board
const board = ref(Array(9).fill(null));

// this sets the current player to "X"
// it will toggle between "X" and "O" after each move
// this is used to determine whose turn it is
const currentPlayer = ref("X");

// this checks the board for a winner by looking for the same value in any of the winning combinations
const checkWinner = () => {
  let winner;

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

  // loop through all combinations to see if the value is the same
  // if it is, we have a winner
  // if not the loop continues
  for (const combination of winnningCombinations) {
    const [a, b, c] = combination;

    if (
      board.value[a] !== null &&
      board.value[a] === board.value[b] &&
      board.value[a] === board.value[c]
    ) {
      winner = board.value[a];
      return winner;
    }
    console.log(`${winner} wins!`);
  }
};

// when a player makes a move it checks if the cell is empty
// if it is the value is set to the current player
// the current player toggles between "X" and "O"
const makeMove = (i: number) => {
  if (!board.value[i]) {
    board.value[i] = currentPlayer.value;

    currentPlayer.value = currentPlayer.value === "X" ? "O" : "X";
  }
};
</script>

<template>
  <div>
    <div>
      <!--Title and instructions of the game-->
      <h1 class="text-center text-5xl p-8">Tic Tac Toe</h1>
      <p class="text-center text-2xl p-4">
        Each player takes turns trying to out smart their opponent adding an X or O on their turn.
        The player who gets 3 X's or 3 O's in a row in any direction wins. If there comes a point
        where no one can get 3 in a row this is know as a Cat's game and is considered a draw.
      </p>
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
          <!--Button that calls makeMove when clicked-->
          <!--The button is disabled if the cell already has a value-->
          <button
            class="h-full w-full cursor-pointer hover:bg-gray-100 text-4xl"
            @click="makeMove(i)"
            :disabled="cell"
          >
            {{ cell }}
          </button>
        </div>
      </div>
    </div>
    <div>
      <!--Display the current player-->
      <p class="text-center text-2xl p-4">
        Current Player: <span class="font-bold">{{ currentPlayer }}</span>
      </p>
      <!--Display the winner if there is one-->
      <p class="text-center text-2xl p-4" v-if="checkWinner()">
        Winner: <span class="font-bold">{{ checkWinner() }}</span>
      </p>
    </div>
    <div class="text-center p-4">
      <!--Button to reset the game-->
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        @click="
          board = Array(9).fill(null);
          currentPlayer = 'X';
        "
      >
        Reset Game
      </button>
    </div>
  </div>
</template>

<style scoped></style>
