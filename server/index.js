const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())
const connectToMongo = require('./db/db');


connectToMongo();
const port = 5000


app.use(express.json())

app.listen(port, () => {
    console.log(`server is listening at port ${port}`);
});

app.use('/api', require('./routes/admin'))
app.use('/api', require('./routes/doctor'))
app.use('/api', require('./routes/patient'))
app.use('/api', require('./routes/bill'))
app.use('/api', require('./routes/services'))