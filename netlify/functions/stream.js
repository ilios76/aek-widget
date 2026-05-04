import fetch from "node-fetch";

export async function handler(event, context) {
  const station = event.queryStringParameters.station;

  const streams = {
    sporfm: "https://netradio.live24.gr/sporfm7712",
    skai: "https://netradio.live24.gr/skai1003",
    sfera: "https://sfera.live24.gr/sfera4132",
    dromos: "https://dromos.live24.gr/dromos9292",
    pepper: "https://pepper966.live24.gr/pepperorigin",
    red: "https://netradio.live24.gr/redorigin",
    melodia: "https://netradio.live24.gr/melodia992",
    eraspor: "https://radiostreaming.ert.gr/ert-erasport"
  };

  if (!streams[station]) {
    return {
      statusCode: 400,
      body: "Unknown station"
    };
  }

  try {
    const response = await fetch(streams[station]);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*"
      },
      body: Buffer.from(await response.arrayBuffer()).toString("base64"),
      isBase64Encoded: true
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Stream error: " + err.message
    };
  }
}
