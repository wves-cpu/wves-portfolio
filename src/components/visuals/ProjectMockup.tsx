'use client';

import React from 'react';
import { 
  Wrench, Cpu, CheckCircle2, ShieldCheck, Flame, Volume2, 
  Sparkles, Wifi, Radio, MapPin, Key, Trophy, Users, Clock, 
  Calendar, Globe2, Compass, Orbit, Zap
} from 'lucide-react';

interface ProjectMockupProps {
  slug: string;
  accentColor: string;
}

export default function ProjectMockup({ slug, accentColor }: ProjectMockupProps) {
  switch (slug) {
    case 'statuscraft':
      return (
        <div className="w-full h-full p-4 md:p-6 flex flex-col justify-between font-mono text-xs select-none">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-semibold tracking-wider uppercase text-[11px]">
                StatusCraft // Service Hub
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Live Diagnostics
            </span>
          </div>

          {/* Center Visual Mockup */}
          <div className="my-auto py-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Device Card */}
            <div className="bg-[#12141a]/80 border border-white/10 rounded-lg p-3.5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/50 text-[10px]">TICKET #SC-8942</span>
                <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                  <CheckCircle2 size={11} /> Verified Lab
                </span>
              </div>
              <div className="text-white font-sans font-bold text-sm mb-1 flex items-center gap-2">
                <Cpu size={14} className="text-blue-400" />
                MacBook Pro & iPhone 15 Pro
              </div>
              <p className="text-white/60 text-[11px] mb-3 font-sans">
                Hardware inspection, OLED display calibration & battery cycle reset.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-white/40">Status:</span>
                  <span className="text-blue-400 font-semibold">Testing Sensors (89%)</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-[89%]" />
                </div>
              </div>
            </div>

            {/* Provider & Action */}
            <div className="bg-[#12141a]/80 border border-white/10 rounded-lg p-3.5 flex flex-col justify-between backdrop-blur-md">
              <div>
                <span className="text-white/50 text-[10px] block mb-1">SERVICE PROVIDER</span>
                <div className="text-white font-semibold text-xs mb-1 flex items-center gap-1.5">
                  <Wrench size={12} className="text-blue-400" />
                  iFix Pro Lab Express
                </div>
                <div className="flex items-center gap-2 text-[10px] text-white/50 mb-3">
                  <span className="text-emerald-400 font-semibold">4.9 ★★★★★</span>
                  <span>•</span>
                  <span>15 min avg response</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="text-[10px]">
                  <span className="text-white/40 block">Guaranteed:</span>
                  <span className="text-white/80 font-semibold">90 Days Warranty</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-600/30 text-blue-300 border border-blue-500/40 text-[10px] font-semibold flex items-center gap-1">
                  <ShieldCheck size={11} /> Ready
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40">
            <span>PING: 14ms // TLS 1.3 SECURE</span>
            <span className="text-blue-400 font-semibold">PORTAL READY &gt;&gt;</span>
          </div>
        </div>
      );

    case 'tiltop':
      return (
        <div className="w-full h-full p-4 md:p-6 flex flex-col justify-between font-mono text-xs select-none">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-orange-400 font-bold tracking-wider uppercase text-[11px] flex items-center gap-1.5">
                <Sparkles size={13} /> TilTop // Speech Lab
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center gap-1">
                <Flame size={11} className="text-orange-400 fill-orange-400" /> 18-DAY STREAK
              </span>
            </div>
          </div>

          {/* Main Phrase Card */}
          <div className="my-auto py-2">
            <div className="bg-[#171412]/80 border border-orange-500/20 rounded-lg p-4 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-orange-400/70 text-[10px] font-semibold">PRACTICAL CONVERSATION // B2</span>
                <span className="text-white/40 text-[10px]">ENGLISH ➔ UZ / RU</span>
              </div>

              {/* Phrase */}
              <div className="font-sans font-bold text-white text-base md:text-lg mb-1 leading-snug">
                &ldquo;Could you recommend a convenient spot to work from?&rdquo;
              </div>
              <p className="font-sans text-orange-200/60 text-xs mb-3">
                &ldquo;Ishlash uchun qulayroq joy tavsiya qila olasizmi?&rdquo;
              </p>

              {/* Audio visualizer */}
              <div className="bg-black/40 border border-white/10 rounded-md p-2.5 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 flex-shrink-0">
                  <Volume2 size={13} />
                </div>
                <div className="flex-1 flex items-center justify-between gap-1 h-6 px-1">
                  {[35, 65, 45, 80, 50, 75, 30, 85, 60, 40, 70, 45, 60, 80, 35, 55, 30].map((h, i) => (
                    <div 
                      key={i} 
                      className="w-1 md:w-1.5 rounded-full bg-gradient-to-t from-orange-500 to-amber-300 transition-all"
                      style={{ height: `${h}%`, opacity: 0.5 + (h / 200) }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-white/50 font-mono">0:04 / 0:11</span>
              </div>
            </div>
          </div>

          {/* Bottom Tags */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-white/5 text-white/70">#Conversational</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-white/70">#Phonetics 98%</span>
            </div>
            <span className="text-orange-400 font-semibold">INTERACTIVE DECK &gt;&gt;</span>
          </div>
        </div>
      );

    case 'wifi-share':
      return (
        <div className="w-full h-full p-4 md:p-6 flex flex-col justify-between font-mono text-xs select-none">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Radio size={13} className="text-sky-400 animate-pulse" />
              <span className="text-sky-400 font-bold tracking-wider uppercase text-[11px]">
                WiFi Share // Mesh Radar
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-sky-500/20 text-sky-400 border border-sky-500/30">
              5 Hotspots Nearby
            </span>
          </div>

          {/* Center Radar & Hotspots */}
          <div className="my-auto py-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Active Hotspot 1 */}
            <div className="bg-[#0e1622]/80 border border-sky-500/20 rounded-lg p-3.5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sky-400 font-semibold text-xs flex items-center gap-1.5">
                  <Wifi size={13} /> Hub Coworking 5G
                </span>
                <span className="text-emerald-400 text-[10px] font-bold">98% STRONG</span>
              </div>
              <div className="text-[10px] text-white/50 space-y-1 mb-2.5">
                <div className="flex justify-between">
                  <span>Bandwidth:</span>
                  <span className="text-white/80 font-bold">240 Mbps Fast</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance:</span>
                  <span className="text-white/80">35 meters // 1st floor</span>
                </div>
              </div>
              <div className="p-1.5 rounded bg-sky-950/50 border border-sky-500/30 flex items-center justify-between text-[10px]">
                <span className="text-sky-300 flex items-center gap-1">
                  <Key size={10} /> Permission Granted
                </span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </div>
            </div>

            {/* Hotspot 2 */}
            <div className="bg-[#0e1622]/80 border border-white/10 rounded-lg p-3.5 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white/90 font-semibold text-xs flex items-center gap-1.5">
                    <MapPin size={12} className="text-sky-400" /> Artisan Cafe Mesh
                  </span>
                  <span className="text-white/40 text-[10px]">80m away</span>
                </div>
                <p className="text-white/50 text-[10px] font-sans mb-2">
                  Community verified hotspot. Owners allow fast guest connections.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px]">
                <span className="text-white/40">Security: WPA3</span>
                <span className="text-sky-400 font-semibold">Request Access &gt;&gt;</span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40">
            <span>GEO: 41.2995° N, 69.2401° E</span>
            <span className="text-sky-400 font-semibold">MAP EXPLORER READY</span>
          </div>
        </div>
      );

    case 'goalspot':
      return (
        <div className="w-full h-full p-4 md:p-6 flex flex-col justify-between font-mono text-xs select-none">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Trophy size={13} className="text-emerald-400" />
              <span className="text-emerald-400 font-bold tracking-wider uppercase text-[11px]">
                GoalSpot // Turf Arena
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <Calendar size={10} /> Live Booking
            </span>
          </div>

          {/* Center Pitch & Booking */}
          <div className="my-auto py-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Arena Pitch Card */}
            <div className="bg-[#0f1b13]/80 border border-emerald-500/25 rounded-lg p-3.5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white font-bold text-xs">Arena Pro Stadium #3</span>
                <span className="text-emerald-400 font-bold text-[10px]">7v7 TURF</span>
              </div>
              <p className="text-white/50 text-[10px] font-sans mb-3">
                FIFA standard artificial pitch, professional night floodlights, locker rooms.
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-white/40 flex items-center gap-1"><Clock size={10} /> Prime Slots:</span>
                  <span className="text-emerald-400 font-semibold">19:30 Available</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <div className="p-1 rounded bg-white/5 text-white/30 text-center text-[9px] line-through">18:00</div>
                  <div className="p-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center text-[9px] font-bold">19:30</div>
                  <div className="p-1 rounded bg-white/5 hover:bg-emerald-500/10 text-white/70 text-center text-[9px]">21:00</div>
                </div>
              </div>
            </div>

            {/* Matchmaker info */}
            <div className="bg-[#0f1b13]/80 border border-white/10 rounded-lg p-3.5 flex flex-col justify-between backdrop-blur-md">
              <div>
                <span className="text-white/40 text-[10px] block mb-1">TEAM MATCHMAKING</span>
                <div className="text-white font-semibold text-xs mb-1 flex items-center gap-1.5">
                  <Users size={12} className="text-emerald-400" />
                  Friendly Match // 7v7
                </div>
                <p className="text-white/50 text-[10px] font-sans">
                  2 open player slots for tonight match. Tap to join or reserve arena.
                </p>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-semibold">Instant Reserve</span>
                <span className="text-white/40">Clear Sky • 20°C</span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40">
            <span>PITCH CONFIRMED // VERIFIED ARENA</span>
            <span className="text-emerald-400 font-semibold">BOOK MATCH &gt;&gt;</span>
          </div>
        </div>
      );

    case 'cosmoverse':
      return (
        <div className="w-full h-full p-4 md:p-6 flex flex-col justify-between font-mono text-xs select-none">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Orbit size={13} className="text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-purple-400 font-bold tracking-wider uppercase text-[11px]">
                CosmoVerse // Deep Observatory
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Spectroscopy Active
            </span>
          </div>

          {/* Center Space Visual */}
          <div className="my-auto py-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Exoplanet Profile */}
            <div className="bg-[#140f22]/80 border border-purple-500/25 rounded-lg p-3.5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white font-bold text-xs flex items-center gap-1.5">
                  <Globe2 size={13} className="text-purple-400" /> Kepler-452b
                </span>
                <span className="text-purple-300 font-semibold text-[10px]">EXOPLANET</span>
              </div>
              <p className="text-white/50 text-[10px] font-sans mb-3">
                Habitable zone super-Earth orbiting a G2V class solar analog.
              </p>
              <div className="space-y-1 text-[10px] text-white/60">
                <div className="flex justify-between">
                  <span>Distance:</span>
                  <span className="text-white/90 font-bold">1,402 Light Years</span>
                </div>
                <div className="flex justify-between">
                  <span>Orbital Period:</span>
                  <span className="text-white/90">384.8 Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Atmosphere:</span>
                  <span className="text-purple-300 font-semibold">Nitrogen / H₂O Traces</span>
                </div>
              </div>
            </div>

            {/* Constellation Telemetry */}
            <div className="bg-[#140f22]/80 border border-white/10 rounded-lg p-3.5 flex flex-col justify-between backdrop-blur-md">
              <div>
                <span className="text-white/40 text-[10px] block mb-1">CELESTIAL TELEMETRY</span>
                <div className="text-white font-semibold text-xs mb-1 flex items-center gap-1.5">
                  <Compass size={12} className="text-purple-400" />
                  Cygnus Constellation
                </div>
                <p className="text-white/50 text-[10px] font-sans">
                  Interactive real-time 3D planetary rendering with orbital trajectory calculations.
                </p>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                <span className="text-purple-300 font-semibold">3D Orbit Visualizer</span>
                <span className="text-white/40">60 FPS WebGL</span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40">
            <span>RA 19h 44m // DEC +44° 16′</span>
            <span className="text-purple-400 font-semibold">EXPLORE UNIVERSE &gt;&gt;</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
