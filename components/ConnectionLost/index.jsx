import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useTranslation} from "react-i18next";

const ConnectionLost = () => {
    const {t} = useTranslation()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('connection.lost.title')}</Text>
            <Text style={styles.body}>{t('connection.lost.body')}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    body: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default ConnectionLost;
