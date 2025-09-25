import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { 
  Heart, 
  Calendar, 
  DollarSign, 
  Award, 
  Settings, 
  Bell,
  Share2,
  CreditCard
} from "lucide-react-native";
import { useProfile } from "@/hooks/use-profile";

export default function ProfileScreen() {
  const { profile, donationHistory, stats } = useProfile();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={["#2563eb", "#1d4ed8"]}
          style={[styles.profileHeader, { paddingTop: insets.top + 32 }]}
        >
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: profile.avatar }} 
              style={styles.avatar}
            />
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileEmail}>{profile.email}</Text>
            <Text style={styles.memberSince}>
              Member since {profile.memberSince}
            </Text>
          </View>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <DollarSign color="#10b981" size={24} />
            <Text style={styles.statValue}>${stats.totalDonated.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Donated</Text>
          </View>
          <View style={styles.statCard}>
            <Heart color="#ef4444" size={24} />
            <Text style={styles.statValue}>{stats.campaignsSupported}</Text>
            <Text style={styles.statLabel}>Campaigns</Text>
          </View>
          <View style={styles.statCard}>
            <Award color="#f59e0b" size={24} />
            <Text style={styles.statValue}>{stats.impactScore}</Text>
            <Text style={styles.statLabel}>Impact Score</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <CreditCard color="#2563eb" size={20} />
              <Text style={styles.actionButtonText}>Payment Methods</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Bell color="#2563eb" size={20} />
              <Text style={styles.actionButtonText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Share2 color="#2563eb" size={20} />
              <Text style={styles.actionButtonText}>Share Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Settings color="#2563eb" size={20} />
              <Text style={styles.actionButtonText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Donations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Donations</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {donationHistory.slice(0, 5).map((donation) => (
            <View key={donation.id} style={styles.donationCard}>
              <Image 
                source={{ uri: donation.campaignImage }} 
                style={styles.donationImage}
              />
              <View style={styles.donationContent}>
                <Text style={styles.donationTitle}>{donation.campaignTitle}</Text>
                <Text style={styles.donationDate}>
                  <Calendar color="#64748b" size={12} />
                  {" "}{donation.date}
                </Text>
                <View style={styles.donationFooter}>
                  <Text style={styles.donationAmount}>
                    ${donation.amount.toLocaleString()}
                  </Text>
                  <View style={[
                    styles.donationStatus,
                    donation.recurring && styles.recurringStatus
                  ]}>
                    <Text style={[
                      styles.donationStatusText,
                      donation.recurring && styles.recurringStatusText
                    ]}>
                      {donation.recurring ? "Recurring" : "One-time"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Impact Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Impact</Text>
          <View style={styles.impactCard}>
            <LinearGradient
              colors={["#10b981", "#059669"]}
              style={styles.impactGradient}
            >
              <Text style={styles.impactTitle}>Thank you for your generosity!</Text>
              <Text style={styles.impactDescription}>
                Your donations have helped {stats.peopleHelped} people across {stats.countriesReached} countries.
              </Text>
              <View style={styles.impactStats}>
                <View style={styles.impactStatItem}>
                  <Text style={styles.impactStatValue}>{stats.peopleHelped}</Text>
                  <Text style={styles.impactStatLabel}>People Helped</Text>
                </View>
                <View style={styles.impactStatItem}>
                  <Text style={styles.impactStatValue}>{stats.countriesReached}</Text>
                  <Text style={styles.impactStatLabel}>Countries</Text>
                </View>
              </View>
            </LinearGradient>
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
  profileHeader: {
    padding: 24,
    paddingTop: 32,
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileInfo: {
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: "#e2e8f0",
    marginBottom: 8,
  },
  memberSince: {
    fontSize: 14,
    color: "#cbd5e1",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: -24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statValue: {
    fontSize: 18,
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
  },
  viewAllText: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    minWidth: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1e293b",
  },
  donationCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  donationImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  donationContent: {
    flex: 1,
  },
  donationTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  donationDate: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  donationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  donationAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10b981",
  },
  donationStatus: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  recurringStatus: {
    backgroundColor: "#fef3c7",
  },
  donationStatusText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
  },
  recurringStatusText: {
    color: "#d97706",
  },
  impactCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  impactGradient: {
    padding: 20,
  },
  impactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  impactDescription: {
    fontSize: 14,
    color: "#d1fae5",
    lineHeight: 20,
    marginBottom: 16,
  },
  impactStats: {
    flexDirection: "row",
    gap: 24,
  },
  impactStatItem: {
    alignItems: "center",
  },
  impactStatValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  impactStatLabel: {
    fontSize: 12,
    color: "#d1fae5",
    marginTop: 4,
  },
});