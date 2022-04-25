import Task from "components/Task/Task";
import React from "react";
import "./Column.scss";
type Props = {};

const Column = (props: Props) => {
    return (
        <div className="trello-column">
            <div className="trello-column__header">Dieu can lam</div>
            <ul className="trello-column__list">
                <li className="trello-column__item">
                    <img
                        src="https://i.pinimg.com/originals/4e/ee/ce/4eeecedfaae829807a1a42adf30d01b7.jpg"
                        alt="hinh"
                    />
                </li>
                <Task />
            </ul>
            <div className="trello-column__header">Dieu can lam</div>
        </div>
    );
};

export default Column;
