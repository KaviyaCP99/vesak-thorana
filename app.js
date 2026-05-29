/* =====================================================================
   VESAK THORANA CORE ENGINE - HIGH-FIDELITY LED GRAPHICS & AUDIO SYNTH
   ===================================================================== */

(function() {

  // ════════════════════════════════════════════════════════════
  // 🛡️ ANTI-INSPECTION PROTECTION
  // ════════════════════════════════════════════════════════════
  (function setupProtection() {
    const SACRED_MSG = `
╔══════════════════════════════════════════════╗
║                                              ║
║         🪔 අන්සතු දේ ලබා ගැනීම 🪔            ║
║                                              ║
║                පාපයකි.                       ║
║                                              ║
║   Taking what is not given is unwholesome.   ║
║                                              ║
║         - බුද්ධ වචනය / Buddha's Teaching     ║
║                                              ║
╚══════════════════════════════════════════════╝
    `;

    // Show warning page replacing entire site
    function showWarning(reason) {
      document.documentElement.innerHTML = `
        <html><head><title>අන්සතු දේ ලබා ගැනීම පාපයකි</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;700;900&display=swap');
          body {
            margin: 0; padding: 0;
            font-family: 'Noto Sans Sinhala', sans-serif;
            background: radial-gradient(circle, #1a0500 0%, #000 100%);
            color: #f8d060;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            overflow: hidden;
          }
          .warn-card {
            padding: 60px 40px;
            max-width: 600px;
            animation: fadeUp 1s ease;
          }
          .warn-icon {
            font-size: 80px;
            margin-bottom: 24px;
            animation: pulse 2s ease infinite;
          }
          h1 {
            font-size: 36px;
            color: #ff4500;
            margin: 0 0 16px;
            font-weight: 900;
            text-shadow: 0 0 30px rgba(255, 69, 0, 0.6);
          }
          h2 {
            font-size: 22px;
            color: #f8d060;
            margin: 0 0 32px;
            font-weight: 700;
          }
          p {
            font-size: 16px;
            line-height: 1.8;
            color: #fff;
            margin: 12px 0;
            opacity: 0.85;
          }
          .quote {
            font-style: italic;
            color: #aaa;
            margin-top: 30px;
            font-size: 14px;
            padding-top: 24px;
            border-top: 1px solid rgba(248, 208, 96, 0.2);
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style></head>
        <body>
          <div class="warn-card">
            <div class="warn-icon">🪔</div>
            <h1>අන්සතු දේ ලබා ගැනීම පාපයකි</h1>
            <h2>Taking what is not given is unwholesome</h2>
            <p>මෙය වෙසක් උත්සවය වෙනුවෙන් සකස් කරන ලද ඩිජිටල් තොරණයකි.</p>
            <p>This is a digital Vesak Thorana created with devotion.</p>
            <div class="quote">
              "අදින්නාදානා වේරමණී සික්ඛාපදං සමාදියාමි"<br>
              <small>I undertake the precept to refrain from taking what is not given</small>
            </div>
          </div>
        </body></html>
      `;
      console.clear();
      console.log(SACRED_MSG);
    }

    // ── Block right-click ──
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });

    // ── Block keyboard shortcuts ──
    document.addEventListener('keydown', (e) => {
      // F12
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        showWarning('F12');
        return false;
      }
      // Ctrl+Shift+I (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        showWarning('Ctrl+Shift+I');
        return false;
      }
      // Ctrl+Shift+J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        showWarning('Ctrl+Shift+J');
        return false;
      }
      // Ctrl+Shift+C (Inspect element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        showWarning('Ctrl+Shift+C');
        return false;
      }
      // Ctrl+U (View source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        showWarning('Ctrl+U');
        return false;
      }
      // Ctrl+S (Save page)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        showWarning('Ctrl+S');
        return false;
      }
    });

    // ── Disable text selection ──
    document.addEventListener('selectstart', (e) => {
      // Allow only in donation input field & visitor name input
      const target = e.target;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return true;
      }
      e.preventDefault();
      return false;
    });

    // ── Disable image drag ──
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });

    // ── DevTools detection (DESKTOP ONLY — mobile has unreliable measurements) ──
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(navigator.userAgent);
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    // Skip DevTools detection on mobile/touch devices
    if (!isMobile && !isTouchDevice) {
      let devtoolsOpen = false;
      const threshold = 200;  // Increased threshold for safety
      
      setInterval(() => {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        
        if (widthDiff > threshold || heightDiff > threshold) {
          if (!devtoolsOpen) {
            devtoolsOpen = true;
            showWarning('DevTools detected');
          }
        }
      }, 2000);  // Less frequent check
    }

    // ── Console clear loop + warning ──
    setInterval(() => {
      console.clear();
      console.log(SACRED_MSG);
    }, 2000);

    // Initial console message
    console.log(SACRED_MSG);
    console.log('%cSTOP!', 'color: red; font-size: 60px; font-weight: bold;');
    console.log('%cමෙය නවත්වන්න! කරුණාකර තොරණය රසවිඳින්න.', 'color: #f8d060; font-size: 18px;');
  })();

  // Elements
  const canvas = document.getElementById('thoranaCanvas');
  const ctx = canvas.getContext('2d');
  const cx = 475;
  const cy = 450;
  
  // App States
  let dots = [];
  let isIgnited = false;
  let activePattern = 'aura'; // aura, chaser, peacock, rainbow, story
  let globalBrightness = 1.0;
  let globalSpeed = 1.0;
  let selectedChapter = 0;
  let currentLanguage = 'si'; // si or en
  
  // Custom painter brush
  let activeBrushColor = '#00ffff';
  let customPaintDots = [];
  let isPainting = false;

  // Thematic Palette
  const C = {
    gold: '#d4af37',
    goldBright: '#f8d060',
    spokes: '#e65c00',
    spokesDeep: '#b84500',
    innerRing: '#ff7700',
    borderRed: '#cc0022',
    borderDeep: '#8b0015',
    accent: '#ffa500',
    deepGold: '#8b6914',
    leafGreen: '#00cc66'
  };

// 🌟 TWO PEACOCKS - left & right, thorana දිහා බලාගෙන
const peacockLeft = new Image();
peacockLeft.src = "4.png"; // same image

const peacockRight = new Image();
peacockRight.src = "4.png"; // same image

// Buddha image
const buddhaImg = new Image();
buddhaImg.src = "b.png";

// Chapter images (w1.jpg ... w8.jpg)
  const chapterImages = [];
  for (let i = 1; i <= 8; i++) {
    const img = new Image();
    img.src = (i === 3) ? "w3.jpg" : `w${i}.jpg`;
    chapterImages.push(img);
  }

const BUDDHA = {
  width: 350,
  height: 350,
  offsetY: 75   // center adjust
};

