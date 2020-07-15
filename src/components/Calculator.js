import React, { Component } from "react";
import InputRange from "react-input-range";
import Display from "./Display";

import "../styles/Calculator.css";
import "react-input-range/lib/css/index.css";

class Calculator extends Component {
  DAYS_CONTAGIOUS_DEFAULT = 10;
  /*
   * Use this multiplier to convert dailyCases per day to the number of circulating cases. This
   * default the following...
   * 1. A patient is infectious for 3 days before the onset of symptoms [a] and 7 days after [2].
   *    a. https://www.acpjournals.org/doi/10.7326/M20-0504
   *    b. https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30196-1/fulltext
   * 2. Those who test positive for COVID19 do not change their behavior after testing positive.
   *    This is a bad assumption but I haven't yet found data on number of days after onset of
   *    symptoms someone gets tested or the portion of people who change their behavior.
   */

  PERCENT_REPORTED = 10;
  /*
   * This based on CDC Director Robert Redfield's comment at the end of June [a] that a good rough
   * estimate of actual cases to reported cases is 10-1.
   * a. https://www.cdc.gov/media/releases/2020/t0625-COVID-19-update.html
   */

  state = {
    populationValue: 19450000, // NY
    dailyCasesValue: 560, // NY 7-day average (July 14th)
    groupValue: 25,
    daysContagiousValue: this.DAYS_CONTAGIOUS_DEFAULT,
    percentReportedValue: this.PERCENT_REPORTED,
  };

  updateSearchParams = () => {
    const params = new URLSearchParams();
    for (const prop in this.state) {
      params.append(prop, this.state[prop]);
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }

  handlePopulationChange = (value) => {
    this.setState({ populationValue: value });
    this.updateSearchParams();
  };
  handleDailyCasesChange = (value) => {
    this.setState({ dailyCasesValue: value });
    this.updateSearchParams();
  };
  handleDaysContagiousChange = (value) => {
    this.setState({ daysContagiousValue: value });
    this.updateSearchParams();
  };
  handlePartReportedChange = (value) => {
    this.setState({ percentReportedValue: value });
    this.updateSearchParams();
  };
  handlegroupChange = (value) => {
    this.updateSearchParams({ groupValue: value });
  };

  constructor(props) {
    super(props);
    for (const [prop, val] of new URLSearchParams(window.location.search)) {
      this.state[prop] = parseInt(val);
    }
  }

  render() {
    const {
      populationValue,
      dailyCasesValue,
      daysContagiousValue,
      percentReportedValue,
      groupValue,
    } = this.state;

    return (
      <div className="App">
        <h4>
          My state as a population of{" "}
          <u>{populationValue.toLocaleString()}</u>
        </h4>
        <InputRange
          step={50000}
          maxValue={40000000}
          minValue={50000}
          value={populationValue}
          onChange={this.handlePopulationChange}
        />
        <h4>
          My state has a 7-day rolling average of{" "}
          <u>{dailyCasesValue.toLocaleString()}</u> daily cases per day
        </h4>
        <InputRange
          step={100}
          maxValue={20000}
          minValue={0}
          value={dailyCasesValue}
          onChange={this.handleDailyCasesChange}
        />
        <h4>
          A person who tested positive for the virus is contagious and
          circulating for <u>{daysContagiousValue}</u> days
        </h4>
        <InputRange
          step={1}
          maxValue={30}
          minValue={1}
          value={daysContagiousValue}
          onChange={this.handleDaysContagiousChange}
        />
        <h4>
          Only <u>{percentReportedValue}%</u> of cases are reported
        </h4>
        <InputRange
          step={1}
          maxValue={100}
          minValue={1}
          value={percentReportedValue}
          onChange={this.handlePartReportedChange}
        />
        <h4>
          I'm attending an event with <u>{groupValue.toLocaleString()}</u>{" "}
          people
        </h4>
        <InputRange
          step={1}
          maxValue={300}
          minValue={1}
          value={groupValue}
          onChange={this.handlegroupChange}
        />
        <Display
          population={populationValue}
          dailyCases={dailyCasesValue}
          daysContagious={daysContagiousValue}
          percentReported={percentReportedValue}
          group={groupValue}
        />
        <br></br>
        <small>
          Based on{" "}
          <a href="https://marginalrevolution.com/marginalrevolution/2020/03/covid-19-event-risk-assessment-planner.html">
            COVID-19 Event Risk Assessment Planner by Alex Tabarrok
          </a>
        </small>
      </div>
    );
  }
}

export default Calculator;