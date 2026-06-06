import { ChemicalElement, Chapter, FormulaItem } from './types';

// authentic NCERT syllabus list for Class 11 & 12
export const CHAPTERS_DATA: Chapter[] = [
  // --- PHYSICS CLASS 11 ---
  { id: 'phy11_01', name: 'Units and Measurements', subject: 'Physics', class: '11th' },
  { id: 'phy11_02', name: 'Motion in a Straight Line', subject: 'Physics', class: '11th' },
  { id: 'phy11_03', name: 'Motion in a Plane', subject: 'Physics', class: '11th' },
  { id: 'phy11_04', name: 'Laws of Motion', subject: 'Physics', class: '11th' },
  { id: 'phy11_05', name: 'Work, Energy and Power', subject: 'Physics', class: '11th' },
  { id: 'phy11_06', name: 'Rotational Motion', subject: 'Physics', class: '11th' },
  { id: 'phy11_07', name: 'Gravitation', subject: 'Physics', class: '11th' },
  { id: 'phy11_08', name: 'Properties of Solids', subject: 'Physics', class: '11th' },
  { id: 'phy11_09', name: 'Fluid Mechanics', subject: 'Physics', class: '11th' },
  { id: 'phy11_10', name: 'Thermodynamics', subject: 'Physics', class: '11th' },
  { id: 'phy11_11', name: 'Oscillations & Waves', subject: 'Physics', class: '11th' },

  // --- PHYSICS CLASS 12 ---
  { id: 'phy12_01', name: 'Electrostatics', subject: 'Physics', class: '12th' },
  { id: 'phy12_02', name: 'Current Electricity', subject: 'Physics', class: '12th' },
  { id: 'phy12_03', name: 'Magnetic Effects of Current', subject: 'Physics', class: '12th' },
  { id: 'phy12_04', name: 'Electromagnetic Induction & AC', subject: 'Physics', class: '12th' },
  { id: 'phy12_05', name: 'Electromagnetic Waves', subject: 'Physics', class: '12th' },
  { id: 'phy12_06', name: 'Ray Optics', subject: 'Physics', class: '12th' },
  { id: 'phy12_07', name: 'Wave Optics', subject: 'Physics', class: '12th' },
  { id: 'phy12_08', name: 'Dual Nature of Matter', subject: 'Physics', class: '12th' },
  { id: 'phy12_09', name: 'Atoms and Nuclei', subject: 'Physics', class: '12th' },
  { id: 'phy12_10', name: 'Semiconductor Electronics', subject: 'Physics', class: '12th' },

  // --- CHEMISTRY CLASS 11 ---
  { id: 'chm11_01', name: 'Some Basic Concepts of Chemistry', subject: 'Chemistry', class: '11th' },
  { id: 'chm11_02', name: 'Structure of Atom', subject: 'Chemistry', class: '11th' },
  { id: 'chm11_03', name: 'Classification of Elements & Periodicity', subject: 'Chemistry', class: '11th' },
  { id: 'chm11_04', name: 'Chemical Bonding & Molecular Structure', subject: 'Chemistry', class: '11th' },
  { id: 'chm11_05', name: 'Chemical Thermodynamics', subject: 'Chemistry', class: '11th' },
  { id: 'chm11_06', name: 'Equilibrium', subject: 'Chemistry', class: '11th' },
  { id: 'chm11_07', name: 'Redox Reactions', subject: 'Chemistry', class: '11th' },
  { id: 'chm11_08', name: 'Organic Chemistry – Basic Principles & Techniques', subject: 'Chemistry', class: '11th' },
  { id: 'chm11_09', name: 'Hydrocarbons', subject: 'Chemistry', class: '11th' },

  // --- CHEMISTRY CLASS 12 ---
  { id: 'chm12_01', name: 'Solutions', subject: 'Chemistry', class: '12th' },
  { id: 'chm12_02', name: 'Electrochemistry', subject: 'Chemistry', class: '12th' },
  { id: 'chm12_03', name: 'Chemical Kinetics', subject: 'Chemistry', class: '12th' },
  { id: 'chm12_04', name: 'd and f-Block Elements', subject: 'Chemistry', class: '12th' },
  { id: 'chm12_05', name: 'Coordination Compounds', subject: 'Chemistry', class: '12th' },
  { id: 'chm12_06', name: 'Haloalkanes and Haloarenes', subject: 'Chemistry', class: '12th' },
  { id: 'chm12_07', name: 'Alcohols, Phenols and Ethers', subject: 'Chemistry', class: '12th' },
  { id: 'chm12_08', name: 'Aldehydes, Ketones and Carboxylic Acids', subject: 'Chemistry', class: '12th' },
  { id: 'chm12_09', name: 'Amines', subject: 'Chemistry', class: '12th' },
  { id: 'chm12_10', name: 'Biomolecules', subject: 'Chemistry', class: '12th' },

  // --- MATHS CLASS 11 ---
  { id: 'mth11_01', name: 'Sets, Relations and Functions', subject: 'Maths', class: '11th' },
  { id: 'mth11_02', name: 'Trigonometric Functions', subject: 'Maths', class: '11th' },
  { id: 'mth11_03', name: 'Complex Numbers & Quadratic Equations', subject: 'Maths', class: '11th' },
  { id: 'mth11_04', name: 'Permutations and Combinations', subject: 'Maths', class: '11th' },
  { id: 'mth11_05', name: 'Sequences and Series', subject: 'Maths', class: '11th' },
  { id: 'mth11_06', name: 'Straight Lines & Conic Sections', subject: 'Maths', class: '11th' },
  { id: 'mth11_07', name: 'Limits and Derivatives', subject: 'Maths', class: '11th' },
  { id: 'mth11_08', name: 'Probability', subject: 'Maths', class: '11th' },

  // --- MATHS CLASS 12 ---
  { id: 'mth12_01', name: 'Inverse Trigonometric Functions', subject: 'Maths', class: '12th' },
  { id: 'mth12_02', name: 'Matrices and Determinants', subject: 'Maths', class: '12th' },
  { id: 'mth12_03', name: 'Continuity & Differentiability', subject: 'Maths', class: '12th' },
  { id: 'mth12_04', name: 'Integrals and Application of Integrals', subject: 'Maths', class: '12th' },
  { id: 'mth12_05', name: 'Differential Equations', subject: 'Maths', class: '12th' },
  { id: 'mth12_06', name: 'Vector Algebra & 3D Geometry', subject: 'Maths', class: '12th' },
  { id: 'mth12_07', name: 'Linear Programming', subject: 'Maths', class: '12th' },

  // --- BOTANY CLASS 11 ---
  { id: 'bot11_01', name: 'Biological Classification', subject: 'Botany', class: '11th' },
  { id: 'bot11_02', name: 'Plant Kingdom', subject: 'Botany', class: '11th' },
  { id: 'bot11_03', name: 'Morphology & Anatomy of Flowering Plants', subject: 'Botany', class: '11th' },
  { id: 'bot11_04', name: 'Cell: The Unit of Life', subject: 'Botany', class: '11th' },
  { id: 'bot11_05', name: 'Cell Cycle & Cell Division', subject: 'Botany', class: '11th' },
  { id: 'bot11_06', name: 'Photosynthesis in Higher Plants', subject: 'Botany', class: '11th' },
  { id: 'bot11_07', name: 'Respiration & Plant Growth', subject: 'Botany', class: '11th' },

  // --- BOTANY CLASS 12 ---
  { id: 'bot12_01', name: 'Sexual Reproduction in Flowering Plants', subject: 'Botany', class: '12th' },
  { id: 'bot12_02', name: 'Principles of Inheritance & Variation', subject: 'Botany', class: '12th' },
  { id: 'bot12_03', name: 'Molecular Basis of Inheritance', subject: 'Botany', class: '12th' },
  { id: 'bot12_04', name: 'Microbes in Human Welfare (Botany)', subject: 'Botany', class: '12th' },
  { id: 'bot12_05', name: 'Ecosystem', subject: 'Botany', class: '12th' },
  { id: 'bot12_06', name: 'Biodiversity & Conservation', subject: 'Botany', class: '12th' },

  // --- ZOOLOGY CLASS 11 ---
  { id: 'zoo11_01', name: 'Animal Kingdom', subject: 'Zoology', class: '11th' },
  { id: 'zoo11_02', name: 'Structural Organisation in Animals', subject: 'Zoology', class: '11th' },
  { id: 'zoo11_03', name: 'Breathing and Exchange of Gases', subject: 'Zoology', class: '11th' },
  { id: 'zoo11_04', name: 'Body Fluids and Circulation', subject: 'Zoology', class: '11th' },
  { id: 'zoo11_05', name: 'Excretory Products & Elimination', subject: 'Zoology', class: '11th' },
  { id: 'zoo11_06', name: 'Locomotion and Movement', subject: 'Zoology', class: '11th' },
  { id: 'zoo11_07', name: 'Neural & Chemical Coordination', subject: 'Zoology', class: '11th' },

  // --- ZOOLOGY CLASS 12 ---
  { id: 'zoo12_01', name: 'Human Reproduction', subject: 'Zoology', class: '12th' },
  { id: 'zoo12_02', name: 'Reproductive Health', subject: 'Zoology', class: '12th' },
  { id: 'zoo12_03', name: 'Evolution', subject: 'Zoology', class: '12th' },
  { id: 'zoo12_04', name: 'Human Health and Disease', subject: 'Zoology', class: '12th' },
  { id: 'zoo12_05', name: 'Biotechnology: Principles & Applications', subject: 'Zoology', class: '12th' },
];

