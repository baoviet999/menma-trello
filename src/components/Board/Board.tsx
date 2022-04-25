import Column from "components/Column/Column";
import React from "react";
import "./Board.scss";
type Props = {};

const Board = (props: Props) => {
    return (
        <div className="trello-columns">
            <Column />
            <Column />
            <Column />
            <Column />
            <Column />
            <Column />
        </div>
    );
};

export default Board;
