import { useState } from "react";

export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
}

export interface DonationHistory {
  id: string;
  campaignId: string;
  campaignTitle: string;
  campaignImage: string;
  amount: number;
  date: string;
  recurring: boolean;
}

export interface ProfileStats {
  totalDonated: number;
  campaignsSupported: number;
  impactScore: number;
  peopleHelped: number;
  countriesReached: number;
}

export function useProfile() {
  const [profile] = useState<Profile>({
    id: "user-1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    memberSince: "March 2023",
  });

  const [donationHistory] = useState<DonationHistory[]>([
    {
      id: "d1",
      campaignId: "1",
      campaignTitle: "Clean Water for Rural Communities",
      campaignImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
      amount: 50,
      date: "Dec 15, 2024",
      recurring: true,
    },
    {
      id: "d2",
      campaignId: "2",
      campaignTitle: "Education for Every Child",
      campaignImage: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=100&h=100&fit=crop",
      amount: 25,
      date: "Dec 10, 2024",
      recurring: false,
    },
    {
      id: "d3",
      campaignId: "4",
      campaignTitle: "Disaster Relief Fund",
      campaignImage: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=100&h=100&fit=crop",
      amount: 100,
      date: "Dec 5, 2024",
      recurring: false,
    },
    {
      id: "d4",
      campaignId: "1",
      campaignTitle: "Clean Water for Rural Communities",
      campaignImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
      amount: 50,
      date: "Nov 15, 2024",
      recurring: true,
    },
    {
      id: "d5",
      campaignId: "3",
      campaignTitle: "Emergency Medical Relief",
      campaignImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop",
      amount: 75,
      date: "Nov 8, 2024",
      recurring: false,
    },
  ]);

  const stats: ProfileStats = {
    totalDonated: donationHistory.reduce((sum, donation) => sum + donation.amount, 0),
    campaignsSupported: new Set(donationHistory.map(d => d.campaignId)).size,
    impactScore: 847,
    peopleHelped: 234,
    countriesReached: 12,
  };

  return {
    profile,
    donationHistory,
    stats,
  };
}