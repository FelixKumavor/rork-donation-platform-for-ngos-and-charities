import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  Video as VideoIcon,
  Play,
  Eye,
  Calendar,
  Search,
  X,
} from "lucide-react-native";
import { useVirtualVisits } from "@/hooks/use-virtual-visits";

export default function VirtualVisitsScreen() {
  const { featuredVisits, allVisits } = useVirtualVisits();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVisits = allVisits.filter((visit) =>
    visit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    visit.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "tour":
        return "#10b981";
      case "event":
        return "#f59e0b";
      case "interview":
        return "#8b5cf6";
      case "live":
        return "#ef4444";
      default:
        return "#64748b";
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case "tour":
        return "#d1fae5";
      case "event":
        return "#fef3c7";
      case "interview":
        return "#ede9fe";
      case "live":
        return "#fee2e2";
      default:
        return "#f1f5f9";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="#1e293b" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Virtual Visits</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#f0f9ff", "#e0f2fe"]} style={styles.heroSection}>
          <VideoIcon color="#2563eb" size={48} />
          <Text style={styles.heroTitle}>Experience Our Impact</Text>
          <Text style={styles.heroSubtitle}>
            Watch tours, events, and special moments from our orphanage
          </Text>
        </LinearGradient>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search color="#94a3b8" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search videos..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <X color="#94a3b8" size={20} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {searchQuery.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Videos</Text>
            {featuredVisits.map((visit) => (
              <TouchableOpacity
                key={visit.id}
                style={styles.videoCard}
                onPress={() => openVideo(visit.videoUrl)}
                activeOpacity={0.9}
              >
                <View style={styles.videoThumbnailContainer}>
                  <Image source={{ uri: visit.thumbnailUrl }} style={styles.videoThumbnail} />
                  <View style={styles.playOverlay}>
                    <View style={styles.playButtonLarge}>
                      <Play color="#ffffff" size={32} fill="#ffffff" />
                    </View>
                  </View>
                  {visit.duration && (
                    <View style={styles.durationBadge}>
                      <Text style={styles.durationText}>{visit.duration}</Text>
                    </View>
                  )}
                  {visit.isLive && (
                    <View style={styles.liveBadge}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveText}>LIVE</Text>
                    </View>
                  )}
                </View>

                <View style={styles.videoInfo}>
                  <View
                    style={[
                      styles.typeBadge,
                      { backgroundColor: getTypeBg(visit.type) },
                    ]}
                  >
                    <Text
                      style={[
                        styles.typeText,
                        { color: getTypeColor(visit.type) },
                      ]}
                    >
                      {visit.type.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.videoTitle}>{visit.title}</Text>
                  <Text style={styles.videoDescription} numberOfLines={2}>
                    {visit.description}
                  </Text>
                  <View style={styles.videoMeta}>
                    <View style={styles.metaItem}>
                      <Eye color="#64748b" size={14} />
                      <Text style={styles.metaText}>{visit.viewCount.toLocaleString()} views</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Calendar color="#64748b" size={14} />
                      <Text style={styles.metaText}>{visit.createdAt}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {searchQuery.length > 0 ? "Search Results" : "All Videos"}
          </Text>
          {filteredVisits.length === 0 ? (
            <View style={styles.emptyState}>
              <Search color="#cbd5e1" size={48} />
              <Text style={styles.emptyText}>No videos found</Text>
              <Text style={styles.emptySubtext}>Try a different search term</Text>
            </View>
          ) : (
            <View style={styles.videoGrid}>
              {filteredVisits.map((visit) => (
                <TouchableOpacity
                  key={visit.id}
                  style={styles.gridVideoCard}
                  onPress={() => openVideo(visit.videoUrl)}
                  activeOpacity={0.9}
                >
                  <View style={styles.gridThumbnailContainer}>
                    <Image source={{ uri: visit.thumbnailUrl }} style={styles.gridThumbnail} />
                    <View style={styles.gridPlayOverlay}>
                      <Play color="#ffffff" size={24} fill="#ffffff" />
                    </View>
                    {visit.duration && (
                      <View style={styles.gridDurationBadge}>
                        <Text style={styles.gridDurationText}>{visit.duration}</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.gridVideoInfo}>
                    <Text style={styles.gridVideoTitle} numberOfLines={2}>
                      {visit.title}
                    </Text>
                    <View style={styles.gridMetaRow}>
                      <View
                        style={[
                          styles.gridTypeBadge,
                          { backgroundColor: getTypeBg(visit.type) },
                        ]}
                      >
                        <Text
                          style={[
                            styles.gridTypeText,
                            { color: getTypeColor(visit.type) },
                          ]}
                        >
                          {visit.type}
                        </Text>
                      </View>
                      <Text style={styles.gridViewCount}>
                        {visit.viewCount > 1000
                          ? `${(visit.viewCount / 1000).toFixed(1)}K`
                          : visit.viewCount}{" "}
                        views
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {selectedVideo && (
        <View style={styles.videoPlayerOverlay}>
          <TouchableOpacity style={styles.closePlayerButton} onPress={closeVideo}>
            <X color="#ffffff" size={32} />
          </TouchableOpacity>
          <View style={styles.videoPlayerContainer}>
            <Text style={styles.videoPlayerPlaceholder}>Video Player: {selectedVideo}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },
  placeholder: {
    width: 40,
  },
  heroSection: {
    padding: 32,
    alignItems: "center",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 16,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 22,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1e293b",
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  videoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  videoThumbnailContainer: {
    position: "relative",
    width: "100%",
    height: 220,
  },
  videoThumbnail: {
    width: "100%",
    height: "100%",
  },
  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  playButtonLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(37, 99, 235, 0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  durationBadge: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  liveBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ffffff",
  },
  liveText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  videoInfo: {
    padding: 16,
  },
  typeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  typeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  videoDescription: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
    marginBottom: 12,
  },
  videoMeta: {
    flexDirection: "row",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: "#64748b",
  },
  videoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  gridVideoCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  gridThumbnailContainer: {
    position: "relative",
    width: "100%",
    height: 120,
  },
  gridThumbnail: {
    width: "100%",
    height: "100%",
  },
  gridPlayOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  gridDurationBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  gridDurationText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
  },
  gridVideoInfo: {
    padding: 10,
  },
  gridVideoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
    lineHeight: 18,
  },
  gridMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gridTypeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  gridTypeText: {
    fontSize: 9,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  gridViewCount: {
    fontSize: 11,
    color: "#94a3b8",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#94a3b8",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#cbd5e1",
    marginTop: 4,
  },
  videoPlayerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  closePlayerButton: {
    position: "absolute",
    top: 48,
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  videoPlayerContainer: {
    width: "90%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000000",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  videoPlayerPlaceholder: {
    color: "#ffffff",
    fontSize: 14,
  },
});
