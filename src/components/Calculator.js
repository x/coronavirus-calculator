import React, { Component } from "react";
import InputRange from "react-input-range";
import Display from "./Display";

import "../styles/Calculator.css";
import "react-input-range/lib/css/index.css";

class Calculator extends Component {
  state = {
    dailyCasesValue: 5000,
    populationValue: 1000000,
    groupValue: 25
  };

  handledailyCasesChange = value => {
    this.setState({ dailyCasesValue: value });
  };
  handlePopulationChange = value => {
    this.setState({ populationValue: value });
  };
  handlegroupChange = value => {
    this.setState({ groupValue: value });
  };


  render() {
    const { dailyCasesValue, populationValue, groupValue } = this.state;

    return (
      <div className="App">
        <h4>My state has a 7-day rolling average of {dailyCasesValue} dailyCases per day</h4>
        <InputRange
          step={100}
          maxValue={20000}
          minValue={0}
          value={dailyCasesValue}
          onChange={this.handledailyCasesChange}
        />
        <h4>
          My state as a population of {populationValue}
        </h4>
        <InputRange
          step={50000}
          maxValue={10000000}
          minValue={50000}
          value={populationValue}
          onChange={this.handlePopulationChange}
        />
        <h4>
          I'm attending an event with {groupValue} people
        </h4>
        <InputRange
          step={1}
          maxValue={300}
          minValue={1}
          value={groupValue}
          onChange={this.handlegroupChange}
        />
        <Display population={populationValue} dailyCases={dailyCasesValue} group={groupValue} />
      </div>
    );
  }
}

export default Calculator;
