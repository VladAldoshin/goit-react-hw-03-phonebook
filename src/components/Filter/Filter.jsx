import React from 'react';
import PropTypes from 'prop-types';
import './Filter.module.css';

const Filter = ({ filter, changeFilterInput }) => (
  <label>
    <input
      type="text"
      name="filter"
      value={filter}
      onChange={changeFilterInput}
      placeholder="Find contacts by name"
    />
  </label>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  changeFilterInput: PropTypes.func.isRequired,
};

export default Filter;


