import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
export const Card: React.FC<React.PropsWithChildren<{ style?: ViewStyle }>> = ({ children, style }) => <View style={[styles.card, style]}>{children}</View>;
const styles = StyleSheet.create({ card: { backgroundColor: 'rgba(16,42,73,0.86)', borderColor: colors.line, borderWidth: 1, borderRadius: 24, padding: 18, shadowColor: '#000', shadowOpacity: 0.28, shadowRadius: 18, elevation: 5 } });
