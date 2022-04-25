import { initData } from "actions/initData";
import Column from "components/Column/Column";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { sortOrder } from "utils/sorts";
import "./Board.scss";

const Board = (props) => {
    const [board, setBoard] = useState({});
    const [columns, setColumn] = useState([]);

    useEffect(() => {
        const responseDb = initData.boards.find((x) => x.id === "board-1");
        if (responseDb) {
            setBoard(responseDb);
            setColumn(sortOrder(responseDb.columns, responseDb.columnOrder, "id"));
        }
    }, []);

    if (isEmpty(board)) return <div style={{ color: "red" }}>Not found</div>;

    const onColumnDrop = (dropResult) => {
        console.log(dropResult);
    };

    return (
        <div className="trello-columns">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                dragHandleSelector=".trello-column__header"
                getChildPayload={(index) => columns[index]}
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: "column-drop-preview",
                }}
            >
                {columns.map((column, idx) => (
                    <Draggable key={idx}>
                        <Column column={column} />
                    </Draggable>
                ))}
            </Container>
        </div>
    );
};

export default Board;
