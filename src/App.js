import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, FlyControls } from '@react-three/drei';

const Box = ({ pos, rot, id, scale }) => {
    const ref = useRef();

    useFrame(({ clock }) => {
        const r = clock.getElapsedTime() / 2 - id;
        const x =
            Math.cos((clock.getElapsedTime() + pos[2]) / 24) * (1350 + pos[0]);
        const y =
            Math.sin((clock.getElapsedTime() + pos[1]) / 24) * (1350 + pos[1]);
        const z =
            Math.cos((clock.getElapsedTime() + pos[0]) / 24) * (1350 + pos[2]);
        ref.current.position.set(x, y, z);
        ref.current.rotation.set(r, r, r);
    });
    return (
        <mesh ref={ref} position={pos} rotation={rot} key={id}>
            <boxBufferGeometry args={[scale, scale, scale]} />
            <meshStandardMaterial color={'lightblue'} />
        </mesh>
    );
};

function Boxes({ count = 3000 }) {
    let positions = new Array(count).fill([]);
    for (let i = 0; i < count; i++) {
        const id = i;
        const x = -Math.floor(Math.random() * 720);
        const y = Math.floor(Math.random() * 720);
        const z = -Math.floor(Math.random() * 720);

        const rX = Math.random() * Math.PI;
        const rY = Math.random() * Math.PI;
        const rZ = Math.random() * Math.PI;

        const scale = Math.random() * 50 + 10;
        positions[i] = {
            id: id,
            pos: [x, y, z],
            rot: [rX, rY, rZ],
            scale: scale,
        };
    }
    return (
        <>
            {positions.map((i) => (
                <Box pos={i.pos} rot={i.rot} id={i.id} scale={i.scale} />
            ))}
        </>
    );
}

function App() {
    return (
        <Canvas camera={{ near: 0.1, far: 3000 }}>
            <FlyControls
                movementSpeed={1000}
                rollSpeed={Math.PI / 3}
                enableDamping={true}
            />
            <ambientLight intensity={0.1} />
            <pointLight position={[1, 1, 2]} intensity={0.5} />
            <Boxes />
        </Canvas>
    );
}

export default App;
