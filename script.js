import react, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import { ImCross } from "react-icons/im";
import { CgShapeCircle } from "react-icons/cg";

const winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

// let Arr = new Array(9).fill(" ");
// let Turn = "X";
// let gameOver = isGameOver(Arr, winCombo);

function isGameOver(arr, winCombo) {
  for (let i = 0; i < winCombo.length; i++) {
    let flag = true;
    for (let j = 1; j < 3; j++) {
      const curr = winCombo[i][j];
      const prev = winCombo[i][j - 1];
      if (arr[curr] !== arr[prev]) {
        flag = false;
        break;
      }
    }
    if (flag && arr[winCombo[i][0]] !== " ")
      return {
        first: true,
        second: [winCombo[i][0], winCombo[i][1], winCombo[i][2]],
        third: `${arr[winCombo[i][0]]} Won`,
      };
  }
  for (let val of arr) {
    if (val === " ") return { first: false, second: "no" };
  }
  return { first: true, second: "no", third: "Draw" };
}

function Borad({ arr, reRender, turn, setTurn, gameover, setGameOver }) {
  // console.log("Borad Executed .");

  function handleClick(event) {
    if (gameover === true || arr[event.target.id] !== " ") return;

    const newArr = [...arr];
    newArr[event.target.id] = turn;
    reRender(newArr);

    setTurn(turn === "X" ? "O" : "X");

    gameover = isGameOver(newArr, winCombo).first;
    if (gameover) setGameOver(gameover);
  }

  // console.log("Borad Executed .");
  return (
    <div id="board" onClick={handleClick}>
      {arr.map((value, index) => (
        <div key={index} id={index} style={{ color: "black" }}>
          {value === "X" ? (
            <ImCross className="IamCross" />
          ) : value === "O" ? (
            <CgShapeCircle className="IamCircle" />
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
}

function DisplayTurn({ arr, turn, gameover }) {
  //  console.log("DisplayTurn Executed .");
  let ans = "";
  if (gameover === true) {
    ans = isGameOver(arr, winCombo).third;
    // setTurn("G");
  } else if (turn === "X") {
    // turn = "O";
    ans = `Turn for ${turn}`;
    // setTurn(turn);
  } else {
    // turn = "X";
    ans = `Turn for ${turn}`;
    // setTurn(turn);
  }

  return <div id="display">{ans}</div>;
}

function App() {
  // console.log("App Executed .");
  const [turn, setTurn] = useState("X");
  const [gameover, setGameOver] = useState(false);
  const [arr, reRender] = useState(new Array(9).fill(" "));
  useEffect(() => {
    // console.log("App useEffect Executed .");
    const { first: isover, second: result } = isGameOver(arr, winCombo);
    if (typeof result !== "string") {
      document.getElementById(result[0]).style.color = "red";
      document.getElementById(result[1]).style.color = "red";
      document.getElementById(result[2]).style.color = "red";
    }
    if (isover) {
      document.getElementById("reset").style.display = "inline-block";
    }
  }, [gameover]);

  function handleReset() {
    document.getElementById("reset").style.display = "none";
    setTurn("X");
    setGameOver(false);
    reRender(new Array(9).fill(" "));

    const result = isGameOver(arr, winCombo).second;
    if (typeof result !== "string") {
      document.getElementById(result[0]).style.color = "black";
      document.getElementById(result[1]).style.color = "black";
      document.getElementById(result[2]).style.color = "black";
    }
  }

  return (
    <>
      {/* <h1> hello World</h1> */}
      <div id="interface">
        <Borad
          arr={arr}
          reRender={reRender}
          turn={turn}
          setTurn={setTurn}
          gameover={gameover}
          setGameOver={setGameOver}
        />
        <DisplayTurn arr={arr} turn={turn} gameover={gameover} />
        <button id="reset" style={{ display: "none" }} onClick={handleReset}>
          Reset
        </button>
      </div>
    </>
  );
}

const Root = ReactDOM.createRoot(document.getElementById("root"));
Root.render(<App />);
