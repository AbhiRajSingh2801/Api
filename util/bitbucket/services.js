const { getBitbucketInstance } = require('./getBitBucketInstance')
const path = require('path')
const fs = require('fs')
const axios = require('axios')
let bitbucket = getBitbucketInstance()
let schemaPath = path.join(__dirname + '/../schema/')
let workspace = process.env.bitbucetWorkspace;
const yaml = require('js-yaml')


let servicesInCurrentBranch = async (env,hash) =>{

  let repo_slug = env;
  repo_slug= process.env.bitbucketrepo;
  let node = hash;
  
  let path = 'apps/templates';
  let promise = new Promise(async (resolve,reject) => {
  await bitbucket.source.read({ node, path, repo_slug, workspace })
  .then((response)=>{

      let readjson = JSON.parse(fs.readFileSync(schemaPath+'servicesschema.json'));

      let data = response.data;
      let values = data.values;
      let valuesLength = values.length

      for(let i = 0 ; i < valuesLength ; i++){
           let servicenamepath = values[i].path ;
           let servicename =  servicenamepath.split('/')[2].split('.')[0]
           if(servicename != 'namespaces')
           readjson.services.push(servicename)
        }
     resolve(readjson)
  })
  .catch((error)=>{
   reject(error)
  })
  })

  return await promise;
}

let valuesInCurrentBranch = async (env,hash) =>{
    let repo_slug = env;
    repo_slug= process.env.bitbucketrepo;
    let node = hash;
    
    let path = 'apps/values.yaml';
    let promise = new Promise(async (resolve,reject) => {
     await bitbucket.source.read({ node, path, repo_slug, workspace })
    .then((response)=>{
       let values = yaml.safeLoad(response.data)
       resolve(values)
    })
    .catch((error)=>{
     reject(error)
    })
    })
  
    return await promise;
}



module.exports.servicesInCurrentBranch = servicesInCurrentBranch ;
module.exports.valuesInCurrentBranch = valuesInCurrentBranch ;