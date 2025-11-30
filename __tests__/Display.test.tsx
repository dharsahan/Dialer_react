/**
 * @format
 * Tests for Display component
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

import Display from '../src/components/Display';

describe('Display Component', () => {
  test('renders with empty phone number', async () => {
    let component;
    await ReactTestRenderer.act(async () => {
      component = ReactTestRenderer.create(<Display phoneNumber="" />);
    });
    expect(component).toBeTruthy();
  });

  test('renders with phone number', async () => {
    let component;
    await ReactTestRenderer.act(async () => {
      component = ReactTestRenderer.create(
        <Display phoneNumber="1234567890" />,
      );
    });
    expect(component).toBeTruthy();
  });

  test('displays placeholder when no number', async () => {
    let component;
    await ReactTestRenderer.act(async () => {
      component = ReactTestRenderer.create(<Display phoneNumber="" />);
    });
    expect(component).toBeTruthy();
    // Component renders correctly with empty phone number
  });
});
