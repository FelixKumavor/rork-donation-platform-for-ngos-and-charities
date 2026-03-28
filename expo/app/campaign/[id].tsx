import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,

} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Calendar, 
  Users, 
  Target,
  MapPin
} from "lucide-react-native";
import { useCampaigns } from "@/hooks/use-campaigns";

export default function CampaignDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { allCampaigns } = useCampaigns();
  const [isLiked, setIsLiked] = useState(false);

  
  const campaign = allCampaigns.find(c => c.id === id);

  if (!campaign) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Campaign not found</Text>
      </SafeAreaView>
    );
  }

  const handleDonate = () => {
    router.push(`/donate/${campaign.id}`);
  };

  const handleShare = () => {
    console.log("Share campaign");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: campaign.image }} style={styles.campaignImage} />
          
          {/* Header Overlay */}
          <View style={styles.headerOverlay}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft color="#ffffff" size={24} />
            </TouchableOpacity>
            
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleLike}
              >
                <Heart 
                  color={isLiked ? "#ef4444" : "#ffffff"} 
                  size={24}
                  fill={isLiked ? "#ef4444" : "transparent"}
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleShare}
              >
                <Share2 color="#ffffff" size={24} />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{campaign.category}</Text>
          </View>
        </View>

        {/* Campaign Content */}
        <View style={styles.content}>
          {/* Title and Description */}
          <Text style={styles.campaignTitle}>{campaign.title}</Text>
          <Text style={styles.campaignDescription}>{campaign.description}</Text>

          {/* Progress Section */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.raisedAmount}>
                ${campaign.raised.toLocaleString()}
              </Text>
              <Text style={styles.goalAmount}>
                of ${campaign.goal.toLocaleString()} goal
              </Text>
            </View>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${campaign.progress}%` }
                ]} 
              />
            </View>
            
            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatValue}>{campaign.progress}%</Text>
                <Text style={styles.progressStatLabel}>Funded</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatValue}>1,247</Text>
                <Text style={styles.progressStatLabel}>Donors</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatValue}>{campaign.daysLeft}</Text>
                <Text style={styles.progressStatLabel}>Days Left</Text>
              </View>
            </View>
          </View>

          {/* Campaign Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Campaign Details</Text>
            
            <View style={styles.detailItem}>
              <Calendar color="#64748b" size={20} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Duration</Text>
                <Text style={styles.detailValue}>60 days campaign</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <MapPin color="#64748b" size={20} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>Sub-Saharan Africa</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <Users color="#64748b" size={20} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Beneficiaries</Text>
                <Text style={styles.detailValue}>5,000+ people</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <Target color="#64748b" size={20} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Impact Goal</Text>
                <Text style={styles.detailValue}>Build 20 water wells</Text>
              </View>
            </View>
          </View>

          {/* Organization Info */}
          <View style={styles.organizationSection}>
            <Text style={styles.sectionTitle}>About the Organization</Text>
            <View style={styles.organizationCard}>
              <Image 
                source={{ uri: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=60&h=60&fit=crop" }}
                style={styles.organizationLogo}
              />
              <View style={styles.organizationInfo}>
                <Text style={styles.organizationName}>Global Water Initiative</Text>
                <Text style={styles.organizationDescription}>
                  A non-profit organization dedicated to providing clean water access worldwide.
                </Text>
                <Text style={styles.organizationStats}>
                  ✓ Verified • 50+ campaigns • 4.9★ rating
                </Text>
              </View>
            </View>
          </View>

          {/* Recent Donations */}
          <View style={styles.donationsSection}>
            <Text style={styles.sectionTitle}>Recent Donations</Text>
            {[
              { id: "1", name: "Anonymous", amount: 100, time: "2 hours ago" },
              { id: "2", name: "John D.", amount: 50, time: "5 hours ago" },
              { id: "3", name: "Sarah M.", amount: 25, time: "1 day ago" },
              { id: "4", name: "Mike R.", amount: 75, time: "2 days ago" },
            ].map((donation) => (
              <View key={donation.id} style={styles.donationItem}>
                <View style={styles.donorAvatar}>
                  <Text style={styles.donorInitial}>
                    {donation.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.donationInfo}>
                  <Text style={styles.donorName}>{donation.name}</Text>
                  <Text style={styles.donationTime}>{donation.time}</Text>
                </View>
                <Text style={styles.donationAmount}>
                  ${donation.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Donate Button */}
      <View style={styles.donateContainer}>
        <TouchableOpacity 
          style={styles.donateButton}
          onPress={handleDonate}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={["#2563eb", "#1d4ed8"]}
            style={styles.donateGradient}
          >
            <Heart color="#ffffff" size={20} />
            <Text style={styles.donateButtonText}>Donate Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    position: "relative",
  },
  campaignImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 48,
  },
  backButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  categoryBadge: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryBadgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  content: {
    padding: 20,
  },
  campaignTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 12,
    lineHeight: 32,
  },
  campaignDescription: {
    fontSize: 16,
    color: "#64748b",
    lineHeight: 24,
    marginBottom: 24,
  },
  progressSection: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  progressHeader: {
    marginBottom: 16,
  },
  raisedAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
  },
  goalAmount: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 4,
  },
  progressBar: {
    height: 12,
    backgroundColor: "#e2e8f0",
    borderRadius: 6,
    marginBottom: 16,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#10b981",
    borderRadius: 6,
  },
  progressStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressStat: {
    alignItems: "center",
  },
  progressStatValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },
  progressStatLabel: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
  detailsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  detailContent: {
    marginLeft: 16,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1e293b",
    marginTop: 2,
  },
  organizationSection: {
    marginBottom: 24,
  },
  organizationCard: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
  },
  organizationLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  organizationInfo: {
    flex: 1,
  },
  organizationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
  },
  organizationDescription: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
    marginBottom: 8,
  },
  organizationStats: {
    fontSize: 12,
    color: "#10b981",
    fontWeight: "500",
  },
  donationsSection: {
    marginBottom: 100,
  },
  donationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  donorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  donorInitial: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  donationInfo: {
    flex: 1,
  },
  donorName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1e293b",
  },
  donationTime: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  donationAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10b981",
  },
  donateContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    padding: 20,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  donateButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  donateGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  donateButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});