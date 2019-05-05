const SSM = require('aws-sdk/clients/ssm');

const ssm = new SSM({ region: 'us-east-1' });

const filterParametersArray = (rawResults) => rawResults.Parameters.map(({ Value }) => Value);
const filterFirstParameter = (rawResults) => rawResults.Parameters[0];

async function getAllResultsFromPaginatedFn(method) {
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

function getSSMParameterByPath(Path, NextToken) {
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

function getSSMParameterByPathValuesWithFilter(key, filterFn) {
    const preparedFunction = getSSMParameterByPath.bind(this, key);
    return getAllResultsFromPaginatedFn(preparedFunction)
        .then((allResults) => applyFilterFn(allResults, filterFn));
}

function applyFilterFn(allResults, filterFn) {
    return !!filterFn ?
        filterFn(allResults) :
        allResults;
}

module.exports = {
    getSSMParameterByPathValuesWithFilter,
    filterParametersArray,
    filterFirstParameter
}