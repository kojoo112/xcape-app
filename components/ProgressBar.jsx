import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Circle} from 'react-native-svg';
import Progress from './Progress';
import {Colors} from '../Colors';
import {useRecoilValue} from 'recoil';
import {currentThemeState} from '../atoms';

const ProgressBar = () => {
  const currentTheme = useRecoilValue(currentThemeState);
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={300}
        width={40}
        fill={currentTheme?.progress || 0}
        tintColor={'#fef104'}
        backgroundColor={'#323232'}
        rotation={210}
        duration={500}
        lineCap={'round'}
        arcSweepAngle={300}
        renderCap={({center}) => (
          <Circle cx={center.x} cy={center.y} r={'10'} fill={Colors.black} />
        )}>
        {fill =>
          fill > 0 ? (
            <Progress>
              <Text style={styles.progress}>{Math.round(fill)}%</Text>
            </Progress>
          ) : (
            <Progress />
          )
        }
      </AnimatedCircularProgress>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    color: Colors.primary,
    fontSize: 48,
    paddingVertical: 12,
    fontWeight: 'bold',
  },
});
