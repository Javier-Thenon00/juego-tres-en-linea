(() => {
  const cells = [...document.querySelectorAll("[data-cell]")];
  const status = document.getElementById("status");
  const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let board = Array(9).fill("");
  let current = "X";
  let active = true;
  let scores = {X:0,O:0,draw:0};

  function updateStatus(text) { status.innerHTML = '<span class="status-dot"></span> ' + text; }
  function updateScores() {
    document.getElementById("scoreX").textContent = scores.X;
    document.getElementById("scoreO").textContent = scores.O;
    document.getElementById("scoreDraw").textContent = scores.draw;
    document.getElementById("scoreCardX").classList.toggle("active", current === "X" && active);
    document.getElementById("scoreCardO").classList.toggle("active", current === "O" && active);
  }
  function winnerLine() { return wins.find(line => line.every(index => board[index] === current)); }
  function play(index) {
    if (!active || board[index]) return;
    board[index] = current;
    const cell = cells[index];
    cell.textContent = current === "X" ? "×" : "○";
    cell.classList.add(current === "X" ? "x" : "o");
    cell.disabled = true;
    const line = winnerLine();
    if (line) {
      active = false;
      scores[current]++;
      line.forEach(i => cells[i].classList.add("winner"));
      updateStatus("¡Ganó el jugador " + current + "!");
      cells.forEach(button => button.disabled = true);
    } else if (board.every(Boolean)) {
      active = false;
      scores.draw++;
      updateStatus("¡Empate! Buena partida.");
    } else {
      current = current === "X" ? "O" : "X";
      updateStatus("Turno del jugador " + current);
    }
    updateScores();
  }
  function newGame() {
    board = Array(9).fill("");
    current = "X";
    active = true;
    cells.forEach(cell => {
      cell.textContent = "";
      cell.disabled = false;
      cell.classList.remove("x","o","winner");
    });
    updateStatus("Turno del jugador X");
    updateScores();
  }
  cells.forEach(cell => cell.addEventListener("click", () => play(Number(cell.dataset.cell))));
  document.getElementById("newGame").addEventListener("click", newGame);
  document.getElementById("reset").addEventListener("click", () => {
    scores = {X:0,O:0,draw:0};
    newGame();
  });
  updateScores();
})();