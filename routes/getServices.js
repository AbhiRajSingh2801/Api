const { express, Router } = require('express')
const yaml = require('js-yaml')
const fs = require('fs')
var path = require('path');

const bitbucketin = require('./../util/bitbucket/getBitBucketInstance')
// let bitbucket = bitbucketin.getBitbucketInstance() ;

require('dotenv').config()

const router = Router()

router.get('/', async (req,res) =>{


      let data ;
      let repo_slug = '{0694f73a-ad7e-435f-a1b6-3fd5eb024adf}' ;
      let workspace = 'madhuridevbb' ;
      let chartpath= 'Chart.yaml' ;
      let node = '5ab4548ad8d12662301b0f416a1f190bea2c9f57' ;
      let parents = node ;
      let _body = {
        "name" : "develop",
        "target" : {
            "hash" : "e7d17a2b59825e7664856c32cd8d84a4e6abe508",
        }
    }
    let name = 'master' ;
    let message = 'This is the dummy commit' ;
    let branch = 'dev-1'

    let filedata


    try {
        let data = fs.readFileSync(path.join(__dirname+'/../assets/dummy.yaml'));
        filedata = data ;
    } catch(e) {
        console.log('Error:', e.stack);
    }

    /**
     * create a new branch get the hash of the source branch and pupulate _body
     *
     */
     /*
   _body = {
       "dummy.yaml": filedata,
       "branch": branch,
       "message": "changed namespace"
   }*/
/** List branches and get the hash to read the contents of that branch
    await bitbucket.refs.list({repo_slug, workspace}).then((res)=>{
        data = res.data
    }).catch((err)=>{
        console.log(err);
    })

    res.send(data) ;

*/



/* Read file content and parse it to yaml syntax
 await bitbucket.source.read({node,path,repo_slug, workspace}).then((res)=>{
          data = res.data
      }).catch((err)=>{
          console.log(err);
      })
      let data2 = yaml.safeLoad(data);

      res.send(data2) ;

}) */


/** create file commit

await bitbucket.source.createFileCommit({ _body, branch, message, repo_slug, workspace }).then((res)=>{
    data = res.data
}).catch((err)=>{
    console.log(err);
}) */

//data = Buffer.from('mn00365100@techmahindra.com:bitbucket12345').toString('base64')
res.send(data) ;
});
router.get('/:id', (req,res) =>{
    res.send(req.params['id'])
})

module.exports = router ;
