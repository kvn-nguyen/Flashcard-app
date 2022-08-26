import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';
import Card from '../comps/Card';

export default function Home() {

  const [cardInput, setCardInput] = useState([])
  const [userInput, setUserInput] = useState({
    question: '',
    answer: ''
  })
  const [displayCard, setDisplayCard] = useState(0)

  const handleUserInput = (e) => {
    e.preventDefault()
    const {name, value} = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  };

  const addNewCard = (e) => {
    const { question, answer } = userInput;
    e.preventDefault()
    question !== '' && answer !== '' && setCardInput([...cardInput, {
      question,
      answer
    }])
    setUserInput({question: '', answer: ''})
  };

  const handleNextCard = () => {
    displayCard < cardInput.length - 1 && setDisplayCard(displayCard + 1)
  }

  const handlePrevCard = () => {
    displayCard > 0 && setDisplayCard(displayCard - 1)
  }

  const deleteCard = () => {
    const updatedArray = [...cardInput];
    updatedArray.splice(displayCard, 1);
    setCardInput(updatedArray);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>FlashCard Brother</title>
        <meta name="description" content="Flashcard app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <main className={styles.main}>
        <h1 className={styles.title}>
          FlashCard Brother
        </h1>

        <h3 className={styles.title}
          >Create a Flashcard
        </h3>

        <form className={styles.formInput}>
          <textarea type="text" value={userInput.question} name="question" placeholder="Question" onChange={handleUserInput}></textarea>
          <textarea type="text" value={userInput.answer} name="answer" placeholder="Answer" onChange={handleUserInput}></textarea>
          <button onClick={addNewCard}>Add Card</button>
        </form>

        <div className={styles.wholeCard}>
          {cardInput.length >= 1 ? <button onClick={handlePrevCard} className={styles.arrow}>&lt;</button> : null }
          <div>
            {cardInput.length >= 1 
            ? <Card item={cardInput[displayCard]} deleteCurrentCard={deleteCard}/> 
            : "Create new card"}
          </div>
          {cardInput.length >= 1 ? <button onClick={handleNextCard} className={styles.arrow}>&gt;</button> : null}
        </div>
        {cardInput.length > 0 && <div className={styles.wholeCard}>
          <button onClick={deleteCard}>Delete</button>
        </div>}
      </main>
  
    </div>
  );
}