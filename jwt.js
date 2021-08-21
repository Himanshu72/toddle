let jwt = require('jsonwebtoken');

module.exports={
    assignToken(username){
        let token=jwt.sign({user:username},"mykey")
        return token;
    },
    isAuth(username,token){
        let decode=jwt.verify(token,"mykey");
        if(decode.user===username)
                return true;
        else
                return false;        
    }
};