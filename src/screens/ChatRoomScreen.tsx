import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GradientBackground } from '../components/GradientBackground';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { StatusPill } from '../components/StatusPill';
import { colors } from '../theme/colors';
import { ChatMessage, SignalMessage } from '../types';
import { sessionService } from '../services/SessionService';
import { makeId } from '../utils/id';
export const ChatRoomScreen = ({ go, setPendingOffer }: { go: (s: any) => void; setPendingOffer: (o: any) => void }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]); const [text, setText] = useState(''); const [status, setStatus] = useState('connected');
  useEffect(() => { const u1 = sessionService.on('message', (m: SignalMessage) => { if (m.type === 'chat') setMessages(prev => [...prev, { id: makeId(), text: m.payload.text, mine: false, ts: m.ts }]); if (m.type === 'webrtc-offer') { setPendingOffer(m.payload); go('call'); } }); const u2 = sessionService.on('status', (s: string) => setStatus(s)); return () => { u1(); u2(); }; }, []);
  const send = () => { if (!text.trim()) return; sessionService.send('chat', { text: text.trim() }); setMessages(prev => [...prev, { id: makeId(), text: text.trim(), mine: true, ts: Date.now() }]); setText(''); };
  return <GradientBackground><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.root}><View style={styles.top}><View><Text style={styles.title}>Private LAN Room</Text><Text style={styles.sub}>Code {sessionService.sessionCode}</Text></View><StatusPill status={status} /></View><ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 14 }}>{messages.map(m => <View key={m.id} style={[styles.bubble, m.mine ? styles.mine : styles.theirs]}><Text style={styles.msg}>{m.text}</Text></View>)}</ScrollView><Card style={styles.composer}><TextInput value={text} onChangeText={setText} placeholder="Message over LAN…" placeholderTextColor={colors.muted} style={styles.input} /><PrimaryButton title="Send" onPress={send} style={{ width: 92 }} /></Card><View style={styles.actions}><PrimaryButton title="Start call" onPress={() => { setPendingOffer(null); go('call'); }} style={{ flex: 1 }} /><PrimaryButton title="End session" variant="danger" onPress={() => { sessionService.close(); go('role'); }} style={{ flex: 1 }} /></View></KeyboardAvoidingView></GradientBackground>;
};
const styles = StyleSheet.create({ root: { flex: 1, padding: 16, paddingTop: 52 }, top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, title: { color: colors.text, fontSize: 24, fontWeight: '900' }, sub: { color: colors.muted, marginTop: 3 }, list: { flex: 1, marginTop: 14 }, bubble: { maxWidth: '82%', padding: 13, borderRadius: 18, marginVertical: 5 }, mine: { alignSelf: 'flex-end', backgroundColor: colors.purple }, theirs: { alignSelf: 'flex-start', backgroundColor: colors.card2 }, msg: { color: '#fff', fontSize: 16 }, composer: { flexDirection: 'row', gap: 10, alignItems: 'center', padding: 10 }, input: { flex: 1, color: colors.text, fontSize: 16 }, actions: { flexDirection: 'row', gap: 10, marginTop: 10 } });
