import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  ballColor: string;
  scrollProgress: number;
  sceneStarted: boolean;
  onReady: () => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  ballColor,
  scrollProgress,
  sceneStarted,
  onReady,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  const scrollProgressRef = useRef(scrollProgress);
  scrollProgressRef.current = scrollProgress;

  const sceneStartedRef = useRef(sceneStarted);
  sceneStartedRef.current = sceneStarted;

  const mousePosRef = useRef({ x: 99, y: 99, isDown: false });

  // Track mouse coordinates
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mousePosRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const handleMouseDown = () => {
      mousePosRef.current.isDown = true;
    };
    const handleMouseUp = () => {
      mousePosRef.current.isDown = false;
    };
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosRef.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mousePosRef.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosRef.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mousePosRef.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Three.js Scene Setup & Loop
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const hemiLight = new THREE.HemisphereLight(0xffffff, new THREE.Color(ballColor), 1.6);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(-6, 10, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -8;
    keyLight.shadow.camera.right = 8;
    keyLight.shadow.camera.top = 8;
    keyLight.shadow.camera.bottom = -8;
    keyLight.shadow.bias = -0.0003;
    keyLight.shadow.radius = 12.0;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.25);
    rimLight.position.set(8, 7, -8);
    scene.add(rimLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.4);
    frontLight.position.set(0, 0, 11);
    scene.add(frontLight);

    const sideBounceLight = new THREE.DirectionalLight(0xffffff, 0.3);
    sideBounceLight.position.set(-9, -2, 4);
    scene.add(sideBounceLight);

    let viewportWidth = 10;
    let viewportHeight = 6;
    const updateFrustumBounds = () => {
      const fovRad = THREE.MathUtils.degToRad(camera.fov);
      viewportHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
      viewportWidth = viewportHeight * (container.clientWidth / container.clientHeight);
    };
    updateFrustumBounds();

    const isMobile = window.innerWidth < 768;
    const ballCount = isMobile ? 54 : 96;

    const getDynamicColors = (baseColor: string) => {
      const hex = baseColor.toLowerCase();
      if (hex === '#e1fc03') {
        return {
          pastel: new THREE.Color('#FBFFE2'),
          light: new THREE.Color('#EFFE69'),
          medium: new THREE.Color('#E1FC03'),
          deep: new THREE.Color('#B1E200'),
          glass: new THREE.Color('#DCFF32'),
        };
      } else if (hex === '#ffc5c2' || hex === '#ffa19e') {
        return {
          pastel: new THREE.Color('#FFF5F4'),
          light: new THREE.Color('#FFECEB'),
          medium: new THREE.Color('#FFA6B3'),
          deep: new THREE.Color('#FF4D6D'),
          glass: new THREE.Color('#FFA6B3'),
        };
      } else if (hex === '#96e5ff') {
        return {
          pastel: new THREE.Color('#F0F9FF'),
          light: new THREE.Color('#C9F1FF'),
          medium: new THREE.Color('#96E5FF'),
          deep: new THREE.Color('#2BA5FF'),
          glass: new THREE.Color('#98E4FF'),
        };
      } else if (hex === '#2f69ff') {
        return {
          pastel: new THREE.Color('#ECEFFF'),
          light: new THREE.Color('#A8C1FF'),
          medium: new THREE.Color('#2F69FF'),
          deep: new THREE.Color('#0A33BF'),
          glass: new THREE.Color('#4D80FF'),
        };
      }
      const c = new THREE.Color(baseColor);
      return {
        pastel: c.clone().offsetHSL(0, -0.15, 0.25),
        light: c.clone().offsetHSL(0, -0.05, 0.12),
        medium: c.clone(),
        deep: c.clone().offsetHSL(0.01, 0.1, -0.12),
        glass: c.clone(),
      };
    };

    const palHero = getDynamicColors(ballColor);
    const palLime = getDynamicColors('#E1FC03');
    const palPink = getDynamicColors('#FFC5C2');
    const ROLES = ['pastel', 'light', 'medium', 'deep', 'glass'] as const;
    type Role = (typeof ROLES)[number];

    const curPal: Record<Role, THREE.Color> = {
      pastel: new THREE.Color(),
      light: new THREE.Color(),
      medium: new THREE.Color(),
      deep: new THREE.Color(),
      glass: new THREE.Color(),
    };

    const sphereGeometry = new THREE.SphereGeometry(1, 48, 48);

    interface BallData {
      id: number;
      radius: number;
      mass: number;
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      meshGroup: THREE.Group;
      sphere: THREE.Mesh;
      material: THREE.MeshPhysicalMaterial;
      role: Role;
      isGlass: boolean;
      visualScale: number;
      shapeTarget: THREE.Vector3;
    }

    const balls: BallData[] = [];

    for (let i = 0; i < ballCount; i++) {
      let radius = 0.33;
      const rand = Math.random();
      if (rand < 0.3) radius = 0.27 + Math.random() * 0.12;
      else if (rand < 0.8) radius = 0.42 + Math.random() * 0.18;
      else radius = 0.66 + Math.random() * 0.21;

      const mass = Math.pow(radius, 3);
      let chosenColor = palHero.medium;
      let role: Role = 'medium';
      let sphereMat: THREE.MeshPhysicalMaterial;

      const isGlass = Math.random() < 0.22;

      if (isGlass) {
        sphereMat = new THREE.MeshPhysicalMaterial({
          color: palHero.glass,
          roughness: 0.08,
          metalness: 0.0,
          clearcoat: 1.0,
          clearcoatRoughness: 0.03,
          transmission: 0.95,
          ior: 1.485,
          thickness: 2.2,
          specularColor: new THREE.Color('#ffffff'),
          specularIntensity: 1.0,
          attenuationColor: palHero.pastel,
          attenuationDistance: 1.0,
          emissive: palHero.glass,
          emissiveIntensity: 0.12,
          transparent: true,
        });
        role = 'glass';
      } else {
        const colorRand = Math.random();
        if (colorRand < 0.25) {
          chosenColor = palHero.pastel;
          role = 'pastel';
        } else if (colorRand < 0.55) {
          chosenColor = palHero.light;
          role = 'light';
        } else if (colorRand < 0.85) {
          chosenColor = palHero.medium;
          role = 'medium';
        } else {
          chosenColor = palHero.deep;
          role = 'deep';
        }

        sphereMat = new THREE.MeshPhysicalMaterial({
          color: chosenColor,
          roughness: 0.44,
          metalness: 0.0,
          clearcoat: 0.24,
          clearcoatRoughness: 0.35,
          emissive: chosenColor,
          emissiveIntensity: 0.08,
          transparent: true,
        });
      }

      const group = new THREE.Group();
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMat);
      sphereMesh.scale.setScalar(radius);
      sphereMesh.castShadow = true;
      sphereMesh.receiveShadow = true;
      group.add(sphereMesh);
      scene.add(group);

      balls.push({
        id: i,
        radius,
        mass,
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(),
        meshGroup: group,
        sphere: sphereMesh,
        material: sphereMat,
        role,
        isGlass,
        visualScale: radius,
        shapeTarget: new THREE.Vector3(),
      });
    }

    const meanRadius = balls.reduce((sum, b) => sum + b.radius, 0) / balls.length;
    let shapeScale = 1;

    const inHeart = (x: number, y: number) => {
      const a = x * x + y * y - 1;
      return a * a * a - x * x * y * y * y <= 0;
    };

    const assignHeartTargets = () => {
      const S = Math.min(viewportWidth * 0.30, viewportHeight * 0.27);
      const baseCY = -viewportHeight * 0.03;
      shapeScale = Math.max(0.3, Math.min(1, (S * 0.45 / 2.3) / meanRadius));
      for (let i = 0; i < balls.length; i++) {
        let x = 0, y = 0, tries = 0;
        do {
          x = (Math.random() * 2 - 1) * 1.25;
          y = Math.random() * 2.55 - 1.4;
          tries++;
        } while (!inHeart(x, y) && tries < 60);
        balls[i].shapeTarget.set(x * S, (y + 0.12) * S + baseCY, (Math.random() - 0.5) * 0.35);
      }
    };
    assignHeartTargets();

    const DRUM_CENTER_Y = -0.22;
    const scatterFar = (withDrumSpinVelocity: boolean) => {
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        const a = (i / balls.length) * Math.PI * 2 + Math.random() * 0.5;
        const isOuterFloater = i < 10;
        const r = isOuterFloater ? (1.05 + Math.random() * 0.45) : (0.12 + Math.random() * 0.72);
        b.position.set(
          Math.cos(a) * r,
          DRUM_CENTER_Y + Math.sin(a) * r,
          (Math.random() - 0.5) * 0.35
        );
        b.meshGroup.position.copy(b.position);
        b.visualScale = b.radius * (isOuterFloater ? 0.42 : 0.32);
        b.sphere.scale.setScalar(b.visualScale);

        if (withDrumSpinVelocity) {
          const spinSpeed = 0.025 + Math.random() * 0.02;
          b.velocity.set(
            -Math.sin(a) * spinSpeed,
            Math.cos(a) * spinSpeed,
            (Math.random() - 0.5) * 0.01
          );
        } else {
          b.velocity.set(0, 0, 0);
        }
      }
    };
    scatterFar(false);

    const params = {
      rebound: -0.3,
      mouseRepelForce: 0.05,
      mouseRepelRadius: 4.4,
      bounciness: 0.02,
    };

    const mouseProjVec = new THREE.Vector3();
    const mouseWorld3D = new THREE.Vector3();
    const prevMouseWorld = new THREE.Vector3();
    let mouseSpeed = 0;

    const updateMouse3D = () => {
      const mouse = mousePosRef.current;
      mouseProjVec.set(mouse.x, mouse.y, 0.5);
      mouseProjVec.unproject(camera);
      const dir = mouseProjVec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mouseWorld3D.copy(camera.position).add(dir.multiplyScalar(distance));
    };

    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const smoothstep = (a: number, b: number, x: number) => {
      const t = clamp01((x - a) / (b - a));
      return t * t * (3 - 2 * t);
    };
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let animationFrameId = 0;
    const clock = new THREE.Clock();
    let localStarted = false;
    let reportedReady = false;
    let prevEruptF = 0;
    let isPaused = false;

    const diffVec = new THREE.Vector3();
    const collideDiff = new THREE.Vector3();
    const relVel = new THREE.Vector3();
    const deltaPos = new THREE.Vector3();
    const rotAxis = new THREE.Vector3();

    const checkResume = () => {
      if (isPaused && scrollProgressRef.current <= 3.8) {
        isPaused = false;
        clock.getDelta(); // Reset clock delta so physics don't jump after resuming
        animationFrameId = requestAnimationFrame(simulateAndRender);
      }
    };

    window.addEventListener('scroll', checkResume, { passive: true });
    window.addEventListener('wheel', checkResume, { passive: true });
    window.addEventListener('touchmove', checkResume, { passive: true });

    const simulateAndRender = () => {
      const progress = scrollProgressRef.current;

      // Complete pause when out of view (e.g. progress > 3.8 in footer)
      if (localStarted && progress > 3.8) {
        isPaused = true;
        // Do not request next frame; physics and WebGL rendering are completely halted
        return;
      }

      animationFrameId = requestAnimationFrame(simulateAndRender);

      const time = clock.getElapsedTime();
      clock.getDelta();
      updateMouse3D();

      const started = sceneStartedRef.current;
      if (started && !localStarted) {
        localStarted = true;
        scatterFar(true);
      }

      if (!localStarted) {
        renderer.render(scene, camera);
        if (!reportedReady) {
          reportedReady = true;
          onReadyRef.current();
        }
        return;
      }

      const drumF = 1 - smoothstep(0.03, 0.42, progress);
      const eruptF = smoothstep(0.03, 0.55, progress) * (1 - smoothstep(0.85, 1.25, progress));
      const eruptDelta = Math.max(0, eruptF - prevEruptF);
      prevEruptF = eruptF;

      const dropRaw = smoothstep(0.18, 0.90, progress);
      const flyF = smoothstep(2.7, 3.45, progress);
      const shapeF = smoothstep(1.40, 2.05, progress) * (1 - smoothstep(2.55, 3.0, progress));
      const dropF = dropRaw * (1 - smoothstep(1.25, 1.75, progress));

      // Scroll-driven palette morph: hero -> volt-lime -> rose-pink
      const bLime = smoothstep(0.55, 1.05, progress);
      const bPink = smoothstep(1.40, 1.95, progress);
      for (const role of ROLES) {
        curPal[role].copy(palHero[role]).lerp(palLime[role], bLime).lerp(palPink[role], bPink);
      }
      hemiLight.groundColor.copy(curPal.medium);

      const mouse = mousePosRef.current;
      const isMouseInteracting = Math.abs(mouse.x) < 0.99 || Math.abs(mouse.y) < 0.99;

      mouseSpeed = isMouseInteracting ? mouseWorld3D.distanceTo(prevMouseWorld) : 0;
      if (mouseSpeed > 3) mouseSpeed = 3;
      prevMouseWorld.copy(mouseWorld3D);

      let damping = 0.91;
      damping = lerp(damping, 0.99, dropF);
      damping = lerp(damping, 0.90, shapeF);
      damping = lerp(damping, 0.985, flyF);

      const camZ = camera.position.z;

      // 1. Forces
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        const isOuterFloater = i < 10;

        // In Hero, spin spheres inside drum
        if (drumF > 0.01) {
          const dx = b.position.x;
          const dy = b.position.y - DRUM_CENTER_Y;
          const distFromDrum = Math.sqrt(dx * dx + dy * dy) || 0.001;
          const targetDrumRad = isOuterFloater ? 1.25 : 0.58;

          const radialPull = (targetDrumRad - distFromDrum) * 0.032 * drumF;
          b.velocity.x += (dx / distFromDrum) * radialPull;
          b.velocity.y += (dy / distFromDrum) * radialPull;

          const swirl = (isOuterFloater ? 0.0022 : 0.0055) * drumF;
          b.velocity.x += (-dy / distFromDrum) * swirl;
          b.velocity.y += (dx / distFromDrum) * swirl;
          b.velocity.z += (0 - b.position.z) * 0.04 * drumF;
        }

        // On scroll, burst out of drum
        if (eruptDelta > 0.0001 || eruptF > 0.01) {
          const outAngle = b.id * 2.39996 + time * 0.6;
          const burstMag = eruptDelta * 1.45 + eruptF * 0.0085 * (1 - dropF * 0.6);
          b.velocity.x += Math.cos(outAngle) * burstMag * 1.35;
          b.velocity.y += (Math.sin(outAngle) * 0.65 + 0.25) * burstMag;
          b.velocity.z += Math.sin(b.id) * burstMag * 0.35;
        }

        if (dropF > 0.001) {
          b.velocity.y -= 0.0115 * dropF;
        }

        if (shapeF > 0.001) {
          const k = 0.06 * shapeF;
          b.velocity.x += (b.shapeTarget.x - b.position.x) * k;
          b.velocity.y += (b.shapeTarget.y - b.position.y) * k;
          b.velocity.z += (b.shapeTarget.z - b.position.z) * k;
        }

        if (flyF > 0.001) {
          const stagger = (b.id * 0.6180339887) % 1;
          const local = smoothstep(stagger * 0.55, stagger * 0.55 + 0.45, flyF);
          b.velocity.z += 0.05 * local;
          b.velocity.x += b.position.x * 0.006 * local;
          b.velocity.y += b.position.y * 0.006 * local;
        }

        if (isMouseInteracting) {
          diffVec.subVectors(b.position, mouseWorld3D);
          const rawDist = diffVec.length();
          const down = mouse.isDown;
          const activeRepelRadius = down ? params.mouseRepelRadius * 1.4 : params.mouseRepelRadius;
          const activeRepelForce = down ? params.mouseRepelForce * 1.7 : params.mouseRepelForce;
          if (rawDist < activeRepelRadius && rawDist > 0.0001) {
            const ratio = rawDist / activeRepelRadius;
            const smoothFactor = 1.0 - ratio * ratio * (3.0 - 2.0 * ratio);
            const speedBoost = 1 + mouseSpeed * 3.2;
            const push = smoothFactor * activeRepelForce * speedBoost;
            diffVec.normalize();
            diffVec.z *= 0.12;
            diffVec.normalize();
            b.velocity.addScaledVector(diffVec, push);
          }
        }

        b.velocity.multiplyScalar(damping);
        b.position.addScaledVector(b.velocity, 1);

        const c = b.isGlass ? curPal.glass : curPal[b.role];
        b.material.color.copy(c);
        b.material.emissive.copy(c);

        b.material.opacity =
          flyF > 0.001 ? 1 - smoothstep(camZ - 2.6, camZ - 0.3, b.position.z) : 1;

        const drumScaleFactor = isOuterFloater ? 0.45 : 0.32;
        const baseVis = b.radius * lerp(1.0, drumScaleFactor, drumF);
        const targetVis = baseVis * (1 - (1 - shapeScale) * shapeF);
        b.visualScale += (targetVis - b.visualScale) * 0.14;
        b.sphere.scale.setScalar(b.visualScale);
      }

      // 2. Collisions
      const collideScale = 0.28 * (1 - 0.65 * drumF) * (1 - 0.93 * shapeF) * (1 - flyF);
      const subSteps = 4;
      for (let step = 0; step < subSteps; step++) {
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            const b1 = balls[i];
            const b2 = balls[j];
            collideDiff.subVectors(b2.position, b1.position);
            const dist = collideDiff.length();
            const minDist = b1.visualScale + b2.visualScale;
            if (dist < minDist && dist > 0.001) {
              const overlap = minDist - dist;
              collideDiff.multiplyScalar(1 / dist);
              const totalMass = b1.mass + b2.mass;
              const ratio1 = b2.mass / totalMass;
              const ratio2 = b1.mass / totalMass;
              b1.position.addScaledVector(collideDiff, -overlap * ratio1 * collideScale);
              b2.position.addScaledVector(collideDiff, overlap * ratio2 * collideScale);

              relVel.subVectors(b2.velocity, b1.velocity);
              const velAlongNormal = relVel.dot(collideDiff);
              if (velAlongNormal < -0.0001) {
                const impulse =
                  (-(1 + params.bounciness) * velAlongNormal) / (1 / b1.mass + 1 / b2.mass);
                b1.velocity.addScaledVector(collideDiff, -impulse / b1.mass);
                b2.velocity.addScaledVector(collideDiff, impulse / b2.mass);
              }
            }
          }
        }
      }

      // 3. Viewport Boundaries
      const borderPad = 0.2;
      const xBound = viewportWidth / 2 - borderPad;
      const topY = viewportHeight / 2 - 0.05;
      const floorY = -viewportHeight / 2 + 0.05;
      const zBound = 2.0;
      const restitution = 0.30 + 0.35 * dropF;

      const contain = flyF < 0.5;
      const zContain = flyF < 0.02;

      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        const r = b.visualScale;

        if (contain) {
          if (b.position.x < -xBound - r) {
            b.position.x = -xBound - r;
            b.velocity.x *= params.rebound;
          } else if (b.position.x > xBound + r) {
            b.position.x = xBound + r;
            b.velocity.x *= params.rebound;
          }

          if (b.position.y - r < floorY) {
            b.position.y = floorY + r;
            if (b.velocity.y < 0) b.velocity.y = -b.velocity.y * restitution;
            if (dropF > 0.3) {
              b.velocity.x *= 0.86;
              b.velocity.z *= 0.86;
            }
          }
          if (b.position.y + r > topY) {
            b.position.y = topY - r;
            if (b.velocity.y > 0) b.velocity.y *= params.rebound;
          }
        }

        if (zContain) {
          if (b.position.z < -zBound) {
            b.position.z = -zBound;
            b.velocity.z *= params.rebound;
          } else if (b.position.z > zBound) {
            b.position.z = zBound;
            b.velocity.z *= params.rebound;
          }
        }

        deltaPos.copy(b.position).sub(b.meshGroup.position);
        if (deltaPos.lengthSq() > 0.000001) {
          rotAxis.set(deltaPos.y, -deltaPos.x, 0).normalize();
          const rotAngle = (deltaPos.length() / b.radius) * 0.95;
          b.meshGroup.rotateOnWorldAxis(rotAxis, rotAngle);
        }
        b.meshGroup.position.copy(b.position);
      }

      renderer.render(scene, camera);
      if (!reportedReady) {
        reportedReady = true;
        onReadyRef.current();
      }
    };

    simulateAndRender();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updateFrustumBounds();
      assignHeartTargets();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      window.removeEventListener('scroll', checkResume);
      window.removeEventListener('wheel', checkResume);
      window.removeEventListener('touchmove', checkResume);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      sphereGeometry.dispose();
      for (const b of balls) {
        b.material.dispose();
      }
      renderer.dispose();
    };
  }, [ballColor]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
};
