import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
export const StatusPill = ({ status }: { status: string }) => <Text style={styles.pill}>● {status}</Text>;
const styles = StyleSheet.create({ pill: { alignSelf: 'flex-start', color: colors.green, backgroundColor: 'rgba(55,230,154,.12)', borderColor: 'rgba(55,230,154,.35)', borderWidth: 1, borderRadius: 99, paddingHorizontal: 12, paddingVertical: 7, overflow: 'hidden', fontWeight: '700' } });
