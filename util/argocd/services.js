const axios = require('axios')
const { generateToken } = require('./token')
const fs = require('fs')
let schemaPath = path.join(__dirname + '/../schema/')


let url = process.env.argocdServerAPIUrl ;


let listOfApplicationsRunning = async ()=>{
let bearerToken = await generateToken()
let promise = new Promise((resolve,reject)=>{
      var config = {
        method: 'get',
        url: url+'applications',
        headers: {
          'Authorization': 'Bearer '+bearerToken
        }
      };
      axios(config)
      .then(response => {
        resolve(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
    })
 return await promise ;
}


let customRunningApplication = async () =>{
  let argocdapplistJson = JSON.parse(fs.readFileSync(schemaPath + 'argocdapplist.json'))
  let response = await listOfApplicationsRunning()
  let items = response.items;
  let itemsLength = items.length;
  let data = []

  for (let i = 0; i < itemsLength; i++) {
    let readjson = Object.assign({}, argocdapplistJson)
    readjson.name = items[i].metadata.name;
    readjson.creationTime = items[i].metadata.creationTimestamp;
    readjson.namespace = items[i].metadata.namespace;
    readjson.repoUrl = items[i].spec.source.repoURL;
    readjson.branch = items[i].spec.source.targetRevision;
    readjson.path = items[i].spec.source.path;
    readjson.helm = items[i].spec.source.helm;
    let resources = items[i].status.resources;
    let servicesArray = []
    let resourcesLength = resources.length;

    for (let j = 0; j < resourcesLength; j++) {
      let name = resources[j].name;
      let kind = resources[j].kind;
      let status = resources[j].status;
      let namespace;
      let health;
      if (kind != "Namespace") {
        health = resources[j].health.status;
        namespace = resources[j].namespace;
      }
      let services = {
        name,
        kind,
        namespace,
        health,
        status
      }
      servicesArray.push(services)
    }

    readjson.services = servicesArray;
    data.push(readjson)
  }

  return data ;
}







module.exports.customRunningApplication = customRunningApplication ;

