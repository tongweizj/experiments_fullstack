const config = require('./config/index');
console.log(`port：envm没有设置的参数，: ${config.port}`);
console.log(`JWT_SECRET：envm设置的参数，: ${config.JWT_SECRET}`);