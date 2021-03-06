import { initData } from "actions/initData";
import Column from "components/Column/Column";
import { isEmpty } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { dragDrop } from "utils/DragDrop";
import "./Board.scss";

const Board = (props) => {
    const [board, setBoard] = useState({});
    const [columns, setColumn] = useState([]);
    const [openInput, setOpenInput] = useState(false);
    const [columnInput, setColumnInput] = useState("");

    useEffect(() => {
        fetch("http://localhost:9090/board/626e8d46d87a197654b93fb8")
            .then((res) => res.json())
            .then((responseDb) => {
                console.log(responseDb);
                setBoard(responseDb.result);
                setColumn(responseDb.result.columns);
            })
            .catch((err) => console.log(err));
    }, []);

    const inputRef = useRef(null);
    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [openInput]);

    const onColumnDrop = (dropResult) => {
        const newColum = [...columns];
        const drag = dragDrop(newColum, dropResult);
        const newBoard = { ...board };
        newBoard.columnOrder = drag.map((x) => x.id);
        newBoard.columns = drag;

        setColumn(drag);
        setBoard(newBoard);
    };

    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
            let newColum = [...columns];
            let currenColumn = newColum.find((x) => x.id === columnId);

            currenColumn.cards = dragDrop(currenColumn.cards, dropResult);
            currenColumn.cardOrder = currenColumn.cards.map((x) => x.id);
            setColumn(newColum);
        }
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

    const toggleOpenInput = () => {
        setOpenInput(!openInput);
    };

    const handleAddNewColumn = () => {
        if (!columnInput) {
            inputRef.current.focus();
            return;
        }
        const addColumn = {
            id: Math.random().toString(36).substr(2, 5),
            boardId: board.id,
            title: columnInput.trim(),
            cards: [],
            cardOrder: [],
        };
        const newColumns = [...columns];
        newColumns.push(addColumn);

        const newBoard = { ...board };
        newBoard.columnOrder = newColumns.map((x) => x.id);
        newBoard.columns = newColumns;
        setBoard(newBoard);
        setColumn(newColumns);
        setColumnInput("");
        toggleOpenInput();
    };

    const addColumn = useRef(null);

    const handleDeleteColumn = (columnId) => {
        const newColumn = [...columns];
        const delIndex = newColumn.findIndex((x) => x.id === columnId);
        newColumn.splice(delIndex, 1);
        setColumn(newColumn);
    };

    const handleTitleChange = (columnId, title) => {
        const newColumn = [...columns];
        const editTitleColumn = newColumn.find((x) => x.id == columnId);
        console.log(editTitleColumn);
        editTitleColumn.title = title;
        setColumn(newColumn);
    };

    if (isEmpty(board)) return <div style={{ color: "red" }}>Not found</div>;

    return (
        <div className="trello-columns">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                dragHandleSelector=".trello-column__header"
                getChildPayload={(index) => columns[index]}
                dragClass="card-ghost"
                dropClass="card-ghost-drop"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: "column-drop-preview",
                }}
            >
                {columns.map((column, idx) => (
                    <Draggable key={idx}>
                        <Column
                            column={column}
                            onCardDrop={onCardDrop}
                            onAdd={handleAdd}
                            onDel={handleDeleteColumn}
                            onEditTitle={handleTitleChange}
                        />
                    </Draggable>
                ))}
            </Container>
            {openInput ? (
                <div className="trello-columns__add trello-columns__input" ref={addColumn}>
                    <input
                        type="text"
                        placeholder="Add title"
                        ref={inputRef}
                        value={columnInput}
                        onChange={(e) => setColumnInput(e.target.value)}
                    />
                    <div className="trello-columns__btn">
                        <button onClick={handleAddNewColumn}>Add</button>
                        <i className="fa fa-trash" onClick={toggleOpenInput}></i>
                    </div>
                </div>
            ) : (
                <div className="trello-columns__add" onClick={toggleOpenInput}>
                    <i className="fa fa-flus"></i>
                    Add new columns
                </div>
            )}
        </div>
    );
};

export default Board;
