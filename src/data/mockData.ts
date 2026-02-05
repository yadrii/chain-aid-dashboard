export interface Campaign {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  location: string;
  targetAmount: number;
  collectedAmount: number;
  status: 'active' | 'completed' | 'pending';
  organizer: {
    name: string;
    wallet: string;
    verified: boolean;
  };
  createdAt: string;
  endDate: string;
  imageUrl?: string;
}

export interface Transaction {
  id: string;
  campaignId: string;
  txHash: string;
  amount: number;
  donor: string;
  timestamp: string;
  status: 'confirmed' | 'pending';
}

export const campaigns: Campaign[] = [
  {
    id: '1',
    name: 'Turkey Earthquake Relief 2024',
    description: 'Supporting families affected by the devastating earthquake in southeastern Turkey. Funds will be used for emergency shelter, food supplies, medical aid, and long-term rebuilding efforts. Our team is working directly with local NGOs to ensure transparent distribution of all resources.',
    shortDescription: 'Emergency relief for earthquake victims in Turkey',
    location: 'Southeastern Turkey',
    targetAmount: 500000,
    collectedAmount: 342500,
    status: 'active',
    organizer: {
      name: 'Global Relief Foundation',
      wallet: '0x1234...5678',
      verified: true,
    },
    createdAt: '2024-01-15',
    endDate: '2024-06-15',
  },
  {
    id: '2',
    name: 'Philippine Typhoon Recovery',
    description: 'Rebuilding communities devastated by Typhoon Mawar. Focus on sustainable housing, clean water access, and educational facilities restoration.',
    shortDescription: 'Typhoon recovery and community rebuilding',
    location: 'Northern Philippines',
    targetAmount: 300000,
    collectedAmount: 185000,
    status: 'active',
    organizer: {
      name: 'Pacific Aid Network',
      wallet: '0xABCD...EF01',
      verified: true,
    },
    createdAt: '2024-02-01',
    endDate: '2024-08-01',
  },
  {
    id: '3',
    name: 'California Wildfire Support',
    description: 'Providing immediate relief to families who lost their homes in the recent California wildfires. Funds support temporary housing, essential supplies, and pet rescue operations.',
    shortDescription: 'Wildfire victim assistance program',
    location: 'California, USA',
    targetAmount: 250000,
    collectedAmount: 250000,
    status: 'completed',
    organizer: {
      name: 'American Disaster Relief',
      wallet: '0x9876...5432',
      verified: true,
    },
    createdAt: '2023-11-01',
    endDate: '2024-02-01',
  },
  {
    id: '4',
    name: 'Bangladesh Flood Relief',
    description: 'Emergency food and medical supplies for flood-affected regions in Bangladesh. Supporting over 10,000 families with immediate necessities.',
    shortDescription: 'Flood relief and emergency supplies',
    location: 'Sylhet, Bangladesh',
    targetAmount: 150000,
    collectedAmount: 89000,
    status: 'active',
    organizer: {
      name: 'South Asia Relief',
      wallet: '0x2468...1357',
      verified: true,
    },
    createdAt: '2024-03-01',
    endDate: '2024-09-01',
  },
  {
    id: '5',
    name: 'Morocco Earthquake Aid',
    description: 'Comprehensive relief effort for the Atlas Mountain earthquake. Focus on search and rescue support, medical camps, and emergency shelter.',
    shortDescription: 'Atlas Mountain earthquake recovery',
    location: 'High Atlas, Morocco',
    targetAmount: 400000,
    collectedAmount: 275000,
    status: 'active',
    organizer: {
      name: 'Mediterranean Relief Coalition',
      wallet: '0xDEAD...BEEF',
      verified: true,
    },
    createdAt: '2024-01-20',
    endDate: '2024-07-20',
  },
  {
    id: '6',
    name: 'Japan Tsunami Recovery',
    description: 'Long-term rebuilding support for coastal communities affected by the 2024 tsunami.',
    shortDescription: 'Coastal community rebuilding project',
    location: 'Ishikawa, Japan',
    targetAmount: 600000,
    collectedAmount: 600000,
    status: 'completed',
    organizer: {
      name: 'Asia Pacific Foundation',
      wallet: '0xFACE...B00C',
      verified: true,
    },
    createdAt: '2024-01-05',
    endDate: '2024-04-05',
  },
];

export const transactions: Transaction[] = [
  {
    id: '1',
    campaignId: '1',
    txHash: '0xabc123def456789abc123def456789abc123def456789abc123def456789abc1',
    amount: 5000,
    donor: '0x7890...1234',
    timestamp: '2024-03-15T10:30:00Z',
    status: 'confirmed',
  },
  {
    id: '2',
    campaignId: '1',
    txHash: '0xdef456789abc123def456789abc123def456789abc123def456789abc123def4',
    amount: 2500,
    donor: '0x4567...8901',
    timestamp: '2024-03-15T09:15:00Z',
    status: 'confirmed',
  },
  {
    id: '3',
    campaignId: '1',
    txHash: '0x789abc123def456789abc123def456789abc123def456789abc123def456789a',
    amount: 10000,
    donor: '0x1234...5678',
    timestamp: '2024-03-14T16:45:00Z',
    status: 'confirmed',
  },
  {
    id: '4',
    campaignId: '1',
    txHash: '0x456789abc123def456789abc123def456789abc123def456789abc123def4567',
    amount: 1500,
    donor: '0xABCD...EFGH',
    timestamp: '2024-03-14T14:20:00Z',
    status: 'pending',
  },
  {
    id: '5',
    campaignId: '2',
    txHash: '0x123def456789abc123def456789abc123def456789abc123def456789abc1234',
    amount: 7500,
    donor: '0x5678...9ABC',
    timestamp: '2024-03-15T08:00:00Z',
    status: 'confirmed',
  },
];

export const stats = {
  totalDonations: 1741500,
  activeCampaigns: 4,
  completedCampaigns: 2,
  totalDonors: 15420,
};
