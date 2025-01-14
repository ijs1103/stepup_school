import { CustomButton } from '@/shared/ui/CustomButton';
import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableImage } from '@/shared/ui/TouchableImage';

interface Props {
    submitHandler: (value: string | number) => void;
}

const GenderInput = ({ submitHandler }: Props) => {
    const [selectedGender, setSelectedGender] = useState<'남성' | '여성' | undefined>(undefined);

    const clickHandler = useCallback(() => {
        if (selectedGender) {
            submitHandler(selectedGender);
        }
    }, [selectedGender, submitHandler]);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{'성별'}</Text>
                <Text style={styles.description}>{'칼로리 및 보폭 계산에 필요해요'}</Text>
            </View>
            <View style={styles.formContainer}>
                {selectedGender === '여성' ?
                    <View style={styles.genderContainer}><TouchableImage pressHandler={() => setSelectedGender(undefined)} source={require('../../../../../assets/female_selected.png')} /><Text style={styles.selectedText}>{'여성'}</Text></View>
                    : <View style={styles.genderContainer}><TouchableImage pressHandler={() => setSelectedGender('여성')} source={require('../../../../../assets/female_unselected.png')} /><Text style={styles.unselectedText}>{'여성'}</Text></View>}
                {selectedGender === '남성' ? <View style={styles.genderContainer}><TouchableImage pressHandler={() => setSelectedGender(undefined)} source={require('../../../../../assets/male_selected.png')} /><Text style={styles.selectedText}>{'남성'}</Text></View> : <View style={styles.genderContainer}><TouchableImage pressHandler={() => setSelectedGender('남성')} source={require('../../../../../assets/male_unselected.png')} /><Text style={styles.unselectedText}>{'남성'}</Text></View>}
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    title={'확인'}
                    textColor={'#fff'}
                    backgroundColor={'#FB970C'}
                    clickHandler={clickHandler}
                    disabled={!selectedGender}
                />
            </View>
        </View>
    );
};

export default GenderInput;

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
    genderContainer: {
        alignItems: 'center',
        gap: 6,
    },
    selectedText: {
        fontSize: 12,
        color: '#FB970C',
    },
    unselectedText: {
        fontSize: 12,
        color: '#979797',
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
        gap: 32,
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
