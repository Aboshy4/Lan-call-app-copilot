# LAN Call Private

**Tagline:** Private calls. Local network. No cloud.

Android-only Expo + React Native + EAS project for private LAN chat and WebRTC audio/video calls between two phones on the same local network.

## Important

This is **not** an Expo Go app. It uses custom native modules and must be built with Expo Prebuild, Expo Dev Client, or EAS Build.

Native-dependent modules:

- `react-native-webrtc` — WebRTC camera, microphone, audio/video streams.
- `react-native-tcp-socket` — local TCP signaling server/client.
- `react-native-udp` — best-effort LAN discovery over UDP broadcast.
- `react-native-network-info` — local IPv4 and broadcast address.

## Features

- Host mode: starts local TCP signaling server on port `49494`.
- Guest mode: connects to Host IP and session code.
- LAN discovery: UDP broadcast on port `49495` when router/AP allows it.
- Local text chat.
- WebRTC offer/answer/ICE signaling over LAN.
- Camera preview and microphone permission through WebRTC.
- Video call UI with mute, camera toggle, switch camera, end call.
- Professional dark navy design with cyan/purple gradient accents.
- No WebView. No cloud backend.

## Install

```bash
npm install
npx expo install --fix
npm run doctor
```

Do **not** install `eas-cli` inside project dependencies. Use `npx eas-cli` or a global install.

## Development build

```bash
npm run prebuild:android
npm run build:development
npm start
```

## APK preview build

```bash
npm run build:preview
```

The `preview` profile uses `android.buildType: "apk"`, so EAS outputs an APK.

## Test steps

1. Install the generated APK on two Android phones.
2. Connect both phones to the same Wi‑Fi/LAN.
3. Phone A: choose **Host**.
4. Phone B: choose **Guest** and either select discovered Host or enter Host IP + session code manually.
5. Chat locally and start a video call.

## Limitations

- UDP discovery is best-effort. Some routers block broadcast/multicast or isolate clients.
- Manual IP connection is the reliable fallback.
- ICE servers are intentionally empty (`iceServers: []`) to keep calls LAN-only. This app is not intended for internet/NAT traversal.
- Wi‑Fi Direct is not implemented. True Wi‑Fi Direct requires a separate custom native Android module.
- This project is Android-focused. iOS config is intentionally omitted.
