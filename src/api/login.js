import request from "@/utils/request";

// 获取图形验证码
export const getPicCode = () => {
    return request.get('/captcha/image')
}

// 获取短信验证码
export const getSmsCode = (captchaCode, captchaKey, mobile) => {
    return request.post('/captcha/sendSmsCaptcha', {
        form: {
            captchaCode,
            captchaKey,
            mobile
        }
    })
}

// 手机、验证码登录
export const login = (mobile, smsCode) => {
    return request.post('/passport/login', {
        form: {
            isParty: false,
            mobile,
            partyData: {},
            smsCode
        }
    })
}
