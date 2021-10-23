let count = document.querySelector('.num-qus .totalQ');
let answer_area = document.getElementById('answer-area');
let quiz_area = document.getElementById('quiz-area');
let submit_button = document.getElementById('submit-button');

//set option 
let currentIndex = 0;
let rightAnswers = 0;
function getQuestion() {

    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function (){
        if (this.readyState === 4 && this.status === 200){
            let questionObject = JSON.parse(this.responseText);
            let questionCount = questionObject.length;
            console.log(questionObject);
            //Num of Question
            createBullets(questionCount);
            //Add Question Data
            addquestionData(questionObject[currentIndex] , questionCount);

            // click submit
            submit_button.onclick = () => {
                //answer true
                var rightAns = questionObject[currentIndex].right_answer;
                 console.log(rightAns);
                currentIndex++;

                //check Answer
                checkAnswer(rightAns,questionCount);
                
            }
        }
    };

    myRequest.open('GET','html_question.json', true);
    myRequest.send();

}
getQuestion();

function createBullets (num){
 count.innerHTML = num;
}

function addquestionData (obj , count){
    //create h2
   let questionTitle = document.createElement('h2');
   //create Question text
   let questionText = document.createTextNode(obj['title'] );
    //append h2 to quia area
   quiz_area.appendChild(questionTitle);
   // append text to h2 
   questionTitle.appendChild(questionText);

   //create answer
   for (let i = 1; i <= 4; i++) {
       //create main answer
        let maindiv = document.createElement('div');
        maindiv.className = 'answer';
        //create radio inp
        let radio = document.createElement('input');
        // add Des of radio 
        radio.name = 'question';
        radio.type = 'radio';
        radio.id = `answer_${i}`;
        radio.dataset.answer = obj[`answer_${i}`];
        
        // create label 
        let label = document.createElement('label');
        label.htmlFor = `answer_${i}`;
        //create text label
        let  textLabel = document.createTextNode(obj[`answer_${i}`]);
        label.appendChild(textLabel);
        maindiv.appendChild(radio);
        maindiv.appendChild(label);
        answer_area.appendChild(maindiv);
       }
   }

   function checkAnswer(resltAnswer, count) {
        let answer = document.getElementsByName('question');
        let theChoosenAnswer;
        for (let i = 0; i < answer.length; i++) {
            if( answer[i].checked) {
                theChoosenAnswer = answer[i].dataset.answer;
            }
        }
        console.log(theChoosenAnswer);
        console.log(rightAns);
         if(resltAnswer === theChoosenAnswer){
            rightAnswers++;
            console.log('good answer');
         }
    };



    window.localStorage.setItem('color' , 'red');
    window.localStorage.fontSize ='12px';
    window.localStorage['width'] = '10px';
   console.log( window.localStorage.getItem('color'));
    console.log(window.localStorage);
    console.log(typeof window.localStorage);
