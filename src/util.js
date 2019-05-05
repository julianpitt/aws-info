const SSM = require('aws-sdk/clients/ssm');
const jq = require('node-jq');

const ssm = new SSM();

async function getAllWithToken(method) {
    let results = { Parameters: [] };
    let nextToken = null;

    do {
        const { Parameters, NextToken } = await method(nextToken);
        if (Parameters) {
            results = {
                Parameters: [
                    ...results.Parameters,
                    ...Parameters
                ]
            };
        }
        nextToken = NextToken;
    } while (nextToken);

    return results;
}

function getRequest(Path, NextToken) {
    let params = {
        Path
    };

    if (NextToken) {
        params = {
            ...params,
            NextToken
        }
    }
    return ssm
        .getParametersByPath(params)
        .promise();
}

async function composer(key, config) {
    const preparedFunction = getRequest.bind(this, key);
    return getAllWithToken(preparedFunction)
        .then((allResults) => applyFilter(allResults, config));
}

async function applyFilter(allResults, config) {
    const { jqFilter, ...remainingConfig } = config;

    return !!jqFilter ?
        jq.run(jqFilter, allResults, { input: 'json', ...remainingConfig }) :
        allResults;
}

module.exports = { composer }