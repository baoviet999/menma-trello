import Card from "components/Card/Card";
import React from "react";
import { sortOrder } from "utils/sorts";
import "./Column.scss";
import { Container, Draggable } from "react-smooth-dnd";

const Column = ({ column }) => {
    const { cards } = column;
    const sortCard = sortOrder(cards, column.cardOrder, "id");
    const onCardDrop = (drag) => {
        console.log(drag);
    };
    return (
        <div className="trello-column">
            <div className="trello-column__header">{column.title}</div>

            <div className="trello-column__list">
                <Container
                    // onDragEnter={() => {
                    //     console.log("drag enter:", column.id);
                    // }}
                    // onDragLeave={() => {
                    //     console.log("drag leave:", column.id);
                    // }}
                    // onDropReady={(p) => console.log("Drop ready: ", p)}
                    // onDragStart={(e) => console.log("drag started", e)}
                    // onDragEnd={(e) => console.log("drag end", e)}

                    groupName="col"
                    onDrop={onCardDrop}
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
            <div className="trello-column__header">Dieu can lam</div>
        </div>
    );
};

export default Column;
