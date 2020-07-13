import React, { Component } from "react";
import PropTypes from "prop-types";
import DisplayChild from "./DisplayChild";

class Display extends Component {
  NEW_CASES_PER_DAY_TO_CIRCULATING = 10;
  /*
   * Use this multiplier to convert dailyCases per day to the number of active dailyCases. This number assumes the following...
   * 1. A patient is infectious for 3 days before the onset of symptoms [a] and 7 days after [2].
   *    a. https://www.acpjournals.org/doi/10.7326/M20-0504
   *    b. https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30196-1/fulltext
   * 2. Those who test positive for COVID19 do not change their behavior after testing positive.
   *    This is a bad assumption but I haven't yet found data on number of days after onset of
   *    symptoms someone gets tested or the portion of people who change their behavior.
   */

  CASES_REPORTED_PER_ACTUAL_CASE = 0.05
  // 1 in 20

  odds = () => {
    // https://marginalrevolution.com/marginalrevolution/2020/03/covid-19-event-risk-assessment-planner.htmljkjkjk
    const { dailyCases, population, group } = this.props;
    const cases = dailyCases * this.NEW_CASES_PER_DAY_TO_CIRCULATING / this.CASES_REPORTED_PER_ACTUAL_CASE;
    const prob = 1 - Math.pow(1 - cases / population, group);
    return <p>{(prob * 100).toFixed(2)}%</p>;
  };

  render() {
    return (
      <div className="flex">
        <DisplayChild func={this.odds()} text="chance someone has COVID" />
        {/* <DisplayChild
          func={this.calculateMonthlyRepayment()}
          text=" monthly repayment"
        /> */}
      </div>
    );
  }
}

Display.propTypes = {
  dailyCasesValue: PropTypes.number.isRequired,
  populationValue: PropTypes.number.isRequired,
  groupValue: PropTypes.number.isRequired
};

export default Display;
