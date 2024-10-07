import "./Card.css";
import { PropTypes } from "prop-types";

export function Card(props) {
  return (
    <div className="containerBoard flex">
      <h3 className="flex">
        {props.cardName}{" "}
        <span className="material-symbols-outlined plusIcon">add</span>
      </h3>
      <div className="board flex"></div>
    </div>
  );
}
Card.propTypes = {
  cardName: PropTypes.string.isRequired,
};
