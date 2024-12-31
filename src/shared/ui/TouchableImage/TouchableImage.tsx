import React from 'react';
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

interface Props {
    pressHandler: () => void;
    source: ImageSourcePropType;
}

const TouchableImage = ({ pressHandler, source }: Props) => {
    return (
        <TouchableOpacity onPress={pressHandler}>
            <Image source={source} />
        </TouchableOpacity>
    );
};

export default TouchableImage;
