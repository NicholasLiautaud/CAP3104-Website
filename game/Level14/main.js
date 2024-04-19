function checkQuestionOne()
{
    var answer1 = document.getElementById("question_one_answer").value;
    if (answer1 == "Hello, world!") // Hello, world!
    {
        alert("Correct!");
        document.getElementById("question_one_submit").disabled = true;
    }
    else
    {
        alert("Incorrect!");
    }
}

function checkQuestionTwo()
{
    var answer2 = document.getElementById("question_two_answer").value;
    if (answer2 == "grep -c 'first page' lyrics.txt") // grep -c "first page" lyrics.txt
    {
        alert("Correct!");
        document.getElementById("question_two_submit").disabled = true;
    }
    else
    {
        alert("Incorrect!");
    }
}

function checkQuestionThree()
{
    var answer3 = document.getElementById("question_three_answer").value;
    if (answer3 == "tail lyrics.txt") // tail lyrics.txt
    {
        alert("Correct!");
        document.getElementById("question_three_submit").disabled = true;
    }
    else
    {
        alert("Incorrect!");
    }
}

function lightMode()
{
    let element = document.body;
    let content = document.getElementById("pageSettings");
    element.className = "light-mode";
}