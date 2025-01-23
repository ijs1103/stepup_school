import {TouchableOpacity} from 'react-native';
import React from 'react';
import WriteCommtentButtonSvg from '../../../../../assets/write_comment_button.svg';

interface Props {
  pressHandler: () => void;
  isValid: boolean;
}

const WriteCommentButton = ({pressHandler, isValid}: Props) => {
  return (
    <TouchableOpacity
      onPress={pressHandler}
      disabled={!isValid}
      style={{opacity: isValid ? 1 : 0.6}}>
      <WriteCommtentButtonSvg />
    </TouchableOpacity>
  );
};

export default WriteCommentButton;
