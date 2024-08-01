import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Gradient = ({
  colors,
  style,
  children,
  start = {x: 0, y: 0},
  end = {x: 1, y: 0},
  locations = colors.map((_, index) => index / colors.length),
}) => {
  return (
    <LinearGradient
      colors={colors}
      style={style}
      start={start}
      end={end}
      locations={locations}>
      {children}
    </LinearGradient>
  );
};

export default Gradient;
