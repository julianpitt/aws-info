const {
    getGlobalRegions,
    getServiceRegions,
    getServiceInfo,
    getServicesForRegion,
    getServiceRegionEndpoint
} = require('../index.js');

const logJSONObject = (result) => console.log(JSON.stringify(result, null, 2));

(async function main() {

    // Get all regions
    const allRegions = await getGlobalRegions();
    logJSONObject(allRegions);

    // Get all supported regions for the AWS Cloud9 service
    const allRegionsForCloud9 = await getServiceRegions('cloud9');
    logJSONObject(allRegionsForCloud9);

    // Get information for the AWS EC2 service
    const ec2ServiceInformation = await getServiceInfo('ec2');
    logJSONObject(ec2ServiceInformation);

    // List out all the services for a particular region
    const servicesInSydney = await getServicesForRegion('ap-southeast-2');
    logJSONObject(servicesInSydney);

    // Get the endpoint and protocols for a service in a specific region
    const ec2EndpointsInUsEast1 = await getServiceRegionEndpoint('us-east-1', 'ec2');
    logJSONObject(ec2EndpointsInUsEast1);

})()