/// <reference path="./custom.d.ts" />

import React from "react";

interface MIDITrackProps {
  children?: React.ReactNode;
}

interface MIDINoteProps {
  pitch: string;
  duration: string;
  velocity: number;
}

export const MIDITrack: React.FC<MIDITrackProps> = ({ children }) => (
  <midi-sequence>{children}</midi-sequence>
);

export const MIDINote: React.FC<MIDINoteProps> = ({
  pitch,
  duration,
  velocity,
}) => (
  <midi-note pitch={pitch} duration={duration} velocity={velocity}></midi-note>
);
