const url = require('url')
const request = require('request')
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const path = require("path")
// 新增
const multer = require("multer");
//配置上传位置
const uploadHead = multer({ dest: "/headImg/" })

const fs = require("fs");


const api = [
    '/login',
    // "/register",
    "/logout",
    "/modifyUserInfo",
    "/modifyPasswordById",
    "/queryUserInfoById",
    "/getTeamByTid",
    "/getTeamByTname",
    "/addTeam",
    "/modifyTeamById",
    "/getAllTeam",
    "/getAllSkill",
    "/addSkill",
    "/modifySkillById",
    "/getAllSchedule",
    "/addSchedule",
    "/modifyScheduleById",
    "/getAllMessage",
    "/getAllUnreadMessage",
    "/sendMessageTo",
    "/deleteMessage",
    "/modifyMessageStatus",
    "/queryUserInfoById"
]
const baseURL = 
'http://127.0.0.1:8086/lx';
// 'http://121.36.51.141:8080/player_display_system';

function appInit(app) {
    api.forEach(ele => {
        app.get(ele, function (req, response) {
            const params = url.parse(req.url, true).query;
            console.log('params', params)
            request({
                url: baseURL + ele + '.ly' + toPramse(params),
                method: 'GET',
            }, (err, resp, body) => {
                if (!err) {
                    const head = {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST",
                        "Access-Control-Allow-Headers": "Origin,No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With, userId, token"
                    }
                    response.writeHead(200, head);
                    response.end(body)
                } else {
                    throw Error('请求错误', err)
                }
            })
        })
    })

    app.post("/register", multipartMiddleware, function (req, response) {
        console.log('=========', req.body)
        console.log('++====', toPramse(req.body))
        request({
            url: baseURL + "/register" + '.ly' + toPramse(req.body),
            method: 'GET',
            "Content-Type": "application/json",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
            // data:req.body,
        }, (err, resp, body) => {
            const head = {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Headers": "Origin,No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With, userId, token"
            }
            if (!err) {
                response.writeHead(200, head);
                response.end(body)
            } else {
                // throw Error('请求错误', err)
                response.writeHead(200);

                response.end("出现问题")
            }
        })
    });
    //  请求头像
    app.get("/getHeader",function(req,response){
        const headerUrl = url.parse(req.url, true).query.path;
        let pathUrl = path.resolve(__dirname,headerUrl)
        pathUrl = pathUrl.slice(0,49) + '/' + pathUrl.slice(49)
        console.log("path,",pathUrl)

        const files = fs.readFileSync(pathUrl)
        const head = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Origin,No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With, userId, token"
        }
        if(files){
            response.writeHead(200, head);
            response.end(files)
        }
            
    })
    // 上传头像
    app.post("/uploadHead", uploadHead.single("header"), function (req, response) {
        const uid = req.body.uid;
        const path = "/getHeader?path="+req.file.path;
        console.log("上传",path)
        const head = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Origin,No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With, userId, token"
        }
        request({
            url: baseURL + "/modifyHeaderById" + '.ly' + "?uid="+uid+"&headImg="+path,
            method: 'GET',
        }, (err, resp, body) => {
            if(!err){
                response.writeHead(200, head);
                response.end(path)
            }else{
                console.log("出错了")
            }
        })
    })

}

function toPramse(obj) {
    let str = "?"
    Object.getOwnPropertyNames(obj).forEach(ele => {
        str += ele + '=' + encodeURIComponent(obj[ele]) + '&'
    })
    return str.substring(0, str.length - 1);
}

module.exports.appInit = appInit;

