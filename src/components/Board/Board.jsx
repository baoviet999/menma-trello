import { initData } from "actions/initData";
import Column from "components/Column/Column";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { dragDrop } from "utils/DragDrop";
import "./Board.scss";

const Board = (props) => {
    const [board, setBoard] = useState({});
    const [columns, setColumn] = useState([]);
    useEffect(() => {
        const responseDb = initData.boards.find((x) => x.id === "board-1");
        if (responseDb) {
            setBoard(responseDb);
            setColumn(responseDb.columns);
        }
    }, []);

    if (isEmpty(board)) return <div style={{ color: "red" }}>Not found</div>;

    // const onColumnDrop = (dropResult) => {
    //     const newColum = [...columns];
    //     const drag = dragDrop(newColum, dropResult);
    //     const newBoard = { ...board };
    //     newBoard.columnOrder = drag.map((x) => x.id);
    //     newBoard.columns = drag;

    //     setColumn(drag);
    //     setBoard(newBoard);
    // };

    // const onCardDrop = (columnId, dropResult) => {
    //     if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
    //         let newColum = [...columns];
    //         let currenColumn = newColum.find((x) => x.id === columnId);

    //         currenColumn.cards = dragDrop(currenColumn.cards, dropResult);
    //         currenColumn.cardOrder = currenColumn.cards.map((x) => x.id);
    //         setColumn(newColum);
    //     }
    // };

    const onColumnDrop = (dropResult) => {
        const newColum = [...columns];
        const sortData = dragDrop(newColum, dropResult);
        const newBoard = { ...board };
        newBoard.columnOrder = sortData.map((x) => x.id);
        newBoard.columns = sortData;
        setColumn(sortData);
        setBoard(newBoard);
    };

    const onCardDrop = (columnId, dropResult) => {
        const newColumns = [...columns];
        let currenColumn = newColumns.find((x) => x.id === columnId);
        currenColumn.cards = dragDrop(currenColumn.cards, dropResult);
        currenColumn.cardOrder = currenColumn.cards.map((x) => x.id);
        setColumn(newColumns);
    };

    const handleAdd = (columnId, newCard) => {
        const newColumns = [...columns];
        let currentCard = newColumns.find((x) => x.id === columnId);
        console.log(currentCard);
        currentCard.cards = [
            ...currentCard.cards,
            {
                title: newCard.title,
                id: `column-${currentCard.cards.length + 1}`,
            },
        ];
        console.log(newColumns);
        setColumn(newColumns);
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
                        <Column column={column} onCardDrop={onCardDrop} onAdd={handleAdd} />
                    </Draggable>
                ))}
            </Container>
            <div className="trello-columns__add">
                <i className="fa fa-flus"></i>
                Add new columns
            </div>
        </div>
    );
};

export default Board;
