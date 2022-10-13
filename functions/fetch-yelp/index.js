const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {

const zip = event.queryStringParameters.zip;
const search = event.queryStringParameters.search;

try {
  const response = await fetch(
    `https://api.yelp.com/v3/businesses/search?term=${search}&location=${zip}`, 
    {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    }
  );

  const data = await response.json();
  const json = JSON.stringify(data.businesses);

  return {
    statusCode: 200,
    body: json,
  };
}
catch (error) {
  console.log(error);
  return {
    statusCode: 500,
    body: JSON.stringify({ error: 'Failed to grab the data' }),
  };
}
};

module.exports = { handler };
