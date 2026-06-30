import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GradientBackground } from '../components/GradientBackground';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
export const RoleSelectionScreen = ({ go }: { go: (s: any) => void }) => <GradientBackground><View style={styles.root}><BrandHeader compact /><Card style={{ gap: 14 }}><Text style={styles.h}>Choose your role</Text><Text style={styles.p}>Host creates the room. Guest joins with discovery or IP address.</Text><PrimaryButton title="Host — create LAN room" onPress={() => go('hostLobby')} /><PrimaryButton title="Guest — join room" variant="secondary" onPress={() => go('guestConnect')} /><PrimaryButton title="Settings" variant="secondary" onPress={() => go('settings')} /></Card></View></GradientBackground>;
const styles = StyleSheet.create({ root: { flex: 1, padding: 20, justifyContent: 'center' }, h: { color: colors.text, fontSize: 22, fontWeight: '800' }, p: { color: colors.muted, lineHeight: 22, marginBottom: 4 } });
