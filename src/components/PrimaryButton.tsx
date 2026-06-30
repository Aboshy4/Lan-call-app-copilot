import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
export const PrimaryButton = ({ title, onPress, variant = 'primary', style, disabled }: { title: string; onPress: () => void; variant?: 'primary' | 'secondary' | 'danger'; style?: ViewStyle; disabled?: boolean }) => {
  const gradient = variant === 'danger' ? [colors.red, '#C83368'] : variant === 'secondary' ? [colors.card2, colors.card] : [colors.cyan, colors.purple];
  return <TouchableOpacity disabled={disabled} onPress={onPress} style={[{ opacity: disabled ? 0.55 : 1 }, style]}><LinearGradient colors={gradient as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.btn}><Text style={styles.text}>{title}</Text></LinearGradient></TouchableOpacity>;
};
const styles = StyleSheet.create({ btn: { borderRadius: 18, paddingVertical: 15, paddingHorizontal: 18, alignItems: 'center' }, text: { color: '#fff', fontWeight: '800', fontSize: 16 } });
