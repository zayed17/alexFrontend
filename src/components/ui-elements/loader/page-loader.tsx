"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./loader.module.css";
import { mainLogoBlack } from "@/constants/images";

export default function PageLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 12;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 90);

    // Start fade out animation before fully hiding
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1400);

    // Complete loading after animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2100); // Extended time to allow cloud fade effect to complete

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <>
      {loading && (
        <div
          className={`${styles.loadingPage} ${fadeOut ? styles.fadeOutCloud : ""}`}
        >
          {/* Subtle skyline background */}
          <div className={styles.skylineBg}></div>

          {/* Elegant decorative elements */}
          <div className={styles.goldAccent1}></div>
          <div className={styles.goldAccent2}></div>

          <div className={styles.contentContainer}>
            {/* Enhanced logo container with subtle glow effect */}
            <div className={styles.logoWrapper}>
              <div className={styles.logoGlow}></div>
              <div className={styles.logoShimmer}></div>
              <Image
                src={mainLogoBlack}
                alt="MRONE Logo"
                width={210} 
                height={210} 
                priority 
                className={styles.logoImage}
                sizes="(max-width: 768px) 150px, (max-width: 1024px) 180px, 210px" 
                style={{ objectFit: "contain" }} 
              />
            </div>

            {/* Elegant loading indicator */}
            <div className={styles.loadingContainer}>
              {/* Linear progress bar */}
              <div className={styles.progressLineContainer}>
                <div
                  className={styles.progressLine}
                  style={{ width: `${progress}%` }}
                >
                  <div className={styles.progressLineDot}></div>
                </div>
              </div>

              <div className={styles.loadingText}>MR ONE PROPERTYS</div>
            </div>
          </div>
        </div>
      )}
      <div className={`${loading ? styles.hidden : ""}`}>{children}</div>
    </>
  );
}
