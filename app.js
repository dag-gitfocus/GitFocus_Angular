const express = require('express');
const http = require('http');
const path = require('path'); 
const app = express();

app.use(express.static(path.join(__dirname,'dist/angular-app'))); 
app.get('/*',(req, res) => {
res.sendFile(path.join(__dirname,'dist/angular-app/index.html'));
}); 
const port = process.env.PORT || '4200'; 
app.set('port',port);

const server = http.createServer(app);
server.listen(port,() => console.log('Running'));  



 
