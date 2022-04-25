import React from "react";
import "./Card.scss";
type Props = {
    card: any;
};

const Card = ({ card }: Props) => {
    return (
        <li className="trello-column__item">
            {card.cover && <img src={card.cover} alt="hinh" />}
            {card.title}
        </li>
    );
};

export default Card;
