"use client";

import { getDashboardData } from "@/api/api";
import { axiosInstance } from "@/lib/axios";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// Define the type for our dashboard stats
interface DashboardStats {
  totalProperties: number;
  readyProperties: number;
  readyPercentage: number;
  totalCommunities: number;
  totalAgents: number;
  propertyGrowth: number;
  regionsCount: number;
  newAgentsThisMonth: number;
  propertyTypeData?: Array<{ name: string; value: number }>;
  messageRequestsData?: Array<{
    name: string;
    clientRequests: number;
    agentMessages: number;
  }>;
}

export default function Dashboard({stats}:any) {
  // State for dashboard stats
  const [error, setError] = useState<string | null>(null);

  // Sample data for charts - you'll replace this with API data later
  const propertyTypeData = [
    { name: "Residential", value: 65 },
    { name: "Commercial", value: 15 },
    { name: "Industrial", value: 10 },
    { name: "Land", value: 10 },
  ];

  const messageRequestsData = [
    { name: "Nov", clientRequests: 28, agentMessages: 45 },
    { name: "Dec", clientRequests: 35, agentMessages: 52 },
    { name: "Jan", clientRequests: 42, agentMessages: 58 },
    { name: "Feb", clientRequests: 38, agentMessages: 50 },
    { name: "Mar", clientRequests: 45, agentMessages: 62 },
    { name: "Apr", clientRequests: 52, agentMessages: 70 },
  ];

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

  // Error state
  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-4">Error loading dashboard: {error}</p>
        </div>
      </div>
    );
  }

  // If no stats data
  if (!stats) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-400">No dashboard data available</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        {/* Stats Cards Row */}
        <div className="col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {/* Total Properties Card */}
          <div className="rounded-lg bg-slate-800 p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-200">
                  Total Properties
                </h4>
                <p className="mt-2 text-3xl font-bold text-white">
                  {stats.totalProperties}
                </p>
              </div>
              <div className="rounded-full bg-indigo-500/20 p-3 text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-center text-green-400">
              <span className="text-sm">
                +{stats.propertyGrowth}% from last month
              </span>
            </div>
          </div>

          {/* Ready Properties Card */}
          <div className="rounded-lg bg-slate-800 p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-200">
                  Ready Properties
                </h4>
                <p className="mt-2 text-3xl font-bold text-white">
                  {stats.readyProperties}
                </p>
              </div>
              <div className="rounded-full bg-green-500/20 p-3 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-center text-green-400">
              <span className="text-sm">
                {stats.readyPercentage}% of total inventory
              </span>
            </div>
          </div>

          {/* Total Communities Card */}
          <div className="rounded-lg bg-slate-800 p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-200">
                  Communities
                </h4>
                <p className="mt-2 text-3xl font-bold text-white">
                  {stats.totalCommunities}
                </p>
              </div>
              <div className="rounded-full bg-blue-500/20 p-3 text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-center text-blue-400">
              <span className="text-sm">
                Across gulf regions
              </span>
            </div>
          </div>

          {/* Total Agents Card */}
          <div className="rounded-lg bg-slate-800 p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-200">
                  Active Agents
                </h4>
                <p className="mt-2 text-3xl font-bold text-white">
                  {stats.totalAgents}
                </p>
              </div>
              <div className="rounded-full bg-purple-500/20 p-3 text-purple-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-center text-purple-400">
              <span className="text-sm">
                {stats.newAgentsThisMonth} new this month
              </span>
            </div>
          </div>
        </div>

        {/* Charts Row - You'll implement these later */}
        <div className="col-span-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Property Type Distribution Chart */}
          <div className="rounded-lg bg-slate-800 p-4 shadow-md">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-200">
                Property Type Distribution
              </h4>
              <p className="text-sm text-gray-400">
                Breakdown of portfolio by property type
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {propertyTypeData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} Properties`, "Count"]}
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      borderColor: "#374151",
                      color: "#F9FAFB",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Message Requests Chart */}
          <div className="rounded-lg bg-slate-800 p-4 shadow-md">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-200">
                Message & Request Activity
              </h4>
              <p className="text-sm text-gray-400">
                Client requests vs. agent messages over the past 6 months
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={messageRequestsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="colorClientRequests"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#3B82F6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorAgentMessages"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10B981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      borderColor: "#374151",
                      color: "#F9FAFB",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="clientRequests"
                    name="Client Requests"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorClientRequests)"
                  />
                  <Area
                    type="monotone"
                    dataKey="agentMessages"
                    name="Agent Messages"
                    stroke="#10B981"
                    fillOpacity={1}
                    fill="url(#colorAgentMessages)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
