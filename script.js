const symbols = ["A", "B", "C", "D"];

const spinBtn = document.getElementById("spin-btn");
const result = document.getElementById("result");

const cells = [
  document.getElementById("c1"),
  document.getElementById("c2"),
  document.getElementById("c3"),
  document.getElementById("c4"),
  document.getElementById("c5"),
  document.getElementById("c6"),
  document.getElementById("c7"),
  document.getElementById("c8"),
  document.getElementById("c9"),
];

spinBtn.addEventListener("click", function () {

  let grid = [];

  for (let i = 0; i < 9; i++) {
    let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    cells[i].textContent = randomSymbol;
    grid.push(randomSymbol);
  }

  if (
    grid[0] === grid[1] && grid[1] === grid[2] ||
    grid[3] === grid[4] && grid[4] === grid[5] ||
    grid[6] === grid[7] && grid[7] === grid[8] ||
    grid[0] === grid[3] && grid[3] === grid[6] ||
    grid[1] === grid[4] && grid[4] === grid[7] ||
    grid[2] === grid[5] && grid[5] === grid[8]

  ) {
    result.textContent = "🎉 You Win!";
  } else {
    result.textContent = "Oops! Try Again!";
  }

});