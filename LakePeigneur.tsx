import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {LakeWorld} from './world';
import {DURATION, FPS} from './story';

const narration = `A lake swallowed an oil rig, eleven barges, and around sixty-five acres of land. It started with a drill bit.

November twentieth, nineteen eighty: Lake Peigneur, Louisiana. The shallow freshwater lake looks calm, with trees along the shore and an oil platform drilling above it.

But below is a working salt mine, filled with huge chambers left behind by mining. A Texaco crew searches for oil when its drill suddenly gets stuck.

The platform tilts. The crew abandons it and races to shore. Then the lake begins to spin.

Water rushes toward one point as the lake bottom gives way into the mine. A giant whirlpool forms. A tugboat, barges, and the drilling platform are pulled toward it. Trees and shoreline disappear too.

You see, the mine contained enormous empty spaces. Once water broke through, it flooded the chambers, washing away salt and earth and spreading the collapse.

Imagine pulling the plug on a bathtub—except the bathtub is an entire lake.

Fifty miners escaped, and all seven rig workers got away. No one died, but the mine was destroyed.

Then the twist: water from the nearby Delcambre Canal reversed direction and flowed back into the lake. The lake began filling again.

One drilling accident turned a shallow freshwater lake into a deep, saltwater one.`;

const Overlay: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const fade = interpolate(frame,[0,14,DURATION-18,DURATION-1],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const push = interpolate(frame,[0,DURATION],[1,1.025]);
  return (
    <AbsoluteFill style={{pointerEvents:'none',opacity:fade,transform:`scale(${push})`}}>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(8,18,30,.16),transparent 28%,transparent 68%,rgba(8,18,30,.28))'}}/>
      <div style={{position:'absolute',left:0,right:0,bottom:0,height:300,background:'linear-gradient(0deg,rgba(8,18,30,.22),transparent)'}}/>
    </AbsoluteFill>
  );
};

export const LakePeigneur: React.FC = () => {
  const frame = useCurrentFrame();
  const {width,height} = useVideoConfig();
  const t = frame/FPS;
  const camX = interpolate(t,[0,9,17,27,39,50,60],[-10,-5,0,1.8,0,-4,0]);
  const camY = interpolate(t,[0,9,17,27,39,50,60],[7,6.4,7.5,8,5.2,8,6.5]);
  const camZ = interpolate(t,[0,9,17,27,39,50,60],[23,19,18,17,14,22,19]);
  const lookY = interpolate(t,[0,18,32,43,60],[0.8,0.5,-1.2,-3.5,-0.1]);
  const fov = interpolate(t,[0,8,18,28,40,60],[40,38,43,50,55,40]);
  return (
    <AbsoluteFill style={{backgroundColor:'#101f2c'}}>
      <ThreeCanvas width={width} height={height}>
        <LakeWorld/>
        <CameraRig x={camX} y={camY} z={camZ} lookY={lookY} fov={fov}/>
      </ThreeCanvas>
      <Overlay/>
      <Audio src={staticFile('narration.mp3')} volume={1}/>
    </AbsoluteFill>
  );
};

const CameraRig: React.FC<{x:number;y:number;z:number;lookY:number;fov:number}> = ({x,y,z,lookY,fov}) => {
  const {camera} = useThree();
  camera.position.set(x,y,z);
  camera.lookAt(0,lookY,0);
  if (camera instanceof THREE.PerspectiveCamera) {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }
  return null;
};

export {narration};
