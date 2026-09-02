import React from "react";

/* Roo — the Workroo mascot: a seated kangaroo facing left, tail to the ground,
   big hind foot, tall ears, joey in the pouch. Purely decorative, so it's
   hidden from assistive tech. Reads best small and high-contrast. */
export default function Kangaroo({ className = "" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* tail — thick, sweeping down to the ground behind */}
      <path
        d="M38 33c11 0 18 9 15 19-1 3-6 3-7 0 2-8-2-14-10-14z"
        fill="#0052CC"
      />
      {/* big hind foot planted on the ground */}
      <path
        d="M13 51c-3 0-3-5 1-5h23c3 0 3 6 0 6H16c-1 0-1-1-3-1z"
        fill="#0052CC"
      />
      {/* hind leg */}
      <path d="M33 29c6 4 6 14 0 18l-5-2c4-4 3-11-1-14z" fill="#0052CC" />
      {/* body */}
      <path
        d="M22 17c9-2 19 4 19 15 0 9-6 15-13 16-7 1-13-4-14-12-1-9 1-17 8-19z"
        fill="#0067FF"
      />
      {/* pouch */}
      <path
        d="M19 31c0-6 6-9 11-5 0 7-3 12-8 12-2-1-3-4-3-7z"
        fill="#E7FC52"
      />
      {/* joey peeking out */}
      <circle cx="24" cy="30" r="3.4" fill="#0067FF" />
      <path
        d="M22 27l-1.4-3.6M25 27l1-3.6"
        stroke="#0067FF"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      {/* forearm held at the chest */}
      <path
        d="M28 23c-3 1-5 3-6 6"
        fill="none"
        stroke="#0052CC"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* head */}
      <circle cx="20" cy="14" r="7" fill="#0067FF" />
      {/* ears */}
      <path d="M14 11c-2-6-1-10 2-10 2 1 3 5 2 10z" fill="#0067FF" />
      <path d="M22 10c0-6 2-9 4-8 2 2 1 6 0 9z" fill="#0067FF" />
      {/* snout */}
      <path d="M13 13c-3 0-4 2-3 4 2 2 5 1 6-1z" fill="#0052CC" />
      <circle cx="11" cy="15.4" r="1" fill="#121424" />
      {/* eye */}
      <circle cx="20" cy="13" r="1.7" fill="#121424" />
    </svg>
  );
}
