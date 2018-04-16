

import React, { Component } from 'react'
import {getItems, postItems} from '../../utils/fetch'
import { getSysSetting } from '../../api/index'
import Foot from './Foot'
import {Route} from 'react-router-dom'
class Tab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }
    async getSetting() {
        let res = await getItems('webservice/sysSettingItem.action')
        // console.log(res)
        if (res.success) {
            this.setState({
                text: res.data.systemName
            })
        }
    }
    toPage() {
        this.props.history.push('/foot')
    }
    async componentDidMount() {
        // fetch('webservice/sysSettingItem.action?nocache=1&_=1523847308115').then((res) => {
        //     return res.json()
        // }).then((res) => {
        //     console.log(res)
        // })

        // let res = await getItems('webservice/sysSettingItem.action')
        // if (res.success) {
        //     this.setState({
        //         text: res.data.systemName
        //     })
        // }

        // getItems('webservice/sysSettingItem.action').then((res)=> {
            // console.log(res)
        // })
        // this.getSetting()
         getSysSetting().then(res => {
             console.log(res)
         })
        //  let res = await getSysSetting()
        //  console.log(res)
    }
    render() {
        return (
            <div className="homePage">Tab-{this.state.text}
                <button className="btn" onClick={(e) => this.toPage()}>跳转</button>

            </div>
        )
    }
}

export default Tab