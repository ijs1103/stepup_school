import React, { useState, useRef } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, ImageSourcePropType } from 'react-native';

interface Props {
    images: ImageSourcePropType[];
    height?: number;
}

const Carousel = ({ images, height = 200 }: Props) => {
    const scrollViewRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const { width } = Dimensions.get('window');

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = event.nativeEvent.contentOffset;
        const page = Math.round(contentOffset.x / width);
        setCurrentPage(page);
    };

    return (
        <View style={[styles.container, { height }]}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {images.map((image, index) => (
                    <View key={index} style={[styles.imageContainer, { width }]}>
                        <Image source={image} style={styles.image} />
                    </View>
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { backgroundColor: currentPage === index ? '#007AFF' : '#fff' },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    imageContainer: {
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
});

export default Carousel;
