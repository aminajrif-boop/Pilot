import { Product, ReviewArticle } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-grounded-barefoot-shoes',
    name: 'Grounded Barefoot Shoes (Natural Foot Alignment)',
    slug: 'grounded-barefoot-shoes-foot-health',
    category: 'Health & Wellness',
    brand: 'Grounded Footwear',
    price: 69.95,
    currency: 'USD',
    priceVerifiedDate: 'November 2026',
    store: 'Grounded Official Store',
    affiliateNetwork: 'Direct Partner',
    affiliateUrl: 'https://www.autocustompack.com/5111QJJ/2BW88K8M/?creative_id=62354',
    image: '/src/assets/images/barefoot_shoes_1793908652368.jpg',
    summary: 'Restores natural movement and posture with a wide toe box, zero-drop sole, and targeted comfort for foot pain and plantar fasciitis.',
    description: 'A growing number of doctors and physical therapists are highlighting Grounded Barefoot Shoes for a fundamental biomechanical shift: restoring a more natural stride. The anatomical wide toe box allows toes to splay and stabilize naturally, while the zero-drop flexible sole relieves pressure from stiff mornings, sore heels, and tired joints.',
    features: [
      'Anatomical wide toe box allowing toes to spread naturally for enhanced balance',
      'Zero-drop flexible sole engaging stabilizing muscles across feet and calves',
      'Ultra-lightweight breathable knit construction reducing walking fatigue',
      'Targeted support and pressure redistribution for plantar fasciitis relief',
      'High-traction slip-resistant outsole suited for daily walking and light trails'
    ],
    pros: [
      'Meaningful relief for plantar fasciitis, heel discomfort, and daily joint fatigue',
      'Restores natural upright posture and stabilizes balance throughout the day',
      'Current verified offer includes up to 60% promotional discount'
    ],
    cons: [
      'Requires a 1 to 2 week gradual adjustment period if accustomed to thick stiff soles',
      'Best experienced when wearing thin or anatomical toe socks'
    ],
    specs: {
      'Design': 'Zero-Drop Wide Toe Box Anatomical Footwear',
      'Upper Material': 'Breathable Engineered Knit & Microfiber',
      'Outsole': 'High-Traction Ultra-Flexible Natural Rubber',
      'Insole': 'Removable Ergonomic Cushioning Layer',
      'Target Relief': 'Plantar Fasciitis, Heel Pain, Postural Stability',
      'Promotion': 'Up to 60% Off Limited-Time Offer'
    },
    buyersGuideNote: 'Recommended for healthcare workers, teachers, walkers, and anyone dealing with persistent heel discomfort or seeking natural postural alignment.',
    isFeatured: true,
    isRecommended: true,
    isEditorChoice: true,
    ratingScore: 9.7,
    comparisonHighlights: 'Natural toe-splay ergonomic design with up to 60% discount.'
  },
  {
    id: 'prod-glacier-breeze-ac',
    name: 'Glacier Breeze Portable AC & Personal Air Cooler',
    slug: 'glacier-breeze-portable-ac',
    category: 'Home & Lifestyle',
    brand: 'Glacier Breeze',
    price: 54.99,
    currency: 'USD',
    priceVerifiedDate: 'November 2026',
    store: 'Glacier Breeze Official Offer',
    affiliateNetwork: 'Direct Partner',
    affiliateUrl: 'https://www.autocustompack.com/5111QJJ/2BW43X2S/?creative_id=62347',
    image: '/src/assets/images/glacier_breeze_ac_1793908652258.jpg',
    summary: 'Compact cordless personal cooling with 10-hour battery life, 500ml water tank, 3 fan speeds, and USB-C power.',
    description: 'Glacier Breeze - Portable AC provides targeted personal climate comfort without the exorbitant electric bills of whole-house central air. Utilizing hydro-chill evaporative technology, it pulls hot dry air through a rapid cooling water/ice chamber and delivers an immediate stream of chilled, humidified air.',
    features: [
      'Up to 10 hours of cordless personal cooling on a single rechargeable cycle',
      '500ml ice and water reservoir for rapid, refreshing micro-mist cooling',
      '3 aerodynamic whisper-quiet fan velocities with directional airflow louvers',
      'USB-C universal power interface compatible with laptops, wall plugs, and power banks',
      'Backed by a 90-day money-back guarantee stated in the current promotion'
    ],
    pros: [
      'Drastically reduces energy consumption compared to running full-size central AC',
      'Lightweight and portable: move it effortlessly from desk to nightstand or patio',
      'Promoted at $54.99 (50% promotional discount off the listed $109.98 price)'
    ],
    cons: [
      'Intended for targeted personal comfort zones, not for chilling large multi-room spaces',
      'Ice chamber requires refilling with cool water/ice cubes for maximum chilling effect'
    ],
    specs: {
      'Cooling Technology': 'Hydro-Chill Evaporative Air Cooling',
      'Battery Runtime': 'Up to 10 hours cordless operation',
      'Reservoir Volume': '500ml Water/Ice Chamber',
      'Fan Speeds': '3 Adjustable Whisper-Quiet Modes',
      'Power Interface': 'USB-C (5V / 2A)',
      'Guarantee': '90-Day Money-Back Guarantee Stated'
    },
    buyersGuideNote: 'The go-to solution for home offices, bedrooms, dorms, and hot rooms where running high-power central air conditioning is costly or impractical.',
    isFeatured: true,
    isRecommended: true,
    isEditorChoice: true,
    ratingScore: 9.5,
    comparisonHighlights: 'Up to 10h cordless cooling with 50% discount and 90-day guarantee.'
  }
];

