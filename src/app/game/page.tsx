"use client";

import { useState } from "react";
import Confetti from "react-confetti";
import styles from "./page.module.css";

const page = () => {
  const [rolls, setRolls] = useState(0); // Tracks # of rolls.
  const [diceValues, setDiceValues] = useState(Array(5).fill(1)); // Represents the current values of the dice.
  const [isWinner, setIsWinner] = useState(false);
  const [heldDice, setHeldDice] = useState(Array(5).fill(false)); // Keeps track of which dice are being held.
  const [isShaking, setIsShaking] = useState(false);
  const [totalWins, setTotalWins] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);
  const [showRules, setShowRules] = useState(false);

  const rollDice = () => {
    if (rolls >= 3) return;

    setIsShaking(true);

    setTimeout(() => {
      setIsShaking(false);
    }, 500);

    const newDiceValues = diceValues.map((value, index) => {
      if (!heldDice[index]) {
        return Math.floor(Math.random() * 6) + 1;
      }
      return value;
    });

    setDiceValues(newDiceValues);
    setRolls(rolls + 1);

    if (newDiceValues.every((val) => val === newDiceValues[0])) {
      setIsWinner(true);
      setTotalWins(totalWins + 1);
    } else if (rolls === 2) {
      setIsWinner(false);
      setTotalLosses(totalLosses + 1);
    }
  };

  const resetGame = () => {
    setRolls(0);
    setShowRules(false);
    setDiceValues(Array(5).fill(1));
    setHeldDice(Array(5).fill(false));
    setIsWinner(false);
  };

  const toggleHold = (index: number) => {
    const newHeldDice = [...heldDice];
    newHeldDice[index] = !newHeldDice[index];
    setHeldDice(newHeldDice);
  };

  const toggleRules = () => {
    if (showRules) {
      setShowRules(false);
    } else {
      setShowRules(true);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.dice_game}>
        <div className={styles.section}>
          <div className={styles.wins_losses_container}>
          <h1>Wins: {totalWins}</h1>
          <h1>Losses: {totalLosses}</h1></div>
        </div>
        <div className={styles.section}>
          <div className={styles.dice_container}>
            {diceValues.map((value, index) => (
              <button
                key={index}
                onClick={() => toggleHold(index)}
                disabled={heldDice[index]}
                className={`${styles.dice} ${
                  heldDice[index] ? styles.held : ""
                }`}
              >
                {value}
              </button>
            ))}
          </div>
          <h1>Rolls: {rolls}</h1>
          <button
            onClick={rollDice}
            className={`${styles.rollBtn} ${isShaking ? styles.shake : ""}`}
            disabled={rolls >= 3 || isWinner}
          >
            Roll Dice
          </button>

          {isWinner && <Confetti />}
          {isWinner && (
            <div className={styles.messageContainer}>
              <h2>Winner! 😄</h2>
            </div>
          )}
          {rolls === 3 && !isWinner && (
            <div className={styles.messageContainer}>
              <h2>Try again &#128532;</h2>
            </div>
          )}
          {(isWinner || rolls === 3) && (
            <button onClick={resetGame} className={styles.resetBtn}>
              Reset
            </button>
          )}
        </div>
        <div className={styles.section}>
          <button onClick={toggleRules} className={styles.rulesBtn}>
            Show Rules
          </button>
          {showRules ? (
            <div className={styles.rules_text}>Get 5 matching dice in less than three rolls.</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </main>
  );
};

export default page;
