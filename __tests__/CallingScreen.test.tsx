/**
 * @format
 * Tests for CallingScreen component
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

import CallingScreen from '../src/components/CallingScreen';

describe('CallingScreen Component', () => {
  const mockOnEndCall = jest.fn();
  const mockOnMuteToggle = jest.fn();
  const mockOnSpeakerToggle = jest.fn();
  const mockOnKeypadPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with calling status', async () => {
    let component;
    await ReactTestRenderer.act(async () => {
      component = ReactTestRenderer.create(
        <CallingScreen
          contactName="John Doe"
          contactNumber="+1 (555) 123-4567"
          callStatus="calling"
          onEndCall={mockOnEndCall}
          onMuteToggle={mockOnMuteToggle}
          onSpeakerToggle={mockOnSpeakerToggle}
          onKeypadPress={mockOnKeypadPress}
        />,
      );
    });
    expect(component).toBeTruthy();
  });

  test('renders correctly with connected status', async () => {
    let component;
    await ReactTestRenderer.act(async () => {
      component = ReactTestRenderer.create(
        <CallingScreen
          contactName="Jane Smith"
          contactNumber="+1 (555) 987-6543"
          callStatus="connected"
          callDuration={125}
          onEndCall={mockOnEndCall}
        />,
      );
    });
    expect(component).toBeTruthy();
  });

  test('renders correctly with ringing status', async () => {
    let component;
    await ReactTestRenderer.act(async () => {
      component = ReactTestRenderer.create(
        <CallingScreen
          contactName="Bob Wilson"
          contactNumber="+1 (555) 555-5555"
          callStatus="ringing"
          onEndCall={mockOnEndCall}
        />,
      );
    });
    expect(component).toBeTruthy();
  });
});
