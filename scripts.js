
const SIZE = 7;
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];
let isRunning = false;
let sx, sy, ex, ey, tx, ty, MAX_STEPS, speedCoeff;
function getValues() {
  sx = parseInt(document.querySelector('#sx').value) - 1;
  sy = parseInt(document.querySelector('#sy').value) - 1;
  ex = parseInt(document.querySelector('#ex').value) - 1;
  ey = parseInt(document.querySelector('#ey').value) - 1;
  tx = parseInt(document.querySelector('#tx').value) - 1;
  ty = parseInt(document.querySelector('#ty').value) - 1;
  MAX_STEPS = parseInt(document.querySelector('#steps').value);
  speedCoeff = parseFloat(document.querySelector('#speed').value);
}
getValues();
 /*
let sx = 0, sy = 3;
let ex = 2, ey = 0;
let tx = 1, ty = 1;
let MAX_STEPS = 5;
*/
let dp = [];
let step = 0;
let timer = null;

// Initialize DP array
function initDP() {
  dp = Array.from({ length: MAX_STEPS + 1 }, () =>
    Array.from({ length: SIZE }, () =>
      Array(SIZE).fill(0)
    )
  );
  dp[0][sx][sy] = 1;
}

// Create grid
function buildGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      const div = document.createElement("div");
      div.className = "cell";
      div.id = `c-${x}-${y}`;
      grid.appendChild(div);
    }
  }
}

// Render current step
function render() {
  document.getElementById("stepLabel").textContent = `Step ${step}`;

  let maxVal = 0;
  for (let x = 0; x < SIZE; x++)
    for (let y = 0; y < SIZE; y++)
      maxVal = Math.max(maxVal, dp[step][x][y]);

  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      const cell = document.getElementById(`c-${x}-${y}`);
      const val = dp[step][x][y];

      cell.className = "cell";
      cell.textContent = val ? val : "";

      if (val > 0) {
        const intensity = Math.min(val / (maxVal || 1), 1);
        cell.style.background = `rgba(30, 144, 255, ${0.2 + intensity * 0.8})`;
      } else {
        cell.style.background = "white";
      }

      if (x === sx && y === sy) cell.classList.add("start");
      if (x === ex && y === ey) cell.classList.add("end");
      if (x === tx && y === ty) cell.classList.add("must");
    }
  }
}

// Compute next DP step
function nextStep() {
  if (step >= MAX_STEPS) return;

  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      if (dp[step][x][y] === 0) continue;

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE) {
          dp[step + 1][nx][ny] += dp[step][x][y];
        }
      }
    }
  }
  step++;
  render();
}
function nextStepAvoiding() {
  if (step >= MAX_STEPS) return;
  if ((sx == tx && sy == ty) || (ex == tx && ey == ty)) return 0;

  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      if (dp[step][x][y] === 0) continue;

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE && !(nx == tx && ny == ty) && ny >= 0 && ny < SIZE) {
          dp[step + 1][nx][ny] += dp[step][x][y];
        }
      }
    }
  }

  step++;
  render();
}
// Controls
async function start() {
  if (isRunning) return;
  isRunning = true;
  const resultDiv = document.getElementById("result");
  const avoidingDiv = document.getElementById("avoiding");
  const totalDiv = document.getElementById("total");

  totalDiv.textContent = `Total: 0`
  avoidingDiv.textContent = `Avoiding: 0`;
  resultDiv.textContent = `Result: 0`;

  console.log("== sequentialStart starts ==");
  getValues();
  initDP();
  render();
  const total = nextStepAsync();


  totalDiv.textContent = `Total: ${await total}`;
  
  const avoiding = nextStepAvoidingAsync();

  avoidingDiv.textContent = `Avoiding: ${await avoiding}`;

  reset();
  console.log("== sequentialStart done ==");
  const result = await total - await avoiding;
  resultDiv.textContent = `Result: ${result}`;
  isRunning = false;
}
function nextStepAsync() {
  console.log("starting nextStepAsync()");
  return new Promise((resolve) => {
    timer = setInterval(() => {
      if (step >= MAX_STEPS) {
        const total = dp[step][ex][ey];
        resolve(total);
        console.log("nextStepAsync() finished")
        reset();
      }
      nextStep();
    }, 800 / speedCoeff);
  });
}
function nextStepAvoidingAsync() {
  console.log("starting nextStepAvoidingAsync()");
  return new Promise((resolve) => {
    timer = setInterval(() => {
      if (step >= MAX_STEPS) {
        const avoiding = dp[step][ex][ey];
        resolve(avoiding);
        console.log("nextStepAvoidingAsync() finished")
        reset();
      }
      nextStepAvoiding();
    }, 800 / speedCoeff);
  });
}
function pause() {
  clearInterval(timer);
  timer = null;
}

function reset() {
  pause();
  step = 0;
  initDP();
  render();
}

// Init
buildGrid();
initDP();
render();