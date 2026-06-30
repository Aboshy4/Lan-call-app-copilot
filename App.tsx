import 'react-native-get-random-values';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { ScreenName } from './src/types';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { RoleSelectionScreen } from './src/screens/RoleSelectionScreen';
import { HostLobbyScreen } from './src/screens/HostLobbyScreen';
import { GuestConnectScreen } from './src/screens/GuestConnectScreen';
import { ChatRoomScreen } from './src/screens/ChatRoomScreen';
import { VideoCallScreen } from './src/screens/VideoCallScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
export default function App() {
  const [screen, setScreen] = useState<ScreenName>('welcome');
  const [pendingOffer, setPendingOffer] = useState<any>(null);
  const go = (s: ScreenName) => setScreen(s);
  return <><StatusBar barStyle="light-content" />{screen === 'welcome' && <WelcomeScreen go={go} />}{screen === 'role' && <RoleSelectionScreen go={go} />}{screen === 'hostLobby' && <HostLobbyScreen go={go} />}{screen === 'guestConnect' && <GuestConnectScreen go={go} />}{screen === 'chat' && <ChatRoomScreen go={go} setPendingOffer={setPendingOffer} />}{screen === 'call' && <VideoCallScreen go={go} pendingOffer={pendingOffer} setPendingOffer={setPendingOffer} />}{screen === 'settings' && <SettingsScreen go={go} />}</>;
}
