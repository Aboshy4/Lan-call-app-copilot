export type Role = 'host' | 'guest';
export type ScreenName = 'welcome' | 'role' | 'hostLobby' | 'guestConnect' | 'chat' | 'call' | 'settings';
export type ConnectionStatus = 'idle' | 'starting' | 'listening' | 'connecting' | 'connected' | 'failed' | 'closed';
export type SignalType = 'hello' | 'accepted' | 'chat' | 'webrtc-offer' | 'webrtc-answer' | 'webrtc-ice' | 'call-ended' | 'presence' | 'error';
export type SignalMessage = { type: SignalType; payload?: any; sessionCode?: string; from?: Role; ts: number };
export type ChatMessage = { id: string; text: string; mine: boolean; ts: number };
export type DiscoveredHost = { id: string; name: string; ip: string; port: number; sessionCode: string; lastSeen: number };
