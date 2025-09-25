import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Search, Filter, Heart } from "lucide-react-native";
import { useCampaigns } from "@/hooks/use-campaigns";

export default function CampaignsScreen() {
  const { allCampaigns, categories } = useCampaigns();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const insets = useSafeAreaInsets();

  const filteredCampaigns = allCampaigns.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategorySelect = (category: string) => {
    if (category && category.trim().length > 0 && category.length <= 50) {
      setSelectedCategory(category.trim());
    }
  };

  const handleViewCampaign = (campaignId: string) => {
    router.push(`/campaign/${campaignId}` as any);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>All Campaigns</Text>
        <Text style={styles.headerSubtitle}>
          {filteredCampaigns.length} campaigns found
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search color="#64748b" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search campaigns..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94a3b8"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color="#64748b" size={20} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive
            ]}
            onPress={() => handleCategorySelect(category)}
          >
            <Text style={[
              styles.categoryChipText,
              selectedCategory === category && styles.categoryChipTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Campaigns List */}
      <ScrollView 
        style={styles.campaignsList}
        showsVerticalScrollIndicator={false}
      >
        {filteredCampaigns.map((campaign) => (
          <TouchableOpacity
            key={campaign.id}
            style={styles.campaignCard}
            onPress={() => handleViewCampaign(campaign.id)}
            activeOpacity={0.9}
          >
            <Image source={{ uri: campaign.image }} style={styles.campaignImage} />
            <View style={styles.campaignContent}>
              <View style={styles.campaignHeader}>
                <Text style={styles.campaignCategory}>{campaign.category}</Text>
                <Text style={styles.campaignUrgency}>
                  {campaign.daysLeft} days left
                </Text>
              </View>
              
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
              
              <View style={styles.campaignFooter}>
                <View>
                  <Text style={styles.raisedAmount}>
                    ${campaign.raised.toLocaleString()}
                  </Text>
                  <Text style={styles.goalAmount}>
                    of ${campaign.goal.toLocaleString()}
                  </Text>
                </View>
                
                <TouchableOpacity style={styles.donateButton}>
                  <Heart color="#2563eb" size={16} />
                  <Text style={styles.donateButtonText}>Donate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    padding: 16,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1e293b",
  },
  filterButton: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  categoryChipActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
  },
  categoryChipTextActive: {
    color: "#ffffff",
  },
  campaignsList: {
    flex: 1,
    paddingHorizontal: 16,
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
    height: 160,
    resizeMode: "cover",
  },
  campaignContent: {
    padding: 16,
  },
  campaignHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  campaignCategory: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2563eb",
    textTransform: "uppercase",
  },
  campaignUrgency: {
    fontSize: 12,
    color: "#f59e0b",
    fontWeight: "500",
  },
  campaignTitle: {
    fontSize: 16,
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
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#e2e8f0",
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#10b981",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10b981",
  },
  campaignFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  raisedAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
  },
  goalAmount: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  donateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eff6ff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  donateButtonText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "600",
  },
});