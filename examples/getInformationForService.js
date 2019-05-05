const { getServiceInfo } = require('../index.js');

const logJSONObject = (result) => console.log(JSON.stringify(result, null, 2));

getServiceInfo('ec2').then(logJSONObject);