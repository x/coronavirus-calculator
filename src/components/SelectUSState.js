// Shamelessly ripped from https://github.com/pedrohidalgo/react-select-us-states, needed it to be
// slightly different
import React from "react";
import states from "../data/states.json";
import PropTypes from "prop-types";

class SelectUSState extends React.Component {
  handleChange = (event) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };

  render() {
    const { id, className, value } = this.props;
    return (
      <select id={id} className={className} onChange={this.handleChange} value={value}>
        {states.map((item) => (
          <option key={item.abbreviation} value={item.abbreviation}>
            {item.name}
          </option>
        ))}
      </select>
    );
  }
}

const propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

SelectUSState.propTypes = propTypes;

export default SelectUSState;
