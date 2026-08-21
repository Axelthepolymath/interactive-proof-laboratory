// ===============================
// PROOF LABORATORY
// ===============================

// Questions
const questions = {

    mathematics: [
        "Prove that the sum of two even integers is even.",
        "Prove that there are infinitely many prime numbers.",
        "Determine whether the statement 'every continuous function is differentiable' is true or false.",
        "Demonstrate how calculus can be applied to solve algebraic problems and geometric problems.",
        "Prove that algebraic equations can be solved or analyzed using derivatives."
    ],

    science: [
        "Why does an object accelerate toward Earth when dropped?",
        "How could you experimentally test whether temperature affects the rate of a chemical reaction?",
        "Construct an argument explaining why correlation alone does not establish causation."
    ],

    philosophy: [
        "Can an argument be logically valid even if its conclusion is false?",
        "Does knowledge require justified true belief?",
        "Can a person be morally responsible for an action they could not have avoided?"
    ]

};


// Current state
let currentField = "";
let currentQuestion = 0;


// ===============================
// SELECT A FIELD
// ===============================

function selectField(field) {

    console.log("Selected field:", field);

    currentField = field;
    currentQuestion = 0;

    const fieldSelection =
        document.getElementById("field-selection");

    const questionSection =
        document.getElementById("question-section");

    if (!fieldSelection || !questionSection) {

        console.error(
            "Could not find field-selection or question-section."
        );

        return;
    }

    // Hide the home section
    fieldSelection.style.display = "none";

    // Show the question section
    questionSection.style.display = "block";

    // Display the question
    showQuestion();
}


// ===============================
// SHOW QUESTION
// ===============================

function showQuestion() {

    if (!currentField) {
        return;
    }

    const fieldTitle =
        document.getElementById("field-title");

    const question =
        document.getElementById("question");

    const argument =
        document.getElementById("argument");

    const result =
        document.getElementById("result");

    if (!fieldTitle || !question) {

        console.error(
            "Question elements were not found."
        );

        return;
    }

    // Format field name
    const fieldName =
        currentField.charAt(0).toUpperCase()
        + currentField.slice(1);

    fieldTitle.textContent = fieldName;

    // Display question
    question.textContent =
        questions[currentField][currentQuestion];

    // Clear previous answer
    if (argument) {
        argument.value = "";
    }

    // Clear previous result
    if (result) {
        result.innerHTML = "";
    }
}


// ===============================
// NEXT QUESTION
// ===============================

function nextQuestion() {

    if (!currentField) {
        return;
    }

    currentQuestion++;

    if (
        currentQuestion >=
        questions[currentField].length
    ) {
        currentQuestion = 0;
    }

    showQuestion();
}


// ===============================
// CHECK ARGUMENT
// ===============================

function checkArgument() {

    const argumentElement =
        document.getElementById("argument");

    const result =
        document.getElementById("result");

    if (!argumentElement || !result) {

        console.error(
            "Argument or result element was not found."
        );

        return;
    }

    const argument =
        argumentElement.value.trim();

    if (argument.length === 0) {

        result.innerHTML = `
            <div class="result-box incomplete">

                <h3>⚠️ No Argument Submitted</h3>

                <p>
                    Please construct your argument
                    before checking it.
                </p>

            </div>
        `;

        return;
    }

    const text = argument.toLowerCase();

    const hasEquation =
        argument.includes("=") ||
        text.includes("f(x)") ||
        text.includes("equation");

    const hasReasoning =
        text.includes("because") ||
        text.includes("since") ||
        text.includes("therefore") ||
        text.includes("thus") ||
        text.includes("hence");

    const hasConclusion =
        text.includes("therefore") ||
        text.includes("thus") ||
        text.includes("hence") ||
        text.includes("we conclude") ||
        text.includes("this proves");

    const hasCalculus =
        text.includes("derivative") ||
        text.includes("calculus") ||
        text.includes("differentiate") ||
        text.includes("slope") ||
        text.includes("rate of change");

    if (
        hasEquation &&
        hasReasoning &&
        hasConclusion
    ) {

        result.innerHTML = `
            <div class="result-box valid">

                <h3>✅ Argument Appears Valid</h3>

                <p>
                    Your argument contains:
                </p>

                <ul>
                    <li>A mathematical statement or equation</li>
                    <li>Reasoning</li>
                    <li>A conclusion</li>
                </ul>

                ${
                    hasCalculus
                    ? "<p>Calculus-related reasoning was detected.</p>"
                    : ""
                }

                <p>
                    <strong>Status:</strong>
                    Potentially valid.
                </p>

                <p>
                    This is currently a preliminary
                    structural analysis, not formal
                    proof verification.
                </p>

            </div>
        `;

    } else {

        result.innerHTML = `
            <div class="result-box incomplete">

                <h3>🟡 Argument Needs More Work</h3>

                <p>
                    The system could not establish the
                    argument from the information provided.
                </p>

                <p>
                    Try including:
                </p>

                <ul>
                    <li>Your assumptions</li>
                    <li>Your equations or evidence</li>
                    <li>Your reasoning</li>
                    <li>Your conclusion</li>
                </ul>

            </div>
        `;
    }
}


// ===============================
// TEST MESSAGE
// ===============================

console.log("Proof Laboratory loaded successfully.");
