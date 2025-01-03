import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { CustomButton } from '@/shared/ui/CustomButton';
import { Picker } from '@react-native-picker/picker';

const schoolArray = ['부천중학교', '상도중학교', '성남초등학교'];

interface Props {
    submitHandler: (value: string | number) => void;
}

const SchoolNameInput = ({ submitHandler }: Props) => {
    const [selectedSchoolName, setSelectedSchoolName] = useState('');

    const clickHandler = useCallback(() => {
        submitHandler(selectedSchoolName);
    }, [selectedSchoolName, submitHandler]);

    const isValid = useCallback(() => {
        return selectedSchoolName !== '';
    }, [selectedSchoolName]);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{'학교 이름'}</Text>
                <Text style={styles.description}>{'학교 이름'}</Text>
            </View>
            <View style={styles.formContainer}>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedSchoolName}
                    onValueChange={(value) =>
                        setSelectedSchoolName(value)
                    }>
                    {schoolArray.map(value => (
                        <Picker.Item key={value} label={value} value={value} />
                    ))}
                </Picker>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    title={'확인'}
                    textColor={'#fff'}
                    backgroundColor={'#FB970C'}
                    disabled={!isValid}
                    clickHandler={clickHandler} />
            </View>
        </View>
    );
};

export default SchoolNameInput;

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
        flexShrink: 0,
        width: '80%',
    },
    buttonContainer: {
        marginBottom: 10,
    },
    picker: {

    },
});
