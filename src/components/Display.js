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
    const circulatingCases =
      (dailyCases * daysContagious) / (percentReported / 100);
    const prob = 1 - Math.pow(1 - circulatingCases / population, group);

    if (prob >= 0.9999) {
      // Never be 100% sure of anything...
      return <p>{">"}99.99%</p>;
    }

    // Nice formatting
    return <p>{(prob * 100).toFixed(2)}%</p>;
  };

  formula = () => {
    const {
      population,
      dailyCases,
      daysContagious,
      percentReported,
      group,
    } = this.props;
    return (
      <small>
        p = 1 - (1 - ({dailyCases.toLocaleString()} * {daysContagious} /{" "}
        {percentReported / 100}) / {population.toLocaleString()}) ^{" "}
        {group.toLocaleString()}
      </small>
    );
  };

  render() {
    return (
      <div>
        <DisplayChild
          func={this.odds()}
          text="chance that someone at the event is contageous"
        />
        <br></br>
        {this.formula()}
      </div>
    );
  }
}

Display.propTypes = {
  dailyCases: PropTypes.number.isRequired,
  population: PropTypes.number.isRequired,
  daysContagious: PropTypes.number.isRequired,
  percentReported: PropTypes.number.isRequired,
  group: PropTypes.number.isRequired,
};

export default Display;
