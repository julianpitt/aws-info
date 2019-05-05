# AWS Info 
Inspired by the blog post by Jeff Barr https://aws.amazon.com/blogs/aws/new-query-for-aws-regions-endpoints-and-more-using-aws-systems-manager-parameter-store/

This package allows you to retrieve information such as:

- The available regions for a service
- The global regions available
- The full service name for a service
- The services available in a region
- The endpoint for a service in a region

Which can be found in the following table: https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/

This package acts as a lightweight wrapper for SSM calls to the AWS global parameters.
Results from the call can be transformed with [jq](https://stedolan.github.io/jq/) syntax.

## Usage

### Importing

```js
    // Using require
    const AWSInfo = require('aws-info');

    // Using desctructuring with require
    const {
        getGlobalRegions,
        getServiceRegions,
        getServiceInfo,
        getServicesForRegion,
        getServiceRegionEndpoint
    } = require('aws-info');

    // Using Import
    import * as AWSInfo from 'aws-info';

    // Using desctructuring with Import
    import {
        getGlobalRegions,
        getServiceRegions,
        getServiceInfo,
        getServicesForRegion,
        getServiceRegionEndpoint
    } from 'aws-info';
```

### Configuration options
```js
{
    jqFilter: '.', // JQ filter on results: String
    color: false // Colour output: false|true
}
```