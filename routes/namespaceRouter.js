'use strict';
const { Router } = require('express')
const router = Router()
const path = require('path')
const {
  getBitbucketInstance
} = require('./../util/bitbucket/getBitBucketInstance')
const { servicesInCurrentBranch, valuesInCurrentBranch } = require('./../util/bitbucket/services')

const fs = require('fs')
const axios = require('axios')
let bitbucket = getBitbucketInstance()
require('dotenv').config()
let workspace = process.env.bitbucetWorkspace
let schemaPath = path.join(__dirname + '/../util/schema/')
require("json-circular-stringify")



router.get('/:env', async (req, res) => {
  let repo_slug = req.params.env;
  repo_slug= process.env.bitbucketrepo
  let namespaceschema = JSON.parse(fs.readFileSync(schemaPath + 'namespaceschema.json'))
  let namespaces = []

  await bitbucket.refs.list({
      repo_slug,
      workspace
    })
    .then((response) => {
      let data = response.data;
      let values = data.values;
      let valuesLength = values.length

      for (let i = 0; i < valuesLength; i++) {
          let readjson = Object.assign({}, namespaceschema)
          readjson.name = values[i].name;
          readjson.hash = values[i].target.hash;
          namespaces.push(readjson)
  
      }
      res.status(200).send({
        namespaces
      })
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})


router.get('/:env/:hash/services', async (req, res) => {
  
  let env = req.params.env;
  let hash = req.params.hash;
  let data = await servicesInCurrentBranch(env,hash)
  let values = await valuesInCurrentBranch(env,hash)
  data.values = values ;
  data.namespace = env;
  res.status(200).send(data)
     
 /* ------------------------- start of branch code ------------------------------- */

 
 /* --------------- End of branch code --------------------------------------------*/

  /* ---------------------- Start of argocd code ---------------------------- */
  
  /* --------------------- End of argo CD code --------------------------------- */
})

module.exports = router;