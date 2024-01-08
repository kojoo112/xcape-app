import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

const ImageView = props => {
  const [ratio, setRatio] = useState(0);

  Image.getSize(
    props.url,
    (width, height) => {
      setRatio(width / height);
    },
    error => console.error(error),
  );

  return (
    <View>
      <Image
        style={{
          ...styles.image,
          aspectRatio: ratio,
        }}
        resizeMode={'cover'}
        source={{uri: props.url}}
      />
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  image: {width: '100%', height: undefined},
});
