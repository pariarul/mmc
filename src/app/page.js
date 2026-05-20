import React from 'react';
import HeroSlider from '@/components/HeroSlider';
import NotificationMarquee from '@/components/NotificationMarquee';
import ImportantAnnouncements from '@/components/ImportantAnnouncements';
import DistrictSection from '@/components/DistrictSection';
import RmpServices from '@/components/RmpServices';
import StatsSection from '@/components/StatsSection';
import DownloadsSection from '@/components/DownloadsSection';
import InstructionsSection from '@/components/InstructionsSection';

export default function Home() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Scrolling Marquee Notifications */}
      <NotificationMarquee />

      {/* 3. Important Announcements & Guidance Grid */}
      <ImportantAnnouncements />

      {/* 4. Statistics counter banner */}
      <StatsSection />

      {/* 5. Practitioner (RMP) Services Dashboard Grid */}
      <RmpServices />

      {/* 6. Interactive District Wise Registries */}
      <DistrictSection />

      {/* 7. Forms, syllabus, booklet PDF downloads */}
      <DownloadsSection />

      {/* 8. Instructions & Professional Code checklist */}
      <InstructionsSection />
    </div>
  );
}
