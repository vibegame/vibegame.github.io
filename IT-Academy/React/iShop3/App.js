"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import IShop from './components/IShop';
import './components/styles/reset.css';
import './components/styles/stand.css';
let Shop = require('./components/Shop.json');
// если необходимо, вид сборки можно проверить в коде:
// if (process.env.NODE_ENV === 'production') {
// if (process.env.NODE_ENV !== 'production') {

ReactDOM.render( 
  <IShop goods={Shop.goods} name={Shop.shopName}/>
, document.getElementById('root'));
