import React, {Component} from 'react'
import './index.css'
import './index.less'
import Icon from './assets/1.png'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { Router, Route } from 'react-router-dom'
import Main from './pages/index/Index.jsx'
const About = () => (
    <div>
        <h2>About</h2>
    </div>
)
const TabNav = () => (
    <div>
        <h3>DDDDD</h3>
    </div>
)
class App extends Component {
    constructor() {
        super()
        let list = [12,54,16,85,32]
        this.list = list.forEach(element => {
            // console.log(element)
        })
    }
    render() {
        return (
            <Router>
                <div>
                    {/* this is react -- by nowki
                    <p>仲夏夜之梦</p>
                    <p className="test">夜机</p>
                    <div className="flexbox">
                        <div className="itemBox">1</div>
                        <div className="itemBox">2</div>
                    </div>
                    <img src={Icon} alt="" height="50" width="50" /> */}
                    <Route exact path="/about" component={About} />
                    123
                    <Route path="/" component={Main} />
                    <Route path="/tab" component={TabNav} />
                </div>
            </Router>
        )
    }
}


export default App