export const ELEMENTS_DATA: ChemicalElement[] = [
  { number: 1, symbol: 'H', name: 'Hydrogen', mass: 1.008, category: 'diatomic-nonmetal', period: 1, group: 1, state: 'Gas', config: '1s¹', electronegativity: 2.20, shells: [1], description: 'Lightest element, highly flammable. Constitutes about 75% of the universe\'s elemental mass. Vital for all life.' },
  { number: 2, symbol: 'He', name: 'Helium', mass: 4.0026, category: 'noble-gas', period: 1, group: 18, state: 'Gas', config: '1s²', electronegativity: undefined, shells: [2], description: 'Inert, colorless gas. Used in cryogenics, medical MRI scanners, gas-leak detection, and weather balloons.' },
  { number: 3, symbol: 'Li', name: 'Lithium', mass: 6.94, category: 'alkali-metal', period: 2, group: 1, state: 'Solid', config: '[He] 2s¹', electronegativity: 0.98, shells: [2, 1], description: 'Lightest alkali metal. Highly reactive with water. Extensively used in rechargeable lithium-ion batteries and medicine.' },
  { number: 4, symbol: 'Be', name: 'Beryllium', mass: 9.0122, category: 'alkaline-earth-metal', period: 2, group: 2, state: 'Solid', config: '[He] 2s²', electronegativity: 1.57, shells: [2, 2], description: 'Strong, lightweight steel-gray metal. Used in spacecraft, X-ray windows, and high-performance aerospace structures.' },
  { number: 5, symbol: 'B', name: 'Boron', mass: 10.81, category: 'metalloid', period: 2, group: 13, state: 'Solid', config: '[He] 2s² 2p¹', electronegativity: 2.04, shells: [2, 3], description: 'Metalloid used in borosilicate glass (Pyrex), nuclear reactor control rods, and semiconductor doping.' },
  { number: 6, symbol: 'C', name: 'Carbon', mass: 12.011, category: 'polyatomic-nonmetal', period: 2, group: 14, state: 'Solid', config: '[He] 2s² 2p²', electronegativity: 2.55, shells: [2, 4], description: 'Tetravalent nonmetal. Forms the chemical basis for all known organic life. Exists as graphite, diamond, and fullerenes.' },
  { number: 7, symbol: 'N', name: 'Nitrogen', mass: 14.007, category: 'diatomic-nonmetal', period: 2, group: 15, state: 'Gas', config: '[He] 2s² 2p³', electronegativity: 3.04, shells: [2, 5], description: 'Makes up 78% of Earth\'s atmosphere. Vital for amino acids, proteins, and nitrogenous fertilizers.' },
  { number: 8, symbol: 'O', name: 'Oxygen', mass: 15.999, category: 'diatomic-nonmetal', period: 2, group: 16, state: 'Gas', config: '[He] 2s² 2p⁴', electronegativity: 3.44, shells: [2, 6], description: 'Highly reactive nonmetal, essential for respiration of life forms and combustion. Makes up 21% of Earth\'s atmosphere.' },
  { number: 9, symbol: 'F', name: 'Fluorine', mass: 18.998, category: 'halogen', period: 2, group: 17, state: 'Gas', config: '[He] 2s² 2p⁵', electronegativity: 3.98, shells: [2, 7], description: 'Most electronegative and reactive of all elements. Extremely toxic, pale yellow, corrosive gas.' },
  { number: 10, symbol: 'Ne', name: 'Neon', mass: 20.180, category: 'noble-gas', period: 2, group: 18, state: 'Gas', config: '[He] 2s² 2p⁶', electronegativity: undefined, shells: [2, 8], description: 'Inert noble gas. Glows red-orange in high-voltage electrical discharge glow signs.' },
  { number: 11, symbol: 'Na', name: 'Sodium', mass: 22.990, category: 'alkali-metal', period: 3, group: 1, state: 'Solid', config: '[Ne] 3s¹', electronegativity: 0.93, shells: [2, 8, 1], description: 'Soft, silvery-white, highly reactive alkali metal. Must be stored under oil. Crucial for biological cellular fluid balance.' },
  { number: 12, symbol: 'Mg', name: 'Magnesium', mass: 24.305, category: 'alkaline-earth-metal', period: 3, group: 2, state: 'Solid', config: '[Ne] 3s²', electronegativity: 1.31, shells: [2, 8, 2], description: 'Lightweight structural metal. Key component of chlorophyll in plants, essential for cellular bio-energetics.' },
  { number: 13, symbol: 'Al', name: 'Aluminium', mass: 26.982, category: 'post-transition-metal', period: 3, group: 13, state: 'Solid', config: '[Ne] 3s² 3p¹', electronegativity: 1.61, shells: [2, 8, 3], description: 'Low density, high corrosion-resistant metal. Extensively used in packaging, aviation, vehicle structures, and utensils.' },
  { number: 14, symbol: 'Si', name: 'Silicon', mass: 28.085, category: 'metalloid', period: 3, group: 14, state: 'Solid', config: '[Ne] 3s² 3p²', electronegativity: 1.90, shells: [2, 8, 4], description: 'Tetravalent metalloid. Foundation of all computer chips, solar panel cells, and glass structures.' },
  { number: 15, symbol: 'P', name: 'Phosphorus', mass: 30.974, category: 'polyatomic-nonmetal', period: 3, group: 15, state: 'Solid', config: '[Ne] 3s² 3p³', electronegativity: 2.19, shells: [2, 8, 5], description: 'Highly reactive nonmetal. Crimson/Red phosphorus is used in safety matches. Essential for DNA, RNA and cellular ATP structures.' },
  { number: 16, symbol: 'S', name: 'Sulfur', mass: 32.06, category: 'polyatomic-nonmetal', period: 3, group: 16, state: 'Solid', config: '[Ne] 3s² 3p⁴', electronegativity: 2.58, shells: [2, 8, 6], description: 'Yellow, brittle nonmetal. Used in safety matches, gunpowder, rubber vulcanization, and sulfuric acid synthesis.' },
  { number: 17, symbol: 'Cl', name: 'Chlorine', mass: 35.45, category: 'halogen', period: 3, group: 17, state: 'Gas', config: '[Ne] 3s² 3p⁵', electronegativity: 3.16, shells: [2, 8, 7], description: 'Greenish-yellow diatomic gas. Strong oxidizer, widely used as sanitizer in pools, water filtration, and pvc plastics.' },
  { number: 18, symbol: 'Ar', name: 'Argon', mass: 39.948, category: 'noble-gas', period: 3, group: 18, state: 'Gas', config: '[Ne] 3s² 3p⁶', electronegativity: undefined, shells: [2, 8, 8], description: 'Third-most abundant atmospheric gas. Used to provide an inert atmosphere in incandescent bulbs and double-glaze windows.' },
  { number: 19, symbol: 'K', name: 'Potassium', mass: 39.098, category: 'alkali-metal', period: 4, group: 1, state: 'Solid', config: '[Ar] 4s¹', electronegativity: 0.82, shells: [2, 8, 8, 1], description: 'Highly reactive, soft alkali metal. Oxidizes intensely in air. Vital electrolyte involved in neuro-muscular signaling.' },
  { number: 20, symbol: 'Ca', name: 'Calcium', mass: 40.078, category: 'alkaline-earth-metal', period: 4, group: 2, state: 'Solid', config: '[Ar] 4s²', electronegativity: 1.00, shells: [2, 8, 8, 2], description: 'Durable alkaline earth metal. The structural material of bones and teeth, widely used in cement structures.' },
  { number: 21, symbol: 'Sc', name: 'Scandium', mass: 44.956, category: 'transition-metal', period: 4, group: 3, state: 'Solid', config: '[Ar] 3d¹ 4s²', electronegativity: 1.36, shells: [2, 8, 9, 2], description: 'Silver-white transition element. Alloyed with aluminium to fabricate premium structural elements.' },
  { number: 22, symbol: 'Ti', name: 'Titanium', mass: 47.867, category: 'transition-metal', period: 4, group: 4, state: 'Solid', config: '[Ar] 3d² 4s²', electronegativity: 1.54, shells: [2, 8, 10, 2], description: 'Lustrous, strong, white transition metal. Highly corrosion-resistant. High strength-to-weight ratio.' },
  { number: 23, symbol: 'V', name: 'Vanadium', mass: 50.942, category: 'transition-metal', period: 4, group: 5, state: 'Solid', config: '[Ar] 3d³ 4s²', electronegativity: 1.63, shells: [2, 8, 11, 2], description: 'Hard, ductile steel-blue metal. Extensively alloyed to make highly impact-resistant automobile steel.' },
  { number: 24, symbol: 'Cr', name: 'Chromium', mass: 51.996, category: 'transition-metal', period: 4, group: 6, state: 'Solid', config: '[Ar] 3d⁵ 4s¹', electronegativity: 1.66, shells: [2, 8, 13, 1], description: 'Steely-gray, lustrous, hard metal. Highly valued for chrome plating to achieve rust resistance.' },
  { number: 25, symbol: 'Mn', name: 'Manganese', mass: 54.938, category: 'transition-metal', period: 4, group: 7, state: 'Solid', config: '[Ar] 3d⁵ 4s²', electronegativity: 1.55, shells: [2, 8, 13, 2], description: 'Essential for industrial steel formulation. Important active nutrient in enzymes.' },
  { number: 26, symbol: 'Fe', name: 'Iron', mass: 55.845, category: 'transition-metal', period: 4, group: 8, state: 'Solid', config: '[Ar] 3d⁶ 4s²', electronegativity: 1.83, shells: [2, 8, 14, 2], description: 'Most common material on Earth by mass. Critical structural component of hemoglobin.' },
  { number: 27, symbol: 'Co', name: 'Cobalt', mass: 58.933, category: 'transition-metal', period: 4, group: 9, state: 'Solid', config: '[Ar] 3d⁷ 4s²', electronegativity: 1.88, shells: [2, 8, 15, 2], description: 'Lustrous ferromagnetic transition metal. Active part of Vitamin B12.' },
  { number: 28, symbol: 'Ni', name: 'Nickel', mass: 58.693, category: 'transition-metal', period: 4, group: 10, state: 'Solid', config: '[Ar] 3d⁸ 4s²', electronegativity: 1.91, shells: [2, 8, 16, 2], description: 'Silvery-white transition metal. Heavily utilized in stainless steel and rechargeable batteries.' },
  { number: 29, symbol: 'Cu', name: 'Copper', mass: 63.546, category: 'transition-metal', period: 4, group: 11, state: 'Solid', config: '[Ar] 3d¹⁰ 4s¹', electronegativity: 1.90, shells: [2, 8, 18, 1], description: 'Soft, ductile metal with exceptionally high electrical conductivity. Standard for building wiring.' },
  { number: 30, symbol: 'Zn', name: 'Zinc', mass: 65.38, category: 'transition-metal', period: 4, group: 12, state: 'Solid', config: '[Ar] 3d¹⁰ 4s²', electronegativity: 1.65, shells: [2, 8, 18, 2], description: 'Heavily used to galvanize iron and steel against corrosion. Famous component of brass alloy.' },
  { number: 31, symbol: 'Ga', name: 'Gallium', mass: 69.723, category: 'post-transition-metal', period: 4, group: 13, state: 'Solid', config: '[Ar] 3d¹⁰ 4s² 4p¹', electronegativity: 1.81, shells: [2, 8, 18, 3], description: 'Melts in hands (29.7°C). Heavily utilized in high-speed semiconductors and LEDs.' },
  { number: 32, symbol: 'Ge', name: 'Germanium', mass: 72.63, category: 'metalloid', period: 4, group: 14, state: 'Solid', config: '[Ar] 3d¹⁰ 4s² 4p²', electronegativity: 2.01, shells: [2, 8, 18, 4], description: 'Brittle, lustrous semi-metal. Integral in infrared sensor optics and optical fibers.' },
  { number: 33, symbol: 'As', name: 'Arsenic', mass: 74.922, category: 'metalloid', period: 4, group: 15, state: 'Solid', config: '[Ar] 3d¹⁰ 4s² 4p³', electronegativity: 2.18, shells: [2, 8, 18, 5], description: 'Toxic metalloid. Used as an intentionally added dopant in modern gallium-arsenide semiconductors.' },
  { number: 34, symbol: 'Se', name: 'Selenium', mass: 78.971, category: 'polyatomic-nonmetal', period: 4, group: 16, state: 'Solid', config: '[Ar] 3d¹⁰ 4s² 4p⁴', electronegativity: 2.55, shells: [2, 8, 18, 6], description: 'Used in glass making, solar cells, photocells, and light-related controls.' },
  { number: 35, symbol: 'Br', name: 'Bromine', mass: 79.904, category: 'halogen', period: 4, group: 17, state: 'Liquid', config: '[Ar] 3d¹⁰ 4s² 4p⁵', electronegativity: 2.96, shells: [2, 8, 18, 7], description: 'Deep reddish-brown heavy fuming halogen liquid. Highly corrosive to human tissues.' },
  { number: 36, symbol: 'Kr', name: 'Krypton', mass: 83.798, category: 'noble-gas', period: 4, group: 18, state: 'Gas', config: '[Ar] 3d¹⁰ 4s² 4p⁶', electronegativity: 3.00, shells: [2, 8, 18, 8], description: 'Rare atmospheric gas. Used in high-speed strobe photography and energy conservation window panes.' },
  { number: 37, symbol: 'Rb', name: 'Rubidium', mass: 85.4678, category: 'alkali-metal', period: 5, group: 1, state: 'Solid', config: '[Kr] 5s¹', electronegativity: 0.82, shells: [2, 8, 18, 8, 1], description: 'Highly soft, reactive alkali metal that ignites spontaneously in normal air.' },
  { number: 38, symbol: 'Sr', name: 'Strontium', mass: 87.62, category: 'alkaline-earth-metal', period: 5, group: 2, state: 'Solid', config: '[Kr] 5s²', electronegativity: 0.95, shells: [2, 8, 18, 8, 2], description: 'Highly reactive metal. Salts glow crimson red in flare fireworks.' },
  { number: 39, symbol: 'Y', name: 'Yttrium', mass: 88.905, category: 'transition-metal', period: 5, group: 3, state: 'Solid', config: '[Kr] 4d¹ 5s²', electronegativity: 1.22, shells: [2, 8, 18, 9, 2], description: 'Rare earth metal used in superconductors, lasers, and radar technology.' },
  { number: 40, symbol: 'Zr', name: 'Zirconium', mass: 91.224, category: 'transition-metal', period: 5, group: 4, state: 'Solid', config: '[Kr] 4d² 5s²', electronegativity: 1.33, shells: [2, 8, 18, 10, 2], description: 'Extremely corrosion resistant. Used in nuclear reactor rod cladding.' },
  { number: 41, symbol: 'Nb', name: 'Niobium', mass: 92.906, category: 'transition-metal', period: 5, group: 5, state: 'Solid', config: '[Kr] 4d⁴ 5s¹', electronegativity: 1.6, shells: [2, 8, 18, 12, 1], description: 'Superconducting metal used in powerful MRI magnetic coils and jet engines.' },
  { number: 42, symbol: 'Mo', name: 'Molybdenum', mass: 95.95, category: 'transition-metal', period: 5, group: 6, state: 'Solid', config: '[Kr] 4d⁵ 5s¹', electronegativity: 2.16, shells: [2, 8, 18, 13, 1], description: 'High melting point. Enhances toughness and strength of structural steel alloys.' },
  { number: 43, symbol: 'Tc', name: 'Technetium', mass: 98, category: 'transition-metal', period: 5, group: 7, state: 'Synthetic', config: '[Kr] 4d⁵ 5s²', electronegativity: 1.9, shells: [2, 8, 18, 13, 2], description: 'First artificially made element. Extensively used as radioactive tracer in medical imaging.' },
  { number: 44, symbol: 'Ru', name: 'Ruthenium', mass: 101.07, category: 'transition-metal', period: 5, group: 8, state: 'Solid', config: '[Kr] 4d⁷ 5s¹', electronegativity: 2.2, shells: [2, 8, 18, 15, 1], description: 'Rare platinum group metal. Used in electrical contacts and chips catalytic loops.' },
  { number: 45, symbol: 'Rh', name: 'Rhodium', mass: 102.906, category: 'transition-metal', period: 5, group: 9, state: 'Solid', config: '[Kr] 4d⁸ 5s¹', electronegativity: 2.28, shells: [2, 8, 18, 16, 1], description: 'Precious noble metal. Excellent catalyst for modern vehicle emission controls.' },
  { number: 46, symbol: 'Pd', name: 'Palladium', mass: 106.42, category: 'transition-metal', period: 5, group: 10, state: 'Solid', config: '[Kr] 4d¹⁰', electronegativity: 2.2, shells: [2, 8, 18, 18], description: 'Absorbs hydrogen gas up to 900 times its own volume. Used in fuel cells.' },
  { number: 47, symbol: 'Ag', name: 'Silver', mass: 107.868, category: 'transition-metal', period: 5, group: 11, state: 'Solid', config: '[Kr] 4d¹⁰ 5s¹', electronegativity: 1.93, shells: [2, 8, 18, 18, 1], description: 'The absolute highest electrical and thermal conductivity of any known element.' },
  { number: 48, symbol: 'Cd', name: 'Cadmium', mass: 112.414, category: 'transition-metal', period: 5, group: 12, state: 'Solid', config: '[Kr] 4d¹⁰ 5s²', electronegativity: 1.69, shells: [2, 8, 18, 18, 2], description: 'Heavy metal used in cell Ni-Cd rechargeable batteries and solar cell films.' },
  { number: 49, symbol: 'In', name: 'Indium', mass: 114.818, category: 'post-transition-metal', period: 5, group: 13, state: 'Solid', config: '[Kr] 4d¹⁰ 5s² 5p¹', electronegativity: 1.78, shells: [2, 8, 18, 18, 3], description: 'Very soft metal. Liquid form indium-tin oxide coats smartphone touchscreens.' },
  { number: 50, symbol: 'Sn', name: 'Tin', mass: 118.71, category: 'post-transition-metal', period: 5, group: 14, state: 'Solid', config: '[Kr] 4d¹⁰ 5s² 5p²', electronegativity: 1.96, shells: [2, 8, 18, 18, 4], description: 'Malleable metal. Alloyed with copper to form bronze, and widely used as solder.' },
  { number: 51, symbol: 'Sb', name: 'Antimony', mass: 121.76, category: 'metalloid', period: 5, group: 15, state: 'Solid', config: '[Kr] 4d¹⁰ 5s² 5p³', electronegativity: 2.05, shells: [2, 8, 18, 18, 5], description: 'Lustrous gray metalloid. Extensively used in micro-electronics and flame retardants.' },
  { number: 52, symbol: 'Te', name: 'Tellurium', mass: 127.6, category: 'metalloid', period: 5, group: 16, state: 'Solid', config: '[Kr] 4d¹⁰ 5s² 5p⁴', electronegativity: 2.1, shells: [2, 8, 18, 18, 6], description: 'Mildly toxic metalloid. Popularly used in solar cells and alloy structural additives.' },
  { number: 53, symbol: 'I', name: 'Iodine', mass: 126.904, category: 'halogen', period: 5, group: 17, state: 'Solid', config: '[Kr] 4d¹⁰ 5s² 5p⁵', electronegativity: 2.66, shells: [2, 8, 18, 18, 7], description: 'Dark purple-black solid. Sublimates into violet gas. Essential nutrient for endocrine glands.' },
  { number: 54, symbol: 'Xe', name: 'Xenon', mass: 131.293, category: 'noble-gas', period: 5, group: 18, state: 'Gas', config: '[Kr] 4d¹⁰ 5s² 5p⁶', electronegativity: 2.6, shells: [2, 8, 18, 18, 8], description: 'First noble gas proven to form real chemical compounds in laboratory settings.' },
  { number: 55, symbol: 'Cs', name: 'Cesium', mass: 132.905, category: 'alkali-metal', period: 6, group: 1, state: 'Solid', config: '[Xe] 6s¹', electronegativity: 0.79, shells: [2, 8, 18, 18, 8, 1], description: 'Liquid near room temp (28.4°C). Drives accurate standardized atomic clocks.' },
  { number: 56, symbol: 'Ba', name: 'Barium', mass: 137.327, category: 'alkaline-earth-metal', period: 6, group: 2, state: 'Solid', config: '[Xe] 6s²', electronegativity: 0.89, shells: [2, 8, 18, 18, 8, 2], description: 'Used as contrast element in gastrointestinal medical X-rays and imaging.' },
  { number: 57, symbol: 'La', name: 'Lanthanum', mass: 138.905, category: 'lanthanoid', period: 6, group: 3, state: 'Solid', config: '[Xe] 5d¹ 6s²', electronegativity: 1.1, shells: [2, 8, 18, 18, 9, 2], description: 'Gives the name to the Lanthanides block. Used in laser glasses and camera optics.' },
  { number: 58, symbol: 'Ce', name: 'Cerium', mass: 140.116, category: 'lanthanoid', period: 6, group: 3, state: 'Solid', config: '[Xe] 4f¹ 5d¹ 6s²', electronegativity: 1.12, shells: [2, 8, 18, 19, 9, 2], description: 'Abundant rare earth element. Used in self-ignition lighter flints.' },
  { number: 59, symbol: 'Pr', name: 'Praseodymium', mass: 140.908, category: 'lanthanoid', period: 6, group: 3, state: 'Solid', config: '[Xe] 4f³ 6s²', electronegativity: 1.13, shells: [2, 8, 18, 21, 8, 2], description: 'Soft, ductile element that forms high-strength magnets when alloyed.' },
  { number: 60, symbol: 'Nd', name: 'Neodymium', mass: 144.242, category: 'lanthanoid', period: 6, group: 3, state: 'Solid', config: '[Xe] 4f⁴ 6s²', electronegativity: 1.14, shells: [2, 8, 18, 22, 8, 2], description: 'Creates exceptionally strong permanent magnets found in devices worldwide.' },
  { number: 61, symbol: 'Pm', name: 'Promethium', mass: 145, category: 'lanthanoid', period: 6, group: 3, state: 'Synthetic', config: '[Xe] 4f⁵ 6s²', electronegativity: 1.13, shells: [2, 8, 18, 23, 8, 2], description: 'Extremely rare radioactive element. Used in glow paint and space batteries.' },
  { number: 62, symbol: 'Sm', name: 'Samarium', mass: 150.36, category: 'lanthanoid', period: 6, group: 3, state: 'Solid', config: '[Xe] 4f⁶ 6s²', electronegativity: 1.17, shells: [2, 8, 18, 24, 8, 2], description: 'Magnets withstand extremely high temperatures. Used in advanced cancer therapy.' },
  { number: 63, symbol: 'Eu', name: 'Europium', mass: 151.964, category: 'lanthanoid', period: 6, group: 3, state: 'Solid', config: '[Xe] 4f⁷ 6s²', electronegativity: 1.2, shells: [2, 8, 18, 25, 8, 2], description: 'Most reactive rare earth. Creates brilliant red phosphors in tv screens.' },
  { number: 64, symbol: 'Gd', name: 'Gadolinium', mass: 157.25, category: 'lanthanoid', period: 6, group: 3, state: 'Solid', config: '[Xe] 4f⁷ 5d¹ 6s²', electronegativity: 1.2, shells: [2, 8, 18, 25, 9, 2], description: 'Has unique magnetic attributes. Crucial contrast medium for MRI scanning.' },
  { number: 65, symbol: 'Tb', name: 'Terbium', mass: 158.925, category: 'lanthanoid', period: 6, group: 3, state: 'Solid', config: '[Xe] 4f⁹ 6s²', electronegativity: 1.22, shells: [2, 8, 18, 27, 8, 2], description: 'Used to dope semiconductor elements and in specialized sonar technologies.' },
  { number: 66, symbol: 'Dy', name: 'Dysprosium', mass: 162.5, category: 'lanthanoid', period: 6, group: 3, state: 'Solid', config: '[Xe] 4f¹⁰ 6s²', electronegativity: 1.22, shells: [2, 8, 18, 28, 8, 2], description: 'Heavily used in hybrid vehicle motors and commercial nuclear reactor rods.' },
  { number: 67, symbol: 'Ho', name: 'Holmium', mass: 164.93, category: 'lanthanoid', period: 6, group: 3, state: 'Solid', config: '[Xe] 4f¹¹ 6s²', electronegativity: 1.23, shells: [2, 8, 18, 29, 8, 2], description: 'Possesses incredible magnetic strength. Used in medical lasers.' },
  { number: 68, symbol: 'Er', name: 'Erbium', mass: 167.259, category: 'lanthanoid', period: 6, group: 3, state: 'Solid', config: '[Xe] 4f¹² 6s²', electronegativity: 1.24, shells: [2, 8, 18, 30, 8, 2], description: 'Pink ions act as powerful optical fiber signal amplifiers.' },
  { number: 69, symbol: 'Tm', name: 'Thulium', mass: 168.934, category: 'lanthanoid', period: 6, group: 3, state: 'Solid', config: '[Xe] 4f¹³ 6s²', electronegativity: 1.25, shells: [2, 8, 18, 31, 8, 2], description: 'Rarest natural lanthanide. Radiates pure X-rays in portable scanners.' },
  { number: 70, symbol: 'Yb', name: 'Ytterbium', mass: 173.054, category: 'lanthanoid', period: 6, group: 3, state: 'Solid', config: '[Xe] 4f¹⁴ 6s²', electronegativity: 1.1, shells: [2, 8, 18, 32, 8, 2], description: 'Stainless steel stress testing. Integral to advanced laser clocks.' },
  { number: 71, symbol: 'Lu', name: 'Lutetium', mass: 174.967, category: 'lanthanoid', period: 6, group: 3, state: 'Solid', config: '[Xe] 4f¹⁴ 5d¹ 6s²', electronegativity: 1.27, shells: [2, 8, 18, 32, 9, 2], description: 'Densely packed, expensive heavy metal. Used in cancer therapies.' },
  { number: 72, symbol: 'Hf', name: 'Hafnium', mass: 178.49, category: 'transition-metal', period: 6, group: 4, state: 'Solid', config: '[Xe] 4f¹⁴ 5d² 6s²', electronegativity: 1.3, shells: [2, 8, 18, 32, 10, 2], description: 'Brilliant electron emitter. Absorbs neutrons in submarine reactor rods.' },
  { number: 73, symbol: 'Ta', name: 'Tantalum', mass: 180.948, category: 'transition-metal', period: 6, group: 5, state: 'Solid', config: '[Xe] 4f¹⁴ 5d³ 6s²', electronegativity: 1.5, shells: [2, 8, 18, 32, 11, 2], description: 'Corrosion immune under 150°C. Made for micro-capacitors in modern phones.' },
  { number: 74, symbol: 'W', name: 'Tungsten', mass: 183.84, category: 'transition-metal', period: 6, group: 6, state: 'Solid', config: '[Xe] 4f¹⁴ 5d⁴ 6s²', electronegativity: 2.36, shells: [2, 8, 18, 32, 12, 2], description: 'Highest melting point of any element (3422°C). Used as incandescent filaments.' },
  { number: 75, symbol: 'Re', name: 'Rhenium', mass: 186.207, category: 'transition-metal', period: 6, group: 7, state: 'Solid', config: '[Xe] 4f¹⁴ 5d⁵ 6s²', electronegativity: 1.9, shells: [2, 8, 18, 32, 13, 2], description: 'Used in superalloy jet engines and catalyst petroleum reformers.' },
  { number: 76, symbol: 'Os', name: 'Osmium', mass: 190.23, category: 'transition-metal', period: 6, group: 8, state: 'Solid', config: '[Xe] 4f¹⁴ 5d⁶ 6s²', electronegativity: 2.2, shells: [2, 8, 18, 32, 14, 2], description: 'The absolute densest natural element. Extremely hard metal.' },
  { number: 77, symbol: 'Ir', name: 'Iridium', mass: 192.217, category: 'transition-metal', period: 6, group: 9, state: 'Solid', config: '[Xe] 4f¹⁴ 5d⁷ 6s²', electronegativity: 2.2, shells: [2, 8, 18, 32, 15, 2], description: 'Most corrosion-proof metal. Abundant in deep cosmic meteorites.' },
  { number: 78, symbol: 'Pt', name: 'Platinum', mass: 195.084, category: 'transition-metal', period: 6, group: 10, state: 'Solid', config: '[Xe] 4f¹⁴ 5d⁹ 6s¹', electronegativity: 2.28, shells: [2, 8, 18, 32, 17, 1], description: 'Highly unreactive precious metal. Key catalyst in lab ware and implants.' },
  { number: 79, symbol: 'Au', name: 'Gold', mass: 196.967, category: 'transition-metal', period: 6, group: 11, state: 'Solid', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', electronegativity: 2.54, shells: [2, 8, 18, 32, 18, 1], description: 'Highly malleable noble metal. Symbol of wealth and ultimate electric contact.' },
  { number: 80, symbol: 'Hg', name: 'Mercury', mass: 200.592, category: 'transition-metal', period: 6, group: 12, state: 'Liquid', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', electronegativity: 2.0, shells: [2, 8, 18, 32, 18, 2], description: 'Only metal that is liquid at standard room temperature. Used in thermometers.' },
  { number: 81, symbol: 'Tl', name: 'Thallium', mass: 204.38, category: 'post-transition-metal', period: 6, group: 13, state: 'Solid', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', electronegativity: 1.62, shells: [2, 8, 18, 32, 18, 3], description: 'Soft gray metal. Highly toxic salts historically used in rat poisons.' },
  { number: 82, symbol: 'Pb', name: 'Lead', mass: 207.2, category: 'post-transition-metal', period: 6, group: 14, state: 'Solid', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', electronegativity: 2.33, shells: [2, 8, 18, 32, 18, 4], description: 'Dense poisonous metal. Blocks X-ray radiation. Used in car batteries.' },
  { number: 83, symbol: 'Bi', name: 'Bismuth', mass: 208.98, category: 'post-transition-metal', period: 6, group: 15, state: 'Solid', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', electronegativity: 2.02, shells: [2, 8, 18, 32, 18, 5], description: 'Often forms colorful oxide crystals. Main active in Pepto-Bismol medicine.' },
  { number: 84, symbol: 'Po', name: 'Polonium', mass: 209, category: 'metalloid', period: 6, group: 16, state: 'Solid', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', electronegativity: 2.0, shells: [2, 8, 18, 32, 18, 6], description: 'Highly radioactive and lethal element discovered by Marie Curie in 1898.' },
  { number: 85, symbol: 'At', name: 'Astatine', mass: 210, category: 'halogen', period: 6, group: 17, state: 'Solid', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', electronegativity: 2.2, shells: [2, 8, 18, 32, 18, 7], description: 'The rarest natural element on Earth\'s crust, with brief half-life.' },
  { number: 86, symbol: 'Rn', name: 'Radon', mass: 222, category: 'noble-gas', period: 6, group: 18, state: 'Gas', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', electronegativity: 2.2, shells: [2, 8, 18, 32, 18, 8], description: 'Invisible, radioactive gas. Leading natural cause of household lung cancer.' },
  { number: 87, symbol: 'Fr', name: 'Francium', mass: 223, category: 'alkali-metal', period: 7, group: 1, state: 'Solid', config: '[Rn] 7s¹', electronegativity: 0.79, shells: [2, 8, 18, 32, 18, 8, 1], description: 'Highly unstable. Second rarest element in crust, named after France.' },
  { number: 88, symbol: 'Ra', name: 'Radium', mass: 226, category: 'alkaline-earth-metal', period: 7, group: 2, state: 'Solid', config: '[Rn] 7s²', electronegativity: 0.9, shells: [2, 8, 18, 32, 18, 8, 2], description: 'Intensely glowing radioactive element historically used in watch luminous paint.' },
  { number: 89, symbol: 'Ac', name: 'Actinium', mass: 227, category: 'actinoid', period: 7, group: 3, state: 'Solid', config: '[Rn] 6d¹ 7s²', electronegativity: 1.1, shells: [2, 8, 18, 32, 18, 9, 2], description: 'Strong radiation source. Glows with beautiful blue light in dark rooms.' },
  { number: 90, symbol: 'Th', name: 'Thorium', mass: 232.038, category: 'actinoid', period: 7, group: 3, state: 'Solid', config: '[Rn] 6d² 7s²', electronegativity: 1.3, shells: [2, 8, 18, 32, 18, 10, 2], description: 'Potential safe nuclear fuel alternative. Abundant energy content.' },
  { number: 91, symbol: 'Pa', name: 'Protactinium', mass: 231.036, category: 'actinoid', period: 7, group: 3, state: 'Solid', config: '[Rn] 5f² 6d¹ 7s²', electronegativity: 1.5, shells: [2, 8, 18, 32, 20, 9, 2], description: 'Dense, highly toxic alpha emitter element. Rare decay by-product.' },
  { number: 92, symbol: 'U', name: 'Uranium', mass: 238.029, category: 'actinoid', period: 7, group: 3, state: 'Solid', config: '[Rn] 5f³ 6d¹ 7s²', electronegativity: 1.38, shells: [2, 8, 18, 32, 21, 9, 2], description: 'Heaviest natural element. Drives standard nuclear reactors and weaponry.' },
  { number: 93, symbol: 'Np', name: 'Neptunium', mass: 237, category: 'actinoid', period: 7, group: 3, state: 'Synthetic', config: '[Rn] 5f⁴ 6d¹ 7s²', electronegativity: 1.36, shells: [2, 8, 18, 32, 22, 9, 2], description: 'First synthetic transuranic element ever produced, named after Neptune.' },
  { number: 94, symbol: 'Pu', name: 'Plutonium', mass: 244, category: 'actinoid', period: 7, group: 3, state: 'Synthetic', config: '[Rn] 5f⁶ 7s²', electronegativity: 1.28, shells: [2, 8, 18, 32, 24, 8, 2], description: 'Extremely powerful radioactive element. Main fuel source for deep space probes.' },
  { number: 95, symbol: 'Am', name: 'Americium', mass: 243, category: 'actinoid', period: 7, group: 3, state: 'Synthetic', config: '[Rn] 5f⁷ 7s²', electronegativity: 1.3, shells: [2, 8, 18, 32, 25, 8, 2], description: 'Common alpha particle emitter inside standard residential smoke detectors.' },
  { number: 96, symbol: 'Cm', name: 'Curium', mass: 247, category: 'actinoid', period: 7, group: 3, state: 'Synthetic', config: '[Rn] 5f⁷ 6d¹ 7s²', electronegativity: 1.3, shells: [2, 8, 18, 32, 25, 9, 2], description: 'Named in honor of Marie and Pierre Curie. Intensely glowing radioisotope.' },
  { number: 97, symbol: 'Bk', name: 'Berkelium', mass: 247, category: 'actinoid', period: 7, group: 3, state: 'Synthetic', config: '[Rn] 5f⁹ 7s²', electronegativity: 1.3, shells: [2, 8, 18, 32, 27, 8, 2], description: 'Discovered at UC Berkeley, California in 1949. Rare chemical proxy.' },
  { number: 98, symbol: 'Cf', name: 'Californium', mass: 251, category: 'actinoid', period: 7, group: 3, state: 'Synthetic', config: '[Rn] 5f¹⁰ 7s²', electronegativity: 1.3, shells: [2, 8, 18, 32, 28, 8, 2], description: 'Vigorous neutron emitter. Used to ignite advanced nuclear startups.' },
  { number: 99, symbol: 'Es', name: 'Einsteinium', mass: 252, category: 'actinoid', period: 7, group: 3, state: 'Synthetic', config: '[Rn] 5f¹¹ 7s²', electronegativity: 1.3, shells: [2, 8, 18, 32, 29, 8, 2], description: 'Named in honor of Albert Einstein. Found in early fusion test residues.' },
  { number: 100, symbol: 'Fm', name: 'Fermium', mass: 257, category: 'actinoid', period: 7, group: 3, state: 'Synthetic', config: '[Rn] 5f¹² 7s²', electronegativity: 1.3, shells: [2, 8, 18, 32, 30, 8, 2], description: 'Named after Enrico Fermi. Created via intense neutron bombardment.' },
  { number: 101, symbol: 'Md', name: 'Mendelevium', mass: 258, category: 'actinoid', period: 7, group: 3, state: 'Synthetic', config: '[Rn] 5f¹³ 7s²', electronegativity: 1.3, shells: [2, 8, 18, 32, 31, 8, 2], description: 'Named after periodic system initiator Dmitri Mendeleev.' },
  { number: 102, symbol: 'No', name: 'Nobelium', mass: 259, category: 'actinoid', period: 7, group: 3, state: 'Synthetic', config: '[Rn] 5f¹⁴ 7s²', electronegativity: 1.3, shells: [2, 8, 18, 32, 32, 8, 2], description: 'In honor of Alfred Nobel. Unstable synthesized heavy element.' },
  { number: 103, symbol: 'Lr', name: 'Lawrencium', mass: 262, category: 'actinoid', period: 7, group: 3, state: 'Synthetic', config: '[Rn] 5f¹⁴ 7s² 7p¹', electronegativity: 1.3, shells: [2, 8, 18, 32, 32, 8, 3], description: 'Named after cyclotron inventor Ernest Lawrence. Extremely unstable.' },
  { number: 104, symbol: 'Rf', name: 'Rutherfordium', mass: 267, category: 'transition-metal', period: 7, group: 4, state: 'Synthetic', config: '[Rn] 5f¹⁴ 6d² 7s²', electronegativity: undefined, shells: [2, 8, 18, 32, 32, 10, 2], description: 'Synthetic radioactive element named in honor of physicist Ernest Rutherford.' },
  { number: 105, symbol: 'Db', name: 'Dubnium', mass: 268, category: 'transition-metal', period: 7, group: 5, state: 'Synthetic', config: '[Rn] 5f¹⁴ 6d³ 7s²', electronegativity: undefined, shells: [2, 8, 18, 32, 32, 11, 2], description: 'Named after the Russian nuclear research town Dubna.' },
  { number: 106, symbol: 'Sg', name: 'Seaborgium', mass: 269, category: 'transition-metal', period: 7, group: 6, state: 'Synthetic', config: '[Rn] 5f¹⁴ 6d⁴ 7s²', electronegativity: undefined, shells: [2, 8, 18, 32, 32, 12, 2], description: 'Named after Glenn T. Seaborg, first living scientist honored with element name.' },
  { number: 107, symbol: 'Bh', name: 'Bohrium', mass: 270, category: 'transition-metal', period: 7, group: 7, state: 'Synthetic', config: '[Rn] 5f¹⁴ 6d⁵ 7s²', electronegativity: undefined, shells: [2, 8, 18, 32, 32, 13, 2], description: 'Named in honor of Niels Bohr, father of orbital Bohr atom theory.' },
  { number: 108, symbol: 'Hs', name: 'Hassium', mass: 277, category: 'transition-metal', period: 7, group: 8, state: 'Synthetic', config: '[Rn] 5f¹⁴ 6d⁶ 7s²', electronegativity: undefined, shells: [2, 8, 18, 32, 32, 14, 2], description: 'Super-heavy elements synthesized at GSI, Darmstadt, Germany.' },
  { number: 109, symbol: 'Mt', name: 'Meitnerium', mass: 278, category: 'transition-metal', period: 7, group: 9, state: 'Synthetic', config: '[Rn] 5f¹⁴ 6d⁷ 7s²', electronegativity: undefined, shells: [2, 8, 18, 32, 32, 15, 2], description: 'Named in honor of brilliant Austrian physicist Lise Meitner.' },
  { number: 110, symbol: 'Ds', name: 'Darmstadtium', mass: 281, category: 'transition-metal', period: 7, group: 10, state: 'Synthetic', config: '[Rn] 5f¹⁴ 6d⁸ 7s²', electronegativity: undefined, shells: [2, 8, 18, 32, 32, 16, 2], description: 'Superheavy isotope synthesized at GSI Darmstadt, Germany.' },
  { number: 111, symbol: 'Rg', name: 'Roentgenium', mass: 282, category: 'transition-metal', period: 7, group: 11, state: 'Synthetic', config: '[Rn] 5f¹⁴ 6d⁹ 7s²', electronegativity: undefined, shells: [2, 8, 18, 32, 32, 17, 2], description: 'Named in honor of Wilhelm Röntgen, discoverer of medical X-rays.' },
  { number: 112, symbol: 'Cn', name: 'Copernicium', mass: 285, category: 'transition-metal', period: 7, group: 12, state: 'Synthetic', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', electronegativity: undefined, shells: [2, 8, 18, 32, 32, 18, 2], description: 'In honor of astronomer Nicolaus Copernicus. Extremely radioactive.' },
  { number: 113, symbol: 'Nh', name: 'Nihonium', mass: 286, category: 'post-transition-metal', period: 7, group: 13, state: 'Synthetic', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', electronegativity: undefined, shells: [2, 8, 18, 32, 32, 18, 3], description: 'First Asian discovered element, synthesized in RIKEN, Japan.' },
  { number: 114, symbol: 'Fl', name: 'Flerovium', mass: 289, category: 'post-transition-metal', period: 7, group: 14, state: 'Synthetic', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', electronegativity: undefined, shells: [2, 8, 18, 32, 32, 18, 4], description: 'Discovered in Flerov Laboratory of Nuclear Reactions in Russia.' },
  { number: 115, symbol: 'Mc', name: 'Moscovium', mass: 290, category: 'post-transition-metal', period: 7, group: 15, state: 'Synthetic', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', electronegativity: undefined, shells: [2, 8, 18, 32, 32, 18, 5], description: 'Named in honor of the Moscow region of Russia.' },
  { number: 116, symbol: 'Lv', name: 'Livermorium', mass: 293, category: 'post-transition-metal', period: 7, group: 16, state: 'Synthetic', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', electronegativity: undefined, shells: [2, 8, 18, 32, 32, 18, 6], description: 'Named in honor of Lawrence Livermore National Laboratory, USA.' },
  { number: 117, symbol: 'Ts', name: 'Tennessine', mass: 294, category: 'halogen', period: 7, group: 17, state: 'Synthetic', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', electronegativity: undefined, shells: [2, 8, 18, 32, 32, 18, 7], description: 'Synthesized via collaborative US-Russia research in Tennessee, USA.' },
  { number: 118, symbol: 'Og', name: 'Oganesson', mass: 294, category: 'noble-gas', period: 7, group: 18, state: 'Synthetic', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', electronegativity: undefined, shells: [2, 8, 18, 32, 32, 18, 8], description: 'Heaviest element ever synthesized. Honors nuclear physicist Yuri Oganessian.' },
];

export const FORM_CATEGORIES = {
  chemistry_11: 'Chemistry Class 11th',
  chemistry_12: 'Chemistry Class 12th',
  physics_11: 'Physics Class 11th',
  physics_12: 'Physics Class 12th',
};

export const FORMULAS_DATA: FormulaItem[] = [
  // =========== CHEMISTRY CLASS 11 ===========
  {
    id: 'chm_f1',
    title: 'Mole Fraction (χ)',
    formula: 'χ_A = n_A / (n_A + n_B)',
    description: 'Ratio of number of moles of a component to the total number of moles of solution.',
    class: '11th',
    subject: 'Chemistry',
    chapter: 'Some Basic Concepts'
  },
  {
    id: 'chm_f2',
    title: 'Molarity (M)',
    formula: 'M = Moles of Solute / Volume of Solution in Litres',
    description: 'Number of moles of solute dissolved in 1 Liter of solution. Temperature dependent.',
    class: '11th',
    subject: 'Chemistry',
    chapter: 'Some Basic Concepts'
  },
  {
    id: 'chm_f3',
    title: 'Bohr\'s Radius Formula',
    formula: 'r_n = 52.9 × (n² / Z) pm',
    description: 'Radius of the nth orbit of hydrogen-like species where Z is atomic number, n is principal quantum number.',
    class: '11th',
    subject: 'Chemistry',
    chapter: 'Structure of Atom'
  },
  {
    id: 'chm_f4',
    title: 'Rydberg Formula',
    formula: '1 / λ = R_H × Z² × (1/n₁² - 1/n₂²)',
    description: 'Wavelength of radiated photon during transition. Rydberg constant R_H = 109677 cm⁻¹.',
    class: '11th',
    subject: 'Chemistry',
    chapter: 'Structure of Atom'
  },
  {
    id: 'chm_f5',
    title: 'Ideal Gas Equation',
    formula: 'P × V = n × R × T',
    description: 'Relates state factors of gas: Pressure (P), Volume (V), Temperature (T) and moles (n). R = 8.314 J/K·mol.',
    class: '11th',
    subject: 'Chemistry',
    chapter: 'States of Matter'
  },
  {
    id: 'chm_f6',
    title: 'First Law of Thermodynamics',
    formula: 'ΔU = q + w',
    description: 'The internal energy change (ΔU) is the sum of heat absorbed (q) and work done on the system (w).',
    class: '11th',
    subject: 'Chemistry',
    chapter: 'Thermodynamics'
  },
  {
    id: 'chm_f7',
    title: 'Gibbs Free Energy Equation',
    formula: 'ΔG = ΔH - T × ΔS',
    description: 'Predicts spontaneity. If ΔG < 0, custom reaction is spontaneous; if ΔG = 0 equilibrium; if ΔG > 0 non-spontaneous.',
    class: '11th',
    subject: 'Chemistry',
    chapter: 'Thermodynamics'
  },
  {
    id: 'chm_f8',
    title: 'Buffer Equation (Henderson-Hasselbalch)',
    formula: 'pH = pK_a + log₁₀([Conjugate Base] / [Weak Acid])',
    description: 'Used to calculate the pH of acidic buffer solutions. For basic: pOH = pK_b + log([Salt]/[Base]).',
    class: '11th',
    subject: 'Chemistry',
    chapter: 'Equilibrium'
  },

  // =========== CHEMISTRY CLASS 12 ===========
  {
    id: 'chm_f9',
    title: 'Raoult\'s Law (Relative Lowering)',
    formula: '(P° - P_s) / P° = χ_{solute}',
    description: 'Relative lowering of vapor pressure equals the mole fraction of the solute in volatile solutions.',
    class: '12th',
    subject: 'Chemistry',
    chapter: 'Solutions'
  },
  {
    id: 'chm_f10',
    title: 'Osmotic Pressure',
    formula: 'π = i × C × R × T',
    description: 'Minimum pressure needed to halt solvent inward flow. i is the Van\'t Hoff factor; C is molar concentration.',
    class: '12th',
    subject: 'Chemistry',
    chapter: 'Solutions'
  },
  {
    id: 'chm_f11',
    title: 'Nernst Equation',
    formula: 'E_{cell} = E°_{cell} - (0.0591 / n) × log₁₀(Q)',
    description: 'Calculates electrode potential of cell at any concentration at 298K. Q is cell reaction quotient.',
    class: '12th',
    subject: 'Chemistry',
    chapter: 'Electrochemistry'
  },
  {
    id: 'chm_f12',
    title: 'Kohlrausch\'s Law',
    formula: 'Λ°_m = ν₊ × λ°₊ + ν₋ × λ°₋',
    description: 'Molar conductivity of an electrolyte at infinite dilution is sum of individual ionic contribution.',
    class: '12th',
    subject: 'Chemistry',
    chapter: 'Electrochemistry'
  },
  {
    id: 'chm_f13',
    title: 'First-Order Kinetics Rate Constant',
    formula: 'k = (2.303 / t) × log₁₀([A]₀ / [A])',
    description: 'Rate constant of first order custom decay reaction. Half life equation: t_{1/2} = 0.693 / k.',
    class: '12th',
    subject: 'Chemistry',
    chapter: 'Chemical Kinetics'
  },
  {
    id: 'chm_f14',
    title: 'Arrhenius Rate Equation',
    formula: 'k = A × e^(-E_a / (R × T))',
    description: 'Temperature dependence of reaction rates. E_a is activation energy, A is frequency/pre-exponential factor.',
    class: '12th',
    subject: 'Chemistry',
    chapter: 'Chemical Kinetics'
  },

  // =========== PHYSICS CLASS 11 ===========
  {
    id: 'phy_f1',
    title: 'Equations of Motion',
    formula: 'v = u + at \n S = ut + ½at² \n v² = u² + Custom(2aS)',
    description: 'Standard kinematics relations with uniform linear acceleration (a) and initial velocity (u).',
    class: '11th',
    subject: 'Physics',
    chapter: 'Motion in a Straight Line'
  },
  {
    id: 'phy_f2',
    title: 'Centripetal Force',
    formula: 'F_c = m × v² / R',
    description: 'Force pull keeping objects moving inside circular tracks of radius R with constant speed v.',
    class: '11th',
    subject: 'Physics',
    chapter: 'Laws of Motion'
  },
  {
    id: 'phy_f3',
    title: 'Work Energy Theorem',
    formula: 'W_{Net} = K_f - K_i = ΔK',
    description: 'Work done by net external forces equals changes in kinetic energy of body systems.',
    class: '11th',
    subject: 'Physics',
    chapter: 'Work, Energy and Power'
  },
  {
    id: 'phy_f4',
    title: 'Escape Velocity',
    formula: 'v_e = √(2 × G × M / R)',
    description: 'Minimum velocity required to escape spherical gravitational orbits of planetary mass M and radius R.',
    class: '11th',
    subject: 'Physics',
    chapter: 'Gravitation'
  },
  {
    id: 'phy_f5',
    title: 'Young\'s Modulus Of Elasticity',
    formula: 'Y = Long Stress / Long Strain = (F × L) / (A × ΔL)',
    description: 'Measures stiffness of solid materials within their linear elastic ranges.',
    class: '11th',
    subject: 'Physics',
    chapter: 'Mechanical Properties'
  },
  {
    id: 'phy_f6',
    title: 'Bernoulli\'s Equation',
    formula: 'P + ½ρv² + ρgh = Constant',
    description: 'Conservation of energy for flowing, incompressible, non-viscous liquids.',
    class: '11th',
    subject: 'Physics',
    chapter: 'Fluid Mechanics'
  },
  {
    id: 'phy_f7',
    title: 'Carnot Engine Efficiency',
    formula: 'η = 1 - (T_C / T_H)',
    description: 'Maximum theoretical thermal conversion efficiency for periodic loops working between T_H and T_C basins.',
    class: '11th',
    subject: 'Physics',
    chapter: 'Thermodynamics'
  },

  // =========== PHYSICS CLASS 12 ===========
  {
    id: 'phy_f8',
    title: 'Coulomb\'s Law of Electrostatics',
    formula: 'F = k × (|q₁ × q₂|) / r²',
    description: 'Attractive/repulsive force between point charges Q1 and Q2. k = 1 / (4πε₀) ≈ 9 × 10⁹ N·m²/C².',
    class: '12th',
    subject: 'Physics',
    chapter: 'Electrostatics'
  },
  {
    id: 'phy_f9',
    title: 'Capacitance of Parallel Plate',
    formula: 'C = ε₀ × A / d',
    description: 'Capacitance of a parallel plate in vacuum. For dielectrics with factor K: C = K × ε₀ × A / d.',
    class: '12th',
    subject: 'Physics',
    chapter: 'Electrostatics'
  },
  {
    id: 'phy_f10',
    title: 'Ohm\'s Law & Drift Velocity',
    formula: 'V = I × R,  v_d = (e × E × τ) / m',
    description: 'Current is linear to voltage. Drift velocity (v_d) relates electron charge, field strength, and mean free relaxation time.',
    class: '12th',
    subject: 'Physics',
    chapter: 'Current Electricity'
  },
  {
    id: 'phy_f11',
    title: 'Biot-Savart Law',
    formula: 'dB = (μ₀ / 4π) × (I × dl × sinθ) / r²',
    description: 'Calculates raw incremental magnetic fields (dB) produced by flowing electric current elements.',
    class: '12th',
    subject: 'Physics',
    chapter: 'Magnetism'
  },
  {
    id: 'phy_f12',
    title: 'Resonant Frequency of LCR Circuit',
    formula: 'f_r = 1 / (2π × √(L × C))',
    description: 'The critical frequency where reactive impedances cancel: X_L = X_C. Yields maximal circuit current flow.',
    class: '12th',
    subject: 'Physics',
    chapter: 'AC Circuits'
  },
  {
    id: 'phy_f13',
    title: 'Prism Formula (Refractive Index)',
    formula: 'μ = sin((A + D_m) / 2) / sin(A / 2)',
    description: 'Refractive index of material of prism. A is prism angle, D_m is minimum angle of deviation.',
    class: '12th',
    subject: 'Physics',
    chapter: 'Optics'
  },
  {
    id: 'phy_f14',
    title: 'de Broglie Wavelength',
    formula: 'λ = h / p = h / (m × v)',
    description: 'Wavelike dual character of matter. Relates matter momentum (p) to its quantum wave length λ of motion.',
    class: '12th',
    subject: 'Physics',
    chapter: 'Dual Nature of Matter'
  },
  {
    id: 'phy_f15',
    title: 'Radioactive Decay Law',
    formula: 'N_t = N₀ × e^(-λ × t)',
    description: 'Statistical decay index. λ is decay constant. Half life calculated as t_{1/2} = 0.693 / λ.',
    class: '12th',
    subject: 'Physics',
    chapter: 'Atoms & Nuclei'
  }
];

export const MOCK_QUESTIONS_POOL: { [subject: string]: any[] } = {
  Physics: [
    {
      id: "q_phy_1",
      text: "Two charges of magnitude +2 microcoulomb and -2 microcoulomb are separated by a distance of 10 cm in vacuum. What is the value of the potential at the midpoint of the line joining them?",
      options: ["9.0 x 10^5 V", "-9.0 x 10^5 V", "0 V", "1.8 x 10^6 V"],
      correctAnswerIndex: 2,
      explanation: "Since the midpoint is at equal distance (r) from equal and opposite charges, V = kq/r + k(-q)/r = 0 V.",
      chapter: "Electrostatics",
      class: "12th"
    },
    {
      id: "q_phy_2",
      text: "A particle is moving in a circle of radius R with a constant speed v. What is the average acceleration of the particle during a half revolution?",
      options: ["v^2 / R", "2v^2 / (pi * R)", "0", "v^2 / (pi * R)"],
      correctAnswerIndex: 1,
      explanation: "Change in velocity is v - (-v) = 2v. Time taken is pi*R/v. Average Acceleration = 2v / (pi*R/v) = 2v^2 / (pi * R).",
      chapter: "Motion in a Plane",
      class: "11th"
    },
    {
      id: "q_phy_3",
      text: "A wire of resistance R is stretched to double its original length. What will be its new resistance?",
      options: ["2R", "4R", "R/2", "R/4"],
      correctAnswerIndex: 1,
      explanation: "Volume remains constant (V = A * L). Stretching double length (2L) reduces cross-sectional Area to A/2. R = rho * L / A. R_new = rho * (2L) / (A/2) = 4 * R.",
      chapter: "Current Electricity",
      class: "12th"
    },
    {
      id: "q_phy_4",
      text: "An engine working on Carnot cycle operates between temperatures of 300 K and 600 K. What is the thermal efficiency of this engine?",
      options: ["25%", "33%", "50%", "100%"],
      correctAnswerIndex: 2,
      explanation: "Efficiency (eta) of a Carnot cycle is given as 1 - (T_cold / T_hot) = 1 - (300/600) = 0.5 or 50%.",
      chapter: "Thermodynamics",
      class: "11th"
    },
    {
      id: "q_phy_5",
      text: "The wavelength associated with a particle of mass m, moving with kinetic energy E, is given by de-Broglie relation as:",
      options: ["h / sqrt(mE)", "h / sqrt(2mE)", "sqrt(2mE) / h", "h / (2mE)"],
      correctAnswerIndex: 1,
      explanation: "Momentum p = sqrt(2mE). de-Broglie dual wavelength is lambda = h/p = h / sqrt(2mE).",
      chapter: "Dual Nature of Matter",
      class: "12th"
    }
  ],
  Chemistry: [
    {
      id: "q_chm_1",
      text: "Which of the following organic compounds will exhibit key property of tautomerism?",
      options: ["Benzaldehyde", "Acetone", "Benzophenone", "Ethanal (Acetaldehyde)"],
      correctAnswerIndex: 1,
      explanation: "Acetone and Ethanal contain active alpha-hydrogen atoms adjacent to carbonyl systems which transition back-and-forth into enol isomer configs, but Acetone is the textbook example.",
      chapter: "Organic Chemistry – Basic Principles",
      class: "11th"
    },
    {
      id: "q_chm_2",
      text: "What is the hybridisation of xenon in XeF4 molecule according to VSEPR theory?",
      options: ["sp3", "sp3d", "sp3d2", "dsp2"],
      correctAnswerIndex: 2,
      explanation: "Xenon has 8 valence electrons. In XeF4, it forms 4 single sigma bonds with fluorine and holds 2 lone pairs. Total steric number = 6, yielding sp3d2 hybrid state with square planar geometry.",
      chapter: "Chemical Bonding",
      class: "11th"
    },
    {
      id: "q_chm_3",
      text: "For a first order reaction, if initial concentration represents [A]₀ and rate constant is k, the half life (t₁/₂) is computed as:",
      options: ["0.693 / k", "1 / (k * [A]₀)", "0.5 / k", "k / 0.693"],
      correctAnswerIndex: 0,
      explanation: "Half life of first order chemical kinetics decays is strictly concentration-independent: t_{1/2} = ln(2) / k = 0.693/k.",
      chapter: "Chemical Kinetics",
      class: "12th"
    },
    {
      id: "q_chm_4",
      text: "Which of the following represents an outer orbital octahedral complex based on valence bond structures?",
      options: ["[Fe(CN)6]3-", "[Co(NH3)6]3+", "[CoF6]3-", "[Mn(CN)6]4-"],
      correctAnswerIndex: 2,
      explanation: "Fluoride ion F- acts as weak-field ligand, rendering spins high with no electron pairing. Yields dynamic sp3d2 hybrid outer orbital complex.",
      chapter: "Coordination Compounds",
      class: "12th"
    }
  ],
  Botany: [
    {
      id: "q_bot_1",
      text: "In C4 plants, the primary CO2 acceptor is which of the following molecules?",
      options: ["RuBP", "PEP (Phosphoenolpyruvate)", "OAA (Oxaloacetate)", "PGA"],
      correctAnswerIndex: 1,
      explanation: "In C4 photosynthesis cycle, primary carboxylation occurs in mesophyll cells via PEP carboxylase, using PEP as acceptor molecule.",
      chapter: "Photosynthesis in Higher Plants",
      class: "11th"
    },
    {
      id: "q_bot_2",
      text: "Which of the following is correct sequence of stages during the Prophase I cycle of meiosis cell division?",
      options: ["Leptotene -> Zygotene -> Pachytene -> Diplotene -> Diakinesis", "Zygotene -> Leptotene -> Pachytene -> Diplotene -> Diakinesis", "Leptotene -> Zygotene -> Diplotene -> Pachytene -> Diakinesis", "Leptotene -> Pachytene -> Zygotene -> Diplotene -> Diakinesis"],
      correctAnswerIndex: 0,
      explanation: "The correct progression is Leptotene (condensation), Zygotene (pairing/synapsis), Pachytene (crossing over), Diplotene (chiasmata visible), and Diakinesis (terminalisation).",
      chapter: "Cell Cycle & Cell Division",
      class: "11th"
    }
  ],
  Zoology: [
    {
      id: "q_zoo_1",
      text: "What structure or zone acts as the primary site of water absorption and metabolic compaction in human alimentary canal?",
      options: ["Duodenum", "Ileum", "Large Intestine", "Stomach"],
      correctAnswerIndex: 2,
      explanation: "The large intestine is primary responsible for recycling liquid, absorbing water, and compressing waste into solid feces.",
      chapter: "Digestive System",
      class: "11th"
    },
    {
      id: "q_zoo_2",
      text: "In eukaryotic cell translation process, the start codon AUG codes for which of the following amino acid residues?",
      options: ["Lysine", "Glutamic Acid", "Methionine", "Valine"],
      correctAnswerIndex: 2,
      explanation: "The start codon AUG specifically registers for initiation and codes for internal or N-terminal Methionine.",
      chapter: "Molecular Basis of Inheritance",
      class: "12th"
    }
  ],
  Maths: [
    {
      id: "q_mth_1",
      text: "What is the value of the limit as x approaches 0 for the function f(x) = (sin 3x) / x?",
      options: ["0", "1", "3", "Does not exist"],
      correctAnswerIndex: 2,
      explanation: "Multiply numerator and denominator by 3. limit_{x->0} 3 * (sin 3x) / (3x). Since limit_{y->0} (sin y)/y = 1, result is 3 * 1 = 3.",
      chapter: "Limits and Derivatives",
      class: "11th"
    },
    {
      id: "q_mth_2",
      text: "If matrix A is of order 2x3 and matrix B is of order 3x4, what is the order of compound product matrix AB?",
      options: ["3x3", "2x4", "4x2", "Product not defined"],
      correctAnswerIndex: 1,
      explanation: "For product AB to be defined, columns of A must match rows of B (3 = 3). The dimension of resulting matrix AB is (rows of A) x (columns of B) = 2x4.",
      chapter: "Matrices and Determinants",
      class: "12th"
    }
  ]
};
