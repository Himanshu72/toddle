const axios = require("axios")


module.exports={

    createuser:async(args)=>{
        console.log(args);
        let result;
        try{
         result=await axios({
            url: 'https://authendpoint.herokuapp.com/graphql',
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
            url: 'https://authendpoint.herokuapp.com/graphql',
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
    },
    async createAssignment(args){
      console.log(args)
      let result;
      let arr=args.students;
      args.students="[";
      for(let a of arr){
        args.students+='"';
        args.students+=a;
        args.students+='"';
        args.students+=',';      
        }
        args.students= args.students.substr(0,args.students.length-1)+  ']';
        console.log(args.students);
        try{
         result=await axios({
            url: 'https://assignmentendpoi.herokuapp.com/graphql',
            method: 'post',
            data: {
              query: `
                   
                query {
                  createAssignment(createdBy:"${args.createdBy}",deadLine:"${args.deadLine}",publishAt:"${args.publishAt}",students:${args.students},description:"${args.description}" ){
                    createdBy
                    deadLine
                    students
                  publishAt
                  status
                  description 
                  _id
              }	
                }
                `
            }
          })
        }
        catch(e){
          //  console.log(e);
            throw e;
        }
       if(result.data.errors){
          throw new Error(result.data.errors[0].message);
        }
          
        return result.data.data.createAssignment;
    },
    async updateAssignment(args){
      console.log(args)
      let result;
      let arr=args.students;
      args.students="[";
      for(let a of arr){
        args.students+='"';
        args.students+=a;
        args.students+='"';
        args.students+=',';      
        }
        args.students= args.students.substr(0,args.students.length-1)+  ']';
        console.log(args.students);
        try{
         result=await axios({
            url: 'https://assignmentendpoi.herokuapp.com/graphql',
            method: 'post',
            data: {
              query: `
                   
                query {
                  updateAssignment(_id:"${args._id}",createdBy:"${args.createdBy}",deadLine:"${args.deadLine}",students:${args.students},description:"${args.description}" ){
                    createdBy
                    deadLine
                    students
                  publishAt
                  status
                  description 
                  _id
              }	
                }
                `
            }
          })
        }
        catch(e){
          //  console.log(e);
            throw e;
        }
       if(result.data.errors){
          throw new Error(result.data.errors[0].message);
        }
          
        return result.data.data.updateAssignment;
    },
    async deleteAssignment(args){
      try{
        result=await axios({
           url: 'https://assignmentendpoi.herokuapp.com/graphql',
           method: 'post',
           data: {
             query: `
                  
               query {
                 deleteAssignment(_id:"${args._id}" ){
                   message
             }	
               }
               `
           }
         })
       }
       catch(e){
         //  console.log(e);
           throw e;
       }
      if(result.data.errors){
         throw new Error(result.data.errors[0].message);
       }
         
       return result.data.data.deleteAssignment;
    },
    async submitAssignment(args){
      try{
        result=await axios({
           url: 'https://assignmentendpoi.herokuapp.com/graphql',
           method: 'post',
           data: {
             query: `
                  
               query {
                submitAssignment(submitedBy:"${args.submitedBy}",Assignment:"${args.Assignment}",remark:"${args.remark}" ){
                  submitedBy,
                  Assignment,
                  remark,
                  _id
                }
               }
               `
           }
         })
       }
       catch(e){
         //  console.log(e);
           throw e;
       }
      if(result.data.errors){
         throw new Error(result.data.errors[0].message);
       }
         
       return result.data.data.submitAssignment;
    }
    ,
    async getAssignmentSubmission(args){
      try{
        result=await axios({
           url: 'https://assignmentendpoi.herokuapp.com/graphql',
           method: 'post',
           data: {
             query: `
                  
               query {
                getAssignmentSubmission(isStudent:${args.isStudent},username:"${args.username}",Assignment:"${args.Assignment}" ){
                  submitedBy,
                  _id,
                  remark
                  Assignment	
              }
               }
               `
           }
         })
       }
       catch(e){
         //  console.log(e);
           throw e;
       }
      if(result.data.errors){
         throw new Error(result.data.errors[0].message);
       }
         
       return result.data.data.getAssignmentSubmission;
    },
    async getAssignment(args,filter){
      try{
        
      if(!filter){
        result=await axios({
           url: 'https://assignmentendpoi.herokuapp.com/graphql',
           method: 'post',
           data: {
             query: `
                  
               query {
                getAssignment(username:"${args.username}",isStudent:${args.isStudent}){
                  status
                  deadLine
                  description
                  publishAt
                  students
                }
              }
               `
           }
         })
        }else{
          result=await axios({
            url: 'https://assignmentendpoi.herokuapp.com/graphql',
            method: 'post',
            data: {
              query: `
                   
                query {
                 getAssignment(username:"${args.username}",isStudent:${args.isStudent},filter:"${args.filter}"){
                   status
                   deadLine
                   description
                   publishAt
                   students
                 }
               }
                `
            }
          })
           
        }
       }
       catch(e){
         //  console.log(e);
           throw e;
       }
      if(result.data.errors){
         throw new Error(result.data.errors[0].message);
       }
         
       return result.data.data.getAssignment;
    }
};