import Card from "components/Card/Card";
import React from "react";
import { sortOrder } from "utils/sorts";
import "./Column.scss";
import { Container, Draggable } from "react-smooth-dnd";

const Column = ({ column, onCardDrop, onAdd }) => {
    const { cards } = column;
    const sortCard = sortOrder(cards, column.cardOrder, "id");
    const handleNewAdd = (id, title) => {
        onAdd(id, { title });
    };
    return (
        <div className="trello-column">
            <div className="trello-column__header">{column.title}</div>

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
            <div className="trello-column__footer" onClick={() => handleNewAdd(column.id, "nguyen bao Viet")}>
                <i className='fa fa-plus'></i>
                Add new card
            </div>
        </div>
    );
};

export default Column;
