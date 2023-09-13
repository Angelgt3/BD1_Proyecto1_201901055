const app = require('./app');
app.listen(app.get('port'));

console.log('Run server: http://localhost:', app.get('port'));