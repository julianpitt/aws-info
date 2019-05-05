const { composer } = require('./src/util');

const filterParametersArray = (rawResults) => rawResults.Parameters.map(({ Value }) => Value);
const filterFirstParameter = (rawResults) => rawResults.Parameters[0];

function getGlobalRegions(filterFn = filterParametersArray) {
    return composer(`/aws/service/global-infrastructure/regions`, filterFn);
}

function getServicesForRegion(region, filterFn = filterParametersArray) {
    return composer(`/aws/service/global-infrastructure/regions/${region}/services`, filterFn);
}

function getServiceInfo(serviceName, filterFn = filterFirstParameter) {
    return composer(`/aws/service/global-infrastructure/services/${serviceName}`, filterFn);
}

function getServiceRegions(serviceName, filterFn = filterParametersArray) {
    return composer(`/aws/service/global-infrastructure/services/${serviceName}/regions`, filterFn);
}

function getServiceRegionEndpoint(region, serviceName, filterFn = filterParametersArray) {
    return composer(`/aws/service/global-infrastructure/regions/${region}/services/${serviceName}`, filterFn);
}

module.exports = {
    getGlobalRegions,
    getServiceRegions,
    getServiceInfo,
    getServicesForRegion,
    getServiceRegionEndpoint
}
