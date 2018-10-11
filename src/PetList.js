import React from 'react';
import compose from './compose.js';
import eqProp from './eqProp.js';
import { typePet } from './types.js';

import render from './render.js';
import withProps from './withProps.js';
import cond from './cond.js';
import nest from './nest.js';

const Null = () => null;

const renderDog = compose(
  render,
  withProps({ className: "Dog", children: "🐶 Dog" }),
)('li');

const renderCat = compose(
  render,
  withProps({ className: "Cat", children: "🐱 Cat" })
)('li');

const renderMice = compose(
  render,
  withProps({ className: "Mice", children: "🐁 Mice" })
)('li');

const Pet = cond(
  [eqProp('pet', typePet.Dog),  renderDog],
  [eqProp('pet', typePet.Cat),  renderCat],
  [eqProp('pet', typePet.Mice), renderMice],
)(Null)

const EachPet = ({ petList }) => petList.map((pet, key) => <Pet pet={pet} key={key} />)

export default nest(
  'div',
  'ul',
)(EachPet);
