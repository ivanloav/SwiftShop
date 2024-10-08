import "./Card.css";
import { PropTypes } from "prop-types";

export function Card(props) {
  return (
    <div className="containerBoard">
      <h3 className="flex">
        {props.cardName}{" "}
        <span className="material-symbols-outlined plusIcon">add</span>
      </h3>
      <div className="board ">{props.children}</div>
    </div>
  );
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  children: PropTypes.node,
};
