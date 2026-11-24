import React from 'react';
import * as THREE from 'three';
import {useVideoConfig} from 'remotion';
import {useCurrentFrame} from 'remotion';
import {beatProgress} from './story';
import {DrillingCrew, MineWorkers} from './cast';

const Water: React.FC<{frame:number; drained:number}> = ({frame,drained}) => {
  const rings = Array.from({length:8},(_,i)=>i);
  return (
    <group position={[0,0,0]}>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-0.15,0]} scale={[1,1,1]}>
        <circleGeometry args={[12,96]}/><meshStandardMaterial color="#287f9b" roughness={0.26} metalness={0.18}/>
      </mesh>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-0.11,0]}>
        <ringGeometry args={[5.2,12,96]}/><meshStandardMaterial color="#4ba6b4" roughness={0.3} transparent opacity={0.85}/>
      </mesh>
      {rings.map(i=><mesh key={i} rotation={[-Math.PI/2,0,0]} position={[0,-0.08+i*0.002,0]} scale={1+((frame*0.012+i*0.16)%1)*1.2}>
        <torusGeometry args={[1.1+i*0.24,0.025,6,72]}/><meshBasicMaterial color={i%2?'#b4e5dc':'#e0d9b3'} transparent opacity={0.13+drained*0.15}/>
      </mesh>)}
    </group>
  );
};

const Rig: React.FC<{tilt:number; y:number}> = ({tilt,y}) => (
  <group position={[0,y,0]} rotation={[0,0,tilt]}>
    <mesh position={[0,0.1,0]} scale={[2.2,0.24,1.5]}><boxGeometry/><meshStandardMaterial color="#b8793d" roughness={0.8}/></mesh>
    <mesh position={[0,1.8,0]}><cylinderGeometry args={[0.055,0.07,3.4,8]}/><meshStandardMaterial color="#4c4c50" metalness={0.55}/></mesh>
    {[-0.85,0.85].map(x=><mesh key={x} position={[x,1.75,0]} rotation={[0,0,x>0?-0.43:0.43]}><cylinderGeometry args={[0.045,0.06,3.2,8]}/><meshStandardMaterial color="#5a5551" metalness={0.4}/></mesh>)}
    {[-0.8,0.8].map(x=><mesh key={x} position={[x,3.1,0]}><boxGeometry args={[0.12,0.12,0.12]}/><meshStandardMaterial color="#f1b86b" emissive="#4b2108"/></mesh>)}
    <mesh position={[0,3.55,0]}><coneGeometry args={[0.18,0.35,6]}/><meshStandardMaterial color="#bd7540"/></mesh>
  </group>
);

const Barge: React.FC<{x:number; z:number; sink:number}> = ({x,z,sink}) => (
  <group position={[x,-sink,z]} rotation={[0,0,sink*0.07]}>
    <mesh position={[0,0,0]} scale={[2.7,0.25,1.1]}><boxGeometry/><meshStandardMaterial color="#9d4e3b" roughness={0.8}/></mesh>
    <mesh position={[0,0.48,0]}><boxGeometry args={[0.9,0.72,0.72]}/><meshStandardMaterial color="#e5c78a"/></mesh>
    <mesh position={[0,0.95,-0.1]}><cylinderGeometry args={[0.06,0.06,0.42,8]}/><meshStandardMaterial color="#393d42"/></mesh>
  </group>
);

const MineCutaway: React.FC<{progress:number}> = ({progress}) => (
  <group position={[0,-5.8,-1]}>
    <mesh scale={[10,2.5,6]}><boxGeometry/><meshStandardMaterial color="#55404b" roughness={1}/></mesh>
    <mesh position={[0,1.4,0]} scale={[9.5,0.25,5.5]}><boxGeometry/><meshStandardMaterial color="#c9b58a"/></mesh>
    {Array.from({length:5},(_,i)=><mesh key={i} position={[-6+i*3,0.2,0]} scale={[0.42,1.7,0.42]}><cylinderGeometry args={[0.5,0.5,1,12]}/><meshStandardMaterial color="#d4c9a7" roughness={1}/></mesh>)}
    <mesh position={[0,2.8,0]} scale={[0.32,3.1,0.32]}><cylinderGeometry args={[0.32,0.32,1,12]}/><meshStandardMaterial color="#76c4d4" transparent opacity={0.8}/></mesh>
    <MineWorkers visible={progress>0.1}/>
  </group>
);

export const LakeWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame/fps;
  const drain = beatProgress(frame,780,1500);
  const sink = beatProgress(frame,780,1280);
  const tilt = beatProgress(frame,510,880)*0.58;
  const rigY = -sink*2.1;
  const revealMine = beatProgress(frame,1120,1370);
  return (
    <group>
      <color attach="background" args={['#8db9c6']}/>
      <fog attach="fog" args={['#9bbec2',18,55]}/>
      <ambientLight intensity={0.72} color="#d7e5e8"/>
      <directionalLight position={[-8,14,7]} intensity={2.2} color="#ffd09a" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}/>
      <directionalLight position={[7,5,-8]} intensity={0.65} color="#879be0"/>
      {/* distant horizon and island */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-0.55,0]} scale={[1.1,1.1,1]}>
        <circleGeometry args={[18,96]}/><meshStandardMaterial color="#718b56" roughness={1}/>
      </mesh>
      <Water frame={frame} drained={drain}/>
      {/* tree clusters */}
      {Array.from({length:22},(_,i)=>{
        const a=i*Math.PI*2/22, r=13.4+(i%3)*0.7;
        return <group key={i} position={[Math.cos(a)*r,-0.1,Math.sin(a)*r]}>
          <mesh position={[0,0.9,0]}><cylinderGeometry args={[0.16,0.2,1.8,7]}/><meshStandardMaterial color="#77543b"/></mesh>
          <mesh position={[0,2,0]}><coneGeometry args={[0.85,2.2,7]}/><meshStandardMaterial color={i%3?'#477b4d':'#5e8e4f'}/></mesh>
        </group>;
      })}
      {/* island structures */}
      <group position={[-7,0.05,-5]}>
        <mesh position={[0,0.7,0]}><boxGeometry args={[3.5,1.4,2.4]}/><meshStandardMaterial color="#d2a66f"/></mesh>
        <mesh position={[0,1.65,0]}><coneGeometry args={[2.2,1.1,4]}/><meshStandardMaterial color="#8d4c3d"/></mesh>
      </group>
      {/* central drill site */}
      <group position={[0,0,0]}>
        <Rig tilt={tilt} y={rigY}/>
        <Barge x={-4.4+sink*3.7} z={1.1} sink={sink*2.6}/>
        <Barge x={4.8-sink*3.5} z={-1.6} sink={sink*2.2}/>
        <Barge x={-1.5+sink*1.1} z={4.3} sink={sink*2.9}/>
        <DrillingCrew visible={frame<1050} running={frame>510}/>
      </group>
      {/* vortex dark opening and spiralling water */}
      <group position={[0,-0.2,0]} scale={[0.35+drain*1.9,1,0.35+drain*1.9]}>
        <mesh rotation={[-Math.PI/2,0,0]} position={[0,-0.12,0]}>
          <circleGeometry args={[3.5,72]}/><meshBasicMaterial color="#142a36"/>
        </mesh>
        {Array.from({length:5},(_,i)=><mesh key={i} rotation={[-Math.PI/2,0,0]} position={[0,0.02+i*0.01,0]} scale={1+i*0.23+Math.sin(frame*0.035+i)*0.025}>
          <torusGeometry args={[1.2+i*0.26,0.06,8,80]}/><meshStandardMaterial color={i%2?'#c2e6df':'#62bdc2'} transparent opacity={0.75}/>
        </mesh>)}
      </group>
      <MineCutaway progress={revealMine}/>
      {/* water jets and mist */}
      {Array.from({length:18},(_,i)=>{
        const a=i*Math.PI*2/18, r=2.8+Math.sin(frame*0.025+i)*0.22;
        return <mesh key={i} position={[Math.cos(a)*r,0.25+Math.sin(frame*0.06+i)*0.25,Math.sin(a)*r]} scale={[0.08,0.35+drain*0.45,0.08]}>
          <sphereGeometry args={[1,8,8]}/><meshBasicMaterial color="#c8eee8" transparent opacity={0.45}/>
        </mesh>;
      })}
    </group>
  );
};
