<script lang="ts" setup>
defineOptions({ name: 'HomeCheckinArt' });
</script>

<template>
  <svg
    class="h-full w-full"
    preserveAspectRatio="xMidYMax slice"
    viewBox="0 0 340 560"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="wall" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#18233d" />
        <stop offset="55%" stop-color="#141c32" />
        <stop offset="100%" stop-color="#101624" />
      </linearGradient>
      <radialGradient id="lampGlow" cx="70%" cy="38%" r="42%">
        <stop offset="0%" stop-color="#ffe7a8" stop-opacity="0.72" />
        <stop offset="55%" stop-color="#f0c56a" stop-opacity="0.16" />
        <stop offset="100%" stop-color="#f0c56a" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="windowNight" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#3b5c8a" />
        <stop offset="100%" stop-color="#1b2d4d" />
      </linearGradient>
    </defs>
    <rect fill="url(#wall)" height="560" width="340" />
    <circle cx="36" cy="46" fill="#fff" opacity="0.45" r="1.2" />
    <circle cx="78" cy="28" fill="#fff" opacity="0.28" r="1" />
    <circle cx="118" cy="58" fill="#fff" opacity="0.55" r="1.4" />
    <circle cx="168" cy="22" fill="#fff" opacity="0.2" r="0.9" />
    <rect fill="#8aa4c8" height="148" rx="10" width="126" x="188" y="86" />
    <rect fill="url(#windowNight)" height="128" rx="6" width="106" x="198" y="96" />
    <circle cx="248" cy="128" fill="#dce7ff" opacity="0.35" r="14" />
    <ellipse cx="236" cy="210" fill="url(#lampGlow)" rx="150" ry="130" />
    <path
      d="M258 78c0 18 14 26 14 48"
      fill="none"
      stroke="#d8c07a"
      stroke-linecap="round"
      stroke-width="5"
    />
    <circle cx="272" cy="132" fill="#ffe08a" r="11" />
    <path d="M252 146h40" stroke="#c9a24e" stroke-linecap="round" stroke-width="4" />
    <rect fill="#1c2438" height="168" width="340" y="392" />
    <rect fill="#2a334c" height="22" rx="4" width="210" x="64" y="400" />
    <rect fill="#0b1220" height="52" rx="5" width="112" x="108" y="332" />
    <rect fill="#7ee0f2" height="34" rx="3" width="92" x="118" y="342" opacity="0.88" />
    <rect fill="#111827" height="8" width="112" x="108" y="384" />
    <circle cx="164" cy="286" fill="#f0c2a0" r="28" />
    <path d="M138 274c16-28 44-26 54 6" fill="#5a3b2c" />
    <path
      d="M150 292c10 8 20 8 30 0"
      fill="none"
      stroke="#c98468"
      stroke-linecap="round"
      stroke-width="2.4"
    />
    <path d="M118 392c22-58 70-64 96 4" fill="#445888" />
    <path d="M132 392c8-18 18-18 28 0" fill="#3a4a72" />
    <rect fill="#1a2236" height="16" width="86" x="124" y="430" />
    <rect fill="#ef7d3b" height="26" rx="3" width="16" x="286" y="376" />
    <rect fill="#0f172a" height="12" rx="2" width="34" x="24" y="428" />
    <circle cx="44" cy="422" fill="#fbbf24" r="4" />
  </svg>
</template>
