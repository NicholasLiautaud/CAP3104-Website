function checkQuestionOne()
{
    var answer1 = document.getElementById("question_one_answer").value;
    if (answer1 == "Julius Caesar") // uses Caesar Cipher
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
    if (answer2 == "Don't you just love cryptography and numbers?") // uses ROT13 (A-Z, a-z)
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
    if (answer3 == "You're so smart! You figured it out!") // uses ROT13 (A-Z, a-z) and then Caesar Cipher
    {
        alert("Correct!");
        document.getElementById("question_three_submit").disabled = true;
    }
    else
    {
        alert("Incorrect!");
    }
}