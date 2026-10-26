import { getStore } from "@netlify/blobs";

export default async (req) => {
  try {
    const data = await req.json();
    const store = getStore("exam-results");

    // Уникальный ключ для каждой попытки (магазин/табельный/время)
    const key = `${data.shopId}/${data.tabNumber}/${Date.now()}`;
    
    await store.setJSON(key, {
      ...data,
      date: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ success: true }), {
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
