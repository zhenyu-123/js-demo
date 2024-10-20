const socket = io("http://localhost:3000");
const localVideo = document.querySelector("#localVideo");
const remoteVideo = document.querySelector("#remoteVideo");
const configruation = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302", // stun服务器
    },
  ],
};
const peerConnection = new RTCPeerConnection(configruation); // 创建一个peerConnection对象

// 获取本地媒体流
navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    localVideo.srcObject = stream;
    // 将本地媒体流添加到peerConnection中
    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream); // 将本地媒体流中的每个轨道添加到peerConnection中
    });
  })
  .catch((err) => {
    console.log("Error accessing media devices.", err); // 获取本地媒体流失败
  });

//  当peerConnection对象接收到远程对等方的媒体流时，将其显示在远程视频元素中
peerConnection.onicecandidate = (event) => {
  console.log("ice-candidate");

  if (event.candidate) {
    // 当peerConnection对象产生新的ICE候选时，将其发送给远程对等方
    socket.emit("ice-candidate", event.candidate);
  }
};

peerConnection.ontrack = (event) => {
  // 当peerConnection对象接收到远程对等方的媒体流时，将其显示在远程视频元素中
  remoteVideo.srcObject = event.streams[0];
};

socket.on("offer", async (offer) => {
  // 当收到远程对等方的offer时，将其设置为本地的远程描述
  //currentRemoteDescription 表示远程对等方发送的SDP描述
  if (!peerConnection.currentRemoteDescription) {
    // 如果当前没有远程描述，则设置远程描述
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    // 创建应答
    const answer = await peerConnection.createAnswer();
    // 将应答设置为本地的本地描述
    await peerConnection.setLocalDescription(answer); //currentLocalDescription 表示本地对等方发送的SDP描述
    // 将应答发送给远程对等方
    socket.emit("answer", peerConnection.localDescription);
  }
});

socket.on("answer", async (answer) => {
  // 当收到远程对等方的answer时，将其设置为本地的远程描述
  // RTCSessionDescription 是一个表示SDP描述的接口，它包含了会话的描述信息，如媒体类型、编码格式、传输协议等。
  await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
});

// 当收到远程对等方的ICE候选时，将其添加到peerConnection中
// ICE:是Internet Connectivity Establishment的缩写，是一种用于建立P2P连接的协议，它允许两个对等方在没有中间服务器的情况下直接建立连接。
socket.on("ice-candidate", async (candidate) => {
  if (candidate) {
    try {
      // 当收到远程对等方的ICE候选时，将其添加到peerConnection中
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.log("Error adding ICE candidate.", err);
    }
  }
});

// onnegotiationneeded 事件会在peerConnection对象需要协商时触发，协商是指对等方之间交换SDP描述的过程，以建立连接并协商媒体流。
peerConnection.onnegotiationneeded = async () => {
  // 当peerConnection对象需要协商时，创建一个offer并发送给远程对等方
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit("offer", peerConnection.localDescription);
};
// socket 在webrtc中的使用是为了实现点对点通信，它可以在两个对等方之间建立连接，并传输媒体流。