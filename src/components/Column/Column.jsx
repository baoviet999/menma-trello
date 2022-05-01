import Card from "components/Card/Card";
import ModalComfirm from "components/Modal/Modal";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Container, Draggable } from "react-smooth-dnd";
import { sortOrder } from "utils/sorts";
import "./Column.scss";

const Column = ({ column, onCardDrop, onAdd, onDel, onEditTitle }) => {
    const { cards } = column;
    const sortCard = sortOrder(cards, column.cardOrder, "id");

    const handleNewAdd = (id, title) => {
        onAdd(id, { title });
    };
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => {
        if (inputRef && inputRef.current !== null) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [open]);
    const handleOpen = () => {
        setOpen(true);
    };
    const [valueInput, setValueInput] = useState("");

    useEffect(() => {
        setValueInput(column.title);
    }, [column.title]);

    const [show, setShow] = useState(false);
    const handleConfirm = (payload) => {
        if (payload.type === "close") setShow(false);
        else {
            console.log(payload);
            onDel(column.id);
            setShow(false);
        }
    };
    const handleInputBlur = () => {
        onEditTitle(column.id, valueInput);
        setOpen(false);
    };

    const [addCard, setAddCard] = useState(true);
    const [cardInput, setCardInput] = useState("");
    const handleAddCard = () => {
        if (!onAdd) return;
        onAdd(column.id, cardInput);
        setAddCard(true);
        setCardInput("");
    };

    return (
        <div className="trello-column">
            <div className="trello-column__header">
                {!open ? (
                    <h5 onClick={handleOpen}>{valueInput} </h5>
                ) : (
                    <input
                        onChange={(e) => setValueInput(e.target.value)}
                        ref={inputRef}
                        type="text"
                        value={valueInput}
                        onBlur={handleInputBlur}
                        onKeyDown={(e) => e.key === "Enter" && handleInputBlur()}
                    />
                )}
                <Dropdown>
                    <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        size={"sm"}
                        className="trello-column__header--btn"
                    >
                        <i className="fa fa-more"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu size="lg">
                        <Dropdown.Item className="trello-column__header--item">More....</Dropdown.Item>
                        <Dropdown.Item onClick={() => setShow(!show)} className="trello-column__header--item">
                            Delete Column
                        </Dropdown.Item>
                        <Dropdown.Item className="trello-column__header--item">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="trello-column__list">
                <Container
                    groupName="col"
                    onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
                    getChildPayload={(index) => cards[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: "drop-card-preview",
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {sortCard.map((card, idx) => (
                        <Draggable key={idx}>
                            <Card card={card} />
                        </Draggable>
                    ))}
                </Container>
            </div>
            {addCard ? (
                <div className="trello-column__footer" onClick={() => setAddCard(!addCard)}>
                    <i className="fa fa-plus"></i>
                    Add new card
                </div>
            ) : (
                <div className="trello-column__addcard">
                    <div>
                        <input type="text" value={cardInput} onChange={(e) => setCardInput(e.target.value)} />
                    </div>
                    <i className="fa fa-plus" onClick={handleAddCard}></i>
                    Add new card aaa
                </div>
            )}

            <ModalComfirm
                onConfirm={handleConfirm}
                show={show}
                title="Xoa bang"
                content={`ban co muon xoa bang nay <strong>${column.title}</strong>`}
            />
        </div>
    );
};

export default Column;
