const qs = require("qs");
require("dotenv").config();
assetA = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
(assetB = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"),
  (assetC = "0x61935CbDd02287B511119DDb11Aeb42F1593b7Ef");

async function fetchQuoteAndLog(soldToken, boughtToken) {
  const params = {
    sellToken: soldToken, //DAI
    buyToken: boughtToken, //WETH
    sellAmount: "100000000000000000000", // 18 Decimal Places
  };

  const apiKey = process.env.API_KEY;
  const headers = { "0x-api-key": apiKey };

  // Now you can use the `headers` object in your requests

  try {
    const response = await fetch(
      `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`,
      { headers }
    );

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
}

async function findArbitrageOpportunities() {
  const pairs = [
    [assetA, assetB],
    [assetB, assetC],
    [assetC, assetA],
  ];

  for (let i = 0; i < pairs.length; i++) {
    console.log("iteration", i);
    const [asset1, asset2] = pairs[i];
    const [_, asset3] = pairs[(i + 1) % pairs.length];

    order1 = await fetchQuoteAndLog(asset1, asset2);
    order2 = await fetchQuoteAndLog(asset2, asset3);
    order3 = await fetchQuoteAndLog(asset3, asset1);

    console.log(
      "ob1",
      order1.code,
      order1.grossBuyAmount,
      order1.grossSellAmount
    );
    console.log(
      "ob2",
      order2.code,
      order2.grossBuyAmount,
      order2.grossSellAmount
    );
    console.log(
      "ob3",
      order3.code,
      order3.grossBuyAmount,
      order3.grossSellAmount
    );
  }
}

findArbitrageOpportunities();
