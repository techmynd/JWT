import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      isForbidden: false,
    };
  }

  getData = () => {
    const url = "http://localhost:5000/api/data";
    const secret =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozfSwiaWF0IjoxNTYyMDI5NTA5fQ.SWx3FwwbqMWSt0_cDKIC6J5GS5dS4ocnjICjOVjaMig";
    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: secret,
      },
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        this.setState({
          persons: data.persons,
        });
        //console.log(this.state.persons);
        if (data.persons) {
          this.setState({
            isForbidden: false,
          });
        } else {
          this.setState({
            isForbidden: true,
          });
        }
      })
      .catch(error => console.error(error));
  };

  render() {
    const allRecords = this.state.persons;
    return (
      <div className='App'>
        <h4>ReactJS / Express / JWT / Protected Routes</h4>
        <div className='container'>
          <p>App is using secret key to access protected data end point.</p>
          <div>
            <button className='btn-get-data' onClick={this.getData}>
              ACCESS
            </button>
            <ul>
              {allRecords &&
                allRecords.map((person, index) => (
                  <li key={index}>{person.Name}</li>
                ))}
              {this.state.isForbidden ? "Forbidden" : ""}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
