import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
export const GradientBackground: React.FC<React.PropsWithChildren> = ({ children }) => (
  <LinearGradient colors={[colors.bg, '#091A33', '#120D2B']} style={styles.root}>{children}</LinearGradient>
);
const styles = StyleSheet.create({ root: { flex: 1 } });
