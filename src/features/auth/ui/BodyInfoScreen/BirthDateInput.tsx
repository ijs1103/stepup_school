import { CustomButton } from '@/shared/ui/CustomButton';
import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Props {
    submitHandler: (value: string | number) => void;
}

interface BirthDate {
    year: string;
    month: string;
    day: string;
}

const BirthDateInput = ({ submitHandler }: Props) => {
    const [selectedBirthDate, setSelectedBirthDate] = useState<BirthDate>({ year: '2019', month: '01', day: '01' });

    const clickHandler = useCallback(() => {
        submitHandler(`${selectedBirthDate.year}${selectedBirthDate.month}${selectedBirthDate.day}`);
    }, [selectedBirthDate, submitHandler]);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{'생년월일'}</Text>
                <Text style={styles.description}>{'생년월일을 정확히 입력해 주세요'}</Text>
            </View>
            <View style={styles.formContainer}>
                <Picker
                    style={styles.yearPicker}
                    selectedValue={selectedBirthDate.year}
                    onValueChange={(value) =>
                        setSelectedBirthDate(prev => ({ ...prev, year: value }))
                    }>
                    {Array.from({ length: 13 }, (_, index) => 2019 - index).map(year => (
                        <Picker.Item key={year.toString()} label={year.toString()} value={year.toString()} />
                    ))}
                </Picker>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedBirthDate.month}
                    onValueChange={(value) =>
                        setSelectedBirthDate(prev => ({ ...prev, month: value }))
                    }>
                    {Array.from({ length: 12 }, (_, index) => index + 1).map(number => (
                        <Picker.Item
                            key={number.toString().padStart(2, '0')}
                            label={number.toString().padStart(2, '0')}
                            value={number.toString().padStart(2, '0')}
                        />
                    ))}
                </Picker>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedBirthDate.day}
                    onValueChange={(value) =>
                        setSelectedBirthDate(prev => ({ ...prev, day: value }))
                    }>
                    {Array.from({ length: 31 }, (_, index) => index + 1).map(number => (
                        <Picker.Item
                            key={number.toString().padStart(2, '0')}
                            label={number.toString().padStart(2, '0')}
                            value={number.toString().padStart(2, '0')}
                        />
                    ))}
                </Picker>
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

export default BirthDateInput;

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
        fontWeight: '500',
        color: '#19181B',
    },
    description: {
        fontSize: 10,
        color: '#807986',
    },
    formContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    yearPicker: {
        width: 150,
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
