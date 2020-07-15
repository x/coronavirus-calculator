import React, { Component } from "react";
import PropTypes from "prop-types";
import DisplayChild from "./DisplayChild";

class Display extends Component {
  CASES_REPORTED_PER_ACTUAL_CASE = 0.05;
  // 1 in 20

  odds = () => {
    // https://marginalrevolution.com/marginalrevolution/2020/03/covid-19-event-risk-assessment-planner.html
    const {
      population,
      dailyCases,
      daysContagious,
      percentReported,
      group,
    } = this.props;
    const circulatingCases = (dailyCases * daysContagious) / (percentReported / 100);
    const prob = 1 - Math.pow(1 - (circulatingCases / population), group);

    if (prob >= 0.9999) {
      // Never be 100% sure of anything...
      return <p>{">"}99.99%</p>;
    }

    // Nice formatting
    return <p>{(prob * 100).toFixed(2)}%</p>;
  };

  render() {
    return (
      <div className="flex">
        <DisplayChild func={this.odds()} text="chance someone has COVID" />
      </div>
    );
  }
}

Display.propTypes = {
  dailyCasesValue: PropTypes.number.isRequired,
  populationValue: PropTypes.number.isRequired,
  daysContagious: PropTypes.number.isRequired,
  percentReported: PropTypes.number.isRequired,
  groupValue: PropTypes.number.isRequired,
};

export default Display;
