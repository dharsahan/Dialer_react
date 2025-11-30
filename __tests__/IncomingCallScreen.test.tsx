/**
 * @format
 * Tests for IncomingCallScreen component
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

// Mock dependencies before importing component
jest.mock('react-native-linear-gradient', () => {
  const MockReact = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(({ children, style, ...props }) =>
      MockReact.createElement(View, { style, ...props }, children),
    ),
  };
});

import IncomingCallScreen from '../src/components/IncomingCallScreen';

describe('IncomingCallScreen Component', () => {
  const mockOnAnswer = jest.fn();
  const mockOnDecline = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with caller info', async () => {
    let component;
    await ReactTestRenderer.act(async () => {
      component = ReactTestRenderer.create(
        <IncomingCallScreen
          callerName="John Doe"
          callerNumber="+1 (555) 123-4567"
          onAnswer={mockOnAnswer}
          onDecline={mockOnDecline}
        />,
      );
    });
    expect(component).toBeTruthy();
  });

  test('renders with different caller name', async () => {
    let component;
    await ReactTestRenderer.act(async () => {
      component = ReactTestRenderer.create(
        <IncomingCallScreen
          callerName="Jane Smith"
          callerNumber="+1 (555) 987-6543"
          onAnswer={mockOnAnswer}
          onDecline={mockOnDecline}
        />,
      );
    });
    expect(component).toBeTruthy();
  });
});
