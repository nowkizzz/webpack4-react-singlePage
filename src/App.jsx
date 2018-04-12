import React, {Component} from 'react'
import './index.css'
import './index.less'
import Icon from './assets/1.png'
// console.log(Icon)
export default class App extends Component {
    constructor() {
        super()
        let list = [12,54,16,85]
        this.list = list.forEach(element => {
            console.log(element)
        })
    }
    render() {
        return (
            <div>this is react -- by nowki
                <p>仲夏夜之梦</p>
                <p className="test">夜机</p>
                <div className="flexbox">
                    <div className="itemBox">1</div>
                    <div className="itemBox">2</div>
                </div>
                <img src={Icon} alt="" height="50" width="50" />
            </div>
        )
    }
}


