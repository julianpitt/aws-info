const { getServiceRegionEndpoint } = require('../index.js');

const logJSONObject = (result) => console.log(JSON.stringify(result, null, 2));

getServiceRegionEndpoint('us-east-1', 'ec2').then(logJSONObject);