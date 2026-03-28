import { useState } from "react";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  goal: number;
  raised: number;
  progress: number;
  daysLeft: number;
  featured: boolean;
}

export interface CampaignStats {
  totalRaised: number;
  totalDonors: number;
  activeCampaigns: number;
}

export function useCampaigns() {
  const [campaigns] = useState<Campaign[]>([
    {
      id: "1",
      title: "Clean Water for Rural Communities",
      description: "Help us build wells and water purification systems in remote villages across Africa. Every dollar brings clean water closer to families in need.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      category: "Water",
      goal: 50000,
      raised: 32500,
      progress: 65,
      daysLeft: 23,
      featured: true,
    },
    {
      id: "2",
      title: "Education for Every Child",
      description: "Support our mission to provide quality education and school supplies to underprivileged children in developing countries.",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop",
      category: "Education",
      goal: 25000,
      raised: 18750,
      progress: 75,
      daysLeft: 15,
      featured: true,
    },
    {
      id: "3",
      title: "Emergency Medical Relief",
      description: "Provide life-saving medical supplies and equipment to hospitals in crisis zones around the world.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      category: "Healthcare",
      goal: 75000,
      raised: 45000,
      progress: 60,
      daysLeft: 30,
      featured: false,
    },
    {
      id: "4",
      title: "Disaster Relief Fund",
      description: "Help families affected by natural disasters rebuild their lives with emergency shelter, food, and basic necessities.",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
      category: "Emergency",
      goal: 100000,
      raised: 67500,
      progress: 68,
      daysLeft: 45,
      featured: true,
    },
    {
      id: "5",
      title: "Wildlife Conservation Project",
      description: "Protect endangered species and their habitats through conservation efforts and community education programs.",
      image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=300&fit=crop",
      category: "Environment",
      goal: 40000,
      raised: 28000,
      progress: 70,
      daysLeft: 20,
      featured: false,
    },
    {
      id: "6",
      title: "Food Security Initiative",
      description: "Combat hunger by providing nutritious meals and supporting sustainable farming practices in food-insecure regions.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop",
      category: "Food",
      goal: 60000,
      raised: 42000,
      progress: 70,
      daysLeft: 35,
      featured: false,
    },
  ]);

  const featuredCampaigns = campaigns.filter(campaign => campaign.featured);
  const allCampaigns = campaigns;
  
  const categories = ["All", "Water", "Education", "Healthcare", "Emergency", "Environment", "Food"];
  
  const stats: CampaignStats = {
    totalRaised: campaigns.reduce((sum, campaign) => sum + campaign.raised, 0),
    totalDonors: 12847,
    activeCampaigns: campaigns.length,
  };

  return {
    featuredCampaigns,
    allCampaigns,
    categories,
    stats,
  };
}