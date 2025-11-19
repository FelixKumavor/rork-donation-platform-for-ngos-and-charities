import { useState } from "react";

export type VisitType = "tour" | "event" | "interview" | "live";

export interface VirtualVisit {
  id: string;
  title: string;
  description: string;
  type: VisitType;
  videoUrl: string;
  thumbnailUrl: string;
  duration?: string;
  isLive: boolean;
  viewCount: number;
  createdAt: string;
  featured: boolean;
}

export function useVirtualVisits() {
  const [visits] = useState<VirtualVisit[]>([
    {
      id: "visit-1",
      title: "Full Orphanage Tour - December 2024",
      description: "Join us for a complete tour of our facilities, meet the children, and see how your donations make a difference every day.",
      type: "tour",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop",
      duration: "12:45",
      isLive: false,
      viewCount: 1247,
      createdAt: "2024-12-15",
      featured: true,
    },
    {
      id: "visit-2",
      title: "Christmas Celebration Event",
      description: "Watch the joy and excitement as our children celebrate Christmas with gifts and festivities made possible by your generous support.",
      type: "event",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop",
      duration: "18:30",
      isLive: false,
      viewCount: 892,
      createdAt: "2024-12-20",
      featured: true,
    },
    {
      id: "visit-3",
      title: "Interview with Director Mary Amoah",
      description: "Our director shares insights about the impact of donations and future plans for expanding our programs.",
      type: "interview",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
      duration: "25:15",
      isLive: false,
      viewCount: 634,
      createdAt: "2024-12-10",
      featured: false,
    },
    {
      id: "visit-4",
      title: "Daily Life at the Orphanage",
      description: "Experience a typical day with our children - from morning routines to evening activities.",
      type: "tour",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop",
      duration: "15:20",
      isLive: false,
      viewCount: 1089,
      createdAt: "2024-11-28",
      featured: false,
    },
    {
      id: "visit-5",
      title: "Education Program Showcase",
      description: "See our children in action during their classes and educational activities, demonstrating the impact of quality education.",
      type: "event",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
      duration: "20:05",
      isLive: false,
      viewCount: 756,
      createdAt: "2024-11-20",
      featured: true,
    },
  ]);

  const featuredVisits = visits.filter(visit => visit.featured);
  const allVisits = visits;

  return {
    featuredVisits,
    allVisits,
  };
}
