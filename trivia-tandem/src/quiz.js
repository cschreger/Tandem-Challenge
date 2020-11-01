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

        this.gameFinish = this.gameFinish.bind(this);
    }


    componentDidMount() {
        this.loadQuiz();
    }

    

    // componentDidUpdate(prevProps, prevState) {
    //     const {currIndex} = this.state;
    //     debugger
    //     if (currIndex !== prevState.currIndex) {
    //         debugger
    //         this.setState({
    //             question: quizQuestions[currIndex].question,
    //             options: this.answerShuffle(
    //                 quizQuestions[currIndex].incorrect, 
    //                 quizQuestions[currIndex].correct
    //                 ),
    //             answer: quizQuestions[currIndex].correct
    //         })
    //     }
    // }

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


    handleNextQuestion = (choice) => {
        const {selectedAnswer, answer} = this.state;

        this.setState({
            selectedAnswer: choice,
            disabled: false
        })

        debugger
        if (choice === answer) {
            this.setState ({
                score: this.state.score += 1
            })
        }

        debugger

        this.setState({
            currIndex: this.state.currIndex += 1,
            questionNum: this.state.questionNum += 1,
            selectedAnswer: null,
            question: quizQuestions[this.state.currIndex].question,
            options: this.answerShuffle(
                quizQuestions[this.state.currIndex].incorrect, 
                quizQuestions[this.state.currIndex].correct
            ),
            answer: quizQuestions[this.state.currIndex].correct
        })
        debugger
    }


    handleFinish = () => {
        if (this.state.questionNum === quizQuestions.length - 1) {
            this.setState({
                currIndex: this.state.currIndex += 1,
                questionNum: this.state.questionNum += 1,
                selectedAnswer: null
            })
        } else {
            this.setState({
                currIndex: this.state.currIndex += 1,
                questionNum: this.state.questionNum += 1,
                selectedAnswer: null
            })
        }
    }

    gameFinish = () => {
        debugger
        return (
            <div>
                Thank you for playing!! 
            </div>
        )
    }


    render() {
        const {options, question, score, round, questionNum} = this.state;

        return (
        <div className='question-wrapper'>
            <h1>Round {round}</h1> 
            <h2>Question {`${questionNum > 10 ? questionNum - 10 : questionNum}`} of 10</h2>
            <h3>{question}</h3>
            <div className='options-wrapper'>
                <p onClick={this.handleNextQuestion.bind(null, options[0])} className='choice'>{options[0]}</p>
                <p onClick={this.handleNextQuestion.bind(null, options[1])} className='choice'>{options[1]}</p>
                <p onClick={this.handleNextQuestion.bind(null, options[2])} className='choice'>{options[2]}</p>
                <p onClick={this.handleNextQuestion.bind(null, options[3])} className='choice'>{options[3]}</p>
            </div>
            

            {questionNum === 10 && 
            <button onClick={this.handleFinish}>
                Finish Round
            </button>
            }

            {questionNum === 20 && 
            <button onClick={this.gameFinish}>
                Finish Game
            </button>
            }
            
        <span>{score}</span>
        </div>
        )
    }
}

export default Quiz;