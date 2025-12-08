import { useEffect, useRef, useState } from 'react'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import './App.css'

import { Dice } from "../components/Dice"

function App() {
  let [diceNums, setDiceNums] = useState(() => allnewDice());
  let [rollCount, setRollCount] = useState(0)
  const focusBtn = useRef(null);
  //let [currentTime, setCurrentTime] = useState(()=> newTime());

  // if ((diceNums.filter(die => die.isHeld === false).length === 0 )) {
  //   console.log("game won")
  // }
  
  let gameWon = diceNums.every(die => die.isHeld) && diceNums.every(die => die.value === diceNums[0].value)

  function allnewDice() {
    // let randomArr = [];
    // for(let num = 0; num < 10; num ++) {
    //   randomArr.push(Math.ceil(Math.random() * 6));
    // }
    // return randomArr
    
    // let newArr = [...Array(10).keys()].map(index => index + 1);
    // let arrElems = newArr.map((num, i) => <Dice key={newArr[i]}/>);

    return new Array(10).fill(0).map(() => {
      return randomDice();
    });
  }

  function randomDice () {
    return {
        value:Math.ceil(Math.random() * 6),
        isHeld:false, 
        id:nanoid()
      }
  }

  function rollDice() {
    if(gameWon) {
      setDiceNums(allnewDice);
      setRollCount(0)
    } else {
      setDiceNums(oldDice => oldDice.map(die => {
        return (die.isHeld) ? die : randomDice () 
      }))
      setRollCount(oldCount => oldCount + 1);

    }
  }

  useEffect(() => {
    // allnewDice(); 
    if (gameWon) focusBtn.current.focus()

  }, [gameWon])

  useEffect(() => {
    
  }, [])

  // function newTime() {
  //   return `${new Date().getMinutes().toString().padStart(2, '0')}: ${new Date().getSeconds().toString().padStart(2, '0')}`
  // }

  function holdDie(id){ 
    // if (event.target.classList.contains("dice-elem")) {
    //   // setDiceNums(old => old.map(obj => {
    //   //   console.log(obj.id === event.target.id)
    //   // }))
    // }
     setDiceNums(old => old.map(obj => {
       return (id === obj.id) ? {...obj, isHeld:!obj.isHeld} : obj
      }))
  }

  let diceElems = diceNums.map((obj, i) => <Dice key={obj.id} value={obj.value} isHeld={obj.isHeld} onClick={() => holdDie(obj.id)}/>);

  return (
    <>
     <div className='main-container'>
        <div className="content-wrap">
          {gameWon ? <Confetti /> : null}
          
          <div className="title">
            Tenzies
          </div>
          <p className='instruct'>
            Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
          </p>
        </div>
       <div className="dices-wrap">
         {/* {arrElems} */}
         {diceElems}
       </div>
       <button onClick={rollDice} className='action-btn' ref={focusBtn}>
          {gameWon ? "New Game" : "Roll"}
        </button>

        {/* <div>
          Timer : {currentTime}
        </div> */}
        <div>
          Roll count = {rollCount}
        </div>
       <div aria-label='polite'>
            {gameWon ? <p>Congratulations! You have won the game in {rollCount} rolls. Press "New Game" to start new game.</p> : null}
          </div>
     </div>
    </>
  )
}

export default App


/*
#not neede will lead to issue if not used useEffect - 
gameWon state can track if all dices are false onece we achieve that we can show confetti 4

#this was right -
another solution could simply to check false value if 0 then to show confetti 
and rest the game

#this was wrong for que 2
does not seem necessary

adding state which will be set to false
since its false rolldice button will have two function one will display all when state is true
button will display another text
true will also show confetti

*/