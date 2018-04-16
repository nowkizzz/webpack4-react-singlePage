import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSysSetting} from '../../api/index'

const mapStateToProps = (state) => {
    console.log(state.value,32)
    return {
        value: state.setting.value
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getSetting: (data) => dispatch({
            type: 'GETSETTING',
            playload: data
        })
    }
}

class Foot extends Component {
    constructor(props) {
        super(props)
    }
    getData() {
        getSysSetting().then(res => {
            console.log(res)
            this.props.getSetting(res)
            console.log(this.props,44334)
        })   
    }
    componentDidMount() {
        getSysSetting().then(res => {
            console.log(res)
            this.props.getSetting(res)
        })
    }
    render() {
        let {value} = this.props
        // console.log(this.props, 99999999999990)        
        return (
            <div className="footer">
            <button onClick={(e) => this.getData()}>开始</button>
                footerfdsafas-
                {value}-999
            </div>
        )
    }
}

const FootRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(Foot)

export default FootRedux