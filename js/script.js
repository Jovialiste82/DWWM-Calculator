// ---------------- Capturing elements -----------------------------
const screenDisplay = document.querySelector("#screen-display");
const tempScreenDisplay = document.querySelector("#temp-screen-display");
const numberKeys = document.querySelectorAll(".number");
const operationKeys = document.querySelectorAll(".operation");
const commaKey = document.querySelector("#commaKey");
const operationKey = document.querySelector("#operationKey");
const plusminusKey = document.querySelector("#plusminusKey");
const clearKey = document.querySelector("#clearKey");
const backKey = document.querySelector("#backKey");
const equalsKey = document.querySelector("#equalsKey");
let screenDisplayText = "0";
let tempScreenDisplayText = "0";
let calculationData = [];
let value1 = 0;
let value2 = null;
let operation = null; // addition, substraction, multiplication, division
let result = null;

const operations = {
  addition: "+",
  substraction: "-",
  multiplication: "x",
  division: "÷",
};

// -------------- Event Listeners --------------------
numberKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    screenDisplayText =
      screenDisplayText === "0"
        ? e.target.textContent
        : screenDisplayText + e.target.textContent;
    displayOnScreen(screenDisplay, screenDisplayText);
  });
});

commaKey.addEventListener("click", () => {
  if (screenDisplayText.includes(".")) return;
  screenDisplayText += ".";
  displayOnScreen(screenDisplay, screenDisplayText);
});

operationKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    operation = e.target.dataset.operation;
    calculationData.push(Number(screenDisplayText));
    calculationData.push(operation);
    screenDisplayText = "0";
    displayOnScreen(screenDisplay, screenDisplayText);
    checkIntermediaryResult();
  });
});

plusminusKey.addEventListener("click", () => {
  // If it’s exactly "0", do nothing
  if (screenDisplayText === "0") return;

  // Toggle "-"
  screenDisplayText = screenDisplayText.startsWith("-")
    ? screenDisplayText.slice(1)
    : "-" + screenDisplayText;

  // Display and value storage
  displayOnScreen(screenDisplay, screenDisplayText);

  value1 = Number(screenDisplayText);
});

clearKey.addEventListener("click", (e) => {
  console.log("click: ", e.target.attributes[1]);

  screenDisplayText = "0";
  tempScreenDisplayText = "0";
  displayOnScreen(screenDisplay, screenDisplayText);
  displayOnScreen(tempScreenDisplay, tempScreenDisplayText);
  calculationData = [];
});

backKey.addEventListener("click", (e) => {
  console.log("click: ", e.target.attributes[1]);

  // Case 1 : "0"
  if (screenDisplayText === "0") actionBackButton("oneCharacterWhichIsZero");
  // Case 2 : "6"
  if (screenDisplayText.length === 1 && screenDisplayText !== "0")
    actionBackButton("oneCharacterWhichIsNotZero");
  // Case 3 : "12"
  if (screenDisplayText.length > 1) actionBackButton("moreThanOneCharacter");
});

equalsKey.addEventListener("click", (e) => {
  console.log("click: ", e.target.attributes[1]);
  calculationData.push(Number(screenDisplayText));
  checkIntermediaryResult();
  tempScreenDisplayText = "0";
  screenDisplayText = String(calculationData[0].toFixed(2));
  displayOnScreen(screenDisplay, screenDisplayText);
  displayOnScreen(tempScreenDisplay, tempScreenDisplayText);
});

// -------------- Functions --------------------

function displayOnScreen(domElement, displayText) {
  domElement.textContent = displayText;
}

function actionBackButton(situation) {
  switch (situation) {
    case "oneCharacterWhichIsZero":
      console.log("Nothing to do");
      displayOnScreen(screenDisplay, screenDisplayText);
      break;
    case "oneCharacterWhichIsNotZero":
      screenDisplayText = "0";
      displayOnScreen(screenDisplay, screenDisplayText);
      break;
    case "moreThanOneCharacter":
      screenDisplayText = screenDisplayText.slice(0, -1);
      displayOnScreen(screenDisplay, screenDisplayText);
      break;
    default:
      console.log("Weird... No case triggered. Please double check!");
      console.log(screenDisplayText);
  }
}

function checkIntermediaryResult() {
  const arrayLength = calculationData.length;
  console.log("calculationData: ", calculationData);
  switch (arrayLength) {
    case 1:
      // Case 1 : [555]
      screenDisplayText = "0";
      tempScreenDisplayText = String(calculationData[0]);
      displayOnScreen(tempScreenDisplay, tempScreenDisplayText);
      displayOnScreen(screenDisplay, screenDisplayText);
      break;
    case 2:
      // Case 2 : [555, "addition"]
      screenDisplayText = "0";
      tempScreenDisplayText =
        String(calculationData[0]) + " " + operations[calculationData[1]];
      displayOnScreen(screenDisplay, screenDisplayText);
      displayOnScreen(tempScreenDisplay, tempScreenDisplayText);
      break;
    case 3:
      // Case 4 : [555, "addition", 569]
      doCalculation(calculationData[0], calculationData[1], calculationData[2]);

      break;
    case 4:
      // Case 4 : [555, "addition", 569, "addition"]
      doCalculation(calculationData[0], calculationData[1], calculationData[2]);

      break;
    default:
      console.log(
        `No case triggered, calculationData.length is ${calculationData.length}`
      );
  }
}

function doCalculation(value1, operation, value2) {
  switch (operation) {
    case "addition":
      result = value1 + value2;
      for (let i = 0; i < 3; i++) {
        calculationData.shift();
      }
      calculationData.unshift(result);
      console.log(calculationData);
      screenDisplayText = "0";
      tempScreenDisplayText = String(result.toFixed(2));
      displayOnScreen(screenDisplay, screenDisplayText);
      displayOnScreen(tempScreenDisplay, tempScreenDisplayText);

      break;
    case "substraction":
      result = value1 - value2;
      for (let i = 0; i < 3; i++) {
        calculationData.shift();
      }
      calculationData.unshift(result);
      console.log(calculationData);
      screenDisplayText = "0";
      tempScreenDisplayText = String(result.toFixed(2));
      displayOnScreen(screenDisplay, screenDisplayText);
      displayOnScreen(tempScreenDisplay, tempScreenDisplayText);
      break;
    case "division":
      if (value1 === 0) {
        displayOnScreen(screenDisplay, "Error");
        displayOnScreen(tempScreenDisplay, "0");
        return;
      }
      result = value1 / value2;
      for (let i = 0; i < 3; i++) {
        calculationData.shift();
      }
      calculationData.unshift(result);
      console.log(calculationData);
      screenDisplayText = "0";
      tempScreenDisplayText = String(result.toFixed(2));
      displayOnScreen(screenDisplay, screenDisplayText);
      displayOnScreen(tempScreenDisplay, tempScreenDisplayText);
      break;
    case "multiplication":
      result = value1 * value2;
      for (let i = 0; i < 3; i++) {
        calculationData.shift();
      }
      calculationData.unshift(result);
      console.log(calculationData);
      screenDisplayText = "0";
      tempScreenDisplayText = String(result.toFixed(2));
      displayOnScreen(screenDisplay, screenDisplayText);
      displayOnScreen(tempScreenDisplay, tempScreenDisplayText);
      break;
    default:
      console.log(
        "Error... could not identify operation. Please double-check!"
      );
  }
}
