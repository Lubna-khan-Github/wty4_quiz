#!  /usr/bin/env node 

import inquirer from "inquirer"
import chalk from "chalk"
const apiLink:string = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";

let fetchData = async(data:string) =>{
    let fetchQuiz:any  = await fetch(data)
    let res = await fetchQuiz.json()
    return res.results;
}

 let data = await fetchData(apiLink);
let startQuiz = async() =>{
    let score:number = 0;
    // for user name
    let name = await inquirer.prompt({
        name: "fname",
        message: "what is your name ?",
        type: "input"
    });
    for(let i= 1; i < 5; i++ ){
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans =await inquirer.prompt({
            name: 'quiz',
            message: data[i].question,
            type:'list',
            choices:answers.map((val:any) =>val),
        });
        if(ans.quiz== data[i].correct_answer){
            ++score
        }
    }
    console.log(`Dear ${chalk.blue.bold(name.fname)},your score is
     ${chalk.red.bold(score)} out of ${chalk.green.bold('5')}`);
}
startQuiz();
    



