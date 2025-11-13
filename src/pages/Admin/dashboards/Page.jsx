import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { TypographyH1 } from "../../../components/common/Typography";
import { Users, Package, TrendingUp, DollarSign } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { GLOBAL_ROUTES } from "../../../utils/Constants";

// Sample data for the profit graph
const profitData = [
  { day: "Mon", profit: 12000 },
  { day: "Tue", profit: 19000 },
  { day: "Wed", profit: 25000 },
  { day: "Thu", profit: 22000 },
  { day: "Fri", profit: 28000 },
  { day: "Sat", profit: 24000 },
  { day: "Sun", profit: 18000 },
];

const Page = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("last_7_days");

  // Sample data - replace with actual data from your API
  const statsData = {
    totalUsers: { value: "3,240", change: "+120 this week", positive: true },
    coinsSoldAuctions: {
      value: "3,450",
      change: "120 this week",
      positive: true,
    },
    coinsSoldIndependently: {
      value: "1,250",
      change: "20 this week",
      positive: true,
    },
    revenue: {
      value: "$1,230,000",
      change: "$32,000 this week",
      positive: true,
    },
  };

  const currentAuction = {
    isLive: true,
    title: "Bidalot Coin Auction",
    auctionId: "123456",
    totalCoins: 40,
    image: null, // You can add your image URL here
  };

  const topBidders = [
    { id: 1, label: "User A", amount: 530 },
    { id: 2, label: "User B", amount: 500 },
    { id: 3, label: "User C", amount: 490 },
    { id: 4, label: "User D", amount: 480 },
    { id: 5, label: "User E", amount: 460 },
  ];

  const recentActivities = [
    {
      id: 1,
      activity: "User A placed a bid on 'The Great Coin Collection'",
      timestamp: "2023-09-20 10:00 AM",
    },
    {
      id: 2,
      activity: "New coin '1907 High Relief Gold Coin' added",
      timestamp: "2023-09-20 10:00 AM",
    },
    {
      id: 3,
      activity: "Auction 'The Great Coin Collection' started",
      timestamp: "2023-09-20 10:00 AM",
    },
    {
      id: 4,
      activity: "User B registered on the platform",
      timestamp: "2023-09-20 10:00 AM",
    },
    {
      id: 5,
      activity: "New coin 'Roman Silver Denarius' added",
      timestamp: "2023-09-20 10:00 AM",
    },
    {
      id: 6,
      activity: "User A placed a bid on 'The Great Coin Collection'",
      timestamp: "2023-09-20 10:00 AM",
    },
  ];

  const maxBidAmount = Math.max(...topBidders.map((b) => b.amount));

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <TypographyH1>Dashboard Overview</TypographyH1>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(GLOBAL_ROUTES.ADMIN_ADD_LOT)}
          >
            Add New Coin
          </Button>
          <Button onClick={() => navigate(GLOBAL_ROUTES.ADMIN_ADD_AUCTION)}>
            Start New Auction
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  TOTAL REGISTERED USERS
                </p>
                <h3 className="text-3xl font-bold">
                  {statsData.totalUsers.value}
                </h3>
                <p className="text-sm text-green-600 mt-1">
                  {statsData.totalUsers.change}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  COINS SOLD IN AUCTIONS
                </p>
                <h3 className="text-3xl font-bold">
                  {statsData.coinsSoldAuctions.value}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {statsData.coinsSoldAuctions.change}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <Package className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  COINS SOLD INDEPENDENTLY
                </p>
                <h3 className="text-3xl font-bold">
                  {statsData.coinsSoldIndependently.value}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {statsData.coinsSoldIndependently.change}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">REVENUE</p>
                <h3 className="text-3xl font-bold">
                  {statsData.revenue.value}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {statsData.revenue.change}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Auction and Top Bidders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Auction */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium text-muted-foreground">
              CURRENT AUCTION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              {/* Coin Image Placeholder */}
              <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="h-20 w-20 text-muted-foreground" />
              </div>

              <div className="flex flex-col justify-center flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-sm text-green-600 font-medium">
                    Live Auction
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  {currentAuction.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  Auction ID:{" "}
                  <span className="text-foreground">
                    {currentAuction.auctionId}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Total Coins:{" "}
                  <span className="text-foreground">
                    {currentAuction.totalCoins}
                  </span>
                </p>
                <Button
                  variant="outline"
                  className="w-fit"
                  onClick={() => navigate(GLOBAL_ROUTES.ADMIN_AUCTIONS)}
                >
                  Manage Auction
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 5 Bidders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium text-muted-foreground">
              TOP 5 BIDDERS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topBidders.map((bidder) => (
                <div key={bidder.id} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground min-w-[60px]">
                    {bidder.label}
                  </span>
                  <div className="flex-1 h-8 bg-muted rounded-md overflow-hidden">
                    <div
                      className="h-full bg-primary/80 flex items-center justify-end pr-3"
                      style={{
                        width: `${(bidder.amount / maxBidAmount) * 100}%`,
                      }}
                    >
                      <span className="text-xs font-medium text-primary-foreground">
                        ${bidder.amount}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profit Graph and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Profit Graph */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-muted-foreground">
                TOTAL PROFIT GRAPH
              </CardTitle>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last_7_days">Last 7 days</SelectItem>
                  <SelectItem value="last_30_days">Last 30 days</SelectItem>
                  <SelectItem value="last_6_months">Last 6 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={profitData}>
                <defs>
                  <linearGradient
                    id="profitGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--primary)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="day"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [
                    `$${value.toLocaleString()}`,
                    "Profit",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#profitGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-muted-foreground">
                RECENT ACTIVITY
              </CardTitle>
              <Button variant="link" className="text-primary p-0 h-auto">
                View all
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[250px] overflow-y-auto">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start justify-between gap-4 pb-4 border-b last:border-0 last:pb-0"
                >
                  <p className="text-sm flex-1">{activity.activity}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
