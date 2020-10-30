'use strict'

const { Bitbucket } = require('bitbucket')
require('dotenv').config()
let getBitbucketInstance = ()=>{

    let username = process.env.bitbucketusername ;
    let password = process.env.bitbucketpassword ;
    let baseUrl = process.env.bitbucketapiurl ;

    const clientOptions = {
        baseUrl,
        auth: {
          username,
          password
        },
      }

      const bitbucket = new Bitbucket(clientOptions)

    return bitbucket ;
}

module.exports.getBitbucketInstance = getBitbucketInstance ;
