import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
export const BrandHeader = ({ compact = false }: { compact?: boolean }) => (
  <View style={styles.wrap}><View style={styles.logo}><Text style={styles.logoText}>LC</Text></View><Text style={[styles.title, compact && { fontSize: 24 }]}>LAN Call Private</Text><Text style={styles.tag}>Private calls. Local network. No cloud.</Text></View>
);
const styles = StyleSheet.create({ wrap: { alignItems: 'center', paddingTop: 26, paddingBottom: 16 }, logo: { width: 68, height: 68, borderRadius: 22, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.cyan }, logoText: { color: colors.cyan, fontWeight: '900', fontSize: 24 }, title: { color: colors.text, fontSize: 31, fontWeight: '800', marginTop: 14 }, tag: { color: colors.muted, marginTop: 6 } });
