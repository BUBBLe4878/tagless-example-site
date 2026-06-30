import Pusher from "pusher";

const pusher = new Pusher({
  appId: "2169645",
  key: "55f12054815fd6e2f2c9",
  secret: "cc8f6ca94d787071a990",
  cluster: "mt1",
});

export async function POST(request) {
  try {
    const { clientId, x, y } = await request.json();

    // Server triggers the event (bypasses client event requirement)
    await pusher.trigger("cursors", "cursor-move", {
      clientId,
      x,
      y,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Cursor error:", err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}