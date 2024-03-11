function checkQuestionOne()
{
    var answer1 = document.getElementById("question_one_answer").value;
    if (answer1 == "Owen Roberts" || answer1 == "owen Roberts" || answer1 == "Owen roberts" || answer1 == "owen roberts")
    {
        alert("Correct!");
    }
    else
    {
        alert("Incorrect!");
    }
}

function checkQuestionTwo()
{
    var answer2 = document.getElementById("question_two_answer").value;
    if (answer2 == "GCM" || answer2 == "gcm" || answer2 == "Gcm" || answer2 == "GCm" || answer2 == "gCm" || answer2 == "gCM")
    {
        alert("Correct!");
    }
    else
    {
        alert("Incorrect!");
    }
}