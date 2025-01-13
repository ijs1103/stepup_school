import { CustomButton } from '@/shared/ui/CustomButton';
import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Props {
    submitHandler: (value: string | number) => void;
}

const HeightInput = ({ submitHandler }: Props) => {
    const [selectedHeight, setSelectedHeight] = useState(120);

    const clickHandler = useCallback(() => {
        submitHandler(selectedHeight);
    }, [selectedHeight, submitHandler]);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{'신장'}</Text>
                <Text style={styles.description}>{'드래그해 신장 값을 입력해 주세요'}</Text>
            </View>
            <View style={styles.formContainer}>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedHeight}
                    onValueChange={(value) =>
                        setSelectedHeight(value)
                    }>
                    {Array.from({ length: 81 }, (_, index) => index + 120).map(number => (
                        <Picker.Item key={number} label={number.toString()} value={number} />
                    ))}
                </Picker>
                <Text style={styles.grade}>{'cm'}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    title={'확인'}
                    textColor={'#fff'}
                    backgroundColor={'#FB970C'}
                    clickHandler={clickHandler} />
            </View>
        </View>
    );
};

export default HeightInput;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 400,
        backgroundColor: '#fff',
        paddingTop: 53,
        paddingBottom: 28,
        paddingHorizontal: 39,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
        color: '#19181B',
    },
    description: {
        fontSize: 10,
        color: '#807986',
    },
    formContainer: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    picker: {
        width: 100,
    },
    grade: {
        fontSize: 16,
        color: '#807986',
    },
    buttonContainer: {
        marginBottom: 10,
    },
});
