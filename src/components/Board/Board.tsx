import Column from "components/Column/Column";
import React, { useState } from "react";
import "./Board.scss";
import { initData } from "actions/initData";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import { sortOrder } from "utils/sorts";
type Props = {};

const Board = (props: Props) => {
    const [board, setBoard] = useState({});
    const [columns, setColumn] = useState<any>([]);

    useEffect(() => {
        const responseDb = initData.boards.find((x) => x.id === "board-1");
        if (responseDb) {
            setBoard(responseDb);
            setColumn(sortOrder(responseDb.columns, responseDb.columnOrder, "id"));
        }
    }, []);

    if (isEmpty(board)) return <div style={{ color: "red" }}>Not found</div>;

    return (
        <div className="trello-columns">
            {columns.map((column: any, idx: number) => {
                return <Column key={idx} column={column} />;
            })}
        </div>
    );
};

export default Board;
