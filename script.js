const questions = {


   mathematics: [
    "Prove that the sum of two even integers is even.",
    "Prove that there are infinitely many prime numbers.",
    "Determine whether the statement 'every continuous function is differentiable' is true or false.",
    "Demonstrate how calculus can be applied to solve algebraic problems and geometric problems.",
    "Prove that algebraic equations can be solved or analyzed using derivatives.",
    "What is a number?"
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


let currentField = "";
let currentQuestion = 0;


function selectField(field) {

    currentField = field;
    currentQuestion = 0;

    document.getElementById("field-selection")
        .classList.add("hidden");

    document.getElementById("question-section")
        .classList.remove("hidden");

    showQuestion();

}


function showQuestion() {

    const fieldName =
        currentField.charAt(0).toUpperCase()
        + currentField.slice(1);

    document.getElementById("field-title").textContent =
        fieldName;

    document.getElementById("question").textContent =
        questions[currentField][currentQuestion];

    document.getElementById("argument").value = "";

    document.getElementById("result").innerHTML = "";

}


function checkArgument() {

    const argument = document
        .getElementById("argument")
        .value
        .trim();

    const result = document.getElementById("result");

    if (argument.length === 0) {

        result.innerHTML = `
            <div class="result-box incomplete">
                <h3>⚠️ No Argument Submitted</h3>
                <p>
                    Please construct your argument before checking it.
                </p>
            </div>
        `;

        return;
    }

    const text = argument.toLowerCase();

    // Detect mathematical content
    const hasEquation =
        /[a-z]\s*=\s*[-+*/().0-9a-z]/i.test(argument) ||
        text.includes("f(x)") ||
        text.includes("equation");

    // Detect reasoning
    const hasReasoning =
        text.includes("because") ||
        text.includes("since") ||
        text.includes("therefore") ||
        text.includes("thus") ||
        text.includes("hence") ||
        text.includes("so that");

    // Detect calculus
    const hasCalculus =
        text.includes("derivative") ||
        text.includes("differentiate") ||
        text.includes("calculus") ||
        text.includes("rate of change") ||
        text.includes("slope");

    // Detect conclusion
    const hasConclusion =
        text.includes("therefore") ||
        text.includes("thus") ||
        text.includes("hence") ||
        text.includes("we conclude") ||
        text.includes("this proves");

    // Detect an actual calculation
    const hasCalculation =
        /\d+\s*[+\-*/=]\s*\d+/.test(argument) ||
        text.includes("f'(x)") ||
        text.includes("derivative");

    /*
     * MATHEMATICAL ARGUMENT ANALYSIS
     */

    if (
        hasEquation &&
        hasReasoning &&
        hasConclusion &&
        hasCalculation
    ) {

        result.innerHTML = `
            <div class="result-box valid">

                <h3>✅ Argument Structure: Valid</h3>

                <p>
                    Your response contains the main elements
                    required for a mathematical argument:
                </p>

                <ul>
                    <li>Mathematical statement or equation</li>
                    <li>Reasoning</li>
                    <li>Calculation or mathematical operation</li>
                    <li>Conclusion</li>
                </ul>

                <p>
                    <strong>Status:</strong>
                    The argument appears mathematically coherent
                    based on the information provided.
                </p>

                <p>
                    <strong>Note:</strong>
                    This prototype checks the structure of the
                    argument. It does not yet constitute formal
                    mathematical proof verification.
                </p>

            </div>
        `;

    }

    /*
     * INCOMPLETE ARGUMENT
     */

    else if (
        hasEquation &&
        hasReasoning
    ) {

        result.innerHTML = `
            <div class="result-box incomplete">

                <h3>🟡 Argument: Incomplete</h3>

                <p>
                    Your argument contains mathematical
                    reasoning, but an important component
                    appears to be missing.
                </p>

                <p>
                    Try adding an explicit calculation and
                    a clearly stated conclusion.
                </p>

            </div>
        `;

    }

    /*
     * INSUFFICIENT ARGUMENT
     */

    else {

        result.innerHTML = `
            <div class="result-box invalid">

                <h3>❌ Argument: Not Established</h3>

                <p>
                    The system could not establish the
                    argument from the information provided.
                </p>

                <p>
                    Try structuring your response as:
                </p>

                <ol>
                    <li>State your assumptions.</li>
                    <li>Define the relevant concepts.</li>
                    <li>Show the mathematical reasoning.</li>
                    <li>Perform the necessary calculations.</li>
                    <li>State the conclusion.</li>
                </ol>

            </div>
        `;

    }
}

    result.innerHTML = `
        <strong>Argument submitted.</strong>
        <p>
            Your next version of the system can analyze
            premises, assumptions, logical steps, evidence,
            counterexamples, and conclusions.
        </p>
    `;

}


function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= questions[currentField].length) {
        currentQuestion = 0;
    }

    showQuestion();

}
