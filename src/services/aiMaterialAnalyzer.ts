import { AIAnalysisResult, MaterialCategory, MaterialCondition } from '../types';

/**
 * Simulates intelligent AI material analysis from an image/form input
 */
export function analyzeMaterialSurplus(params: {
  category: MaterialCategory;
  materialName: string;
  quantity: number;
  unit: string;
  condition: MaterialCondition;
  description?: string;
  hasImage?: boolean;
}): AIAnalysisResult {
  const { category, materialName, quantity, unit, condition, description = '' } = params;
  const nameLower = materialName.toLowerCase();
  const descLower = description.toLowerCase();

  let detectedMaterial = materialName.trim() || `${category} material`;
  let estimatedCondition = condition;
  let circularityScore = 88;
  let safetyCaution: string | undefined = undefined;

  // Refine detected name & score based on category
  switch (category) {
    case 'Tiles':
      detectedMaterial = nameLower.includes('tile') ? materialName : `Glazed Ceramic / Vitrified ${materialName || 'Tiles'}`;
      circularityScore = condition === 'New / unused' ? 92 : condition === 'Lightly used' ? 84 : 70;
      break;

    case 'Bricks':
      detectedMaterial = nameLower.includes('brick') || nameLower.includes('paver') ? materialName : `Clay / Concrete ${materialName || 'Bricks'}`;
      circularityScore = condition === 'New / unused' ? 94 : 85;
      break;

    case 'Wood':
      detectedMaterial = nameLower.includes('wood') || nameLower.includes('timber') ? materialName : `Seasoned Timber / ${materialName || 'Wood Planks'}`;
      circularityScore = condition === 'New / unused' ? 90 : condition === 'Lightly used' ? 84 : 65;
      break;

    case 'Cement':
      detectedMaterial = nameLower.includes('cement') ? materialName : `OPC / PPC Cement ${materialName || 'Bags'}`;
      circularityScore = condition === 'New / unused' ? 79 : 45;
      safetyCaution = 'Cement degrades rapidly with atmospheric humidity. Inspect for clumping or lumps before structural mixing. Verify with a structural engineer before load-bearing use.';
      break;

    case 'Pipes':
      detectedMaterial = nameLower.includes('pipe') ? materialName : `CPVC / PVC Pressure ${materialName || 'Pipes'}`;
      circularityScore = condition === 'New / unused' ? 91 : 78;
      safetyCaution = 'Plumbing lines intended for pressurized potable water must meet regional plumbing codes.';
      break;

    case 'Metal':
      detectedMaterial = nameLower.includes('steel') || nameLower.includes('metal') ? materialName : `Structural / Galvanized ${materialName || 'Metal Sections'}`;
      circularityScore = condition === 'New / unused' ? 93 : 82;
      safetyCaution = 'Structural steel or load-bearing members must be evaluated by a structural engineer prior to erection.';
      break;

    case 'Fixtures':
      detectedMaterial = nameLower.includes('tap') || nameLower.includes('fixture') ? materialName : `Sanitary Brass / Chrome ${materialName || 'Fixtures'}`;
      circularityScore = 95;
      break;

    case 'Doors':
    case 'Windows':
      detectedMaterial = materialName || `Architectural ${category}`;
      circularityScore = condition === 'New / unused' ? 91 : 86;
      break;

    default:
      circularityScore = condition === 'New / unused' ? 88 : 75;
      break;
  }

  // Generate reusable quantity range estimate
  const lowerEst = Math.max(1, Math.floor(quantity * 0.95));
  const upperEst = quantity;
  const estimatedReusableQuantity = `${lowerEst}–${upperEst} ${unit}`;

  // 5-Tier Recommended Second-Life Options
  const recommendedOptions: AIAnalysisResult['recommendedOptions'] = [
    {
      tier: 1,
      title: 'Sell locally — Best option',
      description: `High local demand for small quantities of ${detectedMaterial}. Contractors and homeowners need small batches for patching and minor repairs.`,
      isBestOption: true,
      action: 'Sell'
    },
    {
      tier: 2,
      title: 'Donate to Community / Vocational Projects',
      description: 'Useful for community shelter renovations, vocational training centers, or non-profit building efforts.',
      action: 'Give'
    },
    {
      tier: 3,
      title: 'Exchange for Complementary Materials',
      description: 'Swap with local builders for hardware, adhesives, or other trade surplus needed for your next job.',
      action: 'Exchange'
    },
    {
      tier: 4,
      title: 'Repurpose for DIY / Secondary Landscaping',
      description: 'Can be converted into garden planters, decorative paving, utility shelving, or outdoor mosaics.',
      action: 'Repurpose'
    },
    {
      tier: 5,
      title: 'Recycle via Material Aggregator',
      description: 'Crush for masonry aggregate or metal melt-down only if physically fractured beyond structural reuse.',
      action: 'Recycle'
    }
  ];

  return {
    detectedMaterial,
    estimatedCondition,
    estimatedReusableQuantity,
    circularityScore,
    recommendedOptions,
    safetyCaution
  };
}

