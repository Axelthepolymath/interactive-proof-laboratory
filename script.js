// ========================================
// PROOF LABORATORY
// ========================================
// Interactive environment for exploring
// mathematical, scientific, and philosophical
// arguments.
//
// IMPORTANT:
// This system performs preliminary structural
// analysis. It does NOT constitute formal proof
// verification.
// ========================================


// ========================================
// QUESTIONS
// ========================================

const questions = {

    mathematics: [

        "Prove that the sum of two even integers is even.",

        "Prove that there are infinitely many prime numbers.",

        "Determine whether the statement " +
        "'every continuous function is differentiable' " +
        "is true or false.",

        "Demonstrate how calculus can be applied to " +
        "solve algebraic and geometric problems.",

        "Prove that algebraic equations can be analyzed " +
        "using derivatives.",

        "Consider the function \\(f(x)=x^2\\). " +
        "Use calculus to determine its rate of change.",

        "Consider \\(f(x)=4x+2\\). " +
        "Explain what its derivative tells us " +
        "about the geometry of its graph.",

        "Explain why \\(\\frac{\\sin(x)}{x}\\to1\\) " +
        "as \\(x\\to0\\)."

    ],


    science: [

        "Why does an object accelerate toward Earth " +
        "when dropped?",

        "How could you experimentally test whether " +
        "temperature affects the rate of a chemical reaction?",

        "Construct an argument explaining why correlation " +
        "alone does not establish causation."

    ],


    philosophy: [

        "Can an argument be logically valid even if " +
        "its conclusion is false?",

        "Does knowledge require justified true belief?",

        "Can a person be morally responsible for an action " +
        "they could not have avoided?"

    ]

};


// ========================================
// CURRENT STATE
// ========================================

let currentField = "";
let currentQuestion = 0;


// ========================================
// SELECT A FIELD
// ========================================

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
            "Could not find field-selection " +
            "or question-section."
        );

        return;
    }


    // Hide field selection

    fieldSelection.style.display = "none";


    // Show question section

    questionSection.style.display = "block";


    // Display first question

    showQuestion();
}


// ========================================
// SHOW QUESTION
// ========================================

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

    const preview =
        document.getElementById("equation-preview");


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

    // textContent is intentional.
    // It prevents user-controlled HTML from
    // being interpreted as HTML.

    question.textContent =
        questions[currentField][currentQuestion];


    // Clear previous argument

    if (argument) {
        argument.value = "";
    }


    // Clear previous result

    if (result) {
        result.innerHTML = "";
    }


    // Clear mathematical preview

    if (preview) {
        preview.textContent = "";
    }


    // Render mathematical notation
    // in the question.

    renderMath(question);
}


// ========================================
// NEXT QUESTION
// ========================================

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


// ========================================
// MATHEMATICAL PREVIEW
// ========================================

function renderArgumentPreview() {

    const argument =
        document.getElementById("argument");

    const preview =
        document.getElementById("equation-preview");


    if (!argument || !preview) {
        return;
    }


    /*
     * textContent keeps the user's input as text.
     * MathJax can then interpret mathematical
     * delimiters such as:
     *
     * \( x^2 \)
     *
     * or
     *
     * \[
     * \frac{a}{b}
     * \]
     */

    preview.textContent =
        argument.value;


    renderMath(preview);
}


// ========================================
// RENDER MATHJAX
// ========================================

function renderMath(element) {

    if (
        !element ||
        !window.MathJax ||
        !MathJax.typesetPromise
    ) {

        return;
    }


    MathJax.typesetClear([element]);


    MathJax.typesetPromise([element])
        .catch(function(error) {

            console.error(
                "MathJax rendering error:",
                error
            );

        });
}


