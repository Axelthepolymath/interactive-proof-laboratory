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

    const argument =
        document.getElementById("argument").value.trim();

    const result =
        document.getElementById("result");

    if (argument.length === 0) {

        result.innerHTML =
            "<strong>Please construct an argument first.</strong>";

        return;
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
