const axios = require('axios');

exports.handler = async function (event, context) {
    const { fromCurrency, toCurrency, amount } = event.queryStringParameters;
    const apiKey = process.env.EXCHANGE_RATE_API_KEY; // Get API key from environment variables

    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.result === "success") {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    result: "success",
                    conversion_result: data.conversion_result,
                }),
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    result: "error",
                    message: data["error-type"],
                }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                result: "error",
                message: "An error occurred while fetching exchange rates.",
            }),
        };
    }
};