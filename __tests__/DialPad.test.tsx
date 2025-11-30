/**
 * @format
 * Tests for DialPad component
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

// Mock dependencies before importing component
jest.mock('react-native-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(({ children, style, ...props }) =>
      React.createElement(View, { style, ...props }, children),
    ),
  };
});

import DialPad from '../src/components/DialPad';

describe('DialPad Component', () => {
  const mockOnPress = jest.fn();
  const mockOnLongPressZero = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', async () => {
    let component;
    await ReactTestRenderer.act(async () => {
      component = ReactTestRenderer.create(
        <DialPad onPress={mockOnPress} onLongPressZero={mockOnLongPressZero} />,
      );
    });
    expect(component).toBeTruthy();
  });

  test('renders with default props', async () => {
    let component;
    await ReactTestRenderer.act(async () => {
      component = ReactTestRenderer.create(
        <DialPad onPress={mockOnPress} />,
      );
    });
    expect(component).toBeTruthy();
  });
});
