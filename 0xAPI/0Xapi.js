const qs = require("qs");

async function fetchQuoteAndLog() {
  const params = {
    sellToken: "0x6B175474E89094C44Da98b954EedeAC495271d0F", //DAI
    buyToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", //WETH
    sellAmount: "100000000000000000000",
  };

  const headers = { "0x-api-key": "3332a7c8-bc45-4db5-a11f-8ad9e068a995" };

  try {
    const response = await fetch(
      `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`,
      { headers }
    );

    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
}

fetchQuoteAndLog(); // Call the async function to execute the code