const PEACOCK = {
  width: 180,
  height: 220,
  offsetY: 350,    // thorana center ඉඳන් පහළට
  offsetX: 340,    // center ඉඳන් left/right දුර
  opacity: 1.0,
  glow: true,
  glowColor: '#00e5ff',
  glowSize: 25
};

  // 1. GAUTAMA BUDDHA CHARITHAYA (THE 8 STORY PANELS DATA)
 const chapters = [
    {
      id: 1,
      img: "w1.jpg",
      gallery: ["w1a.jpg", "w1b.jpg", "w1c.jpg", "w1d.jpg", "w1e.jpg", "w1f.jpg"],
      titleSi: "සිද්ධාර්ථ කුමාරෝත්පත්තිය",
      titleEn: "The Birth of Prince Siddhartha",
      storySi: "ලුම්බිණි සල් උයනේදී මහාමායා දේවිය කුසින් සිද්ධාර්ථ කුමාරයා මෙලොවට බිහිවිය. උපන් සැණින් නෙළුම් මල් සතක් මත පියවර තබමින් 'අග්ගෝ හමස්මි ලෝකස්ස' යන අභීත සීහනාදය පතුරුවමින් ලොව අග්‍රප්‍රාප්ත වන බව ප්‍රකාශ කළ සේක.",
      storyEn: "Prince Siddhartha was born in the beautiful Sal grove of Lumbini to Queen Mahamaya. Immediately upon birth, the newborn prince walked seven steps on blooming lotus flowers and made a majestic declaration, proclaiming his future enlightenment and supreme nature to the world.",
      themeColor: '#f8d060'
    },
    {
      id: 2,
      img: "w2.jpg",
      gallery: ["w2a.jpg", "w2b.jpg", "w2c.jpg", "w2d.jpg", "w2e.jpg", "w2f.jpg"],
      titleSi: "වප් මඟුල් උත්සවය",
      titleEn: "The Royal Ploughing Festival",
      storySi: "ශුද්ධෝදන රජුගේ වප් මඟුල් මහෝත්සවයේදී සිද්ධාර්ථ කුමාරයා ජම්බු වෘක්ෂය (දඹ ගස) සෙවනේ පළමු වරට ආනාපානසති භාවනාවේ යෙදෙමින් ප්‍රථම ධ්‍යානය සමවන් සේක. උන්වහන්සේගේ තේජසින් ගසේ සෙවන දවස පුරා එකම තැන නොසැලී පැවතුණි.",
      storyEn: "During King Suddhodana's royal ploughing festival, the young Prince Siddhartha sat under the shade of a Jambu (Rose Apple) tree and naturally entered a state of deep meditation (the first Dhyana). Miraculously, the tree's shadow remained stationary throughout the day to shelter the meditating prince.",
      themeColor: '#00cc66'
    },
    {
      id: 3,
      img: "w3.jpg",
      gallery: ["w3a.jpg", "w3b.jpg", "w3c.jpg", "w3d.jpg", "w3e.jpg", "w3f.jpg"],
      titleSi: "සතර පෙරනිමිති දැකීම",
      titleEn: "The Four Sights",
      storySi: "මහා සැප සම්පත් මැද හැදුණු කුමාරයා උයන් කෙළියට යන මඟදී මහල්ලෙක්, ලෙඩෙක්, මළසිරුරක් සහ මහණ රුවක් යන සතර පෙරනිමිති දැක ගිහිගෙය කෙරෙහි කලකිරී, සසර දුකින් මිදීමේ ආශාව දැඩි කරගත් සේක.",
      storyEn: "Despite living a sheltered life of luxury, while traveling through the royal gardens, the prince encountered 'The Four Sights': an old man, a sick person, a corpse, and a serene wandering ascetic. These sights triggered deep disillusionment with worldly pleasures, inspiring his search for ultimate liberation.",
      themeColor: '#cc0022'
    },
    {
      id: 4,
      img: "w4.jpg",
      gallery: ["w4a.jpg", "w4b.jpg", "w4c.jpg", "w4d.jpg", "w4e.jpg", "w4f.jpg"],
      titleSi: "මහාභිනිෂ්ක්‍රමණය",
      titleEn: "The Great Renunciation",
      storySi: "සිද්ධාර්ථ කුමාරයා වයස අවුරුදු 29 දී යසෝධරා දේවිය හා රාහුල පුතණුවන් හැරදමා, සත්‍යය සොයා කන්ථක අසු පිට නැගී ඡන්න ඇමති සමඟ අනෝමා ගඟ අසබඩට ගොස් රාජකීය ආභරණ මුදාහැර අභිනිෂ්ක්‍රමණය කළ සේක.",
      storyEn: "At the age of 29, Prince Siddhartha renounced his royal life. Leaving behind his princess Yasodhara and newborn son Rahula, he rode into the midnight on his faithful stallion Kanthaka, accompanied by Channa, heading towards the river Anoma to cut his hair and become an ascetic.",
      themeColor: '#0055ff'
    },
    {
      id: 5,
      img: "w5.jpg",
      gallery: ["w5a.jpg", "w5b.jpg", "w5c.jpg", "w5d.jpg", "w5e.jpg", "w5f.jpg"],
      titleSi: "දුෂ්කරක්‍රියාවෙහි නිරත වීම",
      titleEn: "The Ascetic Practices",
      storySi: "සත්‍යය සෙවීමේ අරමුණින් උරුවේලාවේ සේනානිගමදී පස්වග මහණුන් සමඟ එක්ව වසර හයක් මුළුල්ලේ අතිශය කඨින ශරීර පීඩාකාරී දුෂ්කරක්‍රියාවෙහි නිරත වූ සේක. අවසානයේදී එය සත්‍ය අවබෝධයට මඟ නොවන බව වටහාගෙන මධ්‍යම ප්‍රතිපදාව තෝරාගත් සේක.",
      storyEn: "In his search for truth, the ascetic Siddhartha practiced extreme self-mortification for six long years in Uruvela alongside the five ascetics. Starving himself to near death, he eventually realized that physical torture was not the path to liberation, choosing the Middle Path (Majjhima Patipada).",
      themeColor: '#ff7700'
    },
    {
      id: 6,
      img: "w6.jpg",
      gallery: ["w6a.jpg", "w6b.jpg", "w6c.jpg", "w6d.jpg", "w6e.jpg", "w6f.jpg"],
      titleSi: "ලොව්තුරා බුද්ධත්වය ලැබීම",
      titleEn: "Supreme Enlightenment",
      storySi: "ගයා බුද්ධගයාවේ ඇසතු වෘක්ෂ සෙවණේ වජ්‍රාසනය මත වැඩසිටිමින්, වෙසක් පොහොය දිනක වසවර්ති මාරයා ඇතුළු මාර සේනාව පරාජය කර ප්‍රඥා චක්ෂුසින් උතුම් ලොව්තුරා බුද්ධත්වයට පත්වූ සේක. බුදුරැස් මාලාවන් දසත විහිදී ගියේය.",
      storyEn: "Seated on the Vajrasana beneath the sacred Bodhi tree in Gaya on a full moon day of Vesak, Siddhartha defeated the armies of Mara and attained Supreme Enlightenment. At that moment, his mind achieved full realization, and the glorious six-colored aura (Budhu Ras) radiated throughout the cosmos.",
      themeColor: '#ff7700'
    },
    {
      id: 7,
      img: "w7.jpg",
      gallery: ["w7a.jpg", "w7b.jpg", "w7c.jpg", "w7d.jpg", "w7e.jpg", "w7f.jpg"],
      titleSi: "ප්‍රථම ධර්ම දේශනාව",
      titleEn: "The First Sermon",
      storySi: "බුද්ධත්වයෙන් පසු බරණැස ඉසිපතන මිගදායේදී කොණ්ඩඤ්ඤ, භද්දිය, වප්ප, මහානාම, අස්සජී යන පස්වග තපස්වීන්ට ප්‍රථම වරට 'ධම්මචක්කප්පවත්තන සූත්‍රය' දේශනා කරමින් ධර්ම චක්‍රය දසත ක්‍රියාත්මක කළ සේක.",
      storyEn: "Following his Enlightenment, Lord Buddha traveled to the Deer Park in Isipatana, Sarnath. There, he delivered his first sermon, the 'Dhammacakkappavattana Sutta' (Setting the Wheel of Dhamma in Motion), to the five ascetics, initiating the spread of the Buddhist teachings.",
      themeColor: '#d4af37'
    },
    {
      id: 8,
      img: "w8.jpg",
      gallery: ["w8a.jpg", "w8b.jpg", "w8c.jpg", "w8d.jpg", "w8e.jpg", "w8f.jpg"],
      titleSi: "මහා පරිනිර්වාණය",
      titleEn: "The Parinirvana",
      storySi: "වයස අවුරුදු 80 දී කුසිනාරා නුවර මල්ල රජවරුන්ගේ උපවත්තන සල් උයනේ සල් ගස් දෙකක් මධ්‍යයේ සින්හ සෙය්‍යාවෙන් සැතපී, ලොව සියලු සංස්කාර ධර්මයන්ගේ අනිත්‍යතාව පෙන්වමින් උතුම් අනුපාදිශේෂ පරිනිර්වාණ ධාතුවෙන් පිරිනිවන් පා වදාළ සේක.",
      storyEn: "At the age of 80, between the twin Sal trees in the Upavattana Sal grove of Kusinara, Lord Buddha lay down in the lion's posture and entered Parinirvana (passing away). His final words reminded his disciples that all conditioned things are impermanent, urging them to strive on with diligence.",
      themeColor: '#cc0022'
    }
  ];

  // 2. DOT-MATRIX GEOMETRY BUILDER (THE LED DATA GENERATION)
  function initStructure() {
    dots = [];

    // ============ 1. CENTRAL MANDALA - බුදුරැස් මාලාව ============
    for (let r = 38; r <= 175; r += 10) {
      let count = Math.floor(r * 0.65); 
      let col;
      if (r < 60) col = C.goldBright;
      else if (r < 100) col = C.gold;
      else if (r < 140) col = C.deepGold;
      else col = C.innerRing;
      
      for (let i = 0; i < count; i++) {
        let angle = (i / count) * Math.PI * 2;
        dots.push({
          x: cx + r * Math.cos(angle),
          y: cy + r * Math.sin(angle),
          color: col,
          baseColor: col,
          size: 2.1,
          group: 'mandala',
          ringIndex: Math.floor((r - 38) / 10),
          angle: angle
        });
      }
    }

    // 8-Point Ornate Star
    for (let i = 0; i < 8; i++) {
      let angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
      for (let d = 55; d <= 165; d += 5) {
        let x = cx + d * Math.cos(angle);
        let y = cy + d * Math.sin(angle);
        dots.push({ x: x, y: y, color: C.accent, baseColor: C.accent, size: 2.0, group: 'star', starIdx: i, dist: d });
        
        let sideOffset = 4 * Math.sin((d / 165) * Math.PI);
        dots.push({ 
          x: cx + d * Math.cos(angle + 0.04), 
          y: cy + d * Math.sin(angle + 0.04), 
          color: C.gold, 
          baseColor: C.gold, 
          size: 1.5,
          group: 'star-side',
          starIdx: i,
          dist: d
        });
        dots.push({ 
          x: cx + d * Math.cos(angle - 0.04), 
          y: cy + d * Math.sin(angle - 0.04), 
          color: C.gold, 
          baseColor: C.gold, 
          size: 1.5,
          group: 'star-side',
          starIdx: i,
          dist: d
        });
      }
    }

    // ============ 2. OUTER GOLDEN RING ============
    for (let r = 185; r <= 200; r += 5) {
      let count = Math.floor(r * 0.75);
      for (let i = 0; i < count; i++) {
        let angle = (i / count) * Math.PI * 2;
        dots.push({
          x: cx + r * Math.cos(angle),
          y: cy + r * Math.sin(angle),
          color: C.gold,
          baseColor: C.gold,
          size: 2.0,
          group: 'outer-ring',
          ringIdx: Math.floor((r-185)/5),
          index: i
        });
      }
    }

    // ============ 3. PANEL CENTERS - රවුම් පැනල් 8 ============
    let panelRadius = 285;
    let panelCenters = [];
    for (let i = 0; i < 8; i++) {
      let angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
      let px = cx + panelRadius * Math.cos(angle);
      let py = cy + panelRadius * Math.sin(angle);
      panelCenters.push({ x: px, y: py, angle: angle, index: i });
    }

    // ============ 4. ORNATE PANEL FRAMES - පැනල් රාමු ============
    panelCenters.forEach(pc => {
      // outer rings
      for (let pr = 78; pr <= 88; pr += 5) {
        let dotCount = Math.floor(pr * 0.9);
        let col = (pr === 78) ? C.borderRed : C.gold;
        for (let i = 0; i < dotCount; i++) {
          let a = (i / dotCount) * Math.PI * 2;
          dots.push({
            x: pc.x + pr * Math.cos(a),
            y: pc.y + pr * Math.sin(a),
            color: col,
            baseColor: col,
            size: 2.1,
            group: 'panel-frame-outer',
            panelIdx: pc.index
          });
        }
      }
      
      // inner rings
      for (let pr = 62; pr <= 70; pr += 4) {
        let dotCount = Math.floor(pr * 1.0);
        for (let i = 0; i < dotCount; i++) {
          let a = (i / dotCount) * Math.PI * 2;
          dots.push({
            x: pc.x + pr * Math.cos(a),
            y: pc.y + pr * Math.sin(a),
            color: C.goldBright,
            baseColor: C.goldBright,
            size: 1.9,
            group: 'panel-frame-inner',
            panelIdx: pc.index
          });
        }
      }
      
      // panel beads border
      for (let i = 0; i < 24; i++) {
        let a = (i / 24) * Math.PI * 2;
        let pr = 74;
        dots.push({
          x: pc.x + pr * Math.cos(a),
          y: pc.y + pr * Math.sin(a),
          color: C.accent,
          baseColor: C.accent,
          size: 2.5,
          group: 'panel-beads',
          panelIdx: pc.index,
          beadIdx: i
        });
      }
    });

    // ============ 5. ORNATE SPOKES - ප්රධාන කිරණ වැල් 8 ============
    for (let i = 0; i < 8; i++) {
      let spokeAngle = ((i + 0.5) / 8) * Math.PI * 2 - Math.PI / 2;
      
      for (let rDist = 175; rDist <= 395; rDist += 6) {
        let sx = cx + rDist * Math.cos(spokeAngle);
        let sy = cy + rDist * Math.sin(spokeAngle);
        dots.push({ x: sx, y: sy, color: C.spokes, baseColor: C.spokes, size: 2.4, group: 'spoke', spokeIdx: i, dist: rDist });
      }
      
      let perpAngle = spokeAngle + Math.PI / 2;
      for (let rDist = 200; rDist <= 380; rDist += 10) {
        let baseX = cx + rDist * Math.cos(spokeAngle);
        let baseY = cy + rDist * Math.sin(spokeAngle);
        
        let offset = 6;
        dots.push({ 
          x: baseX + offset * Math.cos(perpAngle), 
          y: baseY + offset * Math.sin(perpAngle), 
          color: C.spokesDeep, 
          baseColor: C.spokesDeep, 
          size: 1.8, 
          group: 'spoke-side',
          spokeIdx: i,
          dist: rDist
        });
        dots.push({ 
          x: baseX - offset * Math.cos(perpAngle), 
          y: baseY - offset * Math.sin(perpAngle), 
          color: C.spokesDeep, 
          baseColor: C.spokesDeep, 
          size: 1.8, 
          group: 'spoke-side',
          spokeIdx: i,
          dist: rDist
        });
      }
      
      for (let rDist = 220; rDist <= 360; rDist += 45) {
        let baseX = cx + rDist * Math.cos(spokeAngle);
        let baseY = cy + rDist * Math.sin(spokeAngle);
        for (let j = 0; j < 8; j++) {
          let a = (j / 8) * Math.PI * 2;
          dots.push({ 
            x: baseX + 6 * Math.cos(a), 
            y: baseY + 6 * Math.sin(a), 
            color: C.goldBright, 
            baseColor: C.goldBright, 
            size: 1.7, 
            group: 'spoke-flower',
            spokeIdx: i,
            dist: rDist
          });
        }
      }

      // 'බෝ කොළ කැටයම' (Bodhi Leaf Ornaments)
      for (let rDist = 320; rDist <= 375; rDist += 5) {
        let factor = (rDist - 320) / 55;
        let leafWidth = 0.12 * Math.sin(factor * Math.PI);
        
        let lx1 = cx + rDist * Math.cos(spokeAngle - leafWidth);
        let ly1 = cy + rDist * Math.sin(spokeAngle - leafWidth);
        let lx2 = cx + rDist * Math.cos(spokeAngle + leafWidth);
        let ly2 = cy + rDist * Math.sin(spokeAngle + leafWidth);
        
        dots.push({ x: lx1, y: ly1, color: C.leafGreen, baseColor: C.leafGreen, size: 2.0, group: 'leaf', spokeIdx: i, dist: rDist });
        dots.push({ x: lx2, y: ly2, color: C.leafGreen, baseColor: C.leafGreen, size: 2.0, group: 'leaf', spokeIdx: i, dist: rDist });
      }
    }

    // ============ 6. OUTER MANDALA WITH ORNATE PETALS ============
    let outerPoints = 320;
    for (let i = 0; i <= outerPoints; i++) {
      let angle = (i / outerPoints) * Math.PI * 2;
      let r = 405 + 24 * Math.abs(Math.sin(angle * 8));
      
      dots.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), color: C.borderRed, baseColor: C.borderRed, size: 2.5, group: 'outer-petal', index: i });
      dots.push({ x: cx + (r - 6) * Math.cos(angle), y: cy + (r - 6) * Math.sin(angle), color: C.goldBright, baseColor: C.goldBright, size: 2.2, group: 'outer-petal', index: i });
      dots.push({ x: cx + (r - 12) * Math.cos(angle), y: cy + (r - 12) * Math.sin(angle), color: C.borderDeep, baseColor: C.borderDeep, size: 1.9, group: 'outer-petal', index: i });
      
      if (Math.abs(Math.sin(angle * 8)) < 0.2) {
        dots.push({ x: cx + (r - 18) * Math.cos(angle), y: cy + (r - 18) * Math.sin(angle), color: C.gold, baseColor: C.gold, size: 1.5, group: 'outer-petal', index: i });
      }
    }
    
    // Spiky outer lights
    for (let i = 0; i < 16; i++) {
      let angle = (i / 16) * Math.PI * 2 + Math.PI / 16;
      let r = 434;
      dots.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), color: C.borderDeep, baseColor: C.borderDeep, size: 3.2, group: 'outer-spike', index: i });
      dots.push({ x: cx + (r + 6) * Math.cos(angle), y: cy + (r + 6) * Math.sin(angle), color: C.borderRed, baseColor: C.borderRed, size: 2.6, group: 'outer-spike', index: i });
      dots.push({ x: cx + (r + 12) * Math.cos(angle), y: cy + (r + 12) * Math.sin(angle), color: C.goldBright, baseColor: C.goldBright, size: 1.8, group: 'outer-spike', index: i });
    }

    // ============ 7. BOTTOM BASE ============
    for (let x = 80; x <= 870; x += 6) {
      dots.push({ x: x, y: 870, color: C.gold, baseColor: C.gold, size: 2.4, group: 'base-line', index: x });
      dots.push({ x: x, y: 875, color: C.goldBright, baseColor: C.goldBright, size: 1.8, group: 'base-line', index: x });
      dots.push({ x: x, y: 955, color: C.gold, baseColor: C.gold, size: 2.4, group: 'base-line', index: x });
      dots.push({ x: x, y: 950, color: C.goldBright, baseColor: C.goldBright, size: 1.8, group: 'base-line', index: x });
    }
    for (let y = 870; y <= 955; y += 6) {
      dots.push({ x: 80, y: y, color: C.gold, baseColor: C.gold, size: 2.4, group: 'base-side', index: y });
      dots.push({ x: 85, y: y, color: C.goldBright, baseColor: C.goldBright, size: 1.8, group: 'base-side', index: y });
      dots.push({ x: 870, y: y, color: C.gold, baseColor: C.gold, size: 2.4, group: 'base-side', index: y });
      dots.push({ x: 865, y: y, color: C.goldBright, baseColor: C.goldBright, size: 1.8, group: 'base-side', index: y });
    }
    
    // Corners of base
    [[95, 885], [855, 885], [95, 940], [855, 940]].forEach(([x, y]) => {
      for (let r = 4; r <= 14; r += 3) {
        let cnt = Math.floor(r * 1.8);
        for (let i = 0; i < cnt; i++) {
          let a = (i / cnt) * Math.PI * 2;
          dots.push({
            x: x + r * Math.cos(a),
            y: y + r * Math.sin(a),
            color: C.borderRed,
            baseColor: C.borderRed,
            size: 1.8,
            group: 'base-corner',
            index: i
          });
        }
      }
    });
    
    // Horizontal base dashes
    for (let x = 120; x <= 830; x += 24) {
      dots.push({ x: x, y: 912, color: C.borderRed, baseColor: C.borderRed, size: 2.5, group: 'base-dash' });
      dots.push({ x: x + 12, y: 912, color: C.accent, baseColor: C.accent, size: 2.0, group: 'base-dash' });
    }

    // ============ 8. CONNECTING ARCS ============
    for (let i = 0; i < 8; i++) {
      let a1 = (i / 8) * Math.PI * 2 - Math.PI / 2;
      let a2 = ((i + 1) / 8) * Math.PI * 2 - Math.PI / 2;
      let midAngle = (a1 + a2) / 2;
      
      let arcRadius = 362;
      let arcSpread = 0.38;
      let steps = 25;
      for (let s = 0; s <= steps; s++) {
        let t = s / steps;
        let arcA = midAngle - arcSpread/2 + arcSpread * t;
        let curveR = arcRadius + 10 * Math.sin(t * Math.PI);
        dots.push({ 
          x: cx + curveR * Math.cos(arcA), 
          y: cy + curveR * Math.sin(arcA), 
          color: C.gold, 
          baseColor: C.gold, 
          size: 2.0, 
          group: 'arc',
          arcIdx: i,
          step: s
        });
        dots.push({ 
          x: cx + (curveR - 5) * Math.cos(arcA), 
          y: cy + (curveR - 5) * Math.sin(arcA), 
          color: C.spokesDeep, 
          baseColor: C.spokesDeep, 
          size: 1.5, 
          group: 'arc',
          arcIdx: i,
          step: s
        });
      }
    }

    // Log total led nodes
    const ledLbl = document.getElementById('lblLedCount');
    if (ledLbl) ledLbl.textContent = dots.length;
  }

  // 4. 🌟 HIGH-PERFORMANCE LIGHT ANIMATION ENGINE
  let tick = 0;
  let lastFrameTime = 0;   // 🆕 timestamp of previous frame
  let deltaTime = 0;       // 🆕 time elapsed since last frame (in seconds)

  // Meditating Buddha Silhouette in the central ring
  function drawCentralBuddhaPainting() {
  ctx.save();

  // Background glow
  let radGlow = ctx.createRadialGradient(cx, cy, 2, cx, cy, 60);
  if (isIgnited) {
    radGlow.addColorStop(0, 'rgba(248, 208, 96, 0.45)');
    radGlow.addColorStop(0.5, 'rgba(230, 92, 0, 0.2)');
    radGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    radGlow.addColorStop(0, 'rgba(30, 30, 50, 0.2)');
    radGlow.addColorStop(1, 'rgba(0,0,0,0)');
  }
  ctx.fillStyle = radGlow;
  ctx.beginPath();
  ctx.arc(cx, cy, 60, 0, Math.PI * 2);
  ctx.fill();

  // Buddha image draw කරනවා
  if (buddhaImg.complete && buddhaImg.naturalWidth) {
    const bx = cx - BUDDHA.width / 2;
    const by = cy - BUDDHA.height / 2 + BUDDHA.offsetY;

    if (isIgnited) {
      // Gold glow
      let glowPulse = Math.sin(tick * 1.2) * 0.5 + 0.5;
      ctx.shadowBlur = 20 + glowPulse * 15;
      ctx.shadowColor = '#f8d060';
      ctx.drawImage(buddhaImg, bx, by, BUDDHA.width, BUDDHA.height);

      // Second pass - orange halo
      ctx.shadowBlur = 12 + glowPulse * 8;
      ctx.shadowColor = '#ff7700';
      ctx.drawImage(buddhaImg, bx, by, BUDDHA.width, BUDDHA.height);
    } else {
      ctx.drawImage(buddhaImg, bx, by, BUDDHA.width, BUDDHA.height);
    }
  }

  ctx.restore();
}

  // Draw custom painted paths by user
  function drawCustomPaintPaths() {
    if (customPaintDots.length === 0) return;
    
    ctx.save();
    customPaintDots.forEach(pd => {
      ctx.beginPath();
      ctx.arc(pd.x, pd.y, 6.0, 0, Math.PI * 2);
      ctx.fillStyle = pd.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = pd.color;
      ctx.fill();
    });
    ctx.restore();
  }

  // Update loop
  function updateAndDrawLeds() {
    // Clear canvas
    ctx.fillStyle = '#010103';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
  // 2. Draw circular story panels with chapter images
    let panelRadius = 285;
    for (let i = 0; i < 8; i++) {
      let angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
      let px = cx + panelRadius * Math.cos(angle);
      let py = cy + panelRadius * Math.sin(angle);

      // Draw chapter image clipped to circular shape
      const img = chapterImages[i];
      if (img && img.complete && img.naturalWidth) {
        ctx.save();
        // Circular clip
        ctx.beginPath();
        ctx.arc(px, py, 55, 0, Math.PI * 2);
        ctx.clip();
        
        // Draw image to fill the circle (cover-style)
        const imgRatio = img.naturalWidth / img.naturalHeight;
        let drawW = 110, drawH = 110;
        if (imgRatio > 1) {
          drawW = 110 * imgRatio;
        } else {
          drawH = 110 / imgRatio;
        }
        ctx.drawImage(img, px - drawW / 2, py - drawH / 2, drawW, drawH);
        ctx.restore();
        
        // Active glow on top
     // Active glow on top — only when side panel is open
        if (selectedChapter === (i + 1)) {
          ctx.save();
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#f8d060';
          ctx.strokeStyle = '#f8d060';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(px, py, 56, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      } else if (selectedChapter === (i + 1)) {
        // Fallback glow if image not loaded yet
        ctx.save();
        let glowGrad = ctx.createRadialGradient(px, py, 5, px, py, 58);
        glowGrad.addColorStop(0, 'rgba(248, 208, 96, 0.20)');
        glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(px, py, 58, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    
    // 3. 🌟 LEDS GRID SEQUENCING
    // Time-based tick — same speed on any device regardless of FPS (60Hz, 120Hz, 144Hz...)
    const now = performance.now();
    if (lastFrameTime === 0) lastFrameTime = now;
    deltaTime = (now - lastFrameTime) / 1000; // seconds since last frame
    lastFrameTime = now;
    
    // Cap deltaTime to avoid huge jumps if tab was inactive
    if (deltaTime > 0.1) deltaTime = 0.1;
    
    // Standard speed: 3.0 tick units per second (matches old 60fps × 0.05 = 3.0)
    tick += 1.0 * deltaTime * globalSpeed;
    
    dots.forEach(d => {
      let state = false; 
      let intensity = 0.2; 
      let col = d.baseColor; 
      
      // Process Lighting Patterns
      if (isIgnited) {
        let patternToRun = activePattern;
        if (activePattern === 'story') {
          patternToRun = (selectedChapter === 3 || selectedChapter === 5 || selectedChapter === 8) ? 'rainbow' : 
                         (selectedChapter === 4) ? 'peacock' : 'aura';
        }
        
     switch (patternToRun) {
          case 'aura':
            // PULSING aura — all dots brighten/dim together (no traveling dark wave)
            if (d.group === 'mandala') {
              let pulse = Math.sin(tick * 1.2 - d.ringIndex * 0.5) * 0.5 + 0.5;
              state = pulse > 0.25;
              intensity = 0.4 + pulse * 0.6;
            } else if (d.group === 'star') {
              let pulse = Math.sin(tick * 1.5 - d.dist * 0.04) * 0.5 + 0.5;
              state = pulse > 0.2;
              intensity = 0.5 + pulse * 0.5;
              col = C.goldBright;
            } else if (d.group === 'outer-petal') {
              let pulse = Math.sin(tick * 2.0 + d.index * 0.1) * 0.5 + 0.5;
              state = pulse > 0.3;
              intensity = 0.5 + pulse * 0.5;
            } else if (d.group === 'panel-beads') {
              // Beads sparkle — random twinkle, no dark sweep
              let twinkle = Math.sin(tick * 3.0 + d.beadIdx * 1.7) * 0.5 + 0.5;
              state = twinkle > 0.3;
              intensity = 0.6 + twinkle * 0.4;
            } else if (d.group === 'panel-frame-outer' || d.group === 'panel-frame-inner') {
              // Panel rings glow steadily with gentle breathing
              let breath = Math.sin(tick * 0.8) * 0.5 + 0.5;
              state = true;
              intensity = 0.6 + breath * 0.4;
            } else {
              // Everything else: gentle pulsing glow
              let glow = Math.sin(tick * 1.0 + d.x * 0.005 + d.y * 0.005) * 0.5 + 0.5;
              state = true;
              intensity = 0.5 + glow * 0.5;
            }
            break;
            
         case 'chaser':
            // GOLDEN CHASER — sparkling chase patterns with clear motion, no dark tail
            if (d.group === 'outer-ring') {
              // Ring chase — 4 lights running around
              let chIdx = (d.index + Math.floor(tick * 6.0)) % 8;
              state = chIdx < 4;
              intensity = state ? 1.0 : 0;
              col = chIdx < 2 ? C.goldBright : C.accent;
            } else if (d.group === 'mandala') {
              // Ring-by-ring sequential flash
              let phase = Math.floor(tick * 2.0) % 8;
              state = (d.ringIndex % 4) === (phase % 4);
              intensity = state ? 1.0 : 0;
              col = C.goldBright;
            } else if (d.group === 'spoke' || d.group === 'spoke-side') {
              // Pulses run outward along spoke
              let dist = d.dist || 200;
              let pulse = (Math.floor(tick * 3.0 - dist * 0.04)) % 3;
              state = pulse === 0;
              intensity = state ? 1.0 : 0;
              col = C.spokes;
            } else if (d.group === 'arc') {
              let chIdx = (d.step + Math.floor(tick * 5.0)) % 8;
              state = chIdx < 3;
              intensity = state ? 1.2 : 0;
              col = C.accent;
            } else if (d.group === 'panel-beads') {
              // Rotating beads around each panel
              let chIdx = (d.beadIdx + Math.floor(tick * 4.0)) % 12;
              state = chIdx < 4;
              intensity = state ? 1.0 : 0;
              col = C.goldBright;
            } else if (d.group.startsWith('panel-frame')) {
              // Each panel pulses on/off in sequence
              let phase = Math.floor(tick * 1.5) % 8;
              state = d.panelIdx === phase;
              intensity = state ? 1.2 : 0;
            } else if (d.group === 'outer-petal' || d.group === 'outer-spike') {
              // Petals flash in waves
              let phase = (Math.floor(d.index / 8) + Math.floor(tick * 4.0)) % 5;
              state = phase < 2;
              intensity = state ? 1.0 : 0;
            } else if (d.group === 'star') {
              let chIdx = (d.starIdx + Math.floor(tick * 3.0)) % 8;
              state = chIdx < 3;
              intensity = state ? 1.0 : 0;
              col = C.accent;
            } else if (d.group === 'leaf') {
              let phase = Math.floor(tick * 2.0) % 4;
              state = (d.spokeIdx % 4) === phase;
              intensity = state ? 1.0 : 0;
            } else {
              // Other elements blink slowly
              state = Math.sin(tick * 1.5 + d.x * 0.02) > 0;
              intensity = state ? 0.9 : 0;
            }
            break;
            
          case 'peacock':
            // PEACOCK DANCE — multi-coloured flashes with peacock palette
            let peacockColors = ['#00ffff', '#0055ff', '#00cc66', '#9c27b0', '#ff40a0'];
            if (d.group === 'mandala') {
              // Each ring flashes in its own colour
              let phase = Math.floor(tick * 2.0) % 6;
              state = (d.ringIndex % 4) === (phase % 4);
              intensity = state ? 1.1 : 0;
              col = peacockColors[d.ringIndex % peacockColors.length];
            } else if (d.group === 'star') {
              let chIdx = (d.starIdx + Math.floor(tick * 2.5)) % 8;
              state = chIdx < 3;
              intensity = state ? 1.2 : 0;
              col = peacockColors[d.starIdx % peacockColors.length];
            } else if (d.group === 'spoke' || d.group === 'spoke-side') {
              let dist = d.dist || 200;
              let pulse = (Math.floor(tick * 3.0 - dist * 0.03)) % 3;
              state = pulse === 0;
              intensity = state ? 1.0 : 0;
              col = peacockColors[(d.spokeIdx || 0) % peacockColors.length];
            } else if (d.group === 'arc') {
              let chIdx = (d.step + Math.floor(tick * 6.0)) % 10;
              state = chIdx < 4;
              intensity = state ? 1.1 : 0;
              col = peacockColors[d.arcIdx % peacockColors.length];
            } else if (d.group === 'panel-beads') {
              let chIdx = (d.beadIdx + Math.floor(tick * 4.0)) % 12;
              state = chIdx < 4;
              intensity = state ? 1.0 : 0;
              col = peacockColors[d.beadIdx % peacockColors.length];
            } else if (d.group.startsWith('panel-frame')) {
              // Each panel flashes in its peacock colour
              let phase = Math.floor(tick * 1.5) % 8;
              state = d.panelIdx === phase || d.panelIdx === ((phase + 4) % 8);
              intensity = state ? 1.2 : 0;
              col = peacockColors[d.panelIdx % peacockColors.length];
            } else if (d.group === 'leaf') {
              let phase = Math.floor(tick * 2.5) % 4;
              state = (d.spokeIdx % 4) === phase;
              intensity = state ? 1.1 : 0;
              col = '#00cc66';
            } else if (d.group === 'outer-petal' || d.group === 'outer-spike') {
              let phase = (Math.floor(d.index / 8) + Math.floor(tick * 3.0)) % 5;
              state = phase < 2;
              intensity = state ? 1.0 : 0;
              col = peacockColors[Math.floor(d.index / 20) % peacockColors.length];
            } else {
              state = Math.sin(tick * 2.0 + d.x * 0.02) > 0;
              intensity = state ? 0.9 : 0;
              col = peacockColors[Math.floor((d.x + d.y) / 80) % peacockColors.length];
            }
            break;
            
          case 'rainbow':
            // VESAK SPARKLE — every dot independently twinkles with rainbow colours
            let rainbowPalette = ['#ff0040', '#ff7700', '#ffd700', '#00cc66', '#00ffff', '#0055ff', '#9c27b0', '#ff40a0'];
            let dotSeed = (d.x * 0.137 + d.y * 0.241);
            let twinklePhase = (tick * 1.8 + dotSeed) % 3;
            state = twinklePhase < 1.2;
            intensity = state ? 1.1 : 0;
            let colorIdx = Math.floor((tick * 0.3 + dotSeed * 0.7)) % rainbowPalette.length;
            col = rainbowPalette[colorIdx];
            break;
        }
      }
      
      // Override active state/glow for the highlighted story panel to make it pop!
      if (d.panelIdx === (selectedChapter - 1) && d.group.startsWith('panel-frame')) {
        state = true;
        intensity = 1.3 + Math.sin(tick * 3.0) * 0.3;
        col = chapters[selectedChapter - 1].themeColor || C.goldBright;
      }
      
// Render LED light — sharp on/off (original feel) with brighter unlit baseline
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.size * (state ? 1.15 : 1.0), 0, Math.PI * 2);
      
      if (state) {
        ctx.shadowBlur = 6 * globalBrightness * intensity;
        ctx.shadowColor = col;
        ctx.fillStyle = col;
        ctx.fill();
      } else {
        // UNLIT FILAMENT — brighter than before so animation gaps don't read as black bars
        ctx.shadowBlur = 0;
        ctx.fillStyle = d.baseColor;
        ctx.globalAlpha = 0.22;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    });
    
    ctx.shadowBlur = 0;

    // 1. Draw central Buddha painting
    drawCentralBuddhaPainting();

   // 4. 🌟 DRAW TWO PEACOCKS
    ctx.save();
    let glowPulse = isIgnited ? Math.sin(tick * 1.5) * 0.5 + 0.5 : 0;

    // ── LEFT PEACOCK (normal - no mirror) ──
    if (peacockLeft.complete && peacockLeft.naturalWidth) {
      const plx = cx - PEACOCK.offsetX;
      const ply = cy + PEACOCK.offsetY;
      ctx.save();
      ctx.globalAlpha = PEACOCK.opacity;
      ctx.translate(plx, ply);
      // ctx.scale(-1, 1); ← හතා නෑ
      if (isIgnited && PEACOCK.glow) {
        ctx.shadowBlur = PEACOCK.glowSize + glowPulse * 10;
        ctx.shadowColor = PEACOCK.glowColor;
      }
      ctx.drawImage(peacockLeft, -PEACOCK.width / 2, -PEACOCK.height / 2, PEACOCK.width, PEACOCK.height);
      ctx.restore();
    }

    // ── RIGHT PEACOCK (mirror කරනවා) ──
    if (peacockRight.complete && peacockRight.naturalWidth) {
      const prx = cx + PEACOCK.offsetX;
      const pry = cy + PEACOCK.offsetY;
      ctx.save();
      ctx.globalAlpha = PEACOCK.opacity;
      ctx.translate(prx, pry);
      ctx.scale(-1, 1); // ← right එකට mirror
      if (isIgnited && PEACOCK.glow) {
        ctx.shadowBlur = PEACOCK.glowSize + glowPulse * 10;
        ctx.shadowColor = PEACOCK.glowColor;
      }
      ctx.drawImage(peacockRight, -PEACOCK.width / 2, -PEACOCK.height / 2, PEACOCK.width, PEACOCK.height);
      ctx.restore();
    }

    ctx.restore();

    // 5. Draw Custom painted LED paths
    drawCustomPaintPaths();
    
    // 6. Draw Sinhala text calligraphy at base
    ctx.fillStyle = isIgnited ? C.goldBright : '#444c5c';
    ctx.font = 'bold 24px "Noto Sans Sinhala", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ගෞතම බුද්ධ චරිතය', cx, 922);
    
    requestAnimationFrame(updateAndDrawLeds);
  }

  // 5. 📖 INTERACTIVE ACTIONS & BILINGUAL STORY SYSTEM
function loadChapter(chId) {
    selectedChapter = chId;
    const ch = chapters[chId - 1];
    
    const setText = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    setText('lblChapterNo', ch.id);
    setText('storyTitleSi', ch.titleSi);
    setText('storyTitleEn', ch.titleEn);
    setText('txtStorySi', ch.storySi);
    setText('txtStoryEn', ch.storyEn);
    
    // Main chapter image
    const placeholder = document.getElementById('storySvgPlaceholder');
    if (placeholder) {
      placeholder.innerHTML = `<img src="${ch.img}" alt="${ch.titleEn}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">`;
    }

    // 🆕 Gallery of 6 decorative images
    const galleryContainer = document.getElementById('chapterGallery');
    if (galleryContainer && ch.gallery && ch.gallery.length) {
      galleryContainer.innerHTML = ch.gallery.map((src, idx) => 
        `<div class="gallery-item" data-src="${src}">
           <img src="${src}" alt="${ch.titleEn} ${idx + 1}" loading="lazy">
         </div>`
      ).join('');
      
      // Click to open lightbox
      galleryContainer.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
          openLightbox(item.dataset.src);
        });
      });
    }
  }
  
  // 🆕 Lightbox: full-screen image viewer
  function openLightbox(src) {
    let lb = document.getElementById('imgLightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'imgLightbox';
      lb.className = 'img-lightbox';
      lb.innerHTML = '<img src="" alt=""><button class="lb-close">×</button>';
      document.body.appendChild(lb);
      
      lb.addEventListener('click', (e) => {
        if (e.target === lb || e.target.classList.contains('lb-close')) {
          lb.classList.remove('open');
        }
      });
    }
    lb.querySelector('img').src = src;
    lb.classList.add('open');
  }

  function speakNarrative() {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech not supported in this browser.");
      return;
    }
    
    window.speechSynthesis.cancel();
    
    const ch = chapters[selectedChapter - 1];
    let txt, lang;
    
    if (currentLanguage === 'si') {
      txt = ch.storySi;
      lang = 'si-LK'; 
    } else {
      txt = ch.storyEn;
      lang = 'en-US';
    }
    
    const utterance = new SpeechSynthesisUtterance(txt);
    utterance.lang = lang;
    utterance.rate = 0.92; 
    
    const btn = document.getElementById('btnPlayNarrative');
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Reading...`;
    
    utterance.onend = () => {
      btn.innerHTML = `<i class="fa-solid fa-volume-high"></i> Speak`;
    };
    utterance.onerror = () => {
      btn.innerHTML = `<i class="fa-solid fa-volume-high"></i> Speak`;
    };
    
    window.speechSynthesis.speak(utterance);
  }

  // ─────────────────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────────────────
  function $(id) { return document.getElementById(id); }
  function on(el, evt, fn) { if (el) el.addEventListener(evt, fn); }

  // ─────────────────────────────────────────────────────────
  // AUDIO CONTROL — background music + per-panel audio
  // ─────────────────────────────────────────────────────────
  let currentPanelAudio = null;

  function playPanelAudio(panelId) {
    // Force-pause background music (with safety)
    const bg = $('bgAudio');
    if (bg) {
      try {
        bg.pause();
        bg.muted = true;  // extra safety - mute it too
      } catch (e) {
        console.log('BG pause error:', e);
      }
    }

    // Stop any previously playing panel audio
    if (currentPanelAudio) {
      try {
        currentPanelAudio.pause();
        currentPanelAudio.currentTime = 0;
      } catch (e) {}
      currentPanelAudio = null;
    }

    // Play the requested panel audio
    const panelAudio = $('panelAudio' + panelId);
    if (panelAudio) {
      panelAudio.volume = 0.85;
      panelAudio.muted = false;
      panelAudio.currentTime = 0;
      panelAudio.play().then(() => {
        console.log('▶ Panel ' + panelId + ' audio playing');
      }).catch(err => {
        console.log('Panel audio play error:', err);
      });
      currentPanelAudio = panelAudio;
    } else {
      console.log('⚠ panelAudio' + panelId + ' element not found');
    }
  }

function stopPanelAudioAndResumeBg() {
    // Stop panel audio
    if (currentPanelAudio) {
      try {
        currentPanelAudio.pause();
        currentPanelAudio.currentTime = 0;
      } catch (e) {}
      currentPanelAudio = null;
    }
    // Resume + unmute background music
    const bg = $('bgAudio');
    if (bg && isIgnited) {
      bg.muted = false;
      bg.play().catch(err => console.log('BG resume blocked:', err));
    }
  }

  // ─────────────────────────────────────────────────────────
  // 6. EVENT BINDING — CLEAN (auto-cycle patterns + custom audio)
  // ─────────────────────────────────────────────────────────
  function setupEvents() {
    // Auto-cycling patterns — changes every 8 seconds
    const patternCycle = ['aura', 'chaser', 'peacock', 'rainbow'];
    const patternLabels = {
      'aura':    'බුදුරැස් මාලා',
      'chaser':  'රන් දිව වැල්',
      'peacock': 'මයුර නර්ථනය',
      'rainbow': 'පංචවර්ණ'
    };
    let cycleIdx = 0;

    function nextPattern() {
      cycleIdx = (cycleIdx + 1) % patternCycle.length;
      activePattern = patternCycle[cycleIdx];
      const lbl = $('lblActivePattern');
      if (lbl) lbl.textContent = patternLabels[activePattern];
    }

    // ── Ignite button — starts thorana + audio + cycling ──
    on($('btnIgnite'), 'click', () => {
      isIgnited = true;
      const overlay = $('initOverlay');
      if (overlay) overlay.classList.add('hidden');

      // Play custom audio (music.mp3)
      const bg = $('bgAudio');
      if (bg) {
        bg.volume = 0.7;
        bg.play().then(() => {
          const st = $('lblAudioStatus');
          if (st) st.textContent = 'Playing';
        }).catch(err => {
          console.log('Audio autoplay blocked:', err);
          const st = $('lblAudioStatus');
          if (st) st.textContent = 'Click anywhere';
        });
      }

      // Start auto-cycling patterns
      activePattern = patternCycle[0];
      const lbl = $('lblActivePattern');
      if (lbl) lbl.textContent = patternLabels[activePattern];
      setInterval(nextPattern, 8000);
    });

    // Fallback: if audio blocked, retry on any user interaction
    document.addEventListener('click', () => {
      const bg = $('bgAudio');
      if (bg && bg.paused && isIgnited) {
        bg.play().then(() => {
          const st = $('lblAudioStatus');
          if (st) st.textContent = 'Playing';
        }).catch(() => {});
      }
    }, { once: false });

    // ── Canvas click → open story popup ───────────────────
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width;
      const clickY = ((e.clientY - rect.top) / rect.height) * canvas.height;

      let panelRadius = 285;
      for (let i = 0; i < 8; i++) {
        let angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        let px = cx + panelRadius * Math.cos(angle);
        let py = cy + panelRadius * Math.sin(angle);
        let dist = Math.hypot(clickX - px, clickY - py);
     if (dist <= 62) {
          loadChapter(i + 1);
          // Open the side panel + slide thorana left
          const sidePanel = $('storyModal');
          const stage = $('thoranaStage');
          if (sidePanel) sidePanel.classList.add('open');
          if (stage) stage.classList.add('split-view');
          playPanelAudio(i + 1);
          return;
        }
      }
    });

  // ── Side panel close handlers (also resume bg music) ──
function closeSidePanel() {
      const sidePanel = $('storyModal');
      const stage = $('thoranaStage');
      if (sidePanel) sidePanel.classList.remove('open');
      if (stage) stage.classList.remove('split-view');
      selectedChapter = 0;  // 🆕 remove the glow when closing
      stopPanelAudioAndResumeBg();
    }

    on($('btnCloseModal'), 'click', closeSidePanel);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const sidePanel = $('storyModal');
        if (sidePanel && sidePanel.classList.contains('open')) {
          closeSidePanel();
        }
      }
    });

    // ── Prev / Next / Speak in modal ──────────────────────
    on($('btnPrevChapter'), 'click', () => {
      let prevId = selectedChapter - 1;
      if (prevId < 1) prevId = 8;
      loadChapter(prevId);
      playPanelAudio(prevId);  // 🎵 Switch to new panel's audio
    });

    on($('btnNextChapter'), 'click', () => {
      let nextId = selectedChapter + 1;
      if (nextId > 8) nextId = 1;
      loadChapter(nextId);
      playPanelAudio(nextId);  // 🎵 Switch to new panel's audio
    });

    on($('btnPlayNarrative'), 'click', speakNarrative);
  }

  // Initialize
initStructure();
  setupEvents();
  updateAndDrawLeds();

  // ─────────────────────────────────────────────────────────
  // 🔥 FIREBASE REAL-TIME VISITOR PRESENCE
  // ─────────────────────────────────────────────────────────
  const firebaseConfig = {
    apiKey: "AIzaSyA9Ke51C6mH2v-wO0M1bdy6Xw9TXvlgKj4",
    authDomain: "vesak-thorana-ff321.firebaseapp.com",
    databaseURL: "https://vesak-thorana-ff321-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vesak-thorana-ff321",
    storageBucket: "vesak-thorana-ff321.firebasestorage.app",
    messagingSenderId: "943061658528",
    appId: "1:943061658528:web:167b2e71549dcc756f92c5"
  };

  let firebaseApp = null;
  let firebaseDb = null;
  let myVisitorId = null;
  let myVisitorName = '';
  let visitorMoveInterval = null;
  let visitorHeartbeatInterval = null;
  const onlineVisitors = {};
  // Walking visitor icons (random for variety)
  const visitorIcons = ['🚶', '🚶‍♀️', '🚶‍♂️', '🧘', '🧘‍♀️', '🧎', '🧎‍♀️'];
  const visitorIconMap = {};  // Maps visitorId → icon (consistent for each user)

  function initFirebase() {
    if (firebaseApp) return;
    try {
      firebaseApp = firebase.initializeApp(firebaseConfig);
      firebaseDb = firebase.database();
      console.log('🔥 Firebase initialized');
      startVisitorListener();
    } catch (err) {
      console.error('Firebase init error:', err);
    }
  }

  // Generate unique ID for this browser session
  function generateVisitorId() {
    return 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6);
  }

  // Random position around thorana (avoiding the center)
 // Random position in the bottom strip area (below the thorana)
  function randomVisitorPosition() {
    return {
      x: 5 + Math.random() * 90,    // 5% to 95% horizontal
      y: 92 + Math.random() * 6     // 92% to 98% vertical (bottom strip)
    };
  }

  // Register this visitor in Firebase
  function registerVisitor(name) {
    if (!firebaseDb) return;
    myVisitorId = generateVisitorId();
    myVisitorName = name;
    
    const pos = randomVisitorPosition();
    const visitorRef = firebaseDb.ref('visitors/' + myVisitorId);
    
    visitorRef.set({
      name: name,
      x: pos.x,
      y: pos.y,
      lastSeen: firebase.database.ServerValue.TIMESTAMP
    });

    // Auto-remove when browser closes
    visitorRef.onDisconnect().remove();

    // Heartbeat every 20 seconds (proves visitor is still active)
    visitorHeartbeatInterval = setInterval(() => {
      visitorRef.update({
        lastSeen: firebase.database.ServerValue.TIMESTAMP
      });
    }, 20000);

    // Walk to a new spot every 5-9 seconds (smooth CSS transition handles motion)
    function walkToNewSpot() {
      const newPos = randomVisitorPosition();
      visitorRef.update({
        x: newPos.x,
        y: newPos.y,
        lastSeen: firebase.database.ServerValue.TIMESTAMP
      });
      // Schedule next walk with random interval
      const nextWalk = 5000 + Math.random() * 4000;
      visitorMoveInterval = setTimeout(walkToNewSpot, nextWalk);
    }
    visitorMoveInterval = setTimeout(walkToNewSpot, 3000);
  }

  // Listen for all visitors and update display
 // Listen for all visitors and update display
  function startVisitorListener() {
    if (!firebaseDb) return;
    const visitorsRef = firebaseDb.ref('visitors');
    
    visitorsRef.on('value', (snapshot) => {
      const data = snapshot.val() || {};
      const now = Date.now();
      
      // Active visitors (lastSeen within 60s)
      const activeVisitors = Object.keys(data).filter(id => {
        const v = data[id];
        return v && v.lastSeen && (now - v.lastSeen < 60000);
      });
      
      // Update online count (welcome screen)
      const onlineLbl = document.getElementById('lblOnlineCount');
      if (onlineLbl) onlineLbl.textContent = activeVisitors.length;
      
      // Update LIVE online count (status bar)
      const liveLbl = document.getElementById('lblLiveOnline');
      if (liveLbl) liveLbl.textContent = activeVisitors.length;
      
      renderVisitors(data);
    });
    
    // Track total visits today
    trackVisitsToday();
  }

  // Track unique visits today — counts each browser only ONCE per day
  function trackVisitsToday() {
    if (!firebaseDb) return;
    
    const today = new Date();
    const dateKey = today.getFullYear() + '-' + 
                    String(today.getMonth() + 1).padStart(2, '0') + '-' +
                    String(today.getDate()).padStart(2, '0');
    
    const statsRef = firebaseDb.ref('stats/' + dateKey);
    
    // Check if THIS browser already counted today
    const countedKey = 'vesak_counted_' + dateKey;
    const alreadyCounted = localStorage.getItem(countedKey);
    
    if (!alreadyCounted) {
      // First visit today from this browser → increment
      statsRef.transaction((current) => (current || 0) + 1);
      // Mark as counted (prevents future refresh increments)
      try {
        localStorage.setItem(countedKey, '1');
      } catch (e) {
        // localStorage might be blocked (incognito) — that's OK
      }
      
      // Clear yesterday's flags (cleanup old localStorage)
      cleanOldVisitFlags();
    }
    
    // Always listen for live count updates
    statsRef.on('value', (snapshot) => {
      const count = snapshot.val() || 0;
      const todayLbl = document.getElementById('lblTotalToday');
      if (todayLbl) todayLbl.textContent = count.toLocaleString();
    });
  }
  
  // Clean up old visit flags (>7 days)
  function cleanOldVisitFlags() {
    try {
      const today = new Date();
      const keysToCheck = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('vesak_counted_')) {
          keysToCheck.push(key);
        }
      }
      keysToCheck.forEach(key => {
        const dateStr = key.replace('vesak_counted_', '');
        const flagDate = new Date(dateStr);
        const daysDiff = (today - flagDate) / (1000 * 60 * 60 * 24);
        if (daysDiff > 7) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      // Silent fail
    }
  }

  // Render visitor lanterns on canvas
// Render walking visitor people in the bottom strip
  function renderVisitors(visitorsData) {
    const layer = document.getElementById('visitorsLayer');
    if (!layer) return;
    
    const now = Date.now();
    const activeIds = Object.keys(visitorsData).filter(id => {
      const v = visitorsData[id];
      return v && v.lastSeen && (now - v.lastSeen < 60000);
    });
    
    // Remove disconnected visitors from DOM
    Array.from(layer.children).forEach(el => {
      if (!activeIds.includes(el.dataset.visitorId)) {
        el.remove();
      }
    });
    
    activeIds.forEach(id => {
      const v = visitorsData[id];
      
      // Assign a consistent icon for this visitor
      if (!visitorIconMap[id]) {
        visitorIconMap[id] = visitorIcons[Math.floor(Math.random() * visitorIcons.length)];
      }
      
      // Check if existing element
      let person = layer.querySelector(`[data-visitor-id="${id}"]`);
      
      if (!person) {
        // Create new
        person = document.createElement('div');
        person.className = 'visitor-person' + (id === myVisitorId ? ' self' : '');
        person.dataset.visitorId = id;
        person.innerHTML = `
          <span class="person-icon">${visitorIconMap[id]}</span>
          <span class="person-name"></span>
        `;
        layer.appendChild(person);
      }
      
      // Update position (CSS transition handles smooth animation)
      person.style.left = v.x + '%';
      person.style.top = v.y + '%';
      person.querySelector('.person-name').textContent = v.name;
      
      // Determine direction (face left or right based on movement)
      const prevX = parseFloat(person.dataset.prevX || v.x);
      if (v.x < prevX) {
        person.classList.add('facing-left');
      } else if (v.x > prevX) {
        person.classList.remove('facing-left');
      }
      person.dataset.prevX = v.x;
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ─────────────────────────────────────────────────────────
  // HOOK INTO IGNITE BUTTON
  // ─────────────────────────────────────────────────────────
  
  // Initialize Firebase on page load (so online count works before ignite)
  document.addEventListener('DOMContentLoaded', () => {
    initFirebase();
  });

  // Wrap Ignite button to register visitor first
  const originalIgniteBtn = document.getElementById('btnIgnite');
  if (originalIgniteBtn) {
    const newIgniteBtn = originalIgniteBtn.cloneNode(true);
    originalIgniteBtn.parentNode.replaceChild(newIgniteBtn, originalIgniteBtn);
    
    newIgniteBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('inputVisitorName');
      const name = nameInput ? nameInput.value.trim() : '';
      
      if (!name) {
        if (nameInput) {
          nameInput.style.borderColor = '#cc0022';
          nameInput.focus();
          nameInput.placeholder = 'කරුණාකර නම ඇතුළත් කරන්න!';
        }
        return;
      }
      
      // Register visitor in Firebase
      registerVisitor(name);
      
      // Continue with original ignite logic
      isIgnited = true;
      const overlay = document.getElementById('initOverlay');
      if (overlay) overlay.classList.add('hidden');

      const bg = document.getElementById('bgAudio');
      if (bg) {
        bg.volume = 0.7;
        bg.play().catch(() => {});
      }
      
      // Start auto-cycling patterns
      const patternCycle = ['aura', 'chaser', 'peacock', 'rainbow'];
      let cycleIdx = 0;
      activePattern = patternCycle[0];
      setInterval(() => {
        cycleIdx = (cycleIdx + 1) % patternCycle.length;
        activePattern = patternCycle[cycleIdx];
        const lbl = document.getElementById('lblActivePattern');
        if (lbl) {
          const labels = {'aura': 'බුදුරැස් මාලා', 'chaser': 'රන් දිව වැල්', 'peacock': 'මයුර නර්ථනය', 'rainbow': 'පංචවර්ණ'};
          lbl.textContent = labels[activePattern];
        }
      }, 8000);
    });
  }
  // ─────────────────────────────────────────────────────────
  // 🎁 DONATION MODAL HANDLERS
  // ─────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('btnOpenDonation');
    const closeBtn = document.getElementById('btnCloseDonation');
    const modal = document.getElementById('donationModal');
    
    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
      });
    }
    
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }
    
    // Close on outside click
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    }
    
    // ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
      }
    });
    
    // Tab switching
    document.querySelectorAll('.d-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.d-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.d-tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const content = document.getElementById('dtab-' + tab.dataset.tab);
        if (content) content.classList.add('active');
      });
    });
  });
  
  // Copy bank account number to clipboard
  window.copyBankAccount = function() {
    const accountNum = '63853816';
    const btn = event.target.closest('.btn-copy');
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(accountNum).then(() => {
        if (btn) {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('copied');
          }, 2000);
        }
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = accountNum;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        if (btn) {
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
          btn.classList.add('copied');
        }
      } catch (err) {
        console.error('Copy failed', err);
      }
      document.body.removeChild(textArea);
    }
  };
  // ════════════════════════════════════════════════════════════
  // 🌸 FLOATING BUDDHA QUOTES — gentle wisdom backdrop
  // ════════════════════════════════════════════════════════════
  const buddhaQuotes = [
    { si: "අවසාන ප්‍රඥාව නිර්වාණයයි", en: "Ultimate wisdom is Nirvana" },
    { si: "සියලු සත්වයෝ සුවපත් වෙත්වා", en: "May all beings be well" },
    { si: "සියලු කොන්දේසි සහිත දේවල් අනිත්‍යයි", en: "All conditioned things are impermanent" },
    { si: "ප්‍රේමනීය කරුණාව ලෝකය ආලෝකවත් කරයි", en: "Loving-kindness illuminates the world" },
    { si: "පින් කරන්න, පව් අත්හරින්න", en: "Do good, abandon evil" },
    { si: "අවිද්‍යාවෙන් නිදහස් වීම නිර්වාණයයි", en: "Freedom from ignorance is Nirvana" },
    { si: "සිත පිරිසිදු කරන්න", en: "Purify your mind" },
    { si: "හිතන හැටියට ලෝකය හැඩගැසේ", en: "We become what we think" },
    { si: "කරුණාව බුදු දහමේ හදවතයි", en: "Compassion is the heart of Buddhism" },
    { si: "අදම ක්‍රියාත්මක වන්න - හෙට ප්‍රමාද වැඩි විය හැක", en: "Act today — tomorrow may be too late" },
    { si: "තෙරුවන් සරණයි", en: "I take refuge in the Three Jewels" },
    { si: "සත්‍ය හඳුනා ගන්න", en: "Recognize the truth" },
    { si: "ඔබටම පහනක් වන්න", en: "Be a lamp unto yourself" },
    { si: "සමාව දෙන තැනැත්තා ශක්තිමත්ම ය", en: "The forgiving one is the strongest" },
    { si: "ආශා නැති වූ විට දුකත් නැත", en: "No craving, no suffering" }
  ];

  function startFloatingQuotes() {
    // Get or create quote container
    let container = document.getElementById('quotesLayer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'quotesLayer';
      container.className = 'quotes-layer';
      document.body.appendChild(container);
    }

function spawnQuote() {
      if (!isIgnited) return; // Only show after thorana lit
      
      const quote = buddhaQuotes[Math.floor(Math.random() * buddhaQuotes.length)];
      const quoteEl = document.createElement('div');
      quoteEl.className = 'floating-quote';
      
      // Detect mobile
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // Mobile: random top OR bottom position (above/below thorana)
        const isTop = Math.random() > 0.5;
        if (isTop) {
          quoteEl.style.top = '12%';
        } else {
          quoteEl.style.top = '78%';
        }
        // Both directions trigger same vertical animation
        quoteEl.classList.add(Math.random() > 0.5 ? 'drift-right' : 'drift-left');
      } else {
        // Desktop: original horizontal drift from sides
        const fromLeft = Math.random() > 0.5;
        const startY = 10 + Math.random() * 60;
        
        quoteEl.style.top = startY + '%';
        if (fromLeft) {
          quoteEl.style.left = '-300px';
          quoteEl.classList.add('drift-right');
        } else {
          quoteEl.style.right = '-300px';
          quoteEl.classList.add('drift-left');
        }
      }
      
      quoteEl.innerHTML = `
        <div class="quote-decoration">✦</div>
        <div class="quote-si">${quote.si}</div>
        <div class="quote-en">${quote.en}</div>
      `;
      
      container.appendChild(quoteEl);
      
      // Remove after animation ends (12 seconds: approach + pause + retreat)
      setTimeout(() => quoteEl.remove(), 12000);
    }

    // Spawn first quote after ignite
    setTimeout(spawnQuote, 3000);
    
    // Spawn new quote every 14 seconds (12s animation + 2s gap)
    setInterval(spawnQuote, 14000);
  }

  // Start quotes when ignited (hooks into existing ignite flow)
  document.addEventListener('DOMContentLoaded', () => {
    // Check periodically if ignited, then start
    const checkIgnite = setInterval(() => {
      if (isIgnited) {
        clearInterval(checkIgnite);
        startFloatingQuotes();
      }
    }, 1000);
  });
  // ════════════════════════════════════════════════════════════
  // 💬 SUGGESTIONS / FEEDBACK SYSTEM
  // ════════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('btnOpenSuggestions');
    const closeBtn = document.getElementById('btnCloseSuggestions');
    const modal = document.getElementById('suggestionsModal');
    const submitBtn = document.getElementById('btnSubmitSuggestion');
    const successMsg = document.getElementById('sugSuccessMsg');
    const form = document.querySelector('.sug-form');
    
    const sugName = document.getElementById('sugName');
    const sugMessage = document.getElementById('sugMessage');
    const charCount = document.getElementById('sugCharCount');
    
    let selectedType = 'suggestion';
    
    // Open modal
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        if (modal) modal.classList.remove('hidden');
        // Auto-fill name if visitor registered
        if (sugName && myVisitorName && !sugName.value) {
          sugName.value = myVisitorName;
        }
      });
    }
    
    // Close modal
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (modal) modal.classList.add('hidden');
      });
    }
    
    // Click outside to close
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    }
    
    // Type selection
    document.querySelectorAll('.sug-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sug-type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedType = btn.dataset.type;
      });
    });
    
    // Character counter
    if (sugMessage && charCount) {
      sugMessage.addEventListener('input', () => {
        charCount.textContent = sugMessage.value.length;
      });
    }
    
    // Submit
    if (submitBtn) {
      submitBtn.addEventListener('click', async () => {
        const name = sugName.value.trim();
        const message = sugMessage.value.trim();
        
        // Validation
        if (!name) {
          sugName.style.borderColor = '#cc0022';
          sugName.focus();
          return;
        }
        if (!message || message.length < 5) {
          sugMessage.style.borderColor = '#cc0022';
          sugMessage.focus();
          return;
        }
        
        // Reset borders
        sugName.style.borderColor = '';
        sugMessage.style.borderColor = '';
        
        // Disable button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> යවමින්...';
        
        // Save to Firebase
        if (firebaseDb) {
          try {
            const suggestionsRef = firebaseDb.ref('suggestions');
            await suggestionsRef.push({
              name: name,
              message: message,
              type: selectedType,
              timestamp: firebase.database.ServerValue.TIMESTAMP,
              userAgent: navigator.userAgent.substring(0, 100)
            });
            
            // Show success
            if (form) form.style.display = 'none';
            if (successMsg) successMsg.classList.remove('hidden');
            
            // Auto-close after 3 seconds
            setTimeout(() => {
              if (modal) modal.classList.add('hidden');
              // Reset form for next time
              setTimeout(() => {
                if (form) form.style.display = '';
                if (successMsg) successMsg.classList.add('hidden');
                sugMessage.value = '';
                charCount.textContent = '0';
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> යවන්න';
              }, 500);
            }, 3000);
          } catch (err) {
            console.error('Suggestion save error:', err);
            alert('දෝෂයකි. කරුණාකර ආයෙත් උත්සහ කරන්න.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> යවන්න';
          }
        }
      });
    }
  });
 
  // ════════════════════════════════════════════════════════════
  // 🪔 LIGHT A LAMP — Signature Feature
  // ════════════════════════════════════════════════════════════
  const LAMP_COLORS = {
    gold: '#ffaa00',
    red: '#ff3300',
    orange: '#ff7700',
    blue: '#00aaff',
    green: '#00cc66',
    purple: '#cc44ff'
  };
  
  let selectedLampColor = 'gold';
  
  document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('btnLightLamp');
    const closeBtn = document.getElementById('btnCloseLamp');
    const modal = document.getElementById('lightLampModal');
    const submitBtn = document.getElementById('btnSubmitLamp');
    const successMsg = document.getElementById('lampSuccessMsg');
    const form = document.querySelector('.lamp-form');
    const lampName = document.getElementById('lampName');
    const lampWish = document.getElementById('lampWish');
    const preview = document.getElementById('lampPreview');
    
    // Open modal
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        if (modal) modal.classList.remove('hidden');
        if (lampName && myVisitorName && !lampName.value) {
          lampName.value = myVisitorName;
        }
      });
    }
    
    // Close modal
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (modal) modal.classList.add('hidden');
      });
    }
    
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
    }
    
    // Color selection
    document.querySelectorAll('.lamp-color-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.lamp-color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedLampColor = btn.dataset.color;
        // Update preview flame color
        if (preview) {
          const flame = preview.querySelector('.lamp-flame');
          if (flame) {
            const color = LAMP_COLORS[selectedLampColor];
            flame.style.background = `radial-gradient(ellipse at bottom, ${color} 0%, transparent 70%)`;
            flame.style.filter = `drop-shadow(0 0 12px ${color})`;
          }
        }
      });
    });
    
    // Submit lamp
    if (submitBtn) {
      submitBtn.addEventListener('click', async () => {
        const name = lampName.value.trim();
        const wish = lampWish.value.trim();
        
        if (!name) {
          lampName.style.borderColor = '#cc0022';
          lampName.focus();
          return;
        }
        lampName.style.borderColor = '';
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> දල්වමින්...';
        
        if (firebaseDb) {
          try {
            const lampsRef = firebaseDb.ref('lamps');
            await lampsRef.push({
              name: name,
              wish: wish || null,
              color: selectedLampColor,
              timestamp: firebase.database.ServerValue.TIMESTAMP
            });
            
            if (form) form.style.display = 'none';
            if (successMsg) successMsg.classList.remove('hidden');
            
            setTimeout(() => {
              if (modal) modal.classList.add('hidden');
              setTimeout(() => {
                if (form) form.style.display = '';
                if (successMsg) successMsg.classList.add('hidden');
                lampWish.value = '';
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-fire"></i> පහන දල්වන්න';
              }, 500);
            }, 3000);
          } catch (err) {
            console.error('Lamp save error:', err);
            alert('දෝෂයකි. ආයෙත් උත්සහ කරන්න.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-fire"></i> පහන දල්වන්න';
          }
        }
      });
    }
    
    // Start listening for lamps
    startLampsListener();
  });
  
  // Listen for all lit lamps from Firebase
  function startLampsListener() {
    const checkDb = setInterval(() => {
      if (firebaseDb) {
        clearInterval(checkDb);
        const lampsRef = firebaseDb.ref('lamps');
        
        lampsRef.on('value', (snapshot) => {
          const data = snapshot.val() || {};
          renderLitLamps(data);
        });
      }
    }, 500);
  }
  
  function renderLitLamps(lampsData) {
    const area = document.getElementById('litLampsArea');
    const countLbl = document.getElementById('lblLampCount');
    if (!area) return;
    
    const lampIds = Object.keys(lampsData);
    if (countLbl) countLbl.textContent = lampIds.length;
    
    // Sort by timestamp (newest first, so latest lamps shine brightest)
    lampIds.sort((a, b) => (lampsData[b].timestamp || 0) - (lampsData[a].timestamp || 0));
    
    // Limit to 200 most recent lamps (performance)
    const visibleLamps = lampIds.slice(0, 200);
    
    // Build new HTML
    let html = '';
    visibleLamps.forEach(id => {
      const lamp = lampsData[id];
      if (!lamp) return;
      const color = LAMP_COLORS[lamp.color] || LAMP_COLORS.gold;
      const safeName = (lamp.name || '').replace(/[<>"']/g, '');
      html += `
        <div class="lit-lamp" style="--flame-color: ${color}" data-name="${safeName}" data-wish="${(lamp.wish || '').replace(/[<>"']/g, '')}">
          <span class="lit-lamp-name">${safeName}</span>
          <div class="lit-lamp-flame"></div>
          <span class="lit-lamp-base">🪔</span>
        </div>
      `;
    });
    area.innerHTML = html;
  }
  // ════════════════════════════════════════════════════════════
  // 🪷 WISHES WALL — Last Feature!
  // ════════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('btnOpenWishes');
    const closeBtn = document.getElementById('btnCloseWishes');
    const modal = document.getElementById('wishesModal');
    const submitBtn = document.getElementById('btnSubmitWish');
    const successMsg = document.getElementById('wishSuccessMsg');
    const form = document.querySelector('.wish-form');
    const wishName = document.getElementById('wishName');
    const wishMessage = document.getElementById('wishMessage');
    const wishCharCount = document.getElementById('wishCharCount');
    
    // Open modal
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        if (modal) modal.classList.remove('hidden');
        if (wishName && myVisitorName && !wishName.value) {
          wishName.value = myVisitorName;
        }
      });
    }
    
    // Close modal
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (modal) modal.classList.add('hidden');
      });
    }
    
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
    }
    
    // Character counter
    if (wishMessage && wishCharCount) {
      wishMessage.addEventListener('input', () => {
        wishCharCount.textContent = wishMessage.value.length;
      });
    }
    
    // Tab switching
    document.querySelectorAll('.w-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.w-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.w-tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const content = document.getElementById('wtab-' + tab.dataset.tab);
        if (content) content.classList.add('active');
      });
    });
    
    // Submit wish
    if (submitBtn) {
      submitBtn.addEventListener('click', async () => {
        const name = wishName.value.trim();
        const message = wishMessage.value.trim();
        
        if (!name) {
          wishName.style.borderColor = '#cc0022';
          wishName.focus();
          return;
        }
      if (!message || message.length < 3) {
          wishMessage.style.borderColor = '#cc0022';
          wishMessage.focus();
          return;
        }
        wishName.style.borderColor = '';
        wishMessage.style.borderColor = '';
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> යවමින්...';
        
        if (firebaseDb) {
          try {
            console.log('🪷 Submitting wish:', { name, message });
            const wishesRef = firebaseDb.ref('wishes');
            const result = await wishesRef.push({
              name: name,
              message: message,
              timestamp: firebase.database.ServerValue.TIMESTAMP
            });
            console.log('✅ Wish saved with ID:', result.key);
            
            if (form) form.style.display = 'none';
            if (successMsg) successMsg.classList.remove('hidden');
            
            setTimeout(() => {
              if (modal) modal.classList.add('hidden');
              setTimeout(() => {
                if (form) form.style.display = '';
                if (successMsg) successMsg.classList.add('hidden');
                wishMessage.value = '';
                wishCharCount.textContent = '0';
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-spa"></i> පැතුම තැබීමට';
              }, 500);
            }, 3000);
          } catch (err) {
            console.error('Wish save error:', err);
            alert('දෝෂයකි. ආයෙත් උත්සහ කරන්න.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-spa"></i> පැතුම තැබීමට';
          }
        }
      });
    }
    
    // Detail popup close
    const detailModal = document.getElementById('wishDetail');
    const detailClose = document.querySelector('.wish-detail-close');
    if (detailClose) {
      detailClose.addEventListener('click', () => {
        if (detailModal) detailModal.classList.add('hidden');
      });
    }
    if (detailModal) {
      detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) detailModal.classList.add('hidden');
      });
    }
    
    // Start listening
    startWishesListener();
  });
  
  // Listen for all wishes
  function startWishesListener() {
    const checkDb = setInterval(() => {
      if (firebaseDb) {
        clearInterval(checkDb);
        const wishesRef = firebaseDb.ref('wishes');
        wishesRef.on('value', (snapshot) => {
          const data = snapshot.val() || {};
          renderWishes(data);
        });
      }
    }, 500);
  }
  
  // Floating lotus position cache (keeps positions stable, not random every render)
  const wishPositionCache = {};
  
  function renderWishes(wishesData) {
    const layer = document.getElementById('wishesLayer');
    const countBtn = document.getElementById('lblWishCount');
    const countList = document.getElementById('wishListCount');
    const list = document.getElementById('wishesList');
    if (!layer) return;
    
    const wishIds = Object.keys(wishesData);
    if (countBtn) countBtn.textContent = wishIds.length;
    if (countList) countList.textContent = wishIds.length;
    
    // Sort newest first
    wishIds.sort((a, b) => (wishesData[b].timestamp || 0) - (wishesData[a].timestamp || 0));
    
    // ── Render floating lotuses (most recent 25) ──
    const visibleWishes = wishIds.slice(0, 25);
    let lotusHTML = '';
    visibleWishes.forEach((id, idx) => {
      const wish = wishesData[id];
      if (!wish) return;
      
      // Cache position so lotuses don't jump on each render
      if (!wishPositionCache[id]) {
        const isMobile = window.innerWidth < 768;
        // Position around thorana edges (avoid center where Buddha image is)
        const angle = (idx / visibleWishes.length) * Math.PI * 2 + Math.random() * 0.5;
        // On mobile: tighter circle (40-55%), on desktop: wider (35-60%)
        const distance = isMobile ? 38 + Math.random() * 15 : 35 + Math.random() * 25;
        wishPositionCache[id] = {
          x: 50 + Math.cos(angle) * distance,
          y: 50 + Math.sin(angle) * distance * (isMobile ? 0.5 : 0.6),
          duration: 6 + Math.random() * 6
        };
      }
      const pos = wishPositionCache[id];
      
      const safeName = (wish.name || '').replace(/[<>"']/g, '');
      const safeMsg = (wish.message || '').replace(/[<>"']/g, '').replace(/\n/g, ' ');
      
      lotusHTML += `
        <div class="floating-lotus" 
             style="left: ${pos.x}%; top: ${pos.y}%; --float-duration: ${pos.duration}s; animation-delay: ${idx * 0.2}s"
             data-author="${safeName}"
             data-message="${safeMsg}"
             data-time="${wish.timestamp}"
             onclick="showWishDetail(this)">
          🪷
        </div>
      `;
    });
    layer.innerHTML = lotusHTML;
    
    // ── Render list view (all wishes) ──
    if (list) {
      if (wishIds.length === 0) {
        list.innerHTML = '<div class="wishes-loading">තවම පැතුම් නෑ. පළමු පැතුම ඔබගේ වේවා! 🪷</div>';
      } else {
        let listHTML = '';
        wishIds.forEach(id => {
          const wish = wishesData[id];
          if (!wish) return;
          const safeName = (wish.name || '').replace(/[<>"']/g, '');
          const safeMsg = (wish.message || '').replace(/[<>"']/g, '');
          const timeAgo = getTimeAgo(wish.timestamp);
          listHTML += `
            <div class="wish-item">
              <div class="wish-item-author">${safeName}</div>
              <div class="wish-item-message">${safeMsg}</div>
              <div class="wish-item-time"><i class="fa-solid fa-clock"></i> ${timeAgo}</div>
            </div>
          `;
        });
        list.innerHTML = listHTML;
      }
    }
  }
  
  // Helper: time ago in Sinhala
  function getTimeAgo(timestamp) {
    if (!timestamp) return 'දැන්';
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'දැන්ම';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `මිනිත්තු ${minutes} කට පෙර`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `පැය ${hours} කට පෙර`;
    const days = Math.floor(hours / 24);
    return `දින ${days} කට පෙර`;
  }
  
  // Show wish detail popup when clicking a lotus
  window.showWishDetail = function(el) {
    const author = el.dataset.author;
    const message = el.dataset.message;
    const time = el.dataset.time;
    
    document.getElementById('wishDetailAuthor').textContent = author;
    document.getElementById('wishDetailMessage').textContent = message;
    document.getElementById('wishDetailTime').textContent = getTimeAgo(parseInt(time));
    
    document.getElementById('wishDetail').classList.remove('hidden');
  };
  // ════════════════════════════════════════════════════════════
  // 💡 CLICK HINT — Helps visitors discover clickable panels
  // ════════════════════════════════════════════════════════════
  let hintShown = false;
  let hintRemoved = false;
  
  function showClickHint() {
    if (hintShown || hintRemoved) return;
    hintShown = true;
    
    const hint = document.getElementById('clickHint');
    if (hint) {
      hint.classList.remove('hidden');
      
      // Auto-remove from DOM after fade-out animation (9s total)
      setTimeout(() => {
        if (hint && !hintRemoved) {
          hint.classList.add('hidden');
          hintRemoved = true;
        }
      }, 9500);
    }
  }
  
  function hideClickHint() {
    const hint = document.getElementById('clickHint');
    if (hint && !hintRemoved) {
      hint.classList.add('hidden');
      hintRemoved = true;
    }
  }
  
  // Hide hint when user clicks any panel (they got the message)
  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('thoranaCanvas');
    if (canvas) {
      canvas.addEventListener('click', hideClickHint);
    }
  });
  
  // Show hint 2 seconds after ignite (after thorana fades in)
  function watchForIgnite() {
    const checkLoop = setInterval(() => {
      if (isIgnited) {
        clearInterval(checkLoop);
        setTimeout(showClickHint, 2000);
      }
    }, 500);
  }
  
  watchForIgnite();

})();