import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Heart, TrendingUp, Users, Target, List, User, Video } from "lucide-react-native";
import { useCampaigns } from "@/hooks/use-campaigns";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { featuredCampaigns, stats } = useCampaigns();
  const insets = useSafeAreaInsets();

  const handleDonateNow = (campaignId: string) => {
    router.push(`/campaign/${campaignId}` as any);
  };

  const handleViewCampaign = (campaignId: string) => {
    router.push(`/campaign/${campaignId}` as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={["#2563eb", "#1d4ed8"]}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Make a Difference</Text>
          <Text style={styles.headerSubtitle}>
            Support causes that matter to you
          </Text>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <TrendingUp color="#10b981" size={24} />
            <Text style={styles.statValue}>${stats.totalRaised.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Raised</Text>
          </View>
          <View style={styles.statItem}>
            <Users color="#3b82f6" size={24} />
            <Text style={styles.statValue}>{stats.totalDonors.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Donors</Text>
          </View>
          <View style={styles.statItem}>
            <Target color="#f59e0b" size={24} />
            <Text style={styles.statValue}>{stats.activeCampaigns}</Text>
            <Text style={styles.statLabel}>Active Campaigns</Text>
          </View>
        </View>

        {/* Featured Campaigns */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Campaigns</Text>
          
          {featuredCampaigns.map((campaign) => (
            <TouchableOpacity
              key={campaign.id}
              style={styles.campaignCard}
              onPress={() => handleViewCampaign(campaign.id)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: campaign.image }} style={styles.campaignImage} />
              <View style={styles.campaignContent}>
                <Text style={styles.campaignTitle}>{campaign.title}</Text>
                <Text style={styles.campaignDescription} numberOfLines={2}>
                  {campaign.description}
                </Text>
                
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${campaign.progress}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>{campaign.progress}%</Text>
                </View>
                
                <View style={styles.campaignStats}>
                  <Text style={styles.raisedAmount}>
                    ${campaign.raised.toLocaleString()} raised
                  </Text>
                  <Text style={styles.goalAmount}>
                    of ${campaign.goal.toLocaleString()} goal
                  </Text>
                </View>
                
                <TouchableOpacity
                  style={styles.donateButton}
                  onPress={() => handleDonateNow(campaign.id)}
                >
                  <Heart color="#ffffff" size={16} />
                  <Text style={styles.donateButtonText}>Donate Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => router.push("/(tabs)/campaigns" as any)}
            >
              <LinearGradient
                colors={["#10b981", "#059669"]}
                style={styles.quickActionGradient}
              >
                <List color="#ffffff" size={24} />
                <Text style={styles.quickActionText}>Browse All</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => router.push("/virtual-visits" as any)}
            >
              <LinearGradient
                colors={["#8b5cf6", "#7c3aed"]}
                style={styles.quickActionGradient}
              >
                <Video color="#ffffff" size={24} />
                <Text style={styles.quickActionText}>Virtual Visits</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.quickActions, { marginTop: 12 }]}>
            <TouchableOpacity 
              style={[styles.quickActionCard, { width: "100%" }]}
              onPress={() => router.push("/(tabs)/profile" as any)}
            >
              <LinearGradient
                colors={["#f59e0b", "#d97706"]}
                style={styles.quickActionGradient}
              >
                <User color="#ffffff" size={24} />
                <Text style={styles.quickActionText}>My Dashboard</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    padding: 24,
    paddingTop: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#e2e8f0",
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  campaignCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  campaignImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  campaignContent: {
    padding: 16,
  },
  campaignTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  campaignDescription: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#10b981",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10b981",
  },
  campaignStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  raisedAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
  },
  goalAmount: {
    fontSize: 14,
    color: "#64748b",
  },
  donateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  donateButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  quickActionGradient: {
    padding: 20,
    alignItems: "center",
    gap: 8,
  },
  quickActionText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});