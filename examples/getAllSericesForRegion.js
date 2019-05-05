const { getServicesForRegion } = require('../index.js');

const logJSONObject = (result) => console.log(JSON.stringify(result, null, 2));

getServicesForRegion('ap-southeast-2').then(logJSONObject);