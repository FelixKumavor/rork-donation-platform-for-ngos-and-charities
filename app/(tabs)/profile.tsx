import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
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
  CreditCard,
  Mail,
  Image as ImageIcon,
  Video,
  Play,
  X,
  Send,
  MessageCircle,
} from "lucide-react-native";
import { useProfile } from "@/hooks/use-profile";
import { useThankYouMessages } from "@/hooks/use-thank-you-messages";


export default function ProfileScreen() {
  const { profile, donationHistory, stats } = useProfile();
  const { messages, unreadCount, addReply } = useThankYouMessages(profile.id);
  const insets = useSafeAreaInsets();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleSendReply = () => {
    if (selectedMessage && replyText.trim()) {
      addReply(selectedMessage, replyText);
      setReplyText("");
      setSelectedMessage(null);
    }
  };

  const openVideoModal = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setShowVideoModal(true);
  };

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

        {/* Thank You Messages */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Thank You Messages</Text>
              {unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
                </View>
              )}
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {messages.slice(0, 3).map((message) => (
            <View key={message.id} style={styles.messageCard}>
              <View style={styles.messageHeader}>
                <View style={styles.messageTypeIcon}>
                  {message.messageType === "text" && <Mail color="#2563eb" size={20} />}
                  {message.messageType === "photo" && <ImageIcon color="#10b981" size={20} />}
                  {message.messageType === "video" && <Video color="#f59e0b" size={20} />}
                </View>
                <View style={styles.messageSender}>
                  <Text style={styles.senderName}>{message.senderName}</Text>
                  <Text style={styles.senderRole}>{message.senderRole}</Text>
                </View>
                <Text style={styles.messageDate}>{message.createdAt}</Text>
              </View>

              {message.messageType === "photo" && message.contentUrl && (
                <Image 
                  source={{ uri: message.contentUrl }} 
                  style={styles.messageImage}
                />
              )}

              {message.messageType === "video" && message.contentUrl && (
                <TouchableOpacity 
                  style={styles.videoThumbnail}
                  onPress={() => openVideoModal(message.contentUrl!)}
                >
                  <Image 
                    source={{ uri: message.contentUrl.replace(".mp4", "-thumb.jpg") }} 
                    style={styles.messageImage}
                  />
                  <View style={styles.playButton}>
                    <Play color="#ffffff" size={32} fill="#ffffff" />
                  </View>
                </TouchableOpacity>
              )}

              <Text style={styles.messageText}>{message.textContent}</Text>

              <TouchableOpacity 
                style={styles.replyButton}
                onPress={() => setSelectedMessage(message.id)}
              >
                <MessageCircle color="#2563eb" size={16} />
                <Text style={styles.replyButtonText}>Send Encouragement</Text>
              </TouchableOpacity>
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

      {/* Reply Modal */}
      <Modal
        visible={selectedMessage !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedMessage(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.replyModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Send Your Message</Text>
              <TouchableOpacity onPress={() => setSelectedMessage(null)}>
                <X color="#64748b" size={24} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.replyInput}
              placeholder="Write an encouraging message..."
              placeholderTextColor="#94a3b8"
              value={replyText}
              onChangeText={setReplyText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity 
              style={[styles.sendButton, !replyText.trim() && styles.sendButtonDisabled]}
              onPress={handleSendReply}
              disabled={!replyText.trim()}
            >
              <LinearGradient
                colors={replyText.trim() ? ["#2563eb", "#1d4ed8"] : ["#cbd5e1", "#94a3b8"]}
                style={styles.sendButtonGradient}
              >
                <Send color="#ffffff" size={20} />
                <Text style={styles.sendButtonText}>Send Message</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Video Modal */}
      <Modal
        visible={showVideoModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowVideoModal(false)}
      >
        <View style={styles.videoModalOverlay}>
          <TouchableOpacity 
            style={styles.closeVideoButton}
            onPress={() => setShowVideoModal(false)}
          >
            <X color="#ffffff" size={32} />
          </TouchableOpacity>
          <View style={styles.videoContainer}>
            <Text style={styles.videoPlaceholder}>Video Player: {selectedVideo}</Text>
          </View>
        </View>
      </Modal>
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
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  unreadBadge: {
    backgroundColor: "#ef4444",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
  },
  messageCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  messageTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  messageSender: {
    flex: 1,
  },
  senderName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
  },
  senderRole: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  messageDate: {
    fontSize: 12,
    color: "#94a3b8",
  },
  messageImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  videoThumbnail: {
    position: "relative",
    marginBottom: 12,
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -24 }, { translateY: -24 }],
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  messageText: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 20,
    marginBottom: 12,
  },
  replyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eff6ff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  replyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  replyModal: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
  },
  replyInput: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1e293b",
    minHeight: 120,
    marginBottom: 16,
  },
  sendButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 8,
  },
  sendButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  videoModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeVideoButton: {
    position: "absolute",
    top: 48,
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  videoContainer: {
    width: "90%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000000",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  videoPlaceholder: {
    color: "#ffffff",
    fontSize: 14,
  },
});