const {
    getSSMParameterByPathValuesWithFilter,
    filterParametersArray,
    filterFirstParameter
} = require('./src/util');

function getGlobalRegions(filterFn = filterParametersArray) {
    return getSSMParameterByPathValuesWithFilter(`/aws/service/global-infrastructure/regions`, filterFn);
}

function getServicesForRegion(region, filterFn = filterParametersArray) {
    return getSSMParameterByPathValuesWithFilter(`/aws/service/global-infrastructure/regions/${region}/services`, filterFn);
}

function getServiceInfo(serviceName, filterFn = filterFirstParameter) {
    return getSSMParameterByPathValuesWithFilter(`/aws/service/global-infrastructure/services/${serviceName}`, filterFn);
}

function getServiceRegions(serviceName, filterFn = filterParametersArray) {
    return getSSMParameterByPathValuesWithFilter(`/aws/service/global-infrastructure/services/${serviceName}/regions`, filterFn);
}

function getServiceRegionEndpoint(region, serviceName, filterFn = filterParametersArray) {
    return getSSMParameterByPathValuesWithFilter(`/aws/service/global-infrastructure/regions/${region}/services/${serviceName}`, filterFn);
}

module.exports = {
    getGlobalRegions,
    getServiceRegions,
    getServiceInfo,
    getServicesForRegion,
    getServiceRegionEndpoint
}
