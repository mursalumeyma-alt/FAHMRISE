import React, { useState, useRef, useEffect } from 'react';
import { 
  PenTool, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  Sparkles, 
  Eye, 
  Info, 
  Eraser, 
  HelpCircle,
  Layers,
  Award
} from 'lucide-react';

export const HANDWRITING_GROUPS = [
  {
    id: 'boat',
    title: 'Boat Shape Family',
    arabicGroup: 'ب ت ث',
    letters: [
      {
        char: 'ب',
        name: "Bā'",
        trans: "b",
        dots: "1 dot placed strictly beneath the center of the boat",
        dotCount: 1,
        dotPosition: "Below",
        startingPoint: "Start 2mm above the baseline on the right side.",
        strokeSteps: [
          "1. Start slightly above the baseline on the right; stroke downwards curving gently into the baseline.",
          "2. Glide the pen horizontally flat along the baseline from right to left.",
          "3. Curve slightly upward at the left edge to form the closing tooth of the boat.",
          "4. Lift pen from paper! Place exactly 1 dot beneath the center of the boat."
        ],
        connectedGuidance: {
          isolated: "ب — Full boat with both right and left upward teeth.",
          initial: "بـ — Right tooth curves into baseline, then glides left to connect. Left tooth dropped. 1 dot below.",
          medial: "ـبـ — Connecting stroke rises into a single short tooth, then continues left. 1 dot below.",
          final: "ـب — Connecting stroke enters from right and completes the full boat with left closing tooth."
        },
        commonMistakes: [
          "Writing from left to right (LTR) instead of right to left (RTL).",
          "Placing the dot while drawing the stroke rather than after finishing the skeleton.",
          "Making the boat round like a deep Latin 'U' instead of flat along the baseline."
        ],
        proTip: "Keep the base flat on the baseline (سَطْر). The teeth should be short and identical in height."
      },
      {
        char: 'ت',
        name: "Tā'",
        trans: "t",
        dots: "2 dots placed horizontally side-by-side above inside the boat",
        dotCount: 2,
        dotPosition: "Above",
        startingPoint: "Same boat skeleton as Bā', starting on the right.",
        strokeSteps: [
          "1. Draw the identical horizontal boat skeleton from right to left.",
          "2. Complete the upward left closing tooth.",
          "3. Lift pen! Place 2 dots horizontally side-by-side inside the upper bowl."
        ],
        connectedGuidance: {
          isolated: "ت — Full boat with 2 horizontal dots above.",
          initial: "تـ — Single initial tooth with 2 dots above, connecting forward to the left.",
          medial: "ـتـ — Single medial tooth along baseline with 2 dots above.",
          final: "ـت — Full final boat with 2 dots above."
        },
        commonMistakes: [
          "Stacking the 2 dots vertically instead of side-by-side.",
          "Placing dots outside or too far above the boat."
        ],
        proTip: "In fast handwriting, the two dots often merge into a small horizontal dash."
      },
      {
        char: 'ث',
        name: "Thā'",
        trans: "th",
        dots: "3 dots placed above in an upright triangular pyramid",
        dotCount: 3,
        dotPosition: "Above (Triangle)",
        startingPoint: "Same boat skeleton as Bā' and Tā'.",
        strokeSteps: [
          "1. Form the flat boat skeleton along the baseline.",
          "2. Lift pen! Place 2 dots side-by-side above the boat.",
          "3. Place the 3rd dot centered directly atop the first two (forming a triangle △)."
        ],
        connectedGuidance: {
          isolated: "ث — Full boat with 3 dots in an upright triangle.",
          initial: "ثـ — Single tooth connecting left with 3 triangular dots above.",
          medial: "ـثـ — Medial tooth with 3 triangular dots above.",
          final: "ـث — Full final boat with 3 triangular dots above."
        },
        commonMistakes: [
          "Drawing the 3 dots in a straight line instead of an upright triangle.",
          "Inverting the triangle with two dots on top and one below."
        ],
        proTip: "In fast cursive, 3 dots are frequently drawn as a small peaked caret (^)."
      }
    ]
  },
  {
    id: 'loop',
    title: 'Loop / Hook Family',
    arabicGroup: 'ج ح خ',
    letters: [
      {
        char: 'ح',
        name: "Ḥā'",
        trans: "ḥ",
        dots: "Bare mother skeleton — zero dots anywhere",
        dotCount: 0,
        dotPosition: "None",
        startingPoint: "Start above the baseline on the left, wave up-right to form crown.",
        strokeSteps: [
          "1. Start above the baseline, stroke rightward with a slight wavy crest to form the brow.",
          "2. Retrace backward along the crest to its midpoint.",
          "3. Sweep backward and downward to form a large semi-circular belly that drops below the baseline.",
          "4. Leave bare: no dots are added."
        ],
        connectedGuidance: {
          isolated: "ح — Wavy crown above baseline with large descending belly below.",
          initial: "حـ — Form the crown, retrace directly down onto the baseline, and glide left. Belly is dropped!",
          medial: "ـحـ — Baseline rises into the hook brow, retraces, and glides forward on the baseline.",
          final: "ـح — Baseline joins the brow, then plunges into the full descending belly."
        },
        commonMistakes: [
          "Drawing a closed circle like the Latin letter 'O'.",
          "Keeping the belly above the baseline in isolated form."
        ],
        proTip: "The crown sits above the baseline; the belly plunges deeply below the baseline."
      },
      {
        char: 'ج',
        name: "Jīm",
        trans: "j",
        dots: "1 dot placed inside the belly (or below baseline when connected)",
        dotCount: 1,
        dotPosition: "Belly / Below",
        startingPoint: "Same hook skeleton as Ḥā'.",
        strokeSteps: [
          "1. Draw the top wavy crown above the baseline.",
          "2. Form the descending semi-circular belly below baseline.",
          "3. Lift pen! Place 1 dot centered inside the belly curve (or below baseline in initial/medial)."
        ],
        connectedGuidance: {
          isolated: "ج — Hook skeleton with 1 dot centered in belly.",
          initial: "جـ — Flattened hook on baseline with 1 dot below baseline.",
          medial: "ـجـ — Medial hook with 1 dot below baseline.",
          final: "ـج — Final hook with descending belly and 1 dot inside belly."
        },
        commonMistakes: [
          "Placing the dot above the crown instead of inside/below.",
          "Drawing the dot too close to the baseline where it gets lost."
        ],
        proTip: "Remember: 'Jīm has a gem in its belly'."
      },
      {
        char: 'خ',
        name: "Khā'",
        trans: "kh",
        dots: "1 dot placed strictly above the crown/peak",
        dotCount: 1,
        dotPosition: "Above Crown",
        startingPoint: "Same hook skeleton as Ḥā' and Jīm.",
        strokeSteps: [
          "1. Draw the wavy brow and descending belly.",
          "2. Lift pen! Place exactly 1 dot centered above the apex of the crown."
        ],
        connectedGuidance: {
          isolated: "خ — Full hook with 1 dot above crown.",
          initial: "خـ — Baseline hook connecting left with 1 dot above.",
          medial: "ـخـ — Medial hook with 1 dot above.",
          final: "ـخ — Final hook with descending belly and 1 dot above."
        },
        commonMistakes: [
          "Putting the dot inside the belly (which turns it into Jīm).",
          "Placing the dot too far to the right."
        ],
        proTip: "Khā' wears a crown: the dot always sits on top of its head."
      }
    ]
  },
  {
    id: 'angle',
    title: 'Short Angle Family (Non-Connectors)',
    arabicGroup: 'د ذ',
    letters: [
      {
        char: 'د',
        name: "Dāl",
        trans: "d",
        dots: "Zero dots — bare angled corner",
        dotCount: 0,
        dotPosition: "None",
        startingPoint: "Start 3mm above the baseline, slanting down-forward.",
        strokeSteps: [
          "1. Start above the baseline, slant down and forward at a ~60° angle to touch the baseline.",
          "2. Make a sharp corner transition and glide flat along the baseline from right to left.",
          "3. Stop! Both strokes sit strictly ON or ABOVE the baseline."
        ],
        connectedGuidance: {
          isolated: "د — Standalone upright angle resting flat on the baseline.",
          initial: "د — Non-connector: never joins forward; subsequent letter starts anew.",
          medial: "ـد — Connected from right: stroke rises into peak, retraces, and sits on baseline.",
          final: "ـد — Connected from right, terminating on baseline."
        },
        commonMistakes: [
          "Letting the lower stroke plunge below the baseline (which turns it into Rā'!).",
          "Attempting to connect forward to the following letter."
        ],
        proTip: "Dāl sits like a chair flat on the floor (baseline). It NEVER drops into the basement."
      },
      {
        char: 'ذ',
        name: "Dhāl",
        trans: "dh",
        dots: "1 dot placed directly above the apex",
        dotCount: 1,
        dotPosition: "Above",
        startingPoint: "Same angled skeleton as Dāl.",
        strokeSteps: [
          "1. Form the identical angled corner resting on the baseline.",
          "2. Lift pen! Place 1 dot directly above the upper angle tip."
        ],
        connectedGuidance: {
          isolated: "ذ — Angled skeleton with 1 dot above.",
          initial: "ذ — Non-connector with 1 dot above.",
          medial: "ـذ — Connected from right with 1 dot above.",
          final: "ـذ — Connected from right with 1 dot above."
        },
        commonMistakes: [
          "Confusing Dhāl with Zāy (ز). Dhāl is flat on the baseline; Zāy curves below.",
          "Connecting forward to the left."
        ],
        proTip: "Dhāl has an angled corner; Zāy has a smooth banana curve."
      }
    ]
  },
  {
    id: 'curve',
    title: 'Descending Curve Family (Non-Connectors)',
    arabicGroup: 'ر ز',
    letters: [
      {
        char: 'ر',
        name: "Rā'",
        trans: "r",
        dots: "Zero dots — bare descending crescent",
        dotCount: 0,
        dotPosition: "None",
        startingPoint: "Start just 1mm above baseline, swooping downward.",
        strokeSteps: [
          "1. Start just above the baseline with a short vertical tick.",
          "2. Swoop smoothly downward and left in a crescent banana curve that drops BELOW the baseline.",
          "3. Taper off to a fine point at the bottom left."
        ],
        connectedGuidance: {
          isolated: "ر — Smooth crescent plunging below the baseline.",
          initial: "ر — Non-connector: drops below baseline, never joins left.",
          medial: "ـر — Incoming baseline stroke rises slightly, then plunges into crescent curve below baseline.",
          final: "ـر — Connected from right, curving below baseline."
        },
        commonMistakes: [
          "Making a sharp 90° corner with a flat base (confusing it with Dāl).",
          "Connecting forward to the left."
        ],
        proTip: "Rā' is like a slide at a playground: smooth downward curve into the basement."
      },
      {
        char: 'ز',
        name: "Zāy",
        trans: "z",
        dots: "1 dot placed directly above the initial head",
        dotCount: 1,
        dotPosition: "Above",
        startingPoint: "Same downward crescent as Rā'.",
        strokeSteps: [
          "1. Swoop smoothly below the baseline in a crescent curve.",
          "2. Lift pen! Place 1 dot centered directly above the top tip."
        ],
        connectedGuidance: {
          isolated: "ز — Descending crescent with 1 dot above.",
          initial: "ز — Non-connector with 1 dot above.",
          medial: "ـز — Connected from right, plunging below baseline with 1 dot above.",
          final: "ـز — Connected from right with 1 dot above."
        },
        commonMistakes: [
          "Putting the dot below the curve.",
          "Drawing an angle instead of a smooth curve."
        ],
        proTip: "Zāy swoops below the baseline with a dot above; Dhāl sits ON the baseline with a dot above."
      }
    ]
  },
  {
    id: 'teeth',
    title: 'Three Teeth Family',
    arabicGroup: 'س ش',
    letters: [
      {
        char: 'س',
        name: "Sīn",
        trans: "s",
        dots: "Zero dots — bare three teeth and deep tail",
        dotCount: 0,
        dotPosition: "None",
        startingPoint: "Start on baseline with the first small tooth on the right.",
        strokeSteps: [
          "1. Draw the first tooth (short downward-upward tick).",
          "2. Draw the second tooth immediately adjacent.",
          "3. Draw the third tooth connecting back down to the baseline.",
          "4. Plunge down below the baseline to form a deep semicircular bowl that loops back up to the baseline."
        ],
        connectedGuidance: {
          isolated: "س — Exactly 3 teeth on baseline + deep semicircular tail below baseline.",
          initial: "سـ — Exactly 3 teeth on baseline, then glides left to connect. Tail is dropped!",
          medial: "ـسـ — Connecting line flows into 3 teeth on baseline, then continues left.",
          final: "ـس — Connecting line flows into 3 teeth, then restores the deep descending tail."
        },
        commonMistakes: [
          "Drawing 2 or 4 teeth instead of exactly 3 teeth.",
          "Making the teeth too tall (they should be small, compact ripples)."
        ],
        proTip: "Count the valleys or peaks: always exactly 3 teeth along the baseline."
      },
      {
        char: 'ش',
        name: "Shīn",
        trans: "sh",
        dots: "3 dots placed above the teeth in an upright triangle",
        dotCount: 3,
        dotPosition: "Above (Triangle)",
        startingPoint: "Same 3-teeth skeleton as Sīn.",
        strokeSteps: [
          "1. Draw the 3 teeth along the baseline.",
          "2. Complete the descending semicircular tail (in isolated/final).",
          "3. Lift pen! Place 3 dots in an upright pyramid (2 base dots, 1 top dot) above the teeth."
        ],
        connectedGuidance: {
          isolated: "ش — 3 teeth + descending tail + 3 dots above in a triangle.",
          initial: "شـ — 3 teeth on baseline connecting left + 3 dots above.",
          medial: "ـشـ — Medial 3 teeth connecting both sides + 3 dots above.",
          final: "ـش — Medial connection into 3 teeth + descending tail + 3 dots above."
        },
        commonMistakes: [
          "Placing the 3 dots beneath the teeth.",
          "Spreading the dots out across all 3 teeth instead of clustering them in a triangle above."
        ],
        proTip: "Cluster the 3 dots neatly over the middle tooth."
      }
    ]
  },
  {
    id: 'oval',
    title: 'Oval Loop and Tooth Family',
    arabicGroup: 'ص ض',
    letters: [
      {
        char: 'ص',
        name: "Ṣād",
        trans: "ṣ",
        dots: "Zero dots — emphatic loop with mandatory trailing tooth",
        dotCount: 0,
        dotPosition: "None",
        startingPoint: "Start on baseline, loop upward and forward to the right.",
        strokeSteps: [
          "1. Start on baseline, sweep upward and forward to the right, then loop back counter-clockwise to baseline.",
          "2. Glide along baseline to close the oval loop.",
          "3. Immediately draw a small, mandatory vertical upward tooth (سن).",
          "4. Plunge below baseline into the deep semicircular tail."
        ],
        connectedGuidance: {
          isolated: "ص — Oval loop + upward tooth + deep semicircular tail below baseline.",
          initial: "صـ — Oval loop + upward tooth + glide left on baseline. (Tooth is MANDATORY!).",
          medial: "ـصـ — Baseline enters loop, closes loop, forms tooth, continues left.",
          final: "ـص — Baseline enters loop, forms tooth, finishes with deep descending tail."
        },
        commonMistakes: [
          "Forgetting the small tooth after the oval loop! This is the #1 mistake in Arabic handwriting.",
          "Drawing a circle instead of an elongated aerodynamic oval."
        ],
        proTip: "Golden Rule: Ṣād and Ḍād MUST have their tooth. Without the tooth, it is illiterate Arabic."
      },
      {
        char: 'ض',
        name: "Ḍād",
        trans: "ḍ",
        dots: "1 dot placed directly above the oval loop",
        dotCount: 1,
        dotPosition: "Above Loop",
        startingPoint: "Same loop-and-tooth skeleton as Ṣād.",
        strokeSteps: [
          "1. Form the oval loop and mandatory trailing tooth.",
          "2. Complete the descending tail (or connect forward).",
          "3. Lift pen! Place 1 dot centered directly above the oval body."
        ],
        connectedGuidance: {
          isolated: "ض — Oval loop + tooth + tail + 1 dot above loop.",
          initial: "ضـ — Oval loop + tooth + connects left + 1 dot above.",
          medial: "ـضـ — Medial loop + tooth + 1 dot above.",
          final: "ـض — Final loop + tooth + tail + 1 dot above."
        },
        commonMistakes: [
          "Placing the dot on the tooth instead of over the oval body.",
          "Omitting the tooth."
        ],
        proTip: "Arabic is known as 'Lughat al-Ḍād' (The Language of Ḍād). Master its loop, tooth, and dot!"
      }
    ]
  },
  {
    id: 'staff',
    title: 'Upright Staff Family',
    arabicGroup: 'ط ظ',
    letters: [
      {
        char: 'ط',
        name: "Ṭā'",
        trans: "ṭ",
        dots: "Zero dots — oval base pierced by vertical staff",
        dotCount: 0,
        dotPosition: "None",
        startingPoint: "Start on baseline, form oval base first, then drop staff.",
        strokeSteps: [
          "1. Start on the baseline, form the oval base loop (same loop motion as Ṣād).",
          "2. Continue the baseline stroke flat to the left (NO tooth, NO tail!).",
          "3. Lift pen! Draw a tall straight vertical staff (like Alif) dropping straight onto the right juncture of the loop.",
          "4. Leave bare: zero dots."
        ],
        connectedGuidance: {
          isolated: "ط — Oval loop + tall vertical staff. Never drops below baseline.",
          initial: "طـ — Oval loop + staff, connecting flat along baseline to the left.",
          medial: "ـطـ — Connected on both sides along baseline + tall staff.",
          final: "ـط — Connected from right + tall staff."
        },
        commonMistakes: [
          "Drawing the vertical staff first before the loop. Always draw the base loop first!",
          "Adding a tooth like Ṣād. Ṭā' has NO tooth."
        ],
        proTip: "Order of operations: Loop first, baseline arm second, vertical pole last."
      },
      {
        char: 'ظ',
        name: "Ẓā'",
        trans: "ẓ",
        dots: "1 dot placed to the upper right of the staff",
        dotCount: 1,
        dotPosition: "Above / Right of Staff",
        startingPoint: "Same base loop and staff as Ṭā'.",
        strokeSteps: [
          "1. Form the oval base loop along the baseline.",
          "2. Drop the tall vertical staff down onto the right edge of the loop.",
          "3. Lift pen! Place 1 dot to the upper right of the staff."
        ],
        connectedGuidance: {
          isolated: "ظ — Oval loop + vertical staff + 1 dot.",
          initial: "ظـ — Initial loop and staff connecting left + 1 dot.",
          medial: "ـظـ — Medial loop and staff + 1 dot.",
          final: "ـظ — Final loop and staff + 1 dot."
        },
        commonMistakes: [
          "Placing the dot to the left of the staff.",
          "Dropping any part below the baseline."
        ],
        proTip: "The dot nestles snugly in the upper right crook between the staff and loop."
      }
    ]
  },
  {
    id: 'eye',
    title: 'Open Eye / Similar Shapes Family',
    arabicGroup: 'ع غ',
    letters: [
      {
        char: 'ع',
        name: "'Ayn",
        trans: "‘",
        dots: "Zero dots — crescent head with descending belly",
        dotCount: 0,
        dotPosition: "None",
        startingPoint: "Start above baseline on the left, curving in a crescent.",
        strokeSteps: [
          "1. Start above baseline, draw a small open crescent (like a mini-Latin 'c') facing right.",
          "2. From the bottom tip on the baseline, sweep backward and downward into a massive semi-circular belly below baseline.",
          "3. Leave bare: zero dots."
        ],
        connectedGuidance: {
          isolated: "ع — Small open crescent head above baseline + large descending belly below.",
          initial: "عـ — Open crescent head sitting on baseline, connecting left. Belly is dropped!",
          medial: "ـعـ — Connecting stroke slants up, forms an inverted shaded triangle, continues left.",
          final: "ـع — Inverted shaded triangle head + full descending belly below baseline."
        },
        commonMistakes: [
          "Leaving medial and final 'Ayn open like initial form. In handwriting, medial/final 'Ayn is always closed/shaded!",
          "Facing the crescent to the left instead of right."
        ],
        proTip: "Initial 'Ayn is open like an eye looking right. Medial & final 'Ayn are closed inverted triangles."
      },
      {
        char: 'غ',
        name: "Ghayn",
        trans: "gh",
        dots: "1 dot placed directly above the crescent crest",
        dotCount: 1,
        dotPosition: "Above",
        startingPoint: "Same crescent skeleton as 'Ayn.",
        strokeSteps: [
          "1. Draw the small crescent head above baseline.",
          "2. Form the descending belly (in isolated/final) or connect on baseline.",
          "3. Lift pen! Place 1 dot centered directly above the top brow."
        ],
        connectedGuidance: {
          isolated: "غ — Crescent head + descending belly + 1 dot above.",
          initial: "غـ — Open crescent on baseline + 1 dot above.",
          medial: "ـغـ — Inverted shaded triangle + 1 dot above.",
          final: "ـغ — Inverted shaded triangle + descending belly + 1 dot above."
        },
        commonMistakes: [
          "Placing the dot inside the crescent curve.",
          "Confusing medial Ghayn (ـغـ) with medial Fā' (ـفـ). Medial Ghayn is an inverted flat triangle; Fā' is a rounded loop with an open hole."
        ],
        proTip: "Medial Ghayn is a solid dark inverted triangle; medial Fā' is a hollow round loop."
      }
    ]
  },
  {
    id: 'bowl',
    title: 'Dot & Bowl Variations (Fā\' vs Qāf)',
    arabicGroup: 'ف ق',
    letters: [
      {
        char: 'ف',
        name: "Fā'",
        trans: "f",
        dots: "1 dot placed directly above the round head",
        dotCount: 1,
        dotPosition: "Above",
        startingPoint: "Start 2mm above baseline, loop up and counter-clockwise with a neck.",
        strokeSteps: [
          "1. Start above baseline, loop upward and counter-clockwise into a rounded head with a short neck sitting ON the baseline.",
          "2. Glide along baseline to form a shallow, flat boat-like bowl (identical to Bā'!).",
          "3. Curve slightly upward at left edge. Entire letter sits ON the baseline.",
          "4. Lift pen! Place exactly 1 dot centered above the round head."
        ],
        connectedGuidance: {
          isolated: "ف — Round head with short neck + flat baseline boat bowl + 1 dot above.",
          initial: "فـ — Round head sitting on baseline with short neck, connecting left + 1 dot above.",
          medial: "ـفـ — Loop sits directly on baseline without neck + 1 dot above.",
          final: "ـف — Loop + flat baseline boat bowl + 1 dot above."
        },
        commonMistakes: [
          "Dropping the bowl below the baseline. Fā' is strictly a baseline letter!",
          "Giving medial Fā' a neck. In medial position, Fā' sits flat on the baseline wire."
        ],
        proTip: "Fā' has a boat bottom (flat on the baseline) and 1 dot."
      },
      {
        char: 'ق',
        name: "Qāf",
        trans: "q",
        dots: "2 dots placed horizontally side-by-side above the round head",
        dotCount: 2,
        dotPosition: "Above (2 Dots)",
        startingPoint: "Start on baseline, form round head, then sink below baseline.",
        strokeSteps: [
          "1. Form the round head loop sitting directly on the baseline.",
          "2. Plunge DEEPLY below the baseline to form a circular sinking bowl (identical to Nūn!).",
          "3. Curve upward to terminate just at the baseline.",
          "4. Lift pen! Place 2 dots horizontally side-by-side above the head."
        ],
        connectedGuidance: {
          isolated: "ق — Round head + deep sinking circular bowl below baseline + 2 dots above.",
          initial: "قـ — Round head on baseline connecting left + 2 dots above.",
          medial: "ـقـ — Round loop on baseline connecting both sides + 2 dots above.",
          final: "ـق — Round head + deep sinking circular bowl below baseline + 2 dots above."
        },
        commonMistakes: [
          "Writing isolated Qāf on the baseline like Fā'. Qāf's bowl MUST sink below the baseline!",
          "Confusing initial Fā' and Qāf: both sit on the baseline, but Fā' has 1 dot and Qāf has 2 dots."
        ],
        proTip: "Qāf has a Nūn bottom (sinks into the basement) and 2 dots."
      }
    ]
  }
];

