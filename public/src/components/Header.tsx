/* eslint-disable */
import React from 'react'
import { StyleProp, StyleSheet, TextProps, TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'
import { TextRef } from 'react-native-paper/lib/typescript/components/Typography/Text'
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types'
import { ThemeProp } from 'react-native-paper/lib/typescript/types'

export default function Header(props: React.JSX.IntrinsicAttributes & TextProps & { variant?: VariantProp<never> | undefined; children: React.ReactNode; theme?: ThemeProp | undefined; style?: StyleProp<TextStyle> } & { ref?: React.RefObject<TextRef> | undefined }) {
    return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
    header: {
        fontSize: 21,
        color: theme.colors.primary,
        fontWeight: 'bold',
        paddingVertical: 12,
    },
})