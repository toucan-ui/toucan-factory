'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

const ANIMATIONS = [
  '/animations/01.mp4',
  '/animations/02.mp4',
  '/animations/03.mp4',
  '/animations/04.mp4',
  '/animations/05.mp4',
  '/animations/06.mp4',
  '/animations/07.mp4',
  '/animations/08.mp4',
  '/animations/09.mp4',
];

const HOLD_DURATION = 15000;
const FADE_DURATION = 600;

export function AnimatedLogo() {
  const [videoReady, setVideoReady] = useState(false);
  const [index, setIndex] = useState(0);
  const nextIndex = (index + 1) % ANIMATIONS.length;

  const [front, setFront] = useState<'a' | 'b'>('a');
  const [incoming, setIncoming] = useState(false);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const frontRef = front === 'a' ? videoARef : videoBRef;
  const backRef = front === 'a' ? videoBRef : videoARef;

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const runCycle = useCallback(() => {
    const video = frontRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.pause();

    const playTimer = setTimeout(() => {
      video.play();
    }, HOLD_DURATION);
    timers.current.push(playTimer);
  }, [frontRef]);

  const handleEnded = useCallback(
    (ref: React.RefObject<HTMLVideoElement | null>) => {
      return () => {
        const video = ref.current;
        if (!video) return;
        video.pause();

        // Prepare back video at frame 0
        const back = backRef.current;
        if (back) {
          back.currentTime = 0;
          back.pause();
        }

        // After holding last frame, fade in the new video on top
        const swapTimer = setTimeout(() => {
          setIncoming(true);

          // After fade completes, finalize the swap
          const finalizeTimer = setTimeout(() => {
            setIncoming(false);
            setFront((f) => (f === 'a' ? 'b' : 'a'));
            setIndex(nextIndex);
          }, FADE_DURATION);
          timers.current.push(finalizeTimer);
        }, HOLD_DURATION);
        timers.current.push(swapTimer);
      };
    },
    [backRef, nextIndex],
  );

  useEffect(() => {
    clearTimers();
    runCycle();
    return clearTimers;
  }, [front, runCycle, clearTimers]);

  useEffect(() => {
    const back = backRef.current;
    if (back) {
      back.src = ANIMATIONS[nextIndex];
      back.load();
    }
  }, [nextIndex, backRef]);

  const size = { width: 64, height: 64, objectFit: 'cover' as const, display: 'block' };

  // Front video is always visible. Back video fades in on top when incoming.
  const aIsFront = front === 'a';
  const aOpacity = aIsFront ? 1 : incoming ? 1 : 0;
  const bOpacity = aIsFront ? (incoming ? 1 : 0) : 1;
  const aZ = aIsFront ? 0 : 1;
  const bZ = aIsFront ? 1 : 0;

  return (
    <div style={{ width: 64, height: 64, position: 'relative' }}>
      <img
        src="/toucan-logo.svg"
        alt="Toucan"
        width={64}
        height={64}
        style={{
          ...size,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
          opacity: videoReady ? 0 : 1,
          transition: `opacity ${FADE_DURATION}ms ease`,
        }}
      />
      <video
        ref={videoARef}
        src={ANIMATIONS[0]}
        muted
        playsInline
        preload="auto"
        onCanPlayThrough={() => setVideoReady(true)}
        onEnded={handleEnded(videoARef)}
        style={{
          ...size,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: aZ,
          opacity: aOpacity,
          transition: `opacity ${FADE_DURATION}ms ease`,
        }}
      />
      <video
        ref={videoBRef}
        src={ANIMATIONS[1]}
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded(videoBRef)}
        style={{
          ...size,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: bZ,
          opacity: bOpacity,
          transition: `opacity ${FADE_DURATION}ms ease`,
        }}
      />
    </div>
  );
}
