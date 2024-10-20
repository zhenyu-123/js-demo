## WebRTC 介绍

WebRTC（Web Real-Time Communication）是一个支持网页浏览器进行实时语音对话或视频对话的 API。它允许浏览器之间直接进行音视频通信，而无需通过服务器中转，从而降低了延迟并提高了通信质量。

### WebRTC 三种架构

[CSDN-webrtc 架构说明](https://unbroken.blog.csdn.net/article/details/117448636?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EOPENSEARCH%7EPaidSort-1-117448636-blog-102783229.235%5Ev43%5Epc_blog_bottom_relevance_base3&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EOPENSEARCH%7EPaidSort-1-117448636-blog-102783229.235%5Ev43%5Epc_blog_bottom_relevance_base3&utm_relevant_index=1)

[webrtc 简单介绍与调试](https://blog.csdn.net/zego_0616/article/details/123420765)

### P2P 通信完整流程

- 1. 用户 A 和 B 打开页面
- 2. 用户 A 创建 WebRTC 连接，并创建 offer 发送给服务器
- 3. 服务器将 offer 转发给用户 B
- 4. 用户 B 接收到 offer 后，创建 answer 并发送给服务器
- 5. 服务器将 answer 转发给用户 A
- 6. 用户 A 和 B 之间通过交换 ICE Candidate, 建立点对点连接

### WebRTC 通信原理

WebRTC 通信原理是通过 STUN 协议获取用户的公网 IP 和端口，然后通过 ICE 协议进行连接。

WebRTC 采用了 ICE（Interactive Connectivity Establishment）建立端到端的数据通道。说到 ICE，就不得不提到它的两个工具协议：STUN（Session Traversal Utilities for NAT）和 TURN（Travelsal Using Relays around NAT）协议。