// ========================================
// CHECK ARGUMENT
// ========================================

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


    // ====================================
    // EMPTY ARGUMENT
    // ====================================

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


    // ====================================
    // TEXT ANALYSIS
    // ====================================

    const text =
        argument.toLowerCase();


    // Mathematical indicators

    const hasEquation =
        argument.includes("=") ||
        text.includes("f(x)") ||
        text.includes("equation") ||
        text.includes("formula") ||
        text.includes("\\frac") ||
        text.includes("\\sin") ||
        text.includes("\\cos") ||
        text.includes("\\sqrt");


    // Reasoning indicators

    const hasReasoning =
        text.includes("because") ||
        text.includes("since") ||
        text.includes("therefore") ||
        text.includes("thus") ||
        text.includes("hence") ||
        text.includes("implies") ||
        text.includes("so");


    // Conclusion indicators

    const hasConclusion =
        text.includes("therefore") ||
        text.includes("thus") ||
        text.includes("hence") ||
        text.includes("we conclude") ||
        text.includes("this proves") ||
        text.includes("conclusion");


    // Calculus indicators

    const hasCalculus =
        text.includes("derivative") ||
        text.includes("calculus") ||
        text.includes("differentiate") ||
        text.includes("differentiation") ||
        text.includes("slope") ||
        text.includes("rate of change") ||
        text.includes("integral") ||
        text.includes("limit");


    // Evidence indicators

    const hasEvidence =
        text.includes("evidence") ||
        text.includes("assumption") ||
        text.includes("given") ||
        text.includes("definition") ||
        text.includes("because") ||
        hasEquation;


    // ====================================
    // STRUCTURAL ASSESSMENT
    // ====================================

    const structurallyComplete =
        hasReasoning &&
        hasConclusion &&
        hasEvidence;


    if (structurallyComplete) {

        result.innerHTML = `

            <div class="result-box valid">

                <h3>🔎 Structural Analysis</h3>

                <p>
                    Your response contains several
                    elements commonly found in a
                    structured argument.
                </p>

                <ul>

                    <li>
                        Evidence, assumptions,
                        or mathematical statements
                    </li>

                    <li>
                        Reasoning connecting the statements
                    </li>

                    <li>
                        A stated conclusion
                    </li>

                </ul>


                ${
                    hasEquation
                    ? `
                        <p>
                            <strong>
                                Mathematical notation detected.
                            </strong>
                        </p>
                    `
                    : ""
                }


                ${
                    hasCalculus
                    ? `
                        <p>
                            <strong>
                                Calculus-related reasoning detected.
                            </strong>
                        </p>
                    `
                    : ""
                }


                <p>
                    <strong>Status:</strong>
                    Structurally developed.
                </p>


                <p class="important-note">

                    This is a preliminary structural
                    analysis, not formal proof verification.
                    The system does not currently establish
                    whether every mathematical or logical
                    step is correct.

                </p>

            </div>

        `;

    }

    else {

        result.innerHTML = `

            <div class="result-box incomplete">

                <h3>🟡 Argument Needs More Development</h3>

                <p>
                    The system could not identify
                    enough structural elements to
                    characterize the argument.
                </p>


                <p>
                    Consider including:
                </p>


                <ul>

                    <li>
                        Your assumptions or definitions
                    </li>

                    <li>
                        Equations, evidence,
                        or supporting statements
                    </li>

                    <li>
                        The reasoning connecting
                        your statements
                    </li>

                    <li>
                        A clear conclusion
                    </li>

                </ul>


                <p class="important-note">

                    This does not necessarily mean
                    that your argument is incorrect.
                    It means that the current system
                    could not identify enough structure
                    from the submitted text.

                </p>

            </div>

        `;
    }
}


// ========================================
// LIVE EQUATION INPUT
// ========================================

const argumentInput =
    document.getElementById("argument");


if (argumentInput) {

    argumentInput.addEventListener(
        "input",
        renderArgumentPreview
    );
}


// ========================================
// INITIALIZATION
// ========================================

console.log(
    "Proof Laboratory loaded successfully."
);
