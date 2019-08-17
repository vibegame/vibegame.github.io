"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Shop from './components/Shop';
import './components/styles/reset.css';
import './components/styles/stand.css';
let shop = require('./components/Shop.json');
// если необходимо, вид сборки можно проверить в коде:
// if (process.env.NODE_ENV === 'production') {
// if (process.env.NODE_ENV !== 'production') {

ReactDOM.render( 
  <Shop goods = {shop.goods} />
, document.getElementById('root'));