export default function ArabicHandwritingStudio() {
  const [activeGroupId, setActiveGroupId] = useState('boat');
  const [selectedLetterIdx, setSelectedLetterIdx] = useState(0);
  const [viewMode, setViewMode] = useState('strokeOrder'); // 'strokeOrder', 'tracingPad', 'positions'
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const activeGroup = HANDWRITING_GROUPS.find(g => g.id === activeGroupId) || HANDWRITING_GROUPS[0];
  const activeLetter = activeGroup.letters[selectedLetterIdx] || activeGroup.letters[0];

  // Reset letter index if group changes and index is out of bounds
  useEffect(() => {
    setSelectedLetterIdx(0);
    clearCanvas();
  }, [activeGroupId]);

  // Clear canvas whenever letter changes
  useEffect(() => {
    clearCanvas();
  }, [selectedLetterIdx]);

  // Setup drawing canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#2dd4bf'; // teal-400
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="relative z-10 w-full my-8 space-y-6 overflow-visible font-sans">
      {/* Main Studio Card */}
      <div className="rounded-3xl bg-slate-900/95 border-2 border-teal-500/40 p-5 sm:p-8 shadow-2xl backdrop-blur-md">
        
        {/* Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0 shadow-lg shadow-teal-500/10">
              <PenTool className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-2.5 py-0.5 rounded-md border border-teal-800/60">
                  Interactive Practice Studio
                </span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  • Arabic Calligraphy & Stroke Mechanics
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide mt-1">
                Arabic Handwriting & Stroke Direction Studio
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-full bg-teal-950/80 text-teal-300 border border-teal-800/60 flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" /> Right-to-Left (RTL) Pen Flow
            </span>
          </div>
        </div>

        {/* 9 Skeleton Group Tabs */}
        <div className="pt-5 pb-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
            Select Letter Skeleton Family (9 Groups):
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-3 custom-scrollbar">
            {HANDWRITING_GROUPS.map((grp) => {
              const isSelected = grp.id === activeGroupId;
              return (
                <button
                  key={grp.id}
                  onClick={() => setActiveGroupId(grp.id)}
                  type="button"
                  className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-2.5 transition-all shrink-0 ${
                    isSelected
                      ? 'bg-teal-500 text-slate-950 ring-2 ring-teal-400 shadow-lg shadow-teal-500/25 scale-105'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-750 border border-slate-700/80'
                  }`}
                >
                  <span
                    className="text-lg sm:text-xl font-serif leading-none"
                    style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                    dir="rtl"
                  >
                    {grp.arabicGroup}
                  </span>
                  <span>{grp.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Letter Selector Within Group */}
        <div className="my-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Letters in this group:</span>
            <div className="flex items-center gap-1.5">
              {activeGroup.letters.map((letObj, idx) => {
                const isSelected = idx === selectedLetterIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedLetterIdx(idx)}
                    type="button"
                    className={`min-w-[44px] h-11 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-teal-500 text-slate-950 ring-2 ring-teal-300 shadow-md scale-105'
                        : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    <span 
                      className="text-2xl font-serif"
                      style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                    >
                      {letObj.char}
                    </span>
                    <span className="text-xs">{letObj.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* View Mode Toggle: Stroke Order vs Positional Forms */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('strokeOrder')}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'strokeOrder'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Stroke Guide & Tracing Pad</span>
            </button>
            <button
              onClick={() => setViewMode('positions')}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'positions'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>4 Positional Forms</span>
            </button>
          </div>
        </div>

        {/* Selected Letter Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-stretch">
          
          {/* Left Column: Big Letter Display & Dot Breakdown (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-teal-500/30 p-6 flex flex-col justify-between items-center text-center shadow-lg relative overflow-hidden group">
            {/* Watermark Pattern */}
            <div className="absolute top-2 right-2 text-slate-800/40 text-7xl font-serif select-none pointer-events-none">
              {activeLetter.char}
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                <span>LETTER FOCUS</span>
                <span className="text-teal-400 font-bold">{activeLetter.dotPosition}</span>
              </div>

              {/* Big Arabic Letter on Baseline Guide */}
              <div className="relative my-4 py-8 px-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-hidden">
                {/* Horizontal Baseline Indicator */}
                <div className="absolute w-full h-[1px] bg-teal-500/30 top-1/2 left-0 pointer-events-none" />
                <span className="absolute left-2 top-1/2 -translate-y-4 text-[9px] font-mono text-teal-500/60 uppercase">
                  Baseline (سَطْر)
                </span>

                <span
                  className="text-8xl sm:text-9xl font-serif text-teal-300 font-extrabold select-none transition-transform duration-300 group-hover:scale-105 drop-shadow-2xl"
                  style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                  dir="rtl"
                >
                  {activeLetter.char}
                </span>
              </div>

              <div className="mt-2 space-y-1">
                <h4 className="text-2xl font-black text-white">
                  {activeLetter.name} ({activeLetter.trans})
                </h4>
                <p className="text-xs text-slate-400">
                  Standard Arabic Consonant
                </p>
              </div>
            </div>

            {/* Dot & Position Badge */}
            <div className="w-full mt-6 pt-4 border-t border-slate-800/80 text-left space-y-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-teal-950/40 border border-teal-500/30">
                <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <strong className="text-teal-200 block font-bold mb-0.5">
                    Dot Placement (نُقْطَة):
                  </strong>
                  <span className="text-slate-300">{activeLetter.dots}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Workspace (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            
            {/* VIEW 1: Step-by-Step Stroke Order & Interactive Tracing Pad */}
            {viewMode === 'strokeOrder' && (
              <div className="h-full rounded-2xl bg-slate-950/90 border border-slate-800 p-6 space-y-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <PenTool className="w-4 h-4 text-teal-400" />
                      <h5 className="text-sm font-bold uppercase tracking-wider text-white">
                        Handwriting Stroke Sequence (Where to start & direction)
                      </h5>
                    </div>
                    <span className="text-xs text-teal-400 font-mono">
                      RTL Order
                    </span>
                  </div>

                  {/* Starting Point Callout */}
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-900 border border-slate-750 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 font-black flex items-center justify-center shrink-0 text-xs">
                      1st
                    </div>
                    <div>
                      <span className="text-xs font-bold text-teal-300 block">Starting Pen Placement:</span>
                      <p className="text-xs text-slate-300">{activeLetter.startingPoint}</p>
                    </div>
                  </div>

                  {/* Numbered Stroke Sequence */}
                  <div className="mt-4 space-y-2.5">
                    {activeLetter.strokeSteps.map((step, sIdx) => (
                      <div 
                        key={sIdx}
                        className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3 hover:border-slate-700 transition-all"
                      >
                        <span className="w-6 h-6 rounded-full bg-teal-950 border border-teal-500/40 text-teal-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Integrated Tracing & Practice Canvas Pad */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                        <Eraser className="w-3.5 h-3.5" /> Interactive Handwriting Tracing Pad
                      </span>
                      <button
                        onClick={clearCanvas}
                        type="button"
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 border border-slate-700 transition-all"
                      >
                        <RotateCcw className="w-3 h-3" /> Clear Pad
                      </button>
                    </div>

                    <div className="relative w-full h-44 sm:h-52 rounded-2xl bg-slate-900 border-2 border-dashed border-slate-750 overflow-hidden select-none cursor-crosshair">
                      {/* Baseline Guideline */}
                      <div className="absolute w-full h-[1.5px] bg-teal-500/40 top-[58%] left-0 pointer-events-none" />
                      <span className="absolute right-3 top-[59%] text-[10px] font-mono text-teal-400/70 select-none">
                        Baseline (سَطْر) ➔
                      </span>

                      {/* Faint Tracing Background Letter */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span
                          className="text-7xl sm:text-8xl font-serif text-slate-700/35 font-bold select-none"
                          style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                          dir="rtl"
                        >
                          {activeLetter.char}
                        </span>
                      </div>

                      {/* HTML5 Active Drawing Canvas */}
                      <canvas
                        ref={canvasRef}
                        width={600}
                        height={220}
                        className="absolute inset-0 w-full h-full z-10 touch-none"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                      />

                      {!hasDrawn && (
                        <div className="absolute bottom-2 left-3 text-[11px] font-mono text-slate-500 pointer-events-none">
                          ✏️ Trace with mouse or finger (Right to Left)
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pro Calligrapher Tip */}
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <strong className="text-emerald-300 block font-bold mb-0.5">Teacher Handwriting Advice:</strong>
                    <span className="text-slate-300">{activeLetter.proTip}</span>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: Interactive Tracing Canvas / Practice Pad */}
            {viewMode === 'tracingPad' && (
              <div className="h-full rounded-2xl bg-slate-950/90 border border-slate-800 p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Eraser className="w-4 h-4 text-teal-400" />
                      <h5 className="text-sm font-bold uppercase tracking-wider text-white">
                        Digital Tracing & Handwriting Practice Pad
                      </h5>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={clearCanvas}
                        type="button"
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Clear Pad
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    Use your mouse or finger to trace the letter along the baseline from right to left:
                  </p>

                  {/* Canvas Container with Faint Letter Overlay & Guidelines */}
                  <div className="relative w-full h-56 sm:h-64 mt-3 rounded-2xl bg-slate-900 border-2 border-dashed border-slate-750 overflow-hidden select-none cursor-crosshair">
                    
                    {/* Baseline Guideline */}
                    <div className="absolute w-full h-[1.5px] bg-teal-500/40 top-[58%] left-0 pointer-events-none" />
                    <span className="absolute right-3 top-[59%] text-[10px] font-mono text-teal-400/70 select-none">
                      Baseline (سَطْر) ➔
                    </span>

                    {/* Ascender Guideline */}
                    <div className="absolute w-full h-[1px] bg-slate-700/40 top-[25%] left-0 pointer-events-none stroke-dash" />
                    
                    {/* Descender Guideline */}
                    <div className="absolute w-full h-[1px] bg-slate-700/40 top-[85%] left-0 pointer-events-none stroke-dash" />

                    {/* Faint Tracing Background Letter */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span
                        className="text-8xl sm:text-9xl font-serif text-slate-700/40 font-bold select-none"
                        style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                        dir="rtl"
                      >
                        {activeLetter.char}
                      </span>
                    </div>

                    {/* HTML5 Active Drawing Canvas */}
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={260}
                      className="absolute inset-0 w-full h-full z-10 touch-none"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />

                    {/* Prompt when not drawn */}
                    {!hasDrawn && (
                      <div className="absolute bottom-2 left-3 text-[11px] font-mono text-slate-500 pointer-events-none">
                        ✏️ Click/touch and draw letter here (Right to Left)
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>Golden rule: Complete the base stroke first, then lift to add dots.</span>
                  <span className="text-teal-400 font-semibold">{hasDrawn ? '✓ Practiced' : 'Try tracing now'}</span>
                </div>
              </div>
            )}

            {/* VIEW 3: Positional Forms Matrix (Initial, Medial, Final, Isolated) */}
            {viewMode === 'positions' && (
              <div className="h-full rounded-2xl bg-slate-950/90 border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-teal-400" />
                    <h5 className="text-sm font-bold uppercase tracking-wider text-white">
                      Positional Forms in Handwriting (RTL Connection)
                    </h5>
                  </div>
                  <span className="text-xs text-teal-400 font-mono">4 Positions</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2" dir="rtl">
                  
                  {/* 1. Initial */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/30 text-right space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-teal-400">1. Initial (بِدَايَة)</span>
                      <span className="text-3xl font-serif text-teal-200 font-bold" style={{ fontFamily: "'Amiri', serif" }}>
                        {activeLetter.char}ـ
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans" dir="ltr">
                      {activeLetter.connectedGuidance.initial}
                    </p>
                  </div>

                  {/* 2. Medial */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/30 text-right space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-teal-400">2. Medial (وَسَط)</span>
                      <span className="text-3xl font-serif text-teal-200 font-bold" style={{ fontFamily: "'Amiri', serif" }}>
                        ـ{activeLetter.char}ـ
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans" dir="ltr">
                      {activeLetter.connectedGuidance.medial}
                    </p>
                  </div>

                  {/* 3. Final */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/30 text-right space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-teal-400">3. Final (نِهَايَة)</span>
                      <span className="text-3xl font-serif text-teal-200 font-bold" style={{ fontFamily: "'Amiri', serif" }}>
                        ـ{activeLetter.char}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans" dir="ltr">
                      {activeLetter.connectedGuidance.final}
                    </p>
                  </div>

                  {/* 4. Isolated */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-right space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-400">4. Isolated (مُنْفَصِل)</span>
                      <span className="text-3xl font-serif text-white font-bold" style={{ fontFamily: "'Amiri', serif" }}>
                        {activeLetter.char}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans" dir="ltr">
                      {activeLetter.connectedGuidance.isolated}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Common Mistakes & How to Avoid Them Callout */}
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Common Handwriting Mistakes to Avoid for {activeLetter.name}:</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pl-6 list-disc">
                {activeLetter.commonMistakes.map((mistake, mIdx) => (
                  <li key={mIdx} className="leading-relaxed">
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
