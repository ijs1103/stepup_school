import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MagicStick from '../../assets/magic_stick.svg';
import { CustomButton } from '@/shared/ui/CustomButton';
import { useUserSignupStore, SchoolInfo } from '@/entities/user/model/stores';
import { useAuthStackNavigation } from '@/app/navigation/RootNavigation';
import { Spacer } from '@/shared/ui/Spacer';
import InfoInputButton from '@/shared/ui/InfoInputButton/InfoInputButton';
import SchoolNameInput from '@/features/auth/ui/SchoolInfoScreen/SchoolNameInput';
import { CustomSheet } from '@/shared/ui/CustomSheet';
import SchoolGradeInput from '@/features/auth/ui/SchoolInfoScreen/SchoolGradeInput';
import SchoolClassInput from '@/features/auth/ui/SchoolInfoScreen/SchoolClassInput';
import { useRegisteredSchools } from '@/features/schoolInfo/model/useRegisteredSchools';
import { ClassInfoResponse, useClassInfo } from '@/features/schoolInfo/model/useClassInfo';

export interface OptionalSchoolInfo {
    name: string | undefined;
    grade: number | undefined;
    class: number | undefined;
}

const SchoolInfoScreen = () => {
    const navigation = useAuthStackNavigation();
    const { setSchoolInfo: setSchool } = useUserSignupStore();
    const [currentInfo, setCurrentInfo] = useState<keyof SchoolInfo>('name');
    const [schoolInfo, setSchoolInfo] = useState<OptionalSchoolInfo>({ name: undefined, grade: undefined, class: undefined });
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const { data: schoolNameList } = useRegisteredSchools();
    const { data: classInfo } = useClassInfo(schoolInfo.name);

    const isValid = useMemo(() => {
        return Object.values(schoolInfo).every(value => value !== undefined);
    }, [schoolInfo]);
    const submitHandler = useCallback(() => {
        setSchool(schoolInfo);
        navigation.navigate('BodyInfo');
    }, [setSchool, navigation, schoolInfo]);
    const openBottomSheet = useCallback(() => setIsBottomSheetOpen(true), []);
    const closeBottomSheet = useCallback(() => setIsBottomSheetOpen(false), []);
    const pressHandler = useCallback(async (info: keyof SchoolInfo) => {
        setCurrentInfo(info);
        // 학교를 누르면 학년,학급 초기화
        if (info === 'name') {
            setSchoolInfo(prev => ({ ...prev, grade: undefined, class: undefined }));
        }
        // 학년을 누르면 학급 초기화
        if (info === 'grade') {
            setSchoolInfo(prev => ({ ...prev, class: undefined }));
        }
        openBottomSheet();
    }, [openBottomSheet]);
    const resetShoolInfo = useCallback(() => {
        setSchoolInfo(prev => ({ ...prev, [currentInfo]: undefined }));
    }, [currentInfo]);
    const handleBottomSheetClose = useCallback(() => {
        resetShoolInfo();
        closeBottomSheet();
    }, [closeBottomSheet, resetShoolInfo]);
    const bottomSheetSubmitHandler = useCallback((value: string | number) => {
        setSchoolInfo(prev => ({ ...prev, [currentInfo]: value }));
        closeBottomSheet();
    }, [currentInfo, closeBottomSheet]);
    const numberOfClasses = useMemo(() => {
        return classInfo && schoolInfo.grade ? classInfo[schoolInfo.grade as keyof ClassInfoResponse] ?? 15 : 15;
    }, [classInfo, schoolInfo.grade]);

    return (
        <View style={styles.container}>
            <View>
                <MagicStick />
                <Spacer size={20} />
                <Text style={styles.title}>{'함께 운동하기 위해\n학교 정보를 입력해 주세요'}</Text>
                <Spacer size={3} />
                <Text style={styles.subTitle}>{'학교 정보를 정확하게 입력해 주세요'}</Text>
                <Spacer size={38} />
                <View style={styles.infoInputButtonContainer}>
                    <InfoInputButton title={'학교 이름'} info={schoolInfo.name} pressHandler={() => pressHandler('name')} />
                    <InfoInputButton title={'학년'} info={schoolInfo.grade} pressHandler={() => pressHandler('grade')} />
                    <InfoInputButton title={'학급'} info={schoolInfo.class} pressHandler={() => pressHandler('class')} />
                </View>
            </View>
            <View style={styles.submitButtonContainer}>
                <CustomButton
                    title={'다음'}
                    textColor={'#fff'}
                    backgroundColor={'#FB970C'}
                    disabled={!isValid}
                    clickHandler={submitHandler} />
            </View>
            <CustomSheet isOpen={isBottomSheetOpen} onClose={handleBottomSheetClose}>
                {currentInfo === 'name' && <SchoolNameInput data={schoolNameList} submitHandler={bottomSheetSubmitHandler} />}
                {currentInfo === 'grade' && <SchoolGradeInput data={classInfo} submitHandler={bottomSheetSubmitHandler} />}
                {currentInfo === 'class' && <SchoolClassInput maxNumber={numberOfClasses} submitHandler={bottomSheetSubmitHandler} />}
            </CustomSheet>
        </View>
    );
};

export default SchoolInfoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingHorizontal: 34,
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
        color: '#19181B',
        lineHeight: 24,
    },
    subTitle: {
        fontSize: 12,
        color: '#19181B',
    },
    infoInputButtonContainer: {
        gap: 10,
    },
    submitButtonContainer: {
        alignItems: 'center',
        paddingBottom: 16,
    },
});
