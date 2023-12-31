import React from "react";
import PropTypes from "prop-types";
import css from "./filter.module.css";

const Filter = ({ value, onChange }) => (
    <label htmlFor="filterInput" className={css.label}>
        Find contacts by name
        <input
            id="filterInput"
            className={css.input}
            type="text"
            value={value}
            onChange={onChange}
        />
    </label>
);

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Filter;