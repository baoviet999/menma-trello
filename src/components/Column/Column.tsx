import Card from "components/Card/Card";
import React from "react";
import { sortOrder } from "utils/sorts";
import "./Column.scss";
type Props = {
    column: any;
};

const Column = ({ column }: Props) => {
    const { cards } = column;
    const sortCard = sortOrder(cards, column.cardOrder, "id");
    return (
        <div className="trello-column">
            <div className="trello-column__header">{column.title}</div>
            <ul className="trello-column__list">
                {sortCard.map((card: any, idx: number) => (
                    <Card card={card} key={idx} />
                ))}
            </ul>
            <div className="trello-column__header">Dieu can lam</div>
        </div>
    );
};

export default Column;
