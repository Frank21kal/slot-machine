const symbols = [
  "🍒",
  "🍋",
  "🍇",
  "⭐",
  "💎",
  "7️⃣"
];

const cells = [
  document.getElementById("c1"),
  document.getElementById("c2"),
  document.getElementById("c3"),
  document.getElementById("c4"),
  document.getElementById("c5"),
  document.getElementById("c6"),
  document.getElementById("c7"),
  document.getElementById("c8"),
  document.getElementById("c9")
];

const spinBtn = document.getElementById("spin-btn");

const result = document.getElementById("result");

const creditsDisplay =
  document.getElementById("credits");

const creditsDisplay2 =
  document.getElementById("credits2");

const betDisplay =
  document.getElementById("bet");

const jackpotDisplay =
  document.getElementById("jackpot");

const plusBtn =
  document.getElementById("plus-btn");

const minusBtn =
  document.getElementById("minus-btn");

let credits = 1000;
let bet = 10;
let jackpot = 5000;

const depositSection =
  document.querySelector(".deposit-section");

const depositBtn =
  document.getElementById("deposit-btn");

const depositAmount =
  document.getElementById("deposit-amount");

depositBtn.addEventListener("click", () => {

  const amount =
    Number(depositAmount.value);

  if (
    isNaN(amount) ||
    amount <= 9
  ) {


    result.textContent =
      "❌ Enter a valid amount";

    return;


  }

  credits += amount;

  updateUI();

  result.textContent =
    `💰 ${amount} credits added!`;

  depositAmount.value = "";
});


/* =========================
UPDATE UI
========================= */


function updateUI() {

  creditsDisplay.textContent =
    credits;

  creditsDisplay2.textContent =
    credits;

  betDisplay.textContent =
    bet;

  jackpotDisplay.textContent =
    jackpot;

  if (credits <= 0) {

    depositSection.classList.add("show");

  } else {

    depositSection.classList.remove("show");

  }

}

updateUI();

/* =========================
BET CONTROLS
========================= */

plusBtn.addEventListener("click", () => {

  if (bet < 100) {
    bet += 10;
    updateUI();
  }

});

minusBtn.addEventListener("click", () => {

  if (bet > 10) {
    bet -= 10;
    updateUI();
  }

});

/* =========================
CLEAR WIN EFFECT
========================= */

function clearWins() {

  cells.forEach(cell => {

    cell.classList.remove("win");

  });

}

/* =========================
SPIN
========================= */

spinBtn.addEventListener(
  "click",
  spinMachine
);

function spinMachine() {

  if (credits < bet) {


    result.textContent =
      "💰 Out of credits! Please deposit more.";

    depositSection.style.display =
      "flex";


    return;


  }

  credits -= bet;

  jackpot += Math.floor(
    bet * 0.2
  );

  updateUI();

  clearWins();

  spinBtn.disabled = true;

  result.textContent =
    "🎰 Spinning...";

  let grid = [];

  cells.forEach((cell, index) => {


    const interval =
      setInterval(() => {

        cell.textContent =
          symbols[
          Math.floor(
            Math.random() *
            symbols.length
          )];

      }, 100);

    setTimeout(() => {

      clearInterval(interval);

      const finalSymbol =
        symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )];

      cell.textContent =
        finalSymbol;

      grid[index] =
        finalSymbol;

      if (
        index ===
        cells.length - 1
      ) {

        checkWin(grid);

        spinBtn.disabled =
          false;
      }

    },
      1000 + index * 150);


  });

}

/* =========================
WIN CHECK
========================= */

function checkWin(grid) {

  const winningLines = [


    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 4, 8],
    [2, 4, 6]


  ];

  let won = false;

  winningLines.forEach(line => {


    const [a, b, c] =
      line;

    if (
      grid[a] === grid[b]
      &&
      grid[b] === grid[c]
    ) {

      won = true;

      cells[a].classList.add(
        "win"
      );

      cells[b].classList.add(
        "win"
      );

      cells[c].classList.add(
        "win"
      );

      let reward =
        calculateReward(
          grid[a]
        );

      credits += reward;

      result.textContent =
        `🎉 WIN! + ${reward} `;

      updateUI();

    }


  });

  if (!won) {


    result.textContent =
      "😢 Try Again!";


  }

  checkJackpot(grid);

}

/* =========================
REWARD TABLE
========================= */

function calculateReward(
  symbol
) {

  switch (symbol) {


    case "7️⃣":
      return 500;

    case "💎":
      return 250;

    case "⭐":
      return 150;

    case "🍒":
      return 100;

    case "🍇":
      return 80;

    case "🍋":
      return 50;

    default:
      return 0;


  }

}

/* =========================
JACKPOT
========================= */

function checkJackpot(
  grid
) {

  if (


    grid[0] === "7️⃣"
    &&
    grid[1] === "7️⃣"
    &&
    grid[2] === "7️⃣"


  ) {


    credits += jackpot;

    result.textContent =
      `💰 JACKPOT! + ${jackpot} `;

    jackpot = 5000;

    updateUI();

    jackpotAnimation();


  }

}

/* =========================
JACKPOT EFFECT
========================= */

function jackpotAnimation() {

  let count = 0;

  const flash =
    setInterval(() => {


      document.body.style.background =
        count % 2
          ?
          "#111"
          :
          "gold";

      count++;

      if (count > 10) {

        clearInterval(
          flash
        );

        document.body.style.background =
          "#111";

      }


    }, 200);

}

/* =========================
START SYMBOLS
========================= */

cells.forEach(cell => {

  cell.textContent =
    symbols[
    Math.floor(
      Math.random() *
      symbols.length
    )];

});
