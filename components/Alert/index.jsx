import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { AlertContext } from '../../context/AlertContext';
import {useTranslation} from "react-i18next";

const Alert = () => {
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useContext(AlertContext);
    const {t} = useTranslation();

    const { message, type } = alert;

    useEffect(() => {
        if (message && message?.length > 0) {
            setShow(true);
            setTimeout(() => {
                setShow(false);
                setAlert({});
            }, 3000);
        }
    }, [message]);

    if (!show) return null;

    return (
        <View style={styles.alertWrapper}>
            <Animated.View style={[styles.styledAlert, { backgroundColor: getAlertColor(type) }]}>
                <Text style={styles.alertText}>{t(message)}</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    alertWrapper: {
        position: 'absolute',
        top: 20,
        left: 0,
        width: '100%',
        zIndex: 1000000000,
        alignItems: 'center',
    },
    styledAlert: {
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: '50%',
    },
    alertText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
});

const getAlertColor = (type) => {
    switch (type) {
        case 'error':
            return '#f24949';
        case 'success':
            return '#45E655';
        default:
            return '#3361FF';
    }
};

export default Alert;
