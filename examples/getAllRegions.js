const { getGlobalRegions } = require('../index.js');

const logJSONObject = (result) => console.log(JSON.stringify(result, null, 2));

getGlobalRegions().then(logJSONObject);