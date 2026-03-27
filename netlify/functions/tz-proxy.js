export default async (req, context) => {
  try {
    const response = await fetch("https://d2emu.com/api/v1/tz", {
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Upstream error", status: response.status }), {
        status: 502,
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=60"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const config = { path: "/api/tz" };
