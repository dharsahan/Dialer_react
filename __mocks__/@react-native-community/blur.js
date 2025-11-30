import React from 'react';
import { View } from 'react-native';

const BlurView = ({ children, style, ...props }) => {
  return React.createElement(View, { style, ...props }, children);
};

export { BlurView };
export default BlurView;
