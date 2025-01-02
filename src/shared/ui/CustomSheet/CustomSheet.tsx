import React, { useEffect, useCallback, useState, ReactNode } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const CUSTOM_SHEET_NORMAL_HEIGHT = SCREEN_HEIGHT * 0.5;
const CUSTOM_SHEET_LARGE_HEIGHT = SCREEN_HEIGHT * 0.82;

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    isHandleAvailable?: boolean;
    large?: boolean;
}

const CustomSheet = ({ isOpen, onClose, children, isHandleAvailable = false, large = false }: Props) => {
    const [isVisible, setIsVisible] = useState(isOpen);

    const openCustomSheet = useCallback(() => {
        setIsVisible(true);
    }, []);

    const closeCustomSheet = useCallback((shouldCallOnClose = false) => {
        setIsVisible(false);
        if (shouldCallOnClose && onClose) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            openCustomSheet();
        } else {
            closeCustomSheet();
        }
    }, [isOpen, openCustomSheet, closeCustomSheet]);

    const handleOverlayPress = useCallback(() => {
        closeCustomSheet(true);
    }, [closeCustomSheet]);

    if (!isVisible) {
        return null;
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleOverlayPress}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            <View style={[styles.customSheet, { height: large ? CUSTOM_SHEET_LARGE_HEIGHT : CUSTOM_SHEET_NORMAL_HEIGHT }]}>
                {isHandleAvailable && (
                    <View style={styles.draggableArea}>
                        <View style={styles.dragHandle} />
                    </View>
                )}
                <View style={styles.content}>{children}</View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'flex-end',
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    customSheet: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        overflow: 'hidden',
    },
    draggableArea: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dragHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 3,
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default CustomSheet;