export const INITIAL_REVIEWS: ReviewArticle[] = [
  {
    id: 'review-barefoot-shoes-health',
    title: 'The Biomechanical Shift: How Grounded Barefoot Shoes Relieve Daily Foot Stress',
    slug: 'grounded-barefoot-shoes-foot-health-analysis',
    publishDate: 'November 2026',
    category: 'Health & Wellness',
    readingTime: '5 min read',
    summary: 'An orthopedic and movement breakdown of wide toe box designs, natural gait stabilization, and plantar fasciitis relief.',
    author: 'CommissionPilot Editorial Team',
    recommendedProducts: ['prod-grounded-barefoot-shoes'],
    contentSections: [
      {
        heading: 'Why Conventional Shoes Compress the Metatarsals',
        body: 'Standard footwear forces the toes inward into an unnatural taper. Over hours of standing or walking, this puts intense mechanical strain on the plantar fascia and distorts balance. Grounded Barefoot Shoes reverse this compression with an anatomical wide toe box that allows the big toe and smaller digits to splay naturally.'
      },
      {
        heading: 'Zero-Drop Balance and Muscle Activation',
        body: 'By eliminating artificial heel lifts, Grounded shoes bring the heel and forefoot onto an even plane. This activates intrinsic foot stabilizers and Achilles elasticity, promoting an upright spinal alignment and reducing shock loads on knee joints.'
      },
      {
        heading: 'Verdict and Value',
        body: 'For individuals suffering from morning stiffness or sore arches, the combination of lightweight materials, generous toe room, and current promotional savings makes Grounded Barefoot Shoes our top health recommendation.'
      }
    ]
  },
  {
    id: 'review-glacier-breeze-portable-ac',
    title: 'Targeted Personal Chilling: Examining the Glacier Breeze Evaporative Efficiency',
    slug: 'glacier-breeze-portable-ac-review',
    publishDate: 'November 2026',
    category: 'Home & Lifestyle',
    readingTime: '4 min read',
    summary: 'Evaluating power consumption, acoustic noise levels, and 10-hour battery endurance of the compact Glacier Breeze personal cooler.',
    author: 'CommissionPilot Editorial Team',
    recommendedProducts: ['prod-glacier-breeze-ac'],
    contentSections: [
      {
        heading: 'Evaporative Cooling vs. Power-Hungry Compressors',
        body: 'Traditional AC units draw hundreds of watts to run heavy mechanical compressors. Glacier Breeze utilizes hydro-chill evaporative technology, pulling ambient warm air through a cold water and ice chamber to drop localized temperatures by up to 10-15 degrees Fahrenheit while drawing minimal wattage.'
      },
      {
        heading: 'Portability and USB-C Convenience',
        body: 'With up to 10 hours of rechargeable cordless battery performance and a compact footprint, you can position the unit right at your workstation or beside your bed. Its whisper-quiet fan ensures quiet operation during sleep or phone calls.'
      },
      {
        heading: 'Verdict and Buying Recommendation',
        body: 'If you want to stay cool without cooling entire unoccupied rooms, the 50% discount and 90-day guarantee make Glacier Breeze an efficient, cost-saving personal cooling choice.'
      }
    ]
  }
];

export const CATEGORIES_LIST = [
  'Health & Wellness',
  'Home & Lifestyle'
] as const;
