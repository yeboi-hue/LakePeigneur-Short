import React from 'react';
import {Composition} from 'remotion';
import {LakePeigneur} from './LakePeigneur';
import {DURATION, FPS, HEIGHT, WIDTH} from './story';

export const Root: React.FC = () => (
  <Composition
    id="LakePeigneur"
    component={LakePeigneur}
    durationInFrames={DURATION}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
