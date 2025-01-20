import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
    colors: string[];
    children: React.ReactNode;
}

const GradientBackgroundView = ({ colors, children }: Props) => {
    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            {children}
        </LinearGradient>
    );
};

export default GradientBackgroundView;
