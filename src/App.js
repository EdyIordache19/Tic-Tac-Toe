import './App.css';
import {useState} from "react";

let scoreX = 0, scoreO = 0;
function Square({value, handleClick}) {
    let className = "square " + (value === "X" ? "x " : "o ");

    return (
        <button className={className} onClick={handleClick}>{value}</button>
    );
}
function Board() {
    const [Board, setBoard] = useState([null, null, null, null, null, null, null, null, null]);
    const [xIsNext, setXNext] = useState(true);

    function handleClick(index) {
        if (calculateWinner(Board) || Board[index]) return;

        const newBoard = Board.slice();
        newBoard[index] = xIsNext ? "X" : "O";

        setXNext(!xIsNext);
        setBoard(newBoard);
    }

    const winner = calculateWinner(Board);
    if (winner) {
        console.log("Winner is " + winner);
    }
    else {
        console.log("Next player is " + (xIsNext ? "X" : "O"));
    }

    if (winner === "X") scoreX+=2;
    if (winner === "O") scoreO+=2;

    function resetBoard() {
        setBoard(Array(9).fill(null));
        setXNext(true);
    }


    return (
        <>
            <Menu xIsNext={xIsNext}/>
            <div className={"Board"}>
                {Board.map((value, index) => {
                    return <Square value={value} handleClick={() => handleClick(index)}/>
                })}
            </div>
            <button className={"reset-div"} onClick={resetBoard}>RESET</button>
        </>
    );
}

export default function App() {
    return (
        <div className={"App"}>
            <div className={"welcome"}>
                <h1 className={"welcome-text"}>Welcome To My Tic -Tac -Toe React Game!</h1>
            </div>
            <div className={"main-section"}>
                <Board/>
            </div>
        </div>
    );
}
function Menu({xIsNext}) {
    let class1 = "section x ", class2 = "section o ";

    if (xIsNext) {
        class1 += "border-red"
    }
    else {
        class2 += "border-blue"
    }

    return (
        <div className={"menu"}>
            <div className={class1}>
                <div className={"big-menu-text"}>X</div>
                <div className={"line-menu-text"}> - </div>
                <div className={"score-menu-text"}>{scoreX / 2}</div>
            </div>
            <div className={class2}>
                <div className={"big-menu-text"}>O</div>
                <div className={"line-menu-text"}> - </div>
                <div className={"score-menu-text"}>{scoreO / 2}</div>
            </div>
        </div>
    );
}
function calculateWinner(board) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }

    return null;
}