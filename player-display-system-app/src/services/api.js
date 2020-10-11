import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://192.168.0.105:12306/',
    // baseURL:"http://121.36.51.141:12306/"
});
//后端接口
const apiArr = [
    'login',
    "register",
    "logout",
    "modifyUserInfo",
    "modifyPasswordById",
    "queryUserInfoById",
    "getTeamByTid",
    "getTeamByTname",
    "addTeam",
    "modifyTeamById",
    "getAllTeam",
    "getAllSkill",
    "addSkill",
    "modifySkillById",
    "getAllSchedule",
    "addSchedule",
    "modifyScheduleById",
    "getAllMessage",
    "getAllUnreadMessage",
    "sendMessageTo",
    "deleteMessage",
    "modifyMessageStatus",
    "queryUserInfoById"
]
const api = {}

apiArr.forEach(ele => {
    api[ele] = function (params) {
        return instance.get(ele, params)
    }
})
api.register = function (params) {
    let data = new FormData();
    Object.keys(params).forEach(ele=>{
        if(params[ele] && ele != "checkPass" && ele != "time"){
            data.append(ele,params[ele])
        }
    })
    return instance.post("register", data)
}

api.uploadHead = function (formData){
    return instance.post("uploadHead", formData)
}


export default api;