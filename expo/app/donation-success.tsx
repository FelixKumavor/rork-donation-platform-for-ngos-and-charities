import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Heart, Home, User, Sparkles } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

interface ConfettiParticle {
  x: Animated.Value;
  y: Animated.Value;
  rotation: Animated.Value;
  color: string;
}

export default function DonationSuccessScreen() {
  const { amount } = useLocalSearchParams<{ amount: string; campaign: string }>();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  const confettiColors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
  const confettiParticles = useRef<ConfettiParticle[]>(
    Array.from({ length: 30 }, () => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(-50),
      rotation: new Animated.Value(0),
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    }))
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    confettiParticles.forEach((particle, index) => {
      Animated.parallel([
        Animated.timing(particle.y, {
          toValue: height + 100,
          duration: 3000 + Math.random() * 2000,
          delay: index * 50,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.timing(particle.rotation, {
            toValue: 1,
            duration: 1000 + Math.random() * 1000,
            useNativeDriver: true,
          })
        ),
      ]).start();
    });
  }, [confettiParticles, fadeAnim, scaleAnim, slideAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#f0f9ff", "#e0f2fe"]}
        style={styles.background}
      >
        {confettiParticles.map((particle, index) => (
          <Animated.View
            key={index}
            style={[
              styles.confetti,
              {
                backgroundColor: particle.color,
                left: particle.x,
                transform: [
                  { translateY: particle.y },
                  {
                    rotate: particle.rotation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}

        <View style={styles.content}>
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [{ scale: scaleAnim }],
                opacity: fadeAnim,
              },
            ]}
          >
            <LinearGradient
              colors={["#10b981", "#059669"]}
              style={styles.iconGradient}
            >
              <Heart color="#ffffff" size={48} fill="#ffffff" />
            </LinearGradient>
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Text style={styles.title}>Thank You!</Text>
            <Text style={styles.subtitle}>
              Your donation of ${amount} has been received
            </Text>

            <View style={styles.messageCard}>
              <Sparkles color="#f59e0b" size={24} />
              <Text style={styles.messageTitle}>A Message from the Orphanage</Text>
              <Text style={styles.messageText}>
                Your generous contribution will directly help provide food, education, and care for the children. 
                Thank you for being a part of their journey and bringing hope into their lives. ❤️
              </Text>
            </View>

            <View style={styles.impactCard}>
              <Text style={styles.impactTitle}>Your Impact</Text>
              <Text style={styles.impactDescription}>
                Your ${amount} donation can provide:
              </Text>
              <View style={styles.impactList}>
                <Text style={styles.impactItem}>• Nutritious meals for 5 children for a week</Text>
                <Text style={styles.impactItem}>• School supplies for 3 students</Text>
                <Text style={styles.impactItem}>• Medical care and medication</Text>
              </View>
            </View>
          </Animated.View>
        </View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.replace("/(tabs)/profile")}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["#2563eb", "#1d4ed8"]}
              style={styles.buttonGradient}
            >
              <User color="#ffffff" size={20} />
              <Text style={styles.buttonText}>View My Dashboard</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.replace("/(tabs)/home")}
            activeOpacity={0.7}
          >
            <Home color="#2563eb" size={20} />
            <Text style={styles.secondaryButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  confetti: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  iconContainer: {
    alignSelf: "center",
    marginBottom: 32,
  },
  iconGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 32,
  },
  messageCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 12,
    marginBottom: 8,
    textAlign: "center",
  },
  messageText: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 22,
    textAlign: "center",
  },
  impactCard: {
    backgroundColor: "#fff7ed",
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  impactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  impactDescription: {
    fontSize: 15,
    color: "#64748b",
    marginBottom: 12,
  },
  impactList: {
    gap: 8,
  },
  impactItem: {
    fontSize: 14,
    color: "#1e293b",
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  secondaryButtonText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "600",
  },
});
