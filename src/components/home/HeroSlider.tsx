"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface SlideData {
  id: number;
  tag: string;
  title: string;
  description: string;
  image: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    tag: "FEATURED ARCHIVE",
    title: "Rare First Editions & Timeless Literature",
    description: "Immerse in preserved classic volumes and collector editions from premier publishing houses.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    tag: "SPECULATIVE FICTION",
    title: "Master Sci-Fi & Dystopian Chronicles",
    description: "Explore visionary worlds, cosmic frontiers, and mind-altering speculative thought.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    tag: "STOIC PHILOSOPHY",
    title: "Philosophical Inquiries & Ancient Wisdom",
    description: "Personal reflections and foundational ethics that continue to shape sovereign minds.",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    tag: "PSYCHOLOGICAL THRILLERS",
    title: "Deep Mysteries & Haunting Suspense",
    description: "Gripping psychological narratives that explore the deepest corridors of human nature.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function HeroSlider() {
  return (
    <div className="w-full relative rounded-3xl overflow-hidden border border-zinc-800/90 bg-[#0d0d10] shadow-[0_0_50px_rgba(0,0,0,0.85)]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "!bg-[#e50914] !w-6 !rounded-full transition-all duration-300",
          bulletClass: "inline-block h-2 w-2 rounded-full bg-zinc-600 cursor-pointer mx-1 transition-all duration-300",
        }}
        loop={true}
        className="w-full h-[460px] sm:h-[500px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority={slide.id === 1}
              />
              {/* Cinematic Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-[#0d0d10]/60 to-[#0d0d10]/20"></div>
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Slide Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-10 text-white">
              <span className="w-fit text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] px-3 py-1 rounded-md bg-black/80 border border-zinc-800 backdrop-blur-md mb-3">
                {slide.tag}
              </span>

              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans leading-tight line-clamp-2">
                {slide.title}
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-zinc-300 font-light line-clamp-2 max-w-md leading-relaxed">
                {slide.description}
              </p>

              <div className="mt-6 mb-4">
                <Link
                  href="/books"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_30px_rgba(229,9,20,0.6)] cursor-pointer"
                >
                  Browse Books →
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

