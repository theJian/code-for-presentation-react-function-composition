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

  typePet = {
    Dog: 'Dog',
    Cat: 'Cat',
    Mice: 'Mice',
  }

  typeBait = {
    Meat: 'Meat',
    Fish: 'Fish',
    Peanut: 'Peanut',
  }

  PetFavoured = {
    [this.typePet.Dog]: this.typeBait.Meat,
    [this.typePet.Cat]: this.typeBait.Fish,
    [this.typePet.Mice]: this.typeBait.Peanut,
  }

  componentDidMount() {
    request().then(() => {
      this.setState({
        ready: true
      })
    })
  }

  addPet = (pet) => {
    this.setState(({ petList }) => ({
      petList: [...petList, pet]
    }));
  }

  setBait = (bait) => {
    this.setState({
      bait
    });
  }

  findInterestedPets = () => {
    const { petList, bait } = this.state;
    if (!bait) return petList;
    return petList.filter(pet => {
      return this.PetFavoured[pet] === bait
    })
  }

  renderLoading = () => (
    <div className="Loading">
      <img className="Loading-logo" src={logo} />
    </div>
  )

  renderPetButtons = () => (
    <div>
      <button onClick={this.addPet.bind(null, this.typePet.Dog)}>
        Add Dog
      </button>
      <button onClick={this.addPet.bind(null, this.typePet.Cat)}>
        Add Cat
      </button>
      <button onClick={this.addPet.bind(null, this.typePet.Mice)}>
        Add Mice
      </button>
    </div>
  )

  renderBaitButtons = () => (
    <div>
      <button onClick={this.setBait.bind(null, this.typeBait.Meat)}>
        Only Dog
      </button>
      <button onClick={this.setBait.bind(null, this.typeBait.Fish)}>
        Only Cat
      </button>
      <button onClick={this.setBait.bind(null, this.typeBait.Peanut)}>
        Only Mice
      </button>
      <button onClick={this.setBait.bind(null, null)}>
        Clear
      </button>
    </div>
  )

  renderPetList = (petList) => (
    <div>
      <ul>
        {petList.map((pet, key) => {
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
  )

  render() {
    const { ready } = this.state;
    if (!ready) {
      return this.renderLoading();
    }

    return (
      <div className="App">
        {this.renderPetButtons()}
        {this.renderBaitButtons()}
        {this.renderPetList(this.findInterestedPets())}
      </div>
    );
  }
}

export default App;
