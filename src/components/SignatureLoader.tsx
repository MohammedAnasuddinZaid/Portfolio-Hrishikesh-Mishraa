import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface SignatureLoaderProps {
  onComplete: () => void;
}

/*
 * Pixel-faithful reconstruction of the "Hrishikesh" signature blueprint.
 *
 * All coordinates are taken verbatim from the atomic structural spec
 * (canvas normalized to a 1000 x 1333 grid) and only translated by
 * (-10, -448) so the signature sits centred in the 900 x 420 viewBox.
 *
 *   - Stroke width:  8.5 units  (constant monoline, round caps/joins)
 *   - Cap line / H & ascenders:    y = 478
 *   - i-Dot centre:                y = 665
 *   - x-height top (r i s e):      y = 708
 *   - Baseline:                    y = 760
 *   - Descender / H flourish:      y = 822
 *
 * Anatomy:
 *   A. Capital "H"  -> 3 disconnected groups: left stem, crossbar+flourish, right stem
 *   B. Cursive "rishikesh" -> 1 continuous path + 2 dabs (i-dots)
 *
 * The signing animation drives stroke-dashoffset + a fountain-pen nib via a
 * requestAnimationFrame loop so the ink and the pen stay perfectly in sync.
 */

const INK = '#111111';
const STROKE_W = 8.5;

/* ── A. The Capital "H" ─────────────────────────────────────────────── */

/* H left stem: (89,478) -> (89,792) */
const H_LEFT = 'M89,478 L89,792';

/* H right stem: (229,482) -> (229,780) */
const H_RIGHT = 'M229,482 L229,780';

/* H crossbar & signature flourish:
   (89,715) -> peak (300,718) -> down-left through (290,810)/(200,815)
   to bottom curve (115,808) -> taper to floating tip (72,750) */
const H_CROSS =
  'M89,715 C150,706 250,712 300,718 C290,810 200,815 115,808 C102,796 86,772 72,750';

/* ── B. The Cursive Word "rishikesh" (one continuous path) ──────────── */

const CURSIVE = [
  /* r:   entry (308,735) -> peak loop (318,708) -> shoulder (335,715) -> baseline (358,760) */
  'M308,735 C312,724 315,712 318,708 C323,706 330,709 335,715 C341,725 350,742 358,760',
  /* i:   rise (378,708) -> retrace to baseline (402,760) */
  'C364,742 370,722 378,708 C382,722 392,744 402,760',
  /* s:   up (425,708) -> belly (442,738) -> tuck (418,758) -> cross-out (458,760) */
  'C410,746 416,724 425,708 C430,718 438,730 442,738 C444,748 434,756 418,758 C432,758 448,759 458,760',
  /* h:   ascender loop peak (480,478) -> loop (462,530) -> drop (468,760) -> arch (502,708) -> baseline (528,760) */
  'C466,680 474,530 480,478 C482,498 474,516 462,530 C456,620 462,700 468,760 C475,730 490,714 502,708 C512,722 520,744 528,760',
  /* i:   rise (548,708) -> retrace to baseline (572,760) */
  'C534,742 540,724 548,708 C554,724 562,746 572,760',
  /* k:   high loop peak (622,478) -> loop (602,530) -> drop (608,760) -> junction (640,712) -> pinch (628,732) -> kick-out (668,760) */
  'C584,660 604,520 622,478 C624,500 614,516 602,530 C597,620 602,700 608,760 C616,728 628,716 640,712 C645,716 638,724 628,732 C622,742 644,752 668,760',
  /* e:   loop up (688,708) -> cross-back (672,732) -> baseline (708,760) */
  'C674,738 681,718 688,708 C694,700 684,716 672,732 C676,742 692,752 708,760',
  /* s:   up (732,708) -> belly (750,738) -> tuck (728,758) -> cross-out (765,760) */
  'C716,746 722,726 732,708 C739,716 746,728 750,738 C752,748 742,756 728,758 C740,758 754,759 765,760',
  /* h:   final ascender loop peak (792,478) -> loop (772,530) -> drop (780,760) -> arch (812,708) -> baseline (832,760) -> terminal tail (848,732) */
  'C774,680 784,530 792,478 C794,498 784,516 772,530 C768,620 774,700 780,760 C789,724 802,712 812,708 C820,720 826,746 832,760 C838,748 843,740 848,732',
].join(' ');

/* i-dots (solid filled circles, R = 5.5) */
const DOT_ONE = { cx: 380, cy: 665 };
const DOT_TWO = { cx: 550, cy: 665 };

/* ── Cubic-Bezier easing helpers ────────────────────────────────────── */

