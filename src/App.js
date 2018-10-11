import React, { Component } from 'react';
import compose from './compose.js';
import eqProp from './eqProp.js';
import hasProp from './hasProp.js';
import request from './request.js';
import logo from './logo.svg';
import { typePet, typeBait } from './types.js';
import './App.css';

import withProps from './withProps.js';
import cond from './cond.js';
import prepare from './prepare.js';
import withState from './withState';
import render from './render';

import PetList from './PetList';

const petFavoured = {
  [typePet.Dog]: typeBait.Meat,
  [typePet.Cat]: typeBait.Fish,
  [typePet.Mice]: typeBait.Peanut,
};
const findInterestedPets = ({ petList, bait }) => ({
  petList: petList.filter(pet => petFavoured[pet] === bait)
});

const InterestedPetList = cond(
  [hasProp('bait'), withProps(findInterestedPets)]
)(PetList);

const PetButtons = ({ onClicks }) => (
  <div>
    <button onClick={onClicks[0]}>
      Add Dog
    </button>
    <button onClick={onClicks[1]}>
      Add Cat
    </button>
    <button onClick={onClicks[2]}>
      Add Mice
    </button>
  </div>
);

const BaitButtons = ({ onClicks }) => (
  <div>
    <button onClick={onClicks[0]}>
      Only Dog
    </button>
    <button onClick={onClicks[1]}>
      Only Cat
    </button>
    <button onClick={onClicks[2]}>
      Only Mice
    </button>
    <button onClick={onClicks[3]}>
      Clear
    </button>
  </div>
);

const Loading = () => (
  <div className="Loading">
    <img className="Loading-logo" src={logo} />
  </div>
);

const App = ({ onAddPet, onSelectBait, petList, bait }) => (
  <div className="App">
    <PetButtons
      onClicks={[typePet.Dog, typePet.Cat, typePet.Mice].map(t => onAddPet.bind(null, t))}
    />
    <BaitButtons
      onClicks={[typeBait.Meat, typeBait.Fish, typePet.Peanut, null].map(t => onSelectBait.bind(null, t))}
    />
    <InterestedPetList petList={petList} bait={bait}/>
  </div>
)

export default compose(
  withState({
    petList: [],
    ready: false,
    bait: null,
  }, {
    onAddPet: ({ petList }) => pet => ({ petList: [...petList, pet] }),
    onSelectBait: () => bait => ({ bait }),
    onReady: () => () => ({ ready: true }),
  }),
  prepare(({ onReady }) => request().then(onReady)),
  cond(
    [eqProp('ready', false), render(Loading)]
  )
)(App);
