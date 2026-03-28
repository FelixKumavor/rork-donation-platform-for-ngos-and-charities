import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,

} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { 
  ArrowLeft, 
  Heart, 
  CreditCard, 
  Smartphone,
  RefreshCw,
  Check
} from "lucide-react-native";
import { useCampaigns } from "@/hooks/use-campaigns";

const PRESET_AMOUNTS = [25, 50, 100, 250];

export default function DonateScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { allCampaigns } = useCampaigns();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const campaign = allCampaigns.find(c => c.id === id);

  if (!campaign) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Campaign not found</Text>
      </SafeAreaView>
    );
  }

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleAmountSelect = (amount: number) => {
    if (amount > 0 && amount <= 10000) {
      setSelectedAmount(amount);
      setCustomAmount("");
    }
  };

  const handleCustomAmountChange = (text: string) => {
    const sanitized = text.trim();
    if (sanitized.length <= 10) {
      setCustomAmount(sanitized);
      setSelectedAmount(null);
    }
  };

  const handleDonate = async () => {
    const validAmount = finalAmount && finalAmount > 0 && finalAmount <= 10000 ? finalAmount : null;
    if (!validAmount) {
      console.log("Invalid donation amount");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      console.log(`Donation of ${validAmount} processed successfully`);
      router.push({
        pathname: "/donation-success",
        params: { amount: validAmount.toString(), campaign: campaign.title }
      } as any);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#1e293b" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Make a Donation</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Campaign Info */}
        <View style={styles.campaignInfo}>
          <Text style={styles.campaignTitle}>{campaign.title}</Text>
          <Text style={styles.campaignCategory}>{campaign.category}</Text>
        </View>

        {/* Amount Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Amount</Text>
          
          <View style={styles.amountGrid}>
            {PRESET_AMOUNTS.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.amountButton,
                  selectedAmount === amount && styles.amountButtonSelected
                ]}
                onPress={() => handleAmountSelect(amount)}
              >
                <Text style={[
                  styles.amountButtonText,
                  selectedAmount === amount && styles.amountButtonTextSelected
                ]}>
                  ${amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.customAmountContainer}>
            <Text style={styles.customAmountLabel}>Or enter custom amount:</Text>
            <View style={styles.customAmountInput}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                value={customAmount}
                onChangeText={handleCustomAmountChange}
                keyboardType="numeric"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>
        </View>

        {/* Recurring Donation */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.recurringOption}
            onPress={() => setIsRecurring(!isRecurring)}
          >
            <View style={styles.recurringInfo}>
              <RefreshCw color="#2563eb" size={20} />
              <View style={styles.recurringText}>
                <Text style={styles.recurringTitle}>Make this recurring</Text>
                <Text style={styles.recurringDescription}>
                  Donate monthly to maximize your impact
                </Text>
              </View>
            </View>
            <View style={[
              styles.checkbox,
              isRecurring && styles.checkboxSelected
            ]}>
              {isRecurring && <Check color="#ffffff" size={16} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === "card" && styles.paymentMethodSelected
              ]}
              onPress={() => setPaymentMethod("card")}
            >
              <CreditCard color={paymentMethod === "card" ? "#2563eb" : "#64748b"} size={24} />
              <Text style={[
                styles.paymentMethodText,
                paymentMethod === "card" && styles.paymentMethodTextSelected
              ]}>
                Credit/Debit Card
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === "mobile" && styles.paymentMethodSelected
              ]}
              onPress={() => setPaymentMethod("mobile")}
            >
              <Smartphone color={paymentMethod === "mobile" ? "#2563eb" : "#64748b"} size={24} />
              <Text style={[
                styles.paymentMethodText,
                paymentMethod === "mobile" && styles.paymentMethodTextSelected
              ]}>
                Mobile Money
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Donation Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Donation Summary</Text>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount</Text>
              <Text style={styles.summaryValue}>
                ${finalAmount?.toFixed(2) || "0.00"}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frequency</Text>
              <Text style={styles.summaryValue}>
                {isRecurring ? "Monthly" : "One-time"}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Payment Method</Text>
              <Text style={styles.summaryValue}>
                {paymentMethod === "card" ? "Credit Card" : "Mobile Money"}
              </Text>
            </View>
            
            <View style={[styles.summaryRow, styles.summaryTotal]}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>
                ${finalAmount?.toFixed(2) || "0.00"}
              </Text>
            </View>
          </View>
        </View>

        {/* Impact Message */}
        <View style={styles.impactMessage}>
          <Heart color="#ef4444" size={24} />
          <Text style={styles.impactText}>
            Your ${(finalAmount && finalAmount > 0 && finalAmount <= 10000) ? finalAmount.toFixed(2) : "0.00"} donation can provide clean water for 2 families for a month!
          </Text>
        </View>
      </ScrollView>

      {/* Donate Button */}
      <View style={styles.donateContainer}>
        <TouchableOpacity 
          style={[styles.donateButton, (!finalAmount || isProcessing) && styles.donateButtonDisabled]}
          onPress={handleDonate}
          disabled={!finalAmount || isProcessing}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={(!finalAmount || isProcessing) ? ["#94a3b8", "#64748b"] : ["#2563eb", "#1d4ed8"]}
            style={styles.donateGradient}
          >
            {isProcessing ? (
              <Text style={styles.donateButtonText}>Processing...</Text>
            ) : (
              <>
                <Heart color="#ffffff" size={20} />
                <Text style={styles.donateButtonText}>
                  Donate ${finalAmount?.toFixed(2) || "0.00"}
                </Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  campaignInfo: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  campaignTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
  },
  campaignCategory: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  section: {
    backgroundColor: "#ffffff",
    marginTop: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  amountGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  amountButton: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#f1f5f9",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  amountButtonSelected: {
    backgroundColor: "#eff6ff",
    borderColor: "#2563eb",
  },
  amountButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#64748b",
  },
  amountButtonTextSelected: {
    color: "#2563eb",
  },
  customAmountContainer: {
    marginTop: 8,
  },
  customAmountLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  customAmountInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    paddingVertical: 16,
  },
  recurringOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
  },
  recurringInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  recurringText: {
    marginLeft: 12,
    flex: 1,
  },
  recurringTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
  recurringDescription: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
  },
  paymentMethodSelected: {
    backgroundColor: "#eff6ff",
    borderColor: "#2563eb",
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748b",
    marginLeft: 12,
  },
  paymentMethodTextSelected: {
    color: "#2563eb",
  },
  summaryCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1e293b",
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    marginTop: 8,
    paddingTop: 16,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
  },
  impactMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
  },
  impactText: {
    fontSize: 14,
    color: "#1e293b",
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  donateContainer: {
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
  donateButtonDisabled: {
    opacity: 0.6,
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