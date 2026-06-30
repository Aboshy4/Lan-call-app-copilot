import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { GradientBackground } from '../components/GradientBackground';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { DiscoveryService } from '../services/DiscoveryService';
import { DiscoveredHost } from '../types';
import { LocalSignalingClient } from '../services/LocalSignalingClient';
import { sessionService } from '../services/SessionService';
import { SIGNAL_PORT } from '../services/LocalSignalingServer';
export const GuestConnectScreen = ({ go }: { go: (s: any) => void }) => {
  const [ip, setIp] = useState(''); const [code, setCode] = useState(''); const [hosts, setHosts] = useState<DiscoveredHost[]>([]); const [busy, setBusy] = useState(false);
  useEffect(() => { const d = new DiscoveryService(); d.on('host', (h: DiscoveredHost) => setHosts(prev => [h, ...prev.filter(x => x.id !== h.id)].slice(0, 6))); d.listen(); return () => d.stop(); }, []);
  const join = async (host = ip, sessionCode = code, port = SIGNAL_PORT) => { try { setBusy(true); const client = new LocalSignalingClient(); sessionService.sessionCode = sessionCode; sessionService.hostIp = host; sessionService.bindTransport('guest', client); await client.connect(host, port); sessionService.send('hello', { name: 'Guest' }); go('chat'); } catch (e: any) { Alert.alert('Connection failed', String(e?.message || e)); } finally { setBusy(false); } };
  return <GradientBackground><ScrollView contentContainerStyle={styles.root}><Text style={styles.title}>Join as Guest</Text><Card><Text style={styles.h}>Discovered hosts</Text>{hosts.length === 0 ? <Text style={styles.muted}>Searching LAN… If nothing appears, enter the Host IP manually.</Text> : hosts.map(h => <TouchableOpacity key={h.id} style={styles.host} onPress={() => join(h.ip, h.sessionCode, h.port)}><Text style={styles.hostName}>{h.name}</Text><Text style={styles.muted}>{h.ip}:{h.port} • code {h.sessionCode}</Text></TouchableOpacity>)}</Card><Card style={{ marginTop: 16 }}><Text style={styles.h}>Manual connection</Text><TextInput value={ip} onChangeText={setIp} placeholder="Host IP e.g. 192.168.1.34" placeholderTextColor={colors.muted} style={styles.input} keyboardType="numeric" /><TextInput value={code} onChangeText={setCode} placeholder="Session code" placeholderTextColor={colors.muted} style={styles.input} keyboardType="number-pad" /><PrimaryButton disabled={busy || !ip || !code} title={busy ? 'Connecting…' : 'Connect locally'} onPress={() => join()} /></Card><PrimaryButton title="Back" variant="secondary" onPress={() => go('role')} style={{ marginTop: 16 }} /></ScrollView></GradientBackground>;
};
const styles = StyleSheet.create({ root: { padding: 20, paddingTop: 56 }, title: { color: colors.text, fontSize: 28, fontWeight: '900', marginBottom: 18 }, h: { color: colors.text, fontSize: 20, fontWeight: '800', marginBottom: 10 }, muted: { color: colors.muted }, host: { padding: 14, borderRadius: 16, backgroundColor: 'rgba(255,255,255,.06)', marginTop: 10 }, hostName: { color: colors.text, fontWeight: '800' }, input: { color: colors.text, borderWidth: 1, borderColor: colors.line, borderRadius: 16, padding: 14, marginBottom: 12, backgroundColor: 'rgba(0,0,0,.16)' } });
