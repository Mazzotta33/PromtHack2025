// import { useRef, useEffect } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { useGLTF } from '@react-three/drei';
// import * as THREE from 'three';
//
// const ВИСЕМЫ = {
//     'А': 'mouthOpen', 'О': 'mouthOpen', 'У': 'mouthOpen',
//     'Е': 'mouthOpen', 'И': 'mouthOpen', 'Ы': 'mouthOpen',
//     'П': 'mouthOpen', 'Б': 'mouthOpen', 'М': 'mouthOpen'
// };
//
// const ЭМОЦИИ = {
//     neutral: {},
//     happy: { mouthSmile: 1 },
//     sad: { mouthOpen: 0.3 },
//     thinking: { mouthOpen: 0.2 }
// };
//
// export default function Avatar({ эмоция, текстРечи, говорит, setГоворит, ...props }: any) {
//     const { scene } = useGLTF('/models/AVATAR4.glb') as any;
//     const текущаяВисема = useRef<string | null>(null);
//     const сглаживание = 0.15;
//
//     // === НАХОДИМ MESH С МОРФАМИ (даже без isSkinnedMesh) ===
//     const всеМеши: THREE.Mesh[] = [];
//     scene.traverse((child) => {
//         if (child instanceof THREE.Mesh && child.morphTargetInfluences) {
//             всеМеши.push(child);
//         }
//     });
//
//     const голова = всеМеши.find(m =>
//         m.name.toLowerCase().includes('head') ||
//         m.name.includes('CC_Base_Body') ||
//         m.name.includes('Face')
//     ) as THREE.Mesh | undefined;
//
//     const зубы = всеМеши.find(m =>
//         m.name.toLowerCase().includes('teeth')
//     ) as THREE.Mesh | undefined;
//
//     // === ЛОГИРОВАНИЕ ===
//     useEffect(() => {
//         console.log('%cВСЕ MESH С МОРФАМИ:', 'color: magenta; font-weight: bold;');
//         всеМеши.forEach((m, i) => {
//             console.log(`  [${i}] ${m.name} → morphs: ${m.morphTargetInfluences.length}`);
//         });
//
//         if (голова) {
//             console.log('%cМОРФЫ ГОЛОВЫ:', 'color: lime; font-weight: bold;');
//             Object.keys(голова.morphTargetDictionary).forEach(key => {
//                 console.log(`  ${key} → index: ${голова.morphTargetDictionary[key]}`);
//             });
//         } else {
//             console.warn('ГОЛОВА НЕ НАЙДЕНА! Попробуй переэкспортировать модель.');
//         }
//     }, [scene]);
//
//     // === РЕЧЬ ===
//     useEffect(() => {
//         if (говорит && текстРечи) {
//             const utterance = new SpeechSynthesisUtterance(текстРечи);
//             utterance.lang = 'ru-RU';
//             utterance.rate = 0.9;
//             utterance.onboundary = (e) => {
//                 const буква = текстРечи[e.charIndex]?.toUpperCase();
//                 текущаяВисема.current = ВИСЕМЫ[буква as keyof typeof ВИСЕМЫ] || null;
//             };
//             utterance.onend = () => {
//                 текущаяВисема.current = null;
//                 setГоворит(false);
//             };
//             speechSynthesis.cancel();
//             speechSynthesis.speak(utterance);
//         }
//     }, [говорит, текстРечи, setГоворит]);
//
//     // === АНИМАЦИЯ ===
//     useFrame(() => {
//         if (!голова?.morphTargetInfluences) return;
//
//         const цели = { ...ЭМОЦИИ[эмоция as keyof typeof ЭМОЦИИ] };
//
//         if (текущаяВисема.current && голова.morphTargetDictionary[текущаяВисема.current]) {
//             const idx = голова.morphTargetDictionary[текущаяВисема.current];
//             голова.morphTargetInfluences[idx] = THREE.MathUtils.lerp(
//                 голова.morphTargetInfluences[idx], 1, сглаживание
//             );
//         } else {
//             Object.keys(голова.morphTargetDictionary).forEach(key => {
//                 if (key === 'mouthOpen' || key.startsWith('viseme_')) {
//                     const idx = голова.morphTargetDictionary[key];
//                     голова.morphTargetInfluences[idx] = THREE.MathUtils.lerp(
//                         голова.morphTargetInfluences[idx], 0, сглаживание
//                     );
//                 }
//             });
//         }
//
//         Object.entries(голова.morphTargetDictionary).forEach(([имя, idx]) => {
//             const цель = цели[имя as keyof typeof цели] ?? 0;
//             голова.morphTargetInfluences[idx] = THREE.MathUtils.lerp(
//                 голова.morphTargetInfluences[idx], цель, сглаживание
//             );
//         });
//     });
//
//     return (
//         <group {...props}>
//             <primitive object={scene} />
//             {всеМеши.map((mesh, i) => (
//                 <skinnedMesh
//                     key={i}
//                     geometry={mesh.geometry}
//                     material={mesh.material}
//                     skeleton={mesh.skeleton}
//                     morphTargetDictionary={mesh.morphTargetDictionary}
//                     morphTargetInfluences={mesh.morphTargetInfluences}
//                     position={mesh.position}
//                     rotation={mesh.rotation}
//                     scale={mesh.scale}
//                 />
//             ))}
//         </group>
//     );
// }
//
// useGLTF.preload('/models/AVATAR4.glb');