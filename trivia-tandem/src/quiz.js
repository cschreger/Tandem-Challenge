import React, { Component } from 'react';
import quizQuestions from './quizQuestions';
import './styles.css'

export class Quiz extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            selectedAnswer: null,
            currIndex: 0,
            round: 1,
            questionNum: 1,
            options: [],
            quizEnd: false,
            score: 0,
            disabled: true
        }
    }


    componentDidMount() {
        this.loadQuiz();
    }

    
    componentDidUpdate(prevProps, prevState) {
        const {currIndex} = this.state;
        debugger
        if (this.state.currIndex !== prevState.currIndex) {
            this.setState({
                question: quizQuestions[currIndex].question,
                options: this.answerShuffle(
                    quizQuestions[currIndex].incorrect, 
                    quizQuestions[currIndex].correct
                    ),
                answer: quizQuestions[currIndex].correct
            })
        }
    }

    answerShuffle(choices, correct) {
        let options = choices.concat(correct);
        debugger
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        debugger
        return options;
    }


    checkAnswer = (answer) => {
        this.setState({
            userAnswer: answer,
            disabled: false
        })
    }


    loadQuiz = () => {
        const {currIndex} = this.state;

        this.setState(() => {
            return {
            question: quizQuestions[currIndex].question,
            options: this.answerShuffle(
                    quizQuestions[currIndex].incorrect, 
                    quizQuestions[currIndex].correct
                    ),
            answer: quizQuestions[currIndex].correct
        }})
        debugger
    }


    handleNextQuestion = () => {
        const {selectedAnswer, answer} = this.state;

        if (selectedAnswer = answer) {
            this.setState ({
                score: this.state.score += 1
            })
        }

        this.setState({
            currIndex: this.state.currIndex += 1,
            questionNum: this.state.questionNum += 1,
            userAnswer: null
        })
    }

    handleFinish = () => {
        if (this.state.questionNum === 10) {

        }
    }


    render() {
        const {options, question, quizEnd, score, 
            disabled, round, questionNum, userAnswer} = this.state;
            console.log(options)
            console.log("a")
        debugger
        return (
        <div className='question-wrapper'>
            <h1>Round {round}</h1> 
            <h2>Question {questionNum} of 10</h2>
            <h2>{question}</h2>
            <div className='options-wrapper'>
                <p className='choice'>{options[0]}</p>
                <p className='choice'>{options[1]}</p>
                <p className='choice'>{options[2]}</p>
                <p className='choice'>{options[3]}</p>
            </div>

            {questionNum === 10 && 
            <button onClick={this.handleFinish}>
                Finish Round
            </button>
            }
            
               
        </div>
        )
    }
}

export default Quiz;