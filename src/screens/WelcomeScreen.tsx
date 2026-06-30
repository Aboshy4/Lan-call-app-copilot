import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GradientBackground } from '../components/GradientBackground';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
export const WelcomeScreen = ({ go }: { go: (s: any) => void }) => <GradientBackground><View style={styles.root}><BrandHeader /><Card><Text style={styles.h}>Local-first private calling</Text><Text style={styles.p}>Create a temporary LAN room between two Android phones. Signaling stays inside your Wi‑Fi network.</Text><PrimaryButton title="Get started" onPress={() => go('role')} style={{ marginTop: 18 }} /></Card></View></GradientBackground>;
const styles = StyleSheet.create({ root: { flex: 1, padding: 20, justifyContent: 'center' }, h: { color: colors.text, fontSize: 22, fontWeight: '800' }, p: { color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: 10 } });
