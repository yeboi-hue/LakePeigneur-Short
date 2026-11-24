import React from 'react';
import {ToonPerson} from './toon';

export const DrillingCrew: React.FC<{visible: boolean; running?: boolean}> = ({visible, running=false}) => {
  if (!visible) return null;
  return (
    <group>
      <ToonPerson position={[-1.2,0,1.3]} shirt="#d7a05a" pants="#34465d" pose={running?'running':'standing'} uniformScale={0.9}/>
      <ToonPerson position={[0,0,1.55]} shirt="#8eaa86" pants="#343f52" pose={running?'running':'pointing'} uniformScale={0.94}/>
      <ToonPerson position={[1.15,0,1.25]} shirt="#c36f4c" pants="#4b4b5a" pose={running?'running':'standing'} uniformScale={0.88}/>
    </group>
  );
};

export const MineWorkers: React.FC<{visible: boolean}> = ({visible}) => visible ? (
  <group>
    {Array.from({length:7},(_,i)=><ToonPerson key={i} position={[(i%4-1.5)*1.05,-0.2,Math.floor(i/4)*0.85]} uniformScale={0.58} shirt={i%2?'#c17b4b':'#d7b56b'} pants="#39485a" pose="running"/>)}
  </group>
) : null;
