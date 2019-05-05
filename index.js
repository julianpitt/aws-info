const { composer } = require('./src/util');

const generateConfig = (jqFilter = '.', userConfig) => ({
    output: 'json',
    jqFilter,
    ...userConfig
});

function getGlobalRegions(userConfig) {
    const config = generateConfig('[.Parameters[].Value]', userConfig);
    return composer(`/aws/service/global-infrastructure/regions`, config);
}

function getServicesForRegion(region, userConfig) {
    const config = generateConfig('[.Parameters[].Value]', userConfig);
    return composer(`/aws/service/global-infrastructure/regions/${region}/services`, config);
}

function getServiceInfo(serviceName, userConfig) {
    const config = generateConfig('.Parameters[0]', userConfig);
    return composer(`/aws/service/global-infrastructure/services/${serviceName}`, config);
}

function getServiceRegions(serviceName, userConfig) {
    const config = generateConfig('[.Parameters[].Value]', userConfig);
    return composer(`/aws/service/global-infrastructure/services/${serviceName}/regions`, config);
}

function getServiceRegionEndpoint(region, serviceName, userConfig) {
    const config = {
        ...defaultConfig,
        jqFilter: '.Parameters',
        ...userConfig
    };

    return composer(`/aws/service/global-infrastructure/regions/${region}/services/${serviceName}`, config);
}

module.exports = {
    getGlobalRegions,
    getServiceRegions,
    getServiceInfo,
    getServicesForRegion,
    getServiceRegionEndpoint
}
