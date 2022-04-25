import Appbar from "components/Appbar/Appbar";
import Board from "components/Board/Board";
import Boardbar from "components/Boardbar/Boardbar";
import React from "react";
import "./App.scss";

function App() {
    return (
        <div className="trello">
            <Appbar />
            <Boardbar />
            <Board />
        </div>
    );
}

export default App;
