const express = require("express");
const app = express();
const port = 3000;

app.get("/events", (req, res) => {
  // 设置响应头，告诉客户端这是一个SSE连接
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  // 每秒发送一次消息
  const intervalId = setInterval(() => {
    const data = `data: ${new Date().toISOString()}\n\n`;
    res.write(data);
  }, 1000);

  // 当客户端关闭连接时，清除定时器
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
