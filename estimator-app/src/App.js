import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import {covid19ImpactEstimator} from './estimator';

class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estimation: 'check initial state',
      value: '',
      result: 'hide',
      dataInput2: {
        region: {
          name: 'Africa',
          avgAge: 19.7,
          avgDailyIncomeInUSD: 5,
          avgDailyIncomePopulation: 0.71
        },
        periodType: 'days',
        timeToElapse: null,
        reportedCases: null,
        population: null,
        totalHospitalBeds: null
      }
    }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      dataInput2: {
        region: {
            name: 'Africa',
            avgAge: 19.7,
            avgDailyIncomeInUSD: 5,
            avgDailyIncomePopulation: 0.71
          },
            periodType: this.periodType.value,
            timeToElapse: this.state.timeToElapse,
            reportedCases: this.state.reportedCases,
            population: this.state.population,
            totalHospitalBeds: this.state.totalHospitalBeds
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    covid19ImpactEstimator(this.state.dataInput2)
    this.setState({
      estimation : covid19ImpactEstimator(this.state.dataInput2),
      result: 'show'
    });
    console.log(covid19ImpactEstimator(this.state.dataInput2));
  };

  render () {
    return (
      <div>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="12">
              <MDBCard>
                <MDBCardBody>
                  <form onSubmit={this.handleSubmit}>
                    <p className="h4 text-center py-4">Covid-19 Impact Estimator (Demo)</p>
                    <div className="grey-text">
                      <MDBInput
                        name="population"
                        label="Population"
                        data-population
                        onChange={this.handleChange}
                        icon="user-friends"
                        group
                        type="number"
                        validate
                        error="wrong"
                        success="right"
                      />
                      <MDBInput
                        name="timeToElapse"
                        label="Time To Elapse"
                        data-time-to-elapse
                        onChange={this.handleChange}
                        icon="clock"
                        group
                        type="number"
                        validate
                        error="wrong"
                        success="right"
                      />
                      <MDBInput
                        name="reportedCases"
                        label="Reported Cases"
                        data-reported-cases
                        onChange={this.handleChange}
                        icon="calendar-alt"
                        group
                        type="number"
                        validate
                        error="wrong"
                        success="right"
                      />
                      <MDBInput
                        name="totalHospitalBeds"
                        label="Total Hospital Beds"
                        data-total-hospital-beds
                        onChange={this.handleChange}
                        icon="bed"
                        group
                        type="number"
                        validate
                      />
                      <select className="browser-default custom-select" name="periodType" ref={(period) => this.periodType = period}
                        onChange={this.handleChange}>
                        <option value="days"> days </option>
                        <option value="weeks"> weeks </option>
                        <option value="months"> months </option>
                      </select>
                    </div>
                    <div className="text-center py-4 mt-3">
                      <MDBBtn data-go-estimate color="cyan" type="submit">
                        Submit
                      </MDBBtn>
                    </div>
                  </form>
                  <div>


                    { this.state.result === 'show' ?
                      <div className='row'>

                        {/* Impact */}
                        <div className='col-6'>
                          <h3>Impact</h3>
                          <p className='font-weight-bold bg-gray px-2 py-2'>
                            <span className='font-weight-light font-italic'> Cases For ICU By Requested Time:
                            </span> {this.state.estimation.impact.casesForICUByRequestedTime}
                          </p>
                          <p className='font-weight-bold px-2 py-2'>
                            <span className='font-weight-light font-italic'> Cases For Ventilators By Requested Time:
                            </span> {this.state.estimation.impact.casesForVentilatorsByRequestedTime}
                          </p>
                          <p className='font-weight-bold bg-gray px-2 py-2'>
                            <span className='font-weight-light font-italic'> Currently Infected:
                            </span> {this.state.estimation.impact.currentlyInfected}
                          </p>
                          <p className='font-weight-bold px-2 py-2'>
                            <span className='font-weight-light font-italic'> Dollars In Flight:
                            </span> {this.state.estimation.impact.dollarsInFlight}
                          </p>
                          <p className='font-weight-bold bg-gray px-2 py-2'>
                            <span className='font-weight-light font-italic'> Hospital Beds By Requested Time:
                            </span> {this.state.estimation.impact.hospitalBedsByRequestedTime}
                          </p>
                          <p className='font-weight-bold px-2 py-2'>
                            <span className='font-weight-light font-italic'> Infections By Requested Time:
                            </span> {this.state.estimation.impact.infectionsByRequestedTime}
                          </p>
                          <p className='font-weight-bold bg-gray px-2 py-2'>
                            <span className='font-weight-light font-italic'> Severe Cases By Requested Time:
                            </span> {this.state.estimation.impact.severeCasesByRequestedTime}
                          </p>
                        </div>

                        {/* Severe Impact */}

                        <div className='col-6'>
                          <h3>Severe Impact</h3>
                          <p className='font-weight-bold bg-gray px-2 py-2'>
                            <span className='font-weight-light font-italic'> Cases For ICU By Requested Time:
                            </span> {this.state.estimation.severeImpact.casesForICUByRequestedTime}
                          </p>
                          <p className='font-weight-bold px-2 py-2'>
                            <span className='font-weight-light font-italic'> Cases For Ventilators By Requested Time:
                            </span> {this.state.estimation.severeImpact.casesForVentilatorsByRequestedTime}
                          </p>
                          <p className='font-weight-bold bg-gray px-2 py-2'>
                            <span className='font-weight-light font-italic'> Currently Infected:
                            </span> {this.state.estimation.severeImpact.currentlyInfected}
                          </p>
                          <p className='font-weight-bold px-2 py-2'>
                            <span className='font-weight-light font-italic'> Dollars In Flight:
                            </span> {this.state.estimation.severeImpact.dollarsInFlight}
                          </p>
                          <p className='font-weight-bold bg-gray px-2 py-2'>
                            <span className='font-weight-light font-italic'> Hospital Beds By Requested Time:
                            </span> {this.state.estimation.severeImpact.hospitalBedsByRequestedTime}
                          </p>
                          <p className='font-weight-bold px-2 py-2'>
                            <span className='font-weight-light font-italic'> Infections By Requested Time:
                            </span> {this.state.estimation.severeImpact.infectionsByRequestedTime}
                          </p>
                          <p className='font-weight-bold bg-gray px-2 py-2'>
                            <span className='font-weight-light font-italic'> Severe Cases By Requested Time:
                            </span> {this.state.estimation.severeImpact.severeCasesByRequestedTime}
                          </p>
                        </div>
                      </div>

                    : null }

                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default app;
