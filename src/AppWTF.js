import React, { Component } from 'react';
import request from './request.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    petList: [],
    ready: false,
    bait: null,
  }

  componentDidMount() {
    request().then(() => {
      this.setState({
        ready: true
      })
    })
  }

  addDog() {
    this.setState(({ petList }) => ({
      petList: [...petList, 'Dog']
    }));
  }

  addCat() {
    this.setState(({ petList }) => ({
      petList: [...petList, 'Cat']
    }));
  }

  addMice() {
    this.setState(({ petList }) => ({
      petList: [...petList, 'Mice']
    }));
  }

  setBait(bait) {
    this.setState({
      bait
    });
  }

  render() {
    const {
      petList,
      ready,
      bait
    } = this.state;

    if (!ready) {
      return (
        <div className="Loading">
          <img className="Loading-logo" src={logo} />
        </div>
      )
    }

    const interestedPetList = petList.filter(pet => {
      if (!bait) return true;
      if (bait === 'Meat' && pet === 'Dog') return true;
      if (bait === 'Fish' && pet === 'Cat') return true;
      if (bait === 'Peanut' && pet === 'Mice') return true;
      return false;
    })

    return (
      <div className="App">
        <div>
          <button onClick={() => this.addDog()}>
            Add Dog
          </button>
          <button onClick={() => this.addCat()}>
            Add Cat
          </button>
          <button onClick={() => this.addMice()}>
            Add Mice
          </button>
        </div>
        <div>
          <button onClick={() => this.setBait('Meat')}>
            Only Dog
          </button>
          <button onClick={() => this.setBait('Fish')}>
            Only Cat
          </button>
          <button onClick={() => this.setBait('Peanut')}>
            Only Mice
          </button>
          <button onClick={() => this.setBait(null)}>
            Clear
          </button>
        </div>
        <div>
          <ul>
            {interestedPetList.map((pet, key) => {
              if (pet === 'Dog') return (
                <li className="Dog" key={key}>🐶 Dog</li>
              )

              if (pet === 'Cat') return (
                <li className="Cat" key={key}>🐱 Cat</li>
              )

              return <li className="Mice" key={key}>🐁 Mice</li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
