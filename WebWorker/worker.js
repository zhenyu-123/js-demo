// 通过 onmessage 接收主线程发来的数据，计算后通过postMessage 将计算结果返回主线程。
self.onmessage = function (e) {
  const n = e.data;
  let a = 0,
    b = 1,
    temp;
  for (let i = 2; i <= n; i++) {
    temp = a;
    a = b;
    b = temp + b;
  }
  self.postMessage(b);
};