type Easing = (t: number) => number;

const makeBezier = (x1: number, y1: number, x2: number, y2: number): Easing => {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const derivX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (t: number) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    let x = t;
    for (let i = 0; i < 8; i++) {
      const err = sampleX(x) - t;
      if (Math.abs(err) < 1e-5) break;
      const d = derivX(x);
      if (Math.abs(d) < 1e-6) break;
      x -= err / d;
    }
    return sampleY(x);
  };
};

/* quick downward flick for the stems */
const EASE_FLICK = makeBezier(0.55, 0.06, 0.68, 0.19);
/* sweeping crossbar */
const EASE_CROSS = makeBezier(0.45, 0, 0.35, 1);
/* fluid handwriting motion */
const EASE_WRITE = makeBezier(0.55, 0.02, 0.32, 0.98);

/* ── Timing blueprint ───────────────────────────────────────────────── */

const H_PIECES = [
  { d: H_LEFT, t: 0.5, dur: 0.26, ease: EASE_FLICK },
  { d: H_CROSS, t: 0.9, dur: 0.72, ease: EASE_CROSS },
  { d: H_RIGHT, t: 1.76, dur: 0.26, ease: EASE_FLICK },
];

/* per-letter handwriting cadence for the cursive word (back-to-back,
   no lifts, so the nib never leaves the paper mid-word) */
const LETTERS: { end: [number, number]; dur: number; dot?: number }[] = [
  { end: [358, 760], dur: 0.18 },
  { end: [402, 760], dur: 0.2, dot: 0 },
  { end: [458, 760], dur: 0.22 },
  { end: [528, 760], dur: 0.36 },
  { end: [572, 760], dur: 0.2, dot: 1 },
  { end: [668, 760], dur: 0.36 },
  { end: [708, 760], dur: 0.2 },
  { end: [765, 760], dur: 0.22 },
  { end: [848, 732], dur: 0.42 },
];

const T_CURSIVE = 2.16;
const CURSIVE_DUR = LETTERS.reduce((a, l) => a + l.dur, 0);
const T_END = T_CURSIVE + CURSIVE_DUR;
const T_TAGLINE = 4.85;
const T_COMPLETE = 5.4;

const POP_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

