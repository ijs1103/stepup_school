import { CustomButton } from '@/shared/ui/CustomButton';
import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ClassInfoResponse } from '@/features/schoolInfo/model/useClassInfo';

interface Props {
    data: ClassInfoResponse | undefined;
    submitHandler: (value: string | number) => void;
}

const SchoolGradeInput = ({ data, submitHandler }: Props) => {
    const gradeList = useMemo(() => {
        if (data) {
            return Object.keys(data).map(key => parseInt(key, 10)).sort((a, b) => a - b);
        } else {
            return [1, 2, 3, 4, 5, 6];
        }
    }, [data]);
    const [selectedGrade, setSelectedGrade] = useState(1);

    const clickHandler = useCallback(() => {
        submitHandler(selectedGrade);
    }, [selectedGrade, submitHandler]);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{'학년 입력'}</Text>
                <Text style={styles.description}>{'학년 정보를 입력해 주세요'}</Text>
            </View>
            <View style={styles.formContainer}>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedGrade}
                    onValueChange={(value) =>
                        setSelectedGrade(value)
                    }>
                    {gradeList.map((value) => {
                        return (<Picker.Item key={value} label={value.toString()} value={value} />);
                    })}
                </Picker>
                <Text style={styles.grade}>{'학년'}</Text>
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

export default SchoolGradeInput;

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
        width: 80,
    },
    grade: {
        fontSize: 16,
        color: '#807986',
    },
    buttonContainer: {
        marginBottom: 10,
    },
});
