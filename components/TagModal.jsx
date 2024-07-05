import React, {useState} from 'react';

import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ModalComponent from './ModalComponent';
import {useTagModal} from '../context/TagModalContext';
import {BlurView} from '@react-native-community/blur';
import {Colors} from '../Colors';
import {shutdownNfc} from '../plugins/nfc';

const TagModal = () => {
  const {tagModalVisible, closeTagModal} = useTagModal();
  const [cancelLoading, setCancelLoading] = useState(false);

  return (
    <ModalComponent modalVisible={tagModalVisible}>
      <View style={styles.container}>
        <BlurView blurAmount={32} blurRadius={10}>
          <ImageBackground
            source={require('../assets/images/tag-background.png')}
            borderRadius={15}
            blurRadius={2000}>
            <View style={styles.innerContainer}>
              <Image
                style={styles.tagImage}
                source={require('../assets/images/tag-image.png')}
                resizeMode={'cover'}
              />
              {cancelLoading ? (
                <View style={{...styles.cancelButton, paddingHorizontal: 98}}>
                  <ActivityIndicator size={29} color={Colors.white} />
                </View>
              ) : (
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => {
                    setCancelLoading(true);
                    shutdownNfc().then(() => {
                      closeTagModal();
                      setCancelLoading(false);
                    });
                  }}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
              )}
            </View>
          </ImageBackground>
        </BlurView>
      </View>
    </ModalComponent>
  );
};

export default TagModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 35,
    alignItems: 'center',
    width: 320,
    height: 420,
  },
  tagImage: {
    width: '100%',
    height: '70%',
  },
  cancelButton: {
    marginTop: 30,
    borderRadius: 50,
    borderColor: '#895A32',
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 80,
  },
  cancelText: {
    color: Colors.white,
    fontSize: 24,
  },
});