export const SignatureLoader: React.FC<SignatureLoaderProps> = ({ onComplete }) => {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const totals = useRef<number[]>([]);
  const bounds = useRef<number[]>([]);
  const dotsRef = useRef<(SVGGElement | null)[]>([]);
  const dotsShown = useRef<boolean[]>([]);
  const penRef = useRef<SVGGElement | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useLayoutEffect(() => {
    let raf = 0;
    const t0 = performance.now();

    /* compute real dash lengths for EVERY stroke so nothing is visible
       until the nib actually draws it (no pre-rendered ink) */
    for (let i = 0; i < pathRefs.current.length; i++) {
      const el = pathRefs.current[i];
      if (!el) continue;
      const total = el.getTotalLength();
      totals.current[i] = total;
      el.style.strokeDasharray = String(total);
      el.style.strokeDashoffset = String(total);
    }

    const cursive = pathRefs.current[3];
    const total = totals.current[3];
    dotsShown.current = [false, false];

    /* sample the cursive path to find the length-fraction where each
       letter ends, so per-letter speed + i-dot dabs stay exact */
    if (cursive) {
      bounds.current = [0];
      for (const letter of LETTERS) {
        bounds.current.push(findNearestFraction(cursive, letter.end[0], letter.end[1]));
      }
    }

    const loop = (now: number) => {
      const t = (now - t0) / 1000;
      let penOn = false;

      /* capital H pieces */
      for (let i = 0; i < H_PIECES.length; i++) {
        const s = H_PIECES[i];
        const el = pathRefs.current[i];
        const tl = totals.current[i];
        if (!el) continue;
        if (t < s.t) {
          el.style.strokeDashoffset = String(tl);
        } else if (t <= s.t + s.dur) {
          const p = s.ease((t - s.t) / s.dur);
          const len = tl * p;
          el.style.strokeDashoffset = String(tl - len);
          penOn = true;
          movePen(el, len, tl);
        } else {
          el.style.strokeDashoffset = '0';
        }
      }

      /* continuous cursive word */
      const ce = pathRefs.current[3];
      if (ce) {
        if (t < T_CURSIVE) {
          ce.style.strokeDashoffset = String(total);
        } else if (t >= T_END) {
          ce.style.strokeDashoffset = '0';
        } else {
          const tl = t - T_CURSIVE;
          let acc = 0;
          let li = LETTERS.length - 1;
          for (let i = 0; i < LETTERS.length; i++) {
            acc += LETTERS[i].dur;
            if (tl <= acc) {
              li = i;
              break;
            }
          }
          const letter = LETTERS[li];
          const start = acc - letter.dur;
          const p = EASE_WRITE(Math.min((tl - start) / letter.dur, 1));
          const lenFrac = bounds.current[li] + (bounds.current[li + 1] - bounds.current[li]) * p;
          const len = Math.min(lenFrac * total, total);
          ce.style.strokeDashoffset = String(total - len);
          penOn = true;
          movePen(ce, len, total);
          if (letter.dot !== undefined && p >= 0.98 && !dotsShown.current[letter.dot]) {
            dotsShown.current[letter.dot] = true;
            popDot(letter.dot);
          }
        }
      }

      if (penRef.current) {
        penRef.current.style.opacity = penOn ? '1' : '0';
      }

      if (t >= T_COMPLETE) {
        cancelAnimationFrame(raf);
        setTimeout(() => onCompleteRef.current(), 250);
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const movePen = (el: SVGPathElement, len: number, totalLen: number) => {
    if (!penRef.current) return;
    const L = Math.min(len, totalLen);
    const pt = el.getPointAtLength(L);
    const pt2 = el.getPointAtLength(Math.min(L + 1, totalLen));
    const ang = (Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180) / Math.PI;
    penRef.current.setAttribute('transform', `translate(${pt.x},${pt.y}) rotate(${ang})`);
  };

  const popDot = (idx: number) => {
    const el = dotsRef.current[idx];
    if (!el) return;
    el.style.transition = `transform 0.22s ${POP_EASE}, opacity 0.18s ease-out`;
    el.style.transform = 'scale(1)';
    el.style.opacity = '1';
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-white premium-noise flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ scaleY: 0, originY: 0 }}
      transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center px-6"
      >
        <svg
          viewBox="0 0 900 420"
          className="w-[min(86vw,640px)] h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Hrishikesh Mishra signature"
          style={{ display: 'block' }}
        >
          <g transform="translate(-10,-448)">
            {H_PIECES.map((s, i) => (
              <path
                key={i}
                ref={(el) => {
                  pathRefs.current[i] = el;
                }}
                d={s.d}
                stroke={INK}
                strokeWidth={STROKE_W}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="9999"
                strokeDashoffset="9999"
              />
            ))}
            <path
              ref={(el) => {
                pathRefs.current[3] = el;
              }}
              d={CURSIVE}
              stroke={INK}
              strokeWidth={STROKE_W}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="9999"
              strokeDashoffset="9999"
            />

            <g
              ref={(el) => {
                dotsRef.current[0] = el;
              }}
              style={{
                transform: 'scale(0)',
                transformBox: 'fill-box',
                transformOrigin: 'center',
                opacity: 0,
              }}
            >
              <circle cx={DOT_ONE.cx} cy={DOT_ONE.cy} r={5.5} fill={INK} />
            </g>
            <g
              ref={(el) => {
                dotsRef.current[1] = el;
              }}
              style={{
                transform: 'scale(0)',
                transformBox: 'fill-box',
                transformOrigin: 'center',
                opacity: 0,
              }}
            >
              <circle cx={DOT_TWO.cx} cy={DOT_TWO.cy} r={5.5} fill={INK} />
            </g>

            <g
              ref={penRef}
              style={{ opacity: 0, transition: 'opacity 0.15s ease' }}
            >
              <path d="M24,0 L0,-7 L-8,-2.6 L-8,2.6 L0,7 Z" fill="#1a1a1a" />
              <path d="M1,0 L19,0" stroke="#a8b8c9" strokeWidth={1} strokeLinecap="round" />
            </g>
          </g>
        </svg>

        <div className="mt-9 w-40 sm:w-56 h-px bg-black/25" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: T_TAGLINE, duration: 0.6 }}
          className="mt-5 text-center"
        >
          <div className="text-[10px] sm:text-[12px] uppercase tracking-[0.35em] font-black text-[#141414]/80">
            Co-Founder &middot; CEO &middot; Angel Investor
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* find the normalized path-length fraction whose point sits closest to (x, y) */
function findNearestFraction(el: SVGPathElement, x: number, y: number): number {
  const total = el.getTotalLength();
  const steps = 800;
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i <= steps; i++) {
    const pt = el.getPointAtLength((total * i) / steps);
    const d = (pt.x - x) * (pt.x - x) + (pt.y - y) * (pt.y - y);
    if (d < bestDist) {
      bestDist = d;
      best = i / steps;
    }
  }
  return best;
}