/**
 * Knowledge Base for the AI "What Should I Do With This?" Assistant
 */
export interface AssistantAdvice {
  id: string;
  userPrompt: string;
  category: string;
  headline: string;
  assessmentSteps: string[];
  reuseOptions: { title: string; desc: string; priority: 'High' | 'Medium' | 'Alternative' }[];
  safetyAdvisory?: string;
  avoidActions: string[];
}

export const ASSISTANT_PRESETS: AssistantAdvice[] = [
  {
    id: 'cement-advice',
    userPrompt: 'I have 3 bags of unused cement left after construction.',
    category: 'Cement & Masonry',
    headline: 'Time-Critical Reusable Asset — Priority: Fast Local Sale or Dry Patching',
    assessmentSteps: [
      'Check bag manufacturing date (cement begins losing compressive strength after 30–60 days).',
      'Perform tactile lump check: gently press the bag. If soft and powdery, it is fully viable. If solid rocks have formed inside, hydration has occurred.',
      'Keep strictly elevated on wooden pallets wrapped in plastic tarpaulin until handoff.'
    ],
    reuseOptions: [
      {
        title: 'List for Immediate Local Sale (Recommended)',
        desc: 'Offer to nearby homeowners for garden posts, boundary patchup, or tile bedding at 30-40% below retail.',
        priority: 'High'
      },
      {
        title: 'Compound Wall Grouting or Paver Bedding',
        desc: 'Use for non-structural, low-stress outdoor applications like securing stone borders or post holes.',
        priority: 'High'
      },
      {
        title: 'DIY Concrete Garden Stepping Stones or Planters',
        desc: 'Cast decorative patio stepping stones or durable planter boxes using small plastic molds.',
        priority: 'Medium'
      }
    ],
    safetyAdvisory: 'Verify material condition and suitability with a qualified structural professional before any load-bearing or structural RCC use. Never use expired or lumpy cement in columns, beams, or slabs.',
    avoidActions: [
      'Do not store on bare unheated concrete floors where damp will ruin the powder in days.',
      'Do not discard into municipal garbage or wash down stormwater drains (causes severe blockages).'
    ]
  },
  {
    id: 'tiles-advice',
    userPrompt: 'I have 500 leftover ceramic floor tiles after completing a home renovation.',
    category: 'Tiles & Ceramics',
    headline: 'High Circular Value — Break into Small Batches for Local Repair Needs',
    assessmentSteps: [
      'Separate unbroken tiles from any chipped off-cuts.',
      'Record exact dimensions (e.g. 300x300mm), batch color code, and surface finish (glossy vs matte/anti-skid).',
      'Keep original cardboard packaging intact to facilitate easy local pickup.'
    ],
    reuseOptions: [
      {
        title: 'Offer Small Lots (10-25 tiles) on ReBuild (Best Option)',
        desc: 'Homeowners routinely need 5-15 matching tiles for cracked floor repairs but stores only sell full cartons.',
        priority: 'High'
      },
      {
        title: 'Donate Surplus to Community Centers',
        desc: 'Public clinic bathrooms, community centers, and school washrooms welcome surplus ceramic tiles.',
        priority: 'Medium'
      },
      {
        title: 'Artisan Broken-Tile Mosaic (Trencadís)',
        desc: 'Broken pieces can be repurposed into vibrant mosaic tabletops, garden planters, or stepping pavers.',
        priority: 'Alternative'
      }
    ],
    safetyAdvisory: 'Handle cut or chipped ceramic edges with protective leather gloves to prevent lacerations.',
    avoidActions: [
      'Do not dump intact tiles in construction debris heaps where they shatter into landfill waste.'
    ]
  },
  {
    id: 'wood-advice',
    userPrompt: 'I have 40 leftover reclaimed wooden boards and timber pieces.',
    category: 'Timber & Wood',
    headline: 'Prime Carpentry Stock — Excellent Longevity & Carbon Storage',
    assessmentSteps: [
      'Inspect for old nails, screws, or staples and remove them with a crowbar/pliers.',
      'Verify wood species (teak, pine, sal) and check for insect or termite bore holes.',
      'Store horizontally in a well-ventilated dry area to prevent bowing or warping.'
    ],
    reuseOptions: [
      {
        title: 'List on ReBuild for Local Furniture & Carpentry',
        desc: 'Carpenters and DIY enthusiasts pay premium rates for seasoned, pre-dried hardwood boards.',
        priority: 'High'
      },
      {
        title: 'Convert into Floating Wall Shelves or Workshop Racks',
        desc: 'Sand down and seal with clear polyurethane or linseed oil for industrial-chic interior shelving.',
        priority: 'High'
      },
      {
        title: 'Garden Raised Beds or Planter Boxes',
        desc: 'Line with geotextile fabric to build high-yield organic vegetable planting beds.',
        priority: 'Medium'
      }
    ],
    safetyAdvisory: 'Ensure treated timber (such as creosote-treated railroad ties) is never used for indoor edible plant gardening or cooking fires.',
    avoidActions: [
      'Never burn treated or painted wood in fireplaces or open bonfires as it releases toxic chemical fumes.'
    ]
  },
  {
    id: 'pipes-advice',
    userPrompt: 'Leftover 10 PVC and CPVC pipes with assorted elbow joints and fittings.',
    category: 'Plumbing & Pipes',
    headline: 'High Durability Polymer — 50+ Year Useful Lifespan',
    assessmentSteps: [
      'Check whether pipe ends are cleanly square or require trimming.',
      'Check pipe pressure rating: Schedule 40, Schedule 80, or non-pressure drainage.',
      'Clean dirt or sand out of interior channels.'
    ],
    reuseOptions: [
      {
        title: 'List for Plumbing Maintenance & Local Repairs',
        desc: 'Plumbing repair technicians frequently seek short lengths and spare couplings for emergency leaks.',
        priority: 'High'
      },
      {
        title: 'DIY Drip Irrigation or Vertical Hydroponics',
        desc: 'Drill small holes for a highly water-efficient garden drip irrigation loop or hydroponic herb tower.',
        priority: 'High'
      },
      {
        title: 'Cable Conduit or Workshop Tool Organizer',
        desc: 'Cut into angled tubes and mount on walls to organize screwdrivers, drills, or run exterior solar wires.',
        priority: 'Medium'
      }
    ],
    safetyAdvisory: 'Do not use standard drainage PVC for high-temperature domestic hot water or pressurized compressed air lines.',
    avoidActions: [
      'Do not burn PVC scraps; burning polyvinyl chloride generates hazardous dioxins.'
    ]
  }
];
