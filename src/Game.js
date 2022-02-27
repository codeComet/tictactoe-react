import React from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Game = () => {
  const [gameState, setGameState] = React.useState("X");
  const [cellValue, setCellValue] = React.useState(Array(16).fill(""));
  const [winner, setWinner] = React.useState("");

  const handleClick = (id) => {
    if (cellValue[id] === "") {
      setCellValue((prev) => {
        const newArray = [...prev];
        newArray[id] = gameState;
        //console.log(newArray);
        checkWinner(newArray);
        return newArray;
      });
      console.log(id);
    } else {
      alert("Already filled");
      return;
    }
    setGameState(
      gameState === "X"
        ? "O"
        : gameState === "O"
        ? "#"
        : gameState === "#"
        ? "X"
        : ""
    );
  };

  //toast
  const notify = (player) =>
    toast.success(`${player} won`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const checkWinner = (arr) => {
    const winningCombinations = {
      side: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
      ],
      down: [
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
      ],
      diagonal: [
        [0, 5, 10, 15],
        [3, 6, 9, 12],
      ],
    };

    for (let combo in winningCombinations) {
      winningCombinations[combo].forEach((item) => {
        if (
          arr[item[0]] === "" ||
          arr[item[1]] === "" ||
          arr[item[2]] === "" ||
          arr[item[3]] === ""
        ) {
          return;
        } else if (
          arr[item[0]] === arr[item[1]] &&
          arr[item[1]] === arr[item[2]] &&
          arr[item[2]] === arr[item[3]]
        ) {
          setWinner(arr[item[0]]);
          notify(arr[item[0]]);
          return;
        }
      });
      // console.log(combo);
    }
  };

  const Box = ({ id }) => {
    return <td onClick={() => handleClick(id)}>{cellValue[id]}</td>;
  };

  return (
    <div className="parent">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {!winner && (
        <h3>
          <span>{gameState}'s</span> turn
        </h3>
      )}

      <table>
        <tbody>
          <tr>
            <Box id="0" />
            <Box id="1" />
            <Box id="2" />
            <Box id="3" />
          </tr>
          <tr>
            <Box id="4" />
            <Box id="5" />
            <Box id="6" />
            <Box id="7" />
          </tr>
          <tr>
            <Box id="8" />
            <Box id="9" />
            <Box id="10" />
            <Box id="11" />
          </tr>
          <tr>
            <Box id="12" />
            <Box id="13" />
            <Box id="14" />
            <Box id="15" />
          </tr>
        </tbody>
      </table>
      {winner && (
        <>
          <h3>{winner} wins</h3>
          <button onClick={() => window.location.reload()}>Restart</button>
        </>
      )}
    </div>
  );
};

export default Game;
