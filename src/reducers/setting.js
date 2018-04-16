const store = {
    setting : {},
    value: 1
    
}

const getSetting = (state = store , action) => {
    console.log(action,99999999)
    const value = state.value
    switch(action.type) {
        case 'GETSETTING': 
            state.setting = action.playload.data
            console.log(state.setting,4444444444444)
            return {
                // value: value + 1
                value: state.setting.linkMan
            }
            break;
        default:
            return state
    }
    
}

export default getSetting