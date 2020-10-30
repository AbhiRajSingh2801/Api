const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const resourceRouter = require('./routes/getServices')
var cors = require('cors')
const namespaceRouter = require('./routes/namespaceRouter')

swaggerDocument = require('./swagger.json');
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors())

const port = process.env.PORT || 5000

app.use("/namespaces", namespaceRouter)

//app.use("/resources", resourceRouter)
/**
 * app.use("/namespaces", namespaceRouter)
 * app.use("/services", servicesRouter)
 * app.use("/clone", cloneRouter)
 */


app.listen(port,()=>{
    console.log('App started to listen at 5000')
})