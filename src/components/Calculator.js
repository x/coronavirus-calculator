import React, { Component } from "react";
import InputRange from "react-input-range";
import Display from "./Display";
import SelectUSState from "./SelectUSState";
import populations from "../data/pop.json";
import cases from "../data/cases.json";

import "../styles/Calculator.css";
import "react-input-range/lib/css/index.css";

const getStatePopulation = (state) => {
  return populations[state].population;
};

const getStateCases = (state) => {
  return Math.floor(cases[populations[state].name].new_cases_7day);
};

const getStateDate = (state) => {
  return (new Date(cases[populations[state].name].date)).toDateString();
};

class Calculator extends Component {
  state = {
    populationValue: getStatePopulation("NY"), // NY
    dailyCasesValue: getStateCases("NY"),
    groupValue: 25,
    daysContagiousValue: 10,
    percentReportedValue: 10,
    stateValue: "NY",
  };

  updateSearchParams = () => {
    const params = new URLSearchParams();
    for (const prop in this.state) {
      params.append(prop, this.state[prop]);
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  };

  handlePopulationChange = (value) => {
    this.setState({ populationValue: value }, this.updateSearchParams);
  };
  handleDailyCasesChange = (value) => {
    this.setState({ dailyCasesValue: value }, this.updateSearchParams);
  };
  handleDaysContagiousChange = (value) => {
    this.setState({ daysContagiousValue: value }, this.updateSearchParams);
  };
  handlePartReportedChange = (value) => {
    this.setState({ percentReportedValue: value }, this.updateSearchParams);
  };
  handleGroupChange = (value) => {
    this.setState({ groupValue: value }, this.updateSearchParams);
  };
  handleStateChange = (stateValue) => {
    this.setState(
      {
        stateValue: stateValue,
        populationValue: getStatePopulation(stateValue),
        dailyCasesValue: getStateCases(stateValue),
      },
      this.updateSearchParams
    );
  };

  constructor(props) {
    super(props);
    for (const [prop, val] of new URLSearchParams(window.location.search)) {
      this.state[prop] = Number.isNaN(parseInt(val)) ? val : parseInt(val);
    }
  }

  render() {
    const {
      populationValue,
      dailyCasesValue,
      daysContagiousValue,
      percentReportedValue,
      groupValue,
      stateValue,
    } = this.state;
    console.log(stateValue);

    return (
      <div className="App">
        <h4>I am attending an event in the state of</h4>
        <div>
          <SelectUSState
            className="state-picker"
            value={stateValue}
            onChange={this.handleStateChange}
          />
        </div>
        <h4>
          With a population of <u>{populationValue.toLocaleString()}</u>{" "}
          residents
        </h4>
        <small>
          As of the 2019 cencus, {stateValue} had a population of{" "}
          {getStatePopulation(stateValue).toLocaleString()}.
        </small>
        <InputRange
          step={50000}
          maxValue={40000000}
          minValue={50000}
          value={populationValue}
          onChange={this.handlePopulationChange}
        />
        <h4>
          And <u>{dailyCasesValue.toLocaleString()}</u> daily new cases per day
        </h4>
        <small>
          As of {getStateDate(stateValue)}, {stateValue} has a 7-day average of{" "}
          {getStateCases(stateValue).toLocaleString()} new cases per day
          according to the{" "}
          <a href="https://github.com/nytimes/covid-19-data">
            NYT Covid data set
          </a>
          .
        </small>
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
        <small>
          The default value, 10 days, is based the assumptions that a typical
          case is infectious for{" "}
          <a href="https://www.acpjournals.org/doi/10.7326/M20-0504">
            3 days before
          </a>{" "}
          the onset of symptoms and{" "}
          <a href="https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30196-1/fulltext">
            7 days after
          </a>
          .
        </small>
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
        <small>
          The default value, 10%, is based on{" "}
          <a href="https://www.cdc.gov/media/releases/2020/t0625-COVID-19-update.html">
            a statement by CDC Director Robert Redfield{" "}
          </a>
          on June 25th that a good rough estimate of total to reported cases is
          10-1.
        </small>
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
          onChange={this.handleGroupChange}
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
          <br></br>
          source code at{" "}
          <a href="https://github.com/x/coronavirus-calculator">
            github.com/x/coronavirus-calculator
          </a>
          .
        </small>
      </div>
    );
  }
}

export default Calculator;
