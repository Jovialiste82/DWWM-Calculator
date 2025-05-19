// ---------------- Capturing elements -----------------------------
const screenDisplay = document.querySelector("#screen-display");
const numberKeys = document.querySelectorAll(".number");
const operationKeys = document.querySelectorAll(".operation");
const commaKey = document.querySelector("#commaKey");
const operationKey = document.querySelector("#operationKey");
const plusminusKey = document.querySelector("#plusminusKey");
const clearKey = document.querySelector("#clearKey");
const backKey = document.querySelector("#backKey");
const equalsKey = document.querySelector("#equalsKey");
let selection = "0";
let value1 = 0;
let value2 = null;
let operation = null; // addition, substraction, multiplication, division
let result = null;

// -------------- Event Listeners --------------------
numberKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    if (selection === "0") {
      selection = e.target.textContent;
      value1 = Number(selection);
    } else {
      selection += e.target.textContent;
      value1 = Number(selection);
    }
    displayOnScreen(selection);
  });
});

commaKey.addEventListener("click", (e) => {
  if (!selection.includes(".")) selection += ".";
  displayOnScreen(selection);
});

operationKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    operation = e.target.dataset.operation;
    selection = "0";
    displayOnScreen(selection);
    if (value1 && value2) {
      doCalculation(value1, value2, operation);
      return;
    }
    value2 = value1;
  });
});

plusminusKey.addEventListener("click", () => {
  if (selection !== "0") {
    selection = String(Number(selection) * -1);
    displayOnScreen(selection);
    value1 = Number(selection);
  }
});

clearKey.addEventListener("click", () => {
  selection = "0";
  displayOnScreen(selection);
  value1 = 0;
  value2 = null;
  operation = null;
  result = null;
});

backKey.addEventListener("click", () => {
  // Case 1 : "0"
  if (selection === "0") actionBackButton("oneCharacterWhichIsZero");
  // Case 2 : "6"
  if (selection.length === 1 && selection !== "0")
    actionBackButton("oneCharacterWhichIsNotZero");
  // Case 3 : "12"
  if (selection.length > 1) actionBackButton("moreThanOneCharacter");
});

equalsKey.addEventListener("click", () => {
  doCalculation(value1, value2, operation);
  operation = null;
});

// -------------- Functions --------------------

function displayOnScreen(string) {
  screenDisplay.textContent = string;
}

function actionBackButton(situation) {
  switch (situation) {
    case "oneCharacterWhichIsZero":
      console.log("Nothing to do");
      displayOnScreen(selection);
      break;
    case "oneCharacterWhichIsNotZero":
      selection = "0";
      displayOnScreen(selection);
      break;
    case "moreThanOneCharacter":
      let array = Array.from(selection);
      array.pop();
      let newSelection = array.join("");
      selection = newSelection;
      displayOnScreen(selection);
      break;
    default:
      console.log("Weird... No case triggered. Please double check!");
      console.log(selection);
  }
}

function doCalculation(value1, value2, operation) {
  switch (operation) {
    case "addition":
      result = value1 + value2;
      selection = String(result.toFixed(2));
      displayOnScreen(selection);
      operation = null;
      break;
    case "substraction":
      result = value2 - value1;
      selection = String(result.toFixed(2));
      displayOnScreen(selection);
      operation = null;
      break;
    case "division":
      if (value1 === 0) {
        displayOnScreen("Error");
        return;
      }
      result = value2 / value1;
      selection = String(result.toFixed(2));
      displayOnScreen(selection);
      operation = null;
      break;
    case "multiplication":
      result = value1 * value2;
      selection = String(result.toFixed(2));
      displayOnScreen(selection);
      operation = null;
      break;
    default:
      console.log(
        "Error... could not identify operation. Please double-check!"
      );
  }
}
