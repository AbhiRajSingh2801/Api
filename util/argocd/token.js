'use strict'
const http = require('http')
const axios = require('axios')
require('dotenv').config()

let environment = process.env.environment ;
if(environment = 'dev'){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

let generateToken = async () =>{
  let username = process.env.argocdusername ;
  let password = process.env.argocdpassword ;
  let url = process.env.argocdServerAPIUrl + 'session' ;
  let promise = new Promise((resolve,reject)=>{
      axios
        .post(url, {
          username,
          password
        })
        .then((res) => {
          resolve(res.data.token)
        })
        .catch((error) => {
          console.error(error)
        })

        })

  return await promise;
}


module.exports.generateToken = generateToken ;
