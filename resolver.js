const axios = require("axios")


module.exports={

    createuser:async(args)=>{
        console.log(args);
        let result;
        try{
         result=await axios({
            url: 'http://localhost:4000/graphql',
            method: 'post',
            data: {
              query: `
                query {
                    user(username:"${args.username}",password:"${args.password}",isStudent:${args.isStudent}) {
                        username
                        password
                        isStudent
                        }
                  }
                `
            }
          })
        }
        catch(e){
            console.log(e);
            throw e;
        }
       
        return result.data.data.user;
    },
    async getuser(args){
      console.log(args)
      let result;
        try{
         result=await axios({
            url: 'http://localhost:4000/graphql',
            method: 'post',
            data: {
              query: `
                query {
                    getUser(username:"${args.username}",password:"${args.password}") {
                        username
                        password
                        isStudent
                        }
                  }
                `
            }
          })
        }
        catch(e){
            console.log(e);
            throw e;
        }
       if(result.data.errors){
          throw new Error(result.data.errors[0].message);
       }
        
        return result.data.data.getUser;
    }
};