const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {

  const zip = event.queryStringParameters.zip;
  const search = event.queryStringParameters.search;

  try {
    const header = {
      Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
    };
    const resp = await fetch(
      `https://api.yelp.com/v3/businesses/search?categories=restaurants&location=${zip}&term=${search}`,
      { headers: header }
    );
    if (!resp.ok) {
      return {
        statusCode: resp.status, body: resp.statusText };

    }

    const data = await resp.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data.businesses),
    };
      
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};



module.exports = { handler };
