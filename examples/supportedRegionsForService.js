const { getServiceRegions } = require('../index.js');

const logJSONObject = (result) => console.log(JSON.stringify(result, null, 2));

getServiceRegions('cloud9').then(logJSONObject);