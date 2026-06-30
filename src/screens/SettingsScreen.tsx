import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GradientBackground } from '../components/GradientBackground';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
export const SettingsScreen = ({ go }: { go: (s: any) => void }) => <GradientBackground><View style={styles.root}><Text style={styles.title}>Settings</Text><Card><Text style={styles.h}>Privacy model</Text><Text style={styles.p}>No cloud backend is used for calls. Host and Guest exchange chat and WebRTC signaling over local TCP. LAN discovery uses UDP broadcast only on your network.</Text><Text style={styles.h}>Ports</Text><Text style={styles.p}>TCP signaling: 49494\nUDP discovery: 49495</Text><Text style={styles.h}>Build mode</Text><Text style={styles.p}>Requires Expo Dev Client / EAS APK because WebRTC and sockets are native modules.</Text></Card><PrimaryButton title="Back" variant="secondary" onPress={() => go('role')} style={{ marginTop: 16 }} /></View></GradientBackground>;
const styles = StyleSheet.create({ root: { flex: 1, padding: 20, paddingTop: 56 }, title: { color: colors.text, fontSize: 28, fontWeight: '900', marginBottom: 18 }, h: { color: colors.text, fontSize: 19, fontWeight: '800', marginTop: 10 }, p: { color: colors.muted, lineHeight: 22, marginTop: 8 } });
