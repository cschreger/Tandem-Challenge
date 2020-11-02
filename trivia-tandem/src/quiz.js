import React, { Component } from 'react';
import quizQuestions from './quizQuestions';
import './styles.css'


export class Quiz extends Component {
    constructor(props){
        super(props)

        this.state = {
            currIndex: 0,
            questionNum: 1,
            options: [],
            roundScore: 0,
            round: 1,
            score: 0,
        }
    }


    componentDidMount() {
        this.loadQuiz();
    }


    answerShuffle(choices, correct) {
        let options = choices.concat(correct);

        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        return options;
    }


    loadQuiz = () => {
        const {currIndex} = this.state;

        this.setState({
            question: quizQuestions[currIndex].question,
            options: this.answerShuffle(
                    quizQuestions[currIndex].incorrect, 
                    quizQuestions[currIndex].correct
                    ),
            answer: quizQuestions[currIndex].correct
        })
    }


    update = () => {
        let choices = document.getElementsByClassName('choice');

        Array.from(choices).forEach(selection => {
            if (selection.innerHTML === this.state.answer){
                selection.setAttribute("style", 'background-color: #71d5f3;')
                selection.setAttribute('class', 'choice')
            }
        })

        this.setState({
            currIndex: this.state.currIndex += 1,
            questionNum: this.state.questionNum += 1,
            question: quizQuestions[this.state.currIndex].question,
            options: this.answerShuffle(
                quizQuestions[this.state.currIndex].incorrect, 
                quizQuestions[this.state.currIndex].correct
            ),
            answer: quizQuestions[this.state.currIndex].correct
        })
    

        if (this.state.questionNum === 11){
            this.setState({
                roundScore: 0,
                round: 2
            })
        }
    }


    handleNextQuestion = (choice) => {
        const {answer} = this.state;

        if (choice === answer) {
            let choices = document.getElementsByClassName('choice');

            Array.from(choices).forEach(selection => {
                if (selection.innerHTML === answer){
                    selection.setAttribute("style", 'background-color: green;')
                }
            })

            this.setState ({
                score: this.state.score += 1,
                roundScore: this.state.roundScore += 1
            })
        } else {
            let choices = document.getElementsByClassName('choice')

            Array.from(choices).forEach(selection => {
                if (selection.innerHTML === answer){
                    selection.setAttribute("style", 'background-color: green;')
                }
            })
        }


        setTimeout(this.update, 1000)
    }


    newGame = () => {
        const {currIndex} = this.state;

        this.setState({
            currIndex: 0,
            questionNum: 1,
            roundScore: 0,
            round: 1,
            score: 0,
            question: quizQuestions[currIndex].question,
            options: this.answerShuffle(
                    quizQuestions[currIndex].incorrect, 
                    quizQuestions[currIndex].correct
                    ),
            answer: quizQuestions[currIndex].correct
        })
    }



    render() {
        const {options, question, score, roundScore, round, questionNum} = this.state;

        if (this.state.questionNum === 21) {
            return (
                <div className='new-game-wrapper'>
                <div>Thank you for playing!</div>
                <div>Round 1 Score: {this.state.score - this.state.roundScore} / 10</div>
                <div>Round 2 Score: {this.state.roundScore} / 10</div>
                <div className='final-score'>Final Score: {this.state.score} / 20</div>
                    <button className= 'new-game' onClick={() => this.newGame()}>New Game</button>
                </div>
            )
        } else {
            return (
            <div className='question-wrapper'>
                <h2>Round {round}: Question {`${questionNum > 10 ? questionNum - 10 : questionNum}`} of 10</h2>
                <h3>{question}</h3>
            
                <div className='options-wrapper'>
                    <p onClick={this.handleNextQuestion.bind(null, options[0])} className='choice'>{options[0]}</p>
                    <p onClick={this.handleNextQuestion.bind(null, options[1])} className='choice'>{options[1]}</p>
                    <p onClick={this.handleNextQuestion.bind(null, options[2])} className='choice'>{options[2]}</p>
                    <p onClick={this.handleNextQuestion.bind(null, options[3])} className='choice'>{options[3]}</p>
                </div>
            
                <div className='round-score'>
                    <span>Round {round} Score: </span>
                    <span>{roundScore}</span>
                </div>
            
                <div id ='total-score' className='total-score'>
                    <span>Total Score: </span>
                    <span>{score}</span>
                </div>
            </div>
            )
    }}
}


export default Quiz;