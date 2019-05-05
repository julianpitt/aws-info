const SSM = require('aws-sdk/clients/ssm');

const ssm = new SSM({ region: 'us-east-1' });

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

async function composer(key, filterFn) {
    const preparedFunction = getRequest.bind(this, key);
    return getAllWithToken(preparedFunction)
        .then((allResults) => applyFilter(allResults, filterFn));
}

async function applyFilter(allResults, filterFn) {
    return !!filterFn ?
        filterFn(allResults) :
        allResults;
}

module.exports = { composer }