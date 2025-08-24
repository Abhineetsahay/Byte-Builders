'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart
} from 'recharts';
import { 
  TrendingUp, TrendingDown, AlertCircle, CheckCircle, 
  Clock, Award, Calendar, Filter, Download, RefreshCw
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // State
  // const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [animatedValues, setAnimatedValues] = useState({
    totalQueries: 0,
    resolvedQueries: 0,
    pendingComplaints: 0,
    impactScore: 0
  });

  useEffect(() => {
    if (status === 'loading') return; // wait for session
    if (!session) router.push('/Login'); // client-side redirect
  }, [session, status, router]);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targetValues = {
      totalQueries: 15420,
      resolvedQueries: 12350,
      pendingComplaints: 3070,
      impactScore: 87.5
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setAnimatedValues({
        totalQueries: Math.floor(targetValues.totalQueries * progress),
        resolvedQueries: Math.floor(targetValues.resolvedQueries * progress),
        pendingComplaints: Math.floor(targetValues.pendingComplaints * progress),
        impactScore: parseFloat((targetValues.impactScore * progress).toFixed(1))
      });
      if (currentStep >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Data
  const sdgProgress = [
    { goal: 'Zero Hunger', target: 100, achieved: 78, color: '#E5243B', icon: '🍽️' },
    { goal: 'Good Health', target: 100, achieved: 85, color: '#4C9F38', icon: '❤️' },
    { goal: 'Quality Education', target: 100, achieved: 72, color: '#C5192D', icon: '📚' },
    { goal: 'Clean Water', target: 100, achieved: 65, color: '#26BDE2', icon: '💧' },
    { goal: 'Clean Energy', target: 100, achieved: 58, color: '#FCC30B', icon: '⚡' },
    { goal: 'Sustainable Cities', target: 100, achieved: 81, color: '#FD6925', icon: '🏙️' }
  ];

  const queryTimeline = [
    { date: 'Mon', resolved: 145, pending: 32, new: 177 },
    { date: 'Tue', resolved: 158, pending: 28, new: 165 },
    { date: 'Wed', resolved: 172, pending: 35, new: 189 },
    { date: 'Thu', resolved: 165, pending: 41, new: 195 },
    { date: 'Fri', resolved: 189, pending: 38, new: 210 },
    { date: 'Sat', resolved: 142, pending: 45, new: 156 },
    { date: 'Sun', resolved: 128, pending: 42, new: 148 }
  ];

  const complaintCategories = [
    { name: 'Water Quality', value: 3542, percentage: 28 },
    { name: 'Waste Management', value: 2875, percentage: 23 },
    { name: 'Air Pollution', value: 2156, percentage: 17 },
    { name: 'Public Transport', value: 1893, percentage: 15 },
    { name: 'Green Spaces', value: 1267, percentage: 10 },
    { name: 'Energy', value: 887, percentage: 7 }
  ];

  const responseTimeTrends = [
    { month: 'Jan', avgHours: 48, target: 24 },
    { month: 'Feb', avgHours: 42, target: 24 },
    { month: 'Mar', avgHours: 38, target: 24 },
    { month: 'Apr', avgHours: 35, target: 24 },
    { month: 'May', avgHours: 28, target: 24 },
    { month: 'Jun', avgHours: 24, target: 24 },
    { month: 'Jul', avgHours: 22, target: 24 }
  ];

  const impactMetrics = [
    { metric: 'Trees Planted', value: '12,450', change: '+12%', icon: '🌳' },
    { metric: 'Water Saved (L)', value: '458K', change: '+8%', icon: '💧' },
    { metric: 'Waste Recycled (kg)', value: '34,200', change: '+15%', icon: '♻️' },
    { metric: 'Carbon Reduced (tons)', value: '156', change: '+18%', icon: '🌍' }
  ];

  const wardDistribution = [
    { ward: 'Ward 1', complaints: 450, resolved: 380 },
    { ward: 'Ward 2', complaints: 320, resolved: 290 },
    { ward: 'Ward 3', complaints: 580, resolved: 450 },
    { ward: 'Ward 4', complaints: 410, resolved: 350 },
    { ward: 'Ward 5', complaints: 290, resolved: 260 }
  ];

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Sustainable Cities Analytics
              </h1>
              <p className="text-gray-600">SDG 2030 Progress Tracking - Bhubaneswar</p>
              <p className="text-black-600 text-2xl font-bold"> (Most of the functionalities are in the admin dashboard)</p>
            </div>
            <div className="flex gap-3">
              {/* <button className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {selectedTimeRange === 'month' ? 'This Month' : 'This Week'}
              </button> */}
              <button className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs text-green-600 font-semibold flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{animatedValues.totalQueries.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Queries Received</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                style={{ width: '78%' }}></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs text-green-600 font-semibold flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{animatedValues.resolvedQueries.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm mt-1">Queries Resolved</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                style={{ width: '80%' }}></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-xs text-red-600 font-semibold flex items-center">
                <TrendingDown className="w-3 h-3 mr-1" />
                -5%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{animatedValues.pendingComplaints.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm mt-1">Pending Complaints</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                style={{ width: '20%' }}></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs text-green-600 font-semibold flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{animatedValues.impactScore}%</h3>
            <p className="text-gray-600 text-sm mt-1">Sustainability Score</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
                style={{ width: `${animatedValues.impactScore}%` }}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">SDG 2030 Progress</h2>
            <div className="space-y-4">
              {sdgProgress.map((goal, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-white shadow-sm">
                    {goal.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{goal.goal}</span>
                      <span className="text-sm font-bold" style={{ color: goal.color }}>
                        {goal.achieved}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${goal.achieved}%`,
                          background: `linear-gradient(90deg, ${goal.color}CC, ${goal.color})`
                        }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Query Resolution Timeline</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={queryTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Legend />
                <Bar dataKey="resolved" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="new" stroke="#3B82F6" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Complaints and Response Time */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Complaints by Category</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={complaintCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {complaintCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {complaintCategories.map((cat, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                    {cat.percentage}%
                  </div>
                  <span className="text-gray-600">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Response Time Improvement</h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={responseTimeTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="avgHours" stroke="#3B82F6" fill="#3B82F680" />
                <Area type="monotone" dataKey="target" stroke="#10B981" fill="#10B98140" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Community Impact and Ward Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Community Impact Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
              {impactMetrics.map((metric, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{metric.icon}</span>
                    <span className={`text-xs font-semibold ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {metric.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{metric.value}</h3>
                  <p className="text-sm text-gray-600 mt-1">{metric.metric}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Ward-wise Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={wardDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="ward" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Legend />
                <Bar dataKey="complaints" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Real-time Activity Feed</h2>
            <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
          <div className="space-y-3">
            {[
              { type: 'water', message: 'Water quality issue reported in Ward 3', time: '2 mins ago', status: 'new', icon: '💧' },
              { type: 'resolved', message: 'Waste management complaint resolved in Ward 1', time: '5 mins ago', status: 'resolved', icon: '✅' },
              { type: 'energy', message: 'Solar panel installation completed at Community Center', time: '12 mins ago', status: 'completed', icon: '⚡' },
              { type: 'health', message: 'Health camp scheduled for tomorrow in Ward 5', time: '18 mins ago', status: 'scheduled', icon: '🏥' },
              { type: 'education', message: 'Environmental awareness quiz completed by 234 users', time: '25 mins ago', status: 'info', icon: '📚' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${activity.status === 'new' ? 'bg-red-100 text-red-600' :
                    activity.status === 'resolved' ? 'bg-green-100 text-green-600' :
                      activity.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                        activity.status === 'scheduled' ? 'bg-amber-100 text-amber-600' :
                          'bg-gray-100 text-gray-600'
                  }`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.message}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;