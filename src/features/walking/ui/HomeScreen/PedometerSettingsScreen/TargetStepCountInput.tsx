import { CustomButton } from '@/shared/ui/CustomButton';
import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Props {
    initialStepCount: number;
    submitHandler: (value: number) => void;
}

const TargetStepCountInput = ({ initialStepCount, submitHandler }: Props) => {
    const [selectedStepCount, setSelectedStepCount] = useState(initialStepCount);

    const clickHandler = useCallback(() => {
        submitHandler(selectedStepCount);
    }, [selectedStepCount, submitHandler]);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{'걸음 목표 입력'}</Text>
                <Text style={styles.description}>{'목표로 하는 걸음수를 입력해 주세요'}</Text>
            </View>
            <View style={styles.formContainer}>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedStepCount}
                    onValueChange={(value) =>
                        setSelectedStepCount(value)
                    }>
                    {Array.from({ length: 11 }, (_, index) => 5000 + index * 1000).map((value) => {
                        return (<Picker.Item key={value} label={value.toString()} value={value.toLocaleString()} />);
                    })}
                </Picker>
                <Text style={styles.grade}>{'걸음'}</Text>
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

export default TargetStepCountInput;

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
        width: 150,
    },
    grade: {
        fontSize: 16,
        color: '#807986',
    },
    buttonContainer: {
        marginBottom: 10,
    },
});
