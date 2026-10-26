import { getStore } from "@netlify/blobs";

export default async () => {
  try {
    const store = getStore("exam-results");
    const { blobs } = await store.list();

    const results = [];
    for (const blob of blobs) {
      const entry = await store.get(blob.key, { type: "json" });
      if (entry) results.push(entry);
    }

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
