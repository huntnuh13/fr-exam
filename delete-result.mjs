import { getStore } from "@netlify/blobs";

export default async (req) => {
  // Разрешаем только POST-запросы
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { shopId, tabNumber } = await req.json();
    const store = getStore("exam-results");

    // Получаем список всех файлов, ищем те, что начинаются с shopId/tabNumber/
    const prefix = `${shopId}/${tabNumber}/`;
    const { blobs } = await store.list({ prefix });

    // Удаляем каждый найденный файл
    for (const blob of blobs) {
      await store.delete(blob.key);
    }

    return new Response(JSON.stringify({ success: true, deleted: blobs.length }), {
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
