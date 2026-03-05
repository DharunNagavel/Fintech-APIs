// src/components/Dashboard.jsx
import React, { useState, useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, PieChart, Pie, Cell, Radar, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  AreaChart, Area
} from "recharts";
import { 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  DollarSign,
  Activity,
  Users,
  CreditCard,
  Globe,
  Filter,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

// Enhanced data with more realistic values
const transactionData = [
  { transaction_id: "TX1001", amount: 500, transactions_per_minute: 1, transaction_type: "UPI", kyc_status: "verified", risk_label: 0, timestamp: "2024-01-15", location: "Mumbai" },
  { transaction_id: "TX1002", amount: 800, transactions_per_minute: 1, transaction_type: "UPI", kyc_status: "verified", risk_label: 0, timestamp: "2024-01-15", location: "Delhi" },
  { transaction_id: "TX1003", amount: 1200, transactions_per_minute: 2, transaction_type: "card", kyc_status: "verified", risk_label: 0, timestamp: "2024-01-15", location: "Bangalore" },
  { transaction_id: "TX1004", amount: 25000, transactions_per_minute: 5, transaction_type: "transfer", kyc_status: "pending", risk_label: 1, timestamp: "2024-01-15", location: "Mumbai" },
  { transaction_id: "TX1005", amount: 15000, transactions_per_minute: 3, transaction_type: "card", kyc_status: "verified", risk_label: 1, timestamp: "2024-01-14", location: "Chennai" },
  { transaction_id: "TX1006", amount: 750, transactions_per_minute: 1, transaction_type: "UPI", kyc_status: "verified", risk_label: 0, timestamp: "2024-01-14", location: "Pune" },
];

const fraudData = [
  { transaction_id: "TXN001", amount: 4500, transaction_type: "payment", country: "India", merchant: "Amazon", kyc_status: "Verified", daily_txn_count: 2, is_fraud: 0, risk_score: 15 },
  { transaction_id: "TXN002", amount: 150000, transaction_type: "transfer", country: "India", merchant: "Unknown Merchant", kyc_status: "Verified", daily_txn_count: 3, is_fraud: 1, risk_score: 85 },
  { transaction_id: "TXN003", amount: 75000, transaction_type: "withdrawal", country: "India", merchant: "PayPal", kyc_status: "Pending", daily_txn_count: 1, is_fraud: 0, risk_score: 45 },
  { transaction_id: "TXN004", amount: 250000, transaction_type: "transfer", country: "International", merchant: "Crypto Exchange", kyc_status: "Unverified", daily_txn_count: 5, is_fraud: 1, risk_score: 95 },
  { transaction_id: "TXN005", amount: 12000, transaction_type: "payment", country: "India", merchant: "Flipkart", kyc_status: "Verified", daily_txn_count: 1, is_fraud: 0, risk_score: 10 },
];

const COLORS = {
  low: "#10b981",
  medium: "#f59e0b",
  high: "#ef4444",
  primary: "#3b82f6",
  secondary: "#8b5cf6",
  success: "#22c55e",
  warning: "#f97316",
  danger: "#ef4444",
  info: "#06b6d4"
};

const GRADIENTS = {
  primary: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
  success: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
  warning: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
  danger: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  info: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
};

function Dashboard() {
  const [selectedRiskLabel, setSelectedRiskLabel] = useState(null);
  const [dateRange, setDateRange] = useState("today");
  const [viewMode, setViewMode] = useState("overview");

  // Memoized calculations
  const metrics = useMemo(() => {
    const totalTx = transactionData.length;
    const highRiskCount = transactionData.filter(tx => tx.risk_label === 1).length;
    const totalFraud = fraudData.filter(tx => tx.is_fraud).length;
    const totalAmount = transactionData.reduce((sum, tx) => sum + tx.amount, 0);
    const avgAmount = totalAmount / totalTx;
    const fraudRate = ((totalFraud / totalTx) * 100).toFixed(1);
    
    return {
      totalTx,
      highRiskCount,
      totalFraud,
      totalAmount,
      avgAmount,
      fraudRate,
      riskPercentage: ((highRiskCount / totalTx) * 100).toFixed(1)
    };
  }, []);

  const riskDistribution = [
    { name: "Low Risk", value: transactionData.filter(tx => tx.risk_label === 0).length, color: COLORS.low },
    { name: "Medium Risk", value: transactionData.filter(tx => tx.risk_label === 1).length, color: COLORS.medium },
    { name: "High Risk", value: transactionData.filter(tx => tx.risk_label === 2).length || 2, color: COLORS.high },
  ];

  const transactionTypes = [
    { name: "UPI", value: transactionData.filter(tx => tx.transaction_type === "UPI").length },
    { name: "Card", value: transactionData.filter(tx => tx.transaction_type === "card").length },
    { name: "Transfer", value: transactionData.filter(tx => tx.transaction_type === "transfer").length },
  ];

  const radarData = [
    { subject: "Transaction Volume", A: metrics.totalTx, B: 110, fullMark: 150 },
    { subject: "Fraud Detection", A: metrics.totalFraud * 10, B: 95, fullMark: 150 },
    { subject: "Risk Score", A: metrics.riskPercentage * 1.5, B: 120, fullMark: 150 },
    { subject: "KYC Compliance", A: 130, B: 140, fullMark: 150 },
    { subject: "AML Risk", A: metrics.highRiskCount * 15, B: 100, fullMark: 150 },
  ];

  const recentAlerts = [
    { id: 1, type: "High Risk Transaction", amount: "₹1,50,000", time: "2 min ago", severity: "high" },
    { id: 2, type: "Unusual Pattern Detected", amount: "Multiple transfers", time: "15 min ago", severity: "medium" },
    { id: 3, type: "KYC Expiry Warning", amount: "3 users", time: "1 hour ago", severity: "low" },
  ];

  return (
    <div style={{ 
      padding: "24px", 
      background: "#f3f4f6",
      minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Header Section */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "24px"
      }}>
        <div>
          <h1 style={{ 
            fontSize: "28px", 
            fontWeight: "700",
            background: GRADIENTS.primary,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: "0 0 4px 0"
          }}>
            Fintech Risk Intelligence Dashboard
          </h1>
          <p style={{ color: "#6b7280", margin: 0 }}>
            Real-time fraud detection and risk analytics
          </p>
        </div>
        
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{
            padding: "8px 16px",
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500"
          }}>
            <Calendar size={16} />
            Last 24 Hours
          </button>
          <button style={{
            padding: "8px 16px",
            background: GRADIENTS.primary,
            border: "none",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            color: "white"
          }}>
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards - Enhanced */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "24px"
      }}>
        <KPICard
          title="Total Transactions"
          value={metrics.totalTx}
          change="+12.5%"
          icon={<Activity size={20} />}
          gradient={GRADIENTS.primary}
          trend="up"
        />
        <KPICard
          title="Total Volume"
          value={`₹${(metrics.totalAmount/1000).toFixed(1)}K`}
          change="+8.2%"
          icon={<DollarSign size={20} />}
          gradient={GRADIENTS.success}
          trend="up"
        />
        <KPICard
          title="High Risk"
          value={metrics.highRiskCount}
          change="+5.3%"
          icon={<AlertTriangle size={20} />}
          gradient={GRADIENTS.warning}
          trend="up"
        />
        <KPICard
          title="Fraud Detected"
          value={metrics.totalFraud}
          change="-2.1%"
          icon={<Shield size={20} />}
          gradient={GRADIENTS.danger}
          trend="down"
        />
      </div>

      {/* Charts Section */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "2fr 1fr",
        gap: "20px",
        marginBottom: "24px"
      }}>
        {/* Transaction Trend */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <h3 style={cardTitleStyle}>Transaction Trend Analysis</h3>
            <Filter size={16} color="#6b7280" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={transactionData.map((tx, i) => ({
              name: `T${i+1}`,
              amount: tx.amount,
              risk: tx.risk_label * 1000
            }))}>
              <defs>
                <linearGradient id="amountGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke={COLORS.primary} 
                fill="url(#amountGradient)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <h3 style={cardTitleStyle}>Risk Distribution</h3>
            <span style={{
              background: "#f3f4f6",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "500"
            }}>
              {metrics.riskPercentage}% High Risk
            </span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row Charts */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginBottom: "24px"
      }}>
        {/* Transaction Types Bar Chart */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <h3 style={cardTitleStyle}>Transaction Type Analysis</h3>
            <CreditCard size={16} color="#6b7280" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={transactionTypes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <h3 style={cardTitleStyle}>Risk Radar Overview</h3>
            <Globe size={16} color="#6b7280" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
              <PolarRadiusAxis stroke="#6b7280" />
              <Radar
                name="Current"
                dataKey="A"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                fillOpacity={0.6}
              />
              <Radar
                name="Benchmark"
                dataKey="B"
                stroke={COLORS.secondary}
                fill={COLORS.secondary}
                fillOpacity={0.6}
              />
              <Legend />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fraud Table and Alerts */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "2fr 1fr",
        gap: "20px"
      }}>
        {/* Fraud Transactions Table */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <h3 style={cardTitleStyle}>Recent Fraud Transactions</h3>
            <button style={{
              padding: "4px 12px",
              background: "#f3f4f6",
              border: "none",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "500",
              cursor: "pointer"
            }}>
              View All
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Transaction ID</th>
                  <th style={tableHeaderStyle}>Amount</th>
                  <th style={tableHeaderStyle}>Type</th>
                  <th style={tableHeaderStyle}>Merchant</th>
                  <th style={tableHeaderStyle}>Risk Score</th>
                  <th style={tableHeaderStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {fraudData.map(tx => (
                  <tr key={tx.transaction_id}>
                    <td style={tableCellStyle}>
                      <span style={{ fontWeight: "500" }}>{tx.transaction_id}</span>
                    </td>
                    <td style={tableCellStyle}>
                      <span style={{ fontWeight: "600" }}>₹{tx.amount.toLocaleString()}</span>
                    </td>
                    <td style={tableCellStyle}>{tx.transaction_type}</td>
                    <td style={tableCellStyle}>{tx.merchant}</td>
                    <td style={tableCellStyle}>
                      <RiskBadge score={tx.risk_score} />
                    </td>
                    <td style={tableCellStyle}>
                      <StatusBadge isFraud={tx.is_fraud} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Alerts */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <h3 style={cardTitleStyle}>Recent Alerts</h3>
            <AlertTriangle size={16} color="#f59e0b" />
          </div>
          <div>
            {recentAlerts.map(alert => (
              <div key={alert.id} style={{
                padding: "12px",
                borderBottom: "1px solid #f3f4f6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "8px",
                    marginBottom: "4px"
                  }}>
                    <AlertBadge severity={alert.severity} />
                    <span style={{ fontWeight: "500" }}>{alert.type}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    {alert.amount} • {alert.time}
                  </div>
                </div>
                <button style={{
                  padding: "4px 8px",
                  background: "transparent",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                  fontSize: "12px",
                  cursor: "pointer"
                }}>
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Components
const KPICard = ({ title, value, change, icon, gradient, trend }) => (
  <div style={{
    background: "white",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
    }
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
      <div style={{
        background: gradient,
        width: "40px",
        height: "40px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
      }}>
        {icon}
      </div>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "13px",
        color: trend === "up" ? COLORS.success : COLORS.danger
      }}>
        {trend === "up" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}
      </div>
    </div>
    <h4 style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 4px 0", fontWeight: "500" }}>
      {title}
    </h4>
    <p style={{ fontSize: "28px", fontWeight: "700", margin: 0, color: "#1f2937" }}>
      {value}
    </p>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "white",
        padding: "12px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb"
      }}>
        <p style={{ margin: "0 0 4px 0", fontWeight: "600" }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ margin: "2px 0", color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RiskBadge = ({ score }) => {
  const getColor = () => {
    if (score < 30) return COLORS.success;
    if (score < 70) return COLORS.warning;
    return COLORS.danger;
  };

  return (
    <span style={{
      background: getColor() + "20",
      color: getColor(),
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "600"
    }}>
      {score}
    </span>
  );
};

const StatusBadge = ({ isFraud }) => (
  <span style={{
    background: isFraud ? COLORS.danger + "20" : COLORS.success + "20",
    color: isFraud ? COLORS.danger : COLORS.success,
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600"
  }}>
    {isFraud ? "Fraud" : "Legit"}
  </span>
);

const AlertBadge = ({ severity }) => {
  const colors = {
    high: COLORS.danger,
    medium: COLORS.warning,
    low: COLORS.success
  };

  return (
    <span style={{
      width: "8px",
      height: "8px",
      background: colors[severity],
      borderRadius: "50%",
      display: "inline-block"
    }} />
  );
};

// Styles
const cardStyle = {
  background: "white",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
};

const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const cardTitleStyle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1f2937",
  margin: 0
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "14px"
};

const tableHeaderStyle = {
  textAlign: "left",
  padding: "12px",
  background: "#f9fafb",
  color: "#6b7280",
  fontWeight: "500",
  borderBottom: "2px solid #e5e7eb"
};

const tableCellStyle = {
  padding: "12px",
  borderBottom: "1px solid #f3f4f6",
  color: "#1f2937"
};

export default Dashboard;