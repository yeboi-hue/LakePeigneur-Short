import React from 'react';
import type {ThreeElements} from '@react-three/fiber';
import * as THREE from 'three';

type PersonProps = Omit<ThreeElements['group'], 'scale'> & {shirt?: string; pants?: string; uniformScale?: number; pose?: 'standing'|'running'|'pointing'};
const ink = '#211725';

export const ToonPerson: React.FC<PersonProps> = ({shirt='#d78a43', pants='#344b70', uniformScale=1, pose='standing', ...props}) => {
  const armAngle = pose === 'running' ? -0.75 : pose === 'pointing' ? -1.25 : -0.18;
  return (
    <group scale={uniformScale} {...props}>
      {/* soft contact shadow */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.025,0]} scale={[0.42,0.24,1]}>
        <circleGeometry args={[1,32]}/><meshBasicMaterial color="#14232c" transparent opacity={0.28}/>
      </mesh>
      {/* legs */}
      <mesh position={[-0.13,0.48,0]} rotation={[0,0,pose==='running'?0.25:0]}>
        <capsuleGeometry args={[0.095,0.48,5,10]}/><meshStandardMaterial color={pants}/>
      </mesh>
      <mesh position={[0.13,0.48,0]} rotation={[0,0,pose==='running'?-0.28:0]}>
        <capsuleGeometry args={[0.095,0.48,5,10]}/><meshStandardMaterial color={pants}/>
      </mesh>
      {/* boots */}
      <mesh position={[-0.13,0.12,0.08]} scale={[1,0.55,1.4]}><sphereGeometry args={[0.13,16,12]}/><meshStandardMaterial color="#29252a"/></mesh>
      <mesh position={[0.13,0.12,0.08]} scale={[1,0.55,1.4]}><sphereGeometry args={[0.13,16,12]}/><meshStandardMaterial color="#29252a"/></mesh>
      {/* torso */}
      <mesh position={[0,1.05,0]}>
        <capsuleGeometry args={[0.28,0.45,8,16]}/><meshStandardMaterial color={shirt} roughness={0.86}/>
      </mesh>
      {/* arms */}
      <mesh position={[-0.34,1.13,0]} rotation={[0,0,0.4]}>
        <capsuleGeometry args={[0.075,0.45,5,10]}/><meshStandardMaterial color={shirt}/>
      </mesh>
      <mesh position={[0.34,1.12,0]} rotation={[0,0,armAngle]}>
        <capsuleGeometry args={[0.075,0.48,5,10]}/><meshStandardMaterial color={shirt}/>
      </mesh>
      {/* head, slightly tapered cartoon bean */}
      <mesh position={[0,1.73,0]} scale={[0.31,0.36,0.28]}>
        <sphereGeometry args={[1,24,18]}/><meshStandardMaterial color="#f2c9a4" roughness={0.95}/>
      </mesh>
      {/* hair cap */}
      <mesh position={[0,1.91,-0.015]} scale={[0.31,0.16,0.28]}>
        <sphereGeometry args={[1,20,12,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial color="#46302b"/>
      </mesh>
      {/* face marks */}
      <mesh position={[-0.105,1.77,0.246]}><sphereGeometry args={[0.027,8,8]}/><meshBasicMaterial color={ink}/></mesh>
      <mesh position={[0.105,1.77,0.246]}><sphereGeometry args={[0.027,8,8]}/><meshBasicMaterial color={ink}/></mesh>
      <mesh position={[0,1.62,0.265]} rotation={[0,0,Math.PI]}><torusGeometry args={[0.065,0.012,6,14,Math.PI]}/><meshBasicMaterial color="#6c3032"/></mesh>
    </group>
  );
};

export const InkOutline: React.FC<{children: React.ReactNode}> = ({children}) => <group>{children}</group>;
