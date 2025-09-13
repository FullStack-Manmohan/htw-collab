'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HeroSlideshowProps {
  className?: string;
}

const SLIDE_PATHS = [
  '/hero/2024-0916-0730_Opening-Coffee_Photos_JACK-CANON-35.jpg',
  '/hero/2024-0916-0730_Opening-Coffee_Photos_JACK-CANON-65.jpg',
  '/hero/2024-0916-1700_Opening Ceremony_Photos_ALEX-LEICA-1640558.jpg',
  '/hero/2024-0916-1700_Opening Ceremony_Photos_ALEX-LEICA-1640589.jpg',
  '/hero/2024-0916-1700_Opening-Ceremony_Photos_JACK-CANON-F05A9732.jpg',
  '/hero/2024-0917-0800_Founders Coffee_Photos_JACK-CANON-F05A9831.JPG',
  '/hero/2024-0917-0800_Founders-Coffee_Photos_ALEX-LEICA-1640618.jpg',
  '/hero/2024-0917-0800_Founders-Coffee_Photos_JACK-CR3-92.jpg',
  '/hero/2024-0917-1700_Scaling-Hawaii_Photos_BRAE-SONY-453.jpg',
  '/hero/2024-0917-1700_Scaling-Hawaii_Photos_BRAE-SONY-472.jpg',
  '/hero/2024-0917-1930_Capicua-Mixer_Photos_ALEX-LEICA-1650457.jpg',
  '/hero/2024-0918-1700_AI-Engineering_Photos_JACK-CANON-F05A0231.jpg',
  '/hero/2024-0918-1700_HPU-eSports_Photos_JACK-CANON-F05A0197 copy.jpg',
  '/hero/2024-0918-1700_Ocean-Tech_Photos_ALEX-LEICA-1650840.jpg',
  '/hero/2024-0918-1700_Ocean-Tech_Photos_BRAE-SONY-03732.jpg',
  '/hero/2024-0918-1700_Ocean-Tech_Photos_TBD-749.jpg',
  '/hero/2024-0918-1730_Wahine-Wed_Photos_JACK-CANON-F05A0153 2.jpg',
  '/hero/2024-0918-1730_Wahine-Wed_Photos_JACK-CANON-F05A0157.jpg',
  '/hero/2024-0918_1400_Powering-Hawaii-Energy_Photos_ALEX-LEICA-330.jpg',
  '/hero/2024-0919-1500_Amazon-Day1_Photos_JACK-CANON-96.jpg',
  '/hero/2024-0919-1600_Party-Bus_Photos_ALEX-100LEICA-1660373.jpg',
  '/hero/2024-0919-1600_Paubox-Foundations_Photos_JACK-CANON-392.jpg',
  '/hero/2024-0920-1430_Stellant-Idea-MVP_Photos_ALEX-LEICA-1670073.jpg',
  '/hero/2024-0920-1700_HTW-Afterparty_Photos_ALEX-LEICA-1670335-2.jpg',
  '/hero/2024-0921-1200_HTW-Hackathon_Photos_ALEX-LEICA-1670656.jpg',
  '/hero/2024-0921-1200_HTW-Hackathon_Photos_ALEX-LEICA-1670684.jpg',
  '/hero/HTW_2024_Photo_Founders Coffee_Jack-1.jpg',
  '/hero/HTW_2024_Photo_Founders Coffee_Jack-4.jpg',
  '/hero/HTW_2024_Photography_2024-0920-1200_UH-Student-Venture_Photos_JACK-CR3-128.jpg',
  '/hero/HTW_2024_Photography_2024-0920-1200_UH-Student-Venture_Photos_JACK-CR3-16.jpg',
  '/hero/HTW_2024_Photography_2024-0920-1200_UH-Student-Venture_Photos_JACK-CR3-9.jpg',
  '/hero/HTW_2024_VIDEOGRAPHY_2024-0917-1800_Guy-Kawasaki-Build-Remarkable-Company_PHOTOS_BRAEDEN_RAW-ARW_SNY02846.jpg',
  '/hero/Videography_2024-0919-1700_Hawaii-Tech-Talent_Photos_JACK-CANON-658.jpg'
];

export default function HeroSlideshow({ className = '' }: HeroSlideshowProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <Image
          src={SLIDE_PATHS[0]}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="empty"
          className="object-cover"
          aria-hidden="true"
        />
        <div className="hero-overlay" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 hero-slideshow ${className}`}>
      {SLIDE_PATHS.map((path, index) => (
        <Image
          key={path}
          src={path}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          placeholder="empty"
          className={`hero-slide hero-anim`}
          style={{
            animationDelay: `${index * 2}s`,
          }}
          aria-hidden="true"
        />
      ))}
      <div className="hero-overlay" />
    </div>
  );
}