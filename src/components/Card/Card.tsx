import React from "react";
import "./Card.scss";
type Props = {
    card: any;
};

const Card = ({ card }: Props) => {
    return (
        <div className="trello-column__item">
            {card.cover && <img src={card.cover} alt="hinh" />}
            {card.title}
        </div>
    );
};

export default Card;
