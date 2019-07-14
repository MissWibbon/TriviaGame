window.onload = function() {
    var questions = [];
    var count = 30;
    var num = 0;
    var right = 0;
    var wrong = 0;
    
    $.ajax({
        method: 'GET',
        url: "https://opentdb.com/api.php?amount=10&category=24&difficulty=medium&type=multiple"
    })
    .then (function (response){
        for (let i = 0; i < response.results.length; i++) {
            questions.push(response.results[i]);
        }       
        console.log(questions);
        function getQuestions(){
            questionDiv = $(".question").html("<h3>" + questions[num].question + "</h3>");

            for (i = 0; i < questions[num].incorrect_answers.length; i++){
                var incorrect = $("<h6>");
                incorrect.text(questions[num].incorrect_answers[i]);
                $('.choices').append(incorrect);
                incorrect.addClass("notAnswer");
                console.log(incorrect);            

            }                
            var correct = $("<h6>");
            correct.text(questions[num].correct_answer);
            $('.choices').append(correct);
            console.log(question);
            console.log(correct);
        }
        
        function time() {
        $("#timeLeft").html("<h6>" + count + "</h6>");
        
        if (count === 0) { 
            reset();
        }
        count--;
        }    
        setInterval(time, 1000);
        function reset(){
            $(".question").empty();
            $(".choices").empty();
            count = 30;
            num++;
            getQuestions();
        }

        getQuestions();
        console.log(questions);

    });
}