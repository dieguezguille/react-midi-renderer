/// <reference path="./custom.d.ts" />

import React from "react";

interface MIDIProps {
  pitch?: string;
  duration?: string;
  velocity?: number;
  children?: React.ReactNode;
}

export const MIDISequence: React.FC<MIDIProps> = ({ children }) => (
  <midi-sequence>{children}</midi-sequence>
);

export const MIDINote: React.FC<MIDIProps> = ({
  pitch,
  duration,
  velocity,
}) => (
  <midi-note pitch={pitch} duration={duration} velocity={velocity}></midi-note>
);
