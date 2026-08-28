export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  category: 'telefonia' | 'seguridad' | 'redes' | 'control' | 'mantenimiento';
  badge: string;
  features: string[];
  brands: string[];
  benefits: string[];
  popularUseCases: string[];
  imageUrl: string;
  startingPrice?: string;
  idealFor: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  model: string;
  brand: 'Panduit' | 'Panasonic' | 'Grandstream' | 'Hikvision' | 'Dahua' | 'Ubiquiti' | 'Cisco' | 'Belden' | 'ZKTeco' | 'Charofil' | 'Yeastar' | 'Yealink' | 'Ajax Systems' | 'Otras Marcas';
  category: 'panduit-material' | 'panasonic-telefonia' | 'conmutadores' | 'telefonos-ip' | 'cctv' | 'redes' | 'control-acceso' | 'alarmas' | 'cableado-canalizacion';
  description: string;
  specs: string[];
  inStock: boolean;
  stockQuantity?: string;
  warranty: string;
  imageUrl: string;
  tag: string;
  sku?: string;
  syscomCode?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientType: string;
  location: string;
  challenge: string;
  solution: string;
  results: string[];
  servicesUsed: string[];
  quote: string;
  author: string;
}

export interface CoverageZone {
  name: string;
  area: string;
  responseTime: string;
  techniciansCount: number;
  highlightedProjects: string[];
  isExpressZone: boolean;
}

export interface MaintenancePlan {
  id: string;
  name: string;
  badge: string;
  description: string;
  recommendedFor: string;
  features: { name: string; included: boolean }[];
  highlighted?: boolean;
}

export interface QuoteConfig {
  serviceType: string;
  scaleSize: number; // users, cameras, nodes
  installationType: 'nueva' | 'migracion' | 'mantenimiento';
  cloudOrOnPremise: 'cloud' | 'onpremise' | 'hibrido';
  includeCabling: boolean;
  includeBackupUPS: boolean;
  includeSupportPlan: boolean;
  urgency: 'normal' | 'urgente';
  zone: string;
}

