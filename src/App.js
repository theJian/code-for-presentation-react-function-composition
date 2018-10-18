import React from 'react';
import compose from './compose.js';
import eqProp from './eqProp.js';
import not from './not.js';
import request from './request.js';
import logo from './logo.svg';
import { typePet, typeBait } from './types.js';
import './App.css';

import nest from './nest.js';
import withProps from './withProps.js';
import cond from './cond.js';
import prepare from './prepare.js';
import render from './render';
import withState from './withState';
import queue from './queue.js';
import dice from './dice.js';
import coin from './coin.js';

import ButtonGroup from './ButtonGroup.js';
import List from './List.js';

const petFavoured = {
  [typePet.Dog]: typeBait.Meat,
  [typePet.Cat]: typeBait.Fish,
  [typePet.Mice]: typeBait.Peanut,
};
const findInterestedPets = ({ petList, bait }) => ({
  petList: petList.filter(pet => petFavoured[pet] === bait)
});


const petLabelText = {
  [typePet.Dog]: 'Dog',
  [typePet.Cat]: 'Cat',
  [typePet.Mice]: 'Mice',
};
const PetList = withProps(({ petList }) => ({
  items: petList,
  renderItem: petType => petLabelText[petType]
}))(List)


const petButtonLabel = {
  [typePet.Dog]: 'add Dog',
  [typePet.Cat]: 'add Cat',
  [typePet.Mice]: 'add Mice',
};
const PetButtons = withProps(({ addPet }) => ({
  items: Object.keys(typePet),
  onClickItem: addPet,
  renderItem: type => petButtonLabel[type]
}))(ButtonGroup)


const baitButtonLabel = {
  [typeBait.Meat]: 'Meat',
  [typeBait.Fish]: 'Fish',
  [typeBait.Peanut]: 'Peanut',
  [typeBait.Nil]: 'clear',
}
const BaitButtons = withProps(({ setBait }) => ({
  items: Object.keys(typeBait),
  onClickItem: setBait,
  renderItem: type => baitButtonLabel[type]
}))(ButtonGroup)


const Loading = () => (
  <div className="Loading">
    <img className="Loading-logo" src={logo} />
  </div>
);


const App = withProps({ className: 'App' })('div')


const loadingContainer = compose(
  withState(coin(false, { sidePropName: 'ready' })),
  prepare(({ flip }) => request().then(flip)),
  cond([eqProp('ready', false), render(Loading)]),
)

const petListContainer = withState(queue([], { quePropName: 'petList', pushPropName: 'addPet' }));
const baitContainer = withState(dice(typeBait.Nil, { facePropName: 'bait', rollPropName: 'setBait' }));


const findInterestedPetsIfHaveBait = cond(
  [not(eqProp('bait', typeBait.Nil)), withProps(findInterestedPets)]
)


export default compose(
  loadingContainer,
  petListContainer,
  baitContainer,
  findInterestedPetsIfHaveBait,
  nest(PetButtons, BaitButtons, PetList),
)(App);
