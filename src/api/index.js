import { getItems, postItems } from '../utils/fetch'


export const getSysSetting =  (params) => {
    return getItems('webservice/sysSettingItem.action')
} 

