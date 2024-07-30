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
import PretendardText from './PretendardText';
import LinearGradient from 'react-native-linear-gradient';
import Gradient from './Gradient';

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
              <PretendardText style={styles.guideText}>
                해당 위치에 XKIT를 가까이 대주세요.
              </PretendardText>
              <Image
                style={styles.tagImage}
                source={require('../assets/images/tag-image-phone.png')}
                resizeMode={'contain'}
              />
              {cancelLoading ? (
                <Gradient
                  colors={Colors.neonSlash}
                  style={{padding: 1, borderRadius: 100}}>
                  <View style={{...styles.cancelButton, paddingHorizontal: 98}}>
                    <ActivityIndicator size={29} color={Colors.white} />
                  </View>
                </Gradient>
              ) : (
                <Gradient
                  colors={Colors.neonSlash}
                  style={{padding: 1, borderRadius: 100}}>
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
                </Gradient>
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
    height: 500,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: 'space-around',
  },
  guideText: {
    fontSize: 18,
    color: Colors.white,
  },
  tagImage: {
    width: '100%',
    height: '40%',
  },
  cancelButton: {
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.9)',
    paddingVertical: 20,
    paddingHorizontal: 80,
  },
  cancelText: {
    color: Colors.white,
    fontSize: 24,
  },
});
