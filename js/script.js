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
let tempCalculation = null;
let operation = null;

let testString = "55.55";
console.log(Number(testString));

// -------------- Event Listeners --------------------
numberKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    if (selection === "0") {
      selection = e.target.textContent;
    } else {
      selection += e.target.textContent;
    }
    displayOnScreen(selection);

    // update selection string
    // display on screen
  });
});

commaKey.addEventListener("click", (e) => {
  console.log(e.target.textContent);
  // check if there is already a comma in selection
  // if there is, do nothing
  // if not, add "real comma" to selection
  // display on screen
});

operationKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    console.log(e.target.dataset.operation);
    // check if tempCalculation is null
    // check if selection is null
    // if selection null => set tempCalculation to 0 and store operator
    // if selection not null + if tempcalculation null => store operator
    // if selection not null + if tempcalculation not null => do calculation
  });
});

plusminusKey.addEventListener("click", () => {
  selection = String(Number(selection) * -1);
  displayOnScreen(selection);
});

clearKey.addEventListener("click", () => {
  screenDisplay.textContent = "0";
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
  console.log(e.target.textContent);
  console.log("will display final result");
});

// -------------- Functions --------------------

function displayOnScreen(string) {
  console.log(string);
  console.log(screenDisplay);
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
      console.log(selection);
      displayOnScreen(selection);

      break;
    case "moreThanOneCharacter":
      console.log(selection);
      let array = Array.from(selection);
      array.pop();
      let newSelection = array.join("");
      selection = newSelection;
      console.log(selection);
      displayOnScreen(selection);

      break;
    default:
      console.log("Weird... No case triggered. Please double check!");
      console.log(selection);
  }
}

function doCalculation(tempCalculation, selection, operation) {}

function negate(number) {
  const newNumber = number * -1;
  return newNumber;
}
