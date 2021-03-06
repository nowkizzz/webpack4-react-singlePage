// 兼容问题放在最上头 可兼容代码
import 'core-js/es6/set'
import 'core-js/es6/map'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import {createStore} from 'redux'
import rootReducer from './reducers/index'
import { Provider } from 'react-redux'

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const store = createStore(rootReducer)

// ReactDOM.render(<App />, document.body)
ReactDOM.render( 
    <Provider store={store}>< App /></Provider> , 
    document.getElementById('app'))