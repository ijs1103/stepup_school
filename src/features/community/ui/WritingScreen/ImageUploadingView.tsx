import {StyleSheet, View, FlatList, Text} from 'react-native';
import React from 'react';
import {ImageUploadingListHeader} from './ImageUploadingListHeader';
import {ImageUploadingItem} from './ImageUploadingItem';
import {Spacer} from '@/shared/ui/Spacer';

interface Props {
  label: string;
  imageUrls: string[];
  imageCloseHandler: (url: string) => void;
  openImagePicker: () => void;
}

export const ImageUploadingView = ({
  label,
  imageUrls,
  imageCloseHandler,
  openImagePicker,
}: Props) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <FlatList
        data={imageUrls}
        renderItem={({item}) => (
          <ImageUploadingItem
            imageUrl={item}
            imageCloseHandler={() => imageCloseHandler(item)}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
        ListHeaderComponent={
          <ImageUploadingListHeader pressHandler={openImagePicker} />
        }
        ItemSeparatorComponent={() => <Spacer size={16} horizontal />}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
