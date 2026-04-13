"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 75;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll();

  // 1. Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      const frameNum = i.toString().padStart(2, "0");
      img.src = `/sequence/frame_${frameNum}_delay-0.066s.webp`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };
      
      // Still push it so we keep the array order perfectly matched to index
      loadedImages.push(img);
    }
  }, []);

  // 2. Render logic (object-fit: cover style)
  const drawImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Enable high-DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Calculate aspect ratio for cover
    const canvasRatio = rect.width / rect.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = rect.width;
    let drawHeight = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image
      drawHeight = rect.width / imgRatio;
      offsetY = (rect.height - drawHeight) / 2;
    } else {
      // Canvas is taller than image
      drawWidth = rect.height * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, rect.width, rect.height);
    // Fill with base dark color beneath in case of fractional pixels
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // 3. Initial draw when images load
  useEffect(() => {
    if (images.length > 0) {
      drawImage(images[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  // 4. Draw on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0) return;
    
    // Map 0 -> 1 to 0 -> FRAME_COUNT - 1
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );
    
    requestAnimationFrame(() => {
      drawImage(images[frameIndex]);
    });
  });

  // 5. Redraw on resize
  useEffect(() => {
    const handleResize = () => {
      if (images.length === 0) return;
      
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(scrollYProgress.get() * FRAME_COUNT)
      );
      drawImage(images[frameIndex]);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <div className="relative h-[500vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
