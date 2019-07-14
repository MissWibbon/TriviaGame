window.onload = function() {
    var questions = [];
    var count = 20;
    var num = 0;
    var right = 0;
    var wrong = 0;
    console.log(right);
    console.log(wrong);
    
    
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
                $('.counter').text(num + 1);
            }                
            var correct = $("<h6>");
            correct.text(questions[num].correct_answer);
            $('.choices').append(correct);
            correct.addClass("answer");
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
            count = 20;
            num++;
            getQuestions();
        }

        $('.answer').on("click", () =>{
            right++;
            console.log(right);
            alert(right);            
            reset();

        });

        $('.notAnswer').on("click", () =>{
            wrong++;
            console.log(wrong);
            alert(wrong);            
            reset();

        });
        function getResults() {             
               
            $('.results').css("display", "block");
            $('.timer').css("display", "none");
            
            if(right > wrong){
                $('.winLose').text("Congrats, you won!");
            }else if (wrong > right){
                $('.winLose').text("You're a loser.");
            }else {
                $('.winLose').text("You are as smart as you are dumb.");
            }
                //$('.right').text(right);
                //$('.wrong').text(wrong);
                //$('#timeLeft').css("display", "none");
        }
        if (num > 9){
            getResults();
        }
        getQuestions();
        console.log(questions);

    });
}