import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import SmileLogo from '../../assets/smile_logo_small_2.svg';
import CheckBoxCheckedBig from '../../assets/checkbox_checked_big.svg';
import CheckBoxUncheckedBig from '../../assets/checkbox_unchecked_big.svg';
import CheckBoxChecked from '../../assets/checkbox_checked.svg';
import CheckBoxUnchecked from '../../assets/checkbox_unchecked.svg';
import ChevronRight from '../../assets/chevron_right.svg';
import { Spacer } from '@/shared/ui/Spacer';
import { CustomButton } from '@/shared/ui/CustomButton';
import { CustomSheet } from '@/shared/ui/CustomSheet';
import { useAuthStackNavigation } from '@/app/navigation/RootNavigation';
import { Divider } from '@/shared/ui/Divider';
import { agreementKeys, TermsAgreementTitle } from '@/features/terms/model/constants';
import { TermsContent } from '@/features/terms/content/TermsContent';
import { AgreementKeys, TermsAgreement } from '@/features/terms/model/types';

const TermsAgreementScreen = () => {
    const navigation = useAuthStackNavigation();
    const [isCheckboxesChecked, setIsCheckboxesChecked] = useState<TermsAgreement>({
        all: false,
        agreement1: false,
        agreement2: false,
        agreement3: false,
        agreement4: false,
        agreement5: false,
    });
    const [currentAgreementKey, setCurrentAgreementKey] = useState<AgreementKeys>('agreement1');
    const allCheckHandler = useCallback((checked: boolean) => {
        setIsCheckboxesChecked({
            all: checked,
            agreement1: checked,
            agreement2: checked,
            agreement3: checked,
            agreement4: checked,
            agreement5: checked,
        });
    }, []);
    const singleCheckHandler = useCallback((key: keyof TermsAgreement, checked: boolean) => {
        const newCheckboxes = {
            ...isCheckboxesChecked,
            [key]: checked,
        };
        const allChecked = Object.keys(newCheckboxes)
            .filter(k => k !== 'all')
            .every(k => newCheckboxes[k as keyof TermsAgreement]);
        setIsCheckboxesChecked({
            ...newCheckboxes,
            all: allChecked,
        });
    }, [isCheckboxesChecked]);
    const openBottomSheet = useCallback(() => setIsBottomSheetOpen(true), []);
    const closeBottomSheet = useCallback(() => setIsBottomSheetOpen(false), []);
    const handleBottomSheetClose = useCallback(() => {
        closeBottomSheet();
    }, [closeBottomSheet]);
    const toggleAgreement = useCallback((key: AgreementKeys) => {
        singleCheckHandler(key, !isCheckboxesChecked[key]);
    }, [isCheckboxesChecked, singleCheckHandler]);
    const singleCheckBoxTouchHandler = useCallback((key: AgreementKeys) => {
        setCurrentAgreementKey(key);
        if (isCheckboxesChecked[key]) {
            toggleAgreement(key);
        } else {
            openBottomSheet();
        }
    }, [isCheckboxesChecked, openBottomSheet, toggleAgreement]);
    const agreeButtonTouchHandler = useCallback(() => {
        toggleAgreement(currentAgreementKey);
        closeBottomSheet();
    }, [closeBottomSheet, currentAgreementKey, toggleAgreement]);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const isValid = useMemo(() => {
        return isCheckboxesChecked.all || (isCheckboxesChecked.agreement1
            && isCheckboxesChecked.agreement2
            && isCheckboxesChecked.agreement3
            && isCheckboxesChecked.agreement4);
    }, [isCheckboxesChecked.agreement1, isCheckboxesChecked.agreement2, isCheckboxesChecked.agreement3, isCheckboxesChecked.agreement4, isCheckboxesChecked.all]);
    const submitHandler = useCallback(() => {
        navigation.navigate('SignUpComplete');
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View>
                <SmileLogo />
                <Spacer size={20} />
                <Text style={styles.title}>{'원활한 서비스 이용을 위해\n약관에 동의해 주세요'}</Text>
                <Spacer size={38} />
                <View>
                    <TouchableOpacity
                        onPress={() => allCheckHandler(!isCheckboxesChecked.all)}
                        style={styles.allCheckBoxContainer}
                    >
                        {isCheckboxesChecked.all ? <CheckBoxCheckedBig /> : <CheckBoxUncheckedBig />}
                        <Text style={styles.allCheckBoxText}>{TermsAgreementTitle.all}</Text>
                    </TouchableOpacity>
                    <Divider />
                    <View style={styles.singleCheckBoxesContainer}>
                        {agreementKeys.map((key) => (
                            <TouchableOpacity
                                key={key}
                                onPress={() => singleCheckBoxTouchHandler(key)}
                                style={styles.singleCheckBoxContainer}
                            >
                                <View style={styles.singleCheckBoxSubcontainer}>
                                    {isCheckboxesChecked[key] ? <CheckBoxChecked /> : <CheckBoxUnchecked />}
                                    <Text style={styles.singleCheckBoxText}>{TermsAgreementTitle[key]}</Text>
                                </View>
                                <ChevronRight />
                            </TouchableOpacity>
                        ))}
                    </View>
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
            <CustomSheet isOpen={isBottomSheetOpen} onClose={handleBottomSheetClose} large>
                <View style={styles.sheetContainer}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.termsContent}>{TermsContent[currentAgreementKey]}</Text>
                    </ScrollView>
                    <CustomButton
                        title={'동의합니다'}
                        textColor={'#fff'}
                        backgroundColor={'#FB970C'}
                        clickHandler={agreeButtonTouchHandler} />
                </View>
            </CustomSheet>
        </View >
    );
};

export default TermsAgreementScreen;

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
    allCheckBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        marginBottom: 18,
    },
    allCheckBoxText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#423D36',
    },
    singleCheckBoxesContainer: {
        marginTop: 28,
        gap: 16,
    },
    singleCheckBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    singleCheckBoxSubcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    singleCheckBoxText: {
        color: '#423D36',
    },
    submitButtonContainer: {
        alignItems: 'center',
        paddingBottom: 16,
    },
    sheetContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
        marginBottom: 16,
    },
    termsContent: {
        color: '#968C7E',
    },
});
