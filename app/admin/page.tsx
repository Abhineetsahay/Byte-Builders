'use client'
import React, { useState } from 'react';
import {
  Users,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Settings,
  Shield,
  BarChart3,
  FileText,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

// Mock data for admin dashboard
const mockStats = {
  totalUsers: 2547,
  activeUsers: 1893,
  totalIssues: 892,
  resolvedIssues: 756,
  pendingIssues: 136,
  totalNGOs: 45,
  activeNGOs: 38,
  monthlyGrowth: 12.5
};

const mockRecentUsers = [
  { id: 1, name: 'Sophia Clark', email: 'sophia@example.com', status: 'active', joinDate: '2024-01-15', lastActive: '2 hours ago' },
  { id: 2, name: 'Ethan Miller', email: 'ethan@example.com', status: 'active', joinDate: '2024-01-14', lastActive: '1 day ago' },
  { id: 3, name: 'Olivia Davis', email: 'olivia@example.com', status: 'inactive', joinDate: '2024-01-13', lastActive: '1 week ago' },
  { id: 4, name: 'Noah Wilson', email: 'noah@example.com', status: 'active', joinDate: '2024-01-12', lastActive: '3 hours ago' },
  { id: 5, name: 'Ava Martinez', email: 'ava@example.com', status: 'suspended', joinDate: '2024-01-11', lastActive: '2 days ago' }
];

const mockRecentIssues = [
  { id: 1, title: 'Broken Street Light', category: 'electricity', status: 'pending', priority: 'high', reportedBy: 'Sophia Clark', date: '2024-01-15' },
  { id: 2, title: 'Garbage Pile', category: 'waste', status: 'in-progress', priority: 'medium', reportedBy: 'Ethan Miller', date: '2024-01-14' },
  { id: 3, title: 'Water Leak', category: 'water', status: 'resolved', priority: 'high', reportedBy: 'Olivia Davis', date: '2024-01-13' },
  { id: 4, title: 'Road Pothole', category: 'roads', status: 'pending', priority: 'low', reportedBy: 'Noah Wilson', date: '2024-01-12' }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const StatCard = ({ title, value, icon: Icon, change, color }: any) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeTab === id
          ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg'
          : 'text-gray-600 hover:bg-yellow-50 hover:text-gray-800'
        }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600">Manage your City Pulse platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-yellow-50 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-yellow-50 rounded-lg transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Route Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200 hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                  <i className="fas fa-home text-white text-lg"></i>
                </div>
                <i className="fas fa-arrow-right text-yellow-400 group-hover:translate-x-1 transition-transform duration-300"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Landing Page</h3>
              <p className="text-sm text-gray-600">Go to main landing page</p>
            </div>
          </Link>

          <Link href="/Login" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200 hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-sign-in-alt text-white text-lg"></i>
                </div>
                <i className="fas fa-arrow-right text-blue-400 group-hover:translate-x-1 transition-transform duration-300"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Login</h3>
              <p className="text-sm text-gray-600">User authentication page</p>
            </div>
          </Link>

          <Link href="/food-donation" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200 hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-heart text-white text-lg"></i>
                </div>
                <i className="fas fa-arrow-right text-green-400 group-hover:translate-x-1 transition-transform duration-300"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Food Donation</h3>
              <p className="text-sm text-gray-600">Manage food donations</p>
            </div>
          </Link>

          <Link href="/NGO" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200 hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-users text-white text-lg"></i>
                </div>
                <i className="fas fa-arrow-right text-purple-400 group-hover:translate-x-1 transition-transform duration-300"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">NGO Dashboard</h3>
              <p className="text-sm text-gray-600">View NGO rankings and stats</p>
            </div>
          </Link>
        </div>

        {/* Additional Route Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/Report-issue" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200 hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-exclamation-triangle text-white text-lg"></i>
                </div>
                <i className="fas fa-arrow-right text-red-400 group-hover:translate-x-1 transition-transform duration-300"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Report Issue</h3>
              <p className="text-sm text-gray-600">Report community issues</p>
            </div>
          </Link>

          <Link href="/dashboard" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200 hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-white text-lg"></i>
                </div>
                <i className="fas fa-arrow-right text-indigo-400 group-hover:translate-x-1 transition-transform duration-300"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Normal Dashboard</h3>
              <p className="text-sm text-gray-600">View analytics and metrics</p>
            </div>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={mockStats.totalUsers.toLocaleString()}
            icon={Users}
            change={mockStats.monthlyGrowth}
            color="bg-gradient-to-br from-yellow-400 to-orange-400"
          />
          <StatCard
            title="Active Issues"
            value={mockStats.totalIssues}
            icon={AlertTriangle}
            color="bg-gradient-to-br from-red-400 to-red-500"
          />
          <StatCard
            title="Resolved Issues"
            value={mockStats.resolvedIssues}
            icon={CheckCircle}
            color="bg-gradient-to-br from-green-400 to-green-500"
          />
          <StatCard
            title="Total NGOs"
            value={mockStats.totalNGOs}
            icon={TrendingUp}
            color="bg-gradient-to-br from-blue-400 to-blue-500"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-yellow-200 mb-8">
          <div className="flex flex-wrap gap-2">
            <TabButton id="overview" label="Overview" icon={BarChart3} />
            <TabButton id="users" label="User Management" icon={Users} />
            <TabButton id="issues" label="Issue Tracking" icon={AlertTriangle} />
            <TabButton id="ngos" label="NGO Management" icon={TrendingUp} />
            <TabButton id="reports" label="Reports" icon={FileText} />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {mockRecentIssues.slice(0, 3).map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-800">{issue.title}</p>
                        <p className="text-sm text-gray-600">Reported by {issue.reportedBy}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-yellow-200 overflow-hidden">
            <div className="p-6 border-b border-yellow-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">User Management</h3>
                <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add User
                </button>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-yellow-200 rounded-lg focus:border-yellow-400 focus:ring-yellow-400"
                  />
                </div>
                <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-yellow-50 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-yellow-50 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">User</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">Join Date</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">Last Active</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-yellow-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{user.joinDate}</td>
                      <td className="py-4 px-6 text-gray-600">{user.lastActive}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'issues' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-yellow-200 overflow-hidden">
            <div className="p-6 border-b border-yellow-100">
              <h3 className="text-xl font-semibold text-gray-800">Issue Tracking</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">Issue</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">Category</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">Priority</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">Reported By</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecentIssues.map((issue) => (
                    <tr key={issue.id} className="border-b border-gray-100 hover:bg-yellow-50 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-medium text-gray-800">{issue.title}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                          {issue.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                          {issue.priority}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                          {issue.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{issue.reportedBy}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'ngos' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">NGO Management</h3>
            <p className="text-gray-600">management features coming soon...</p>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Reports & Analytics</h3>
            <p className="text-gray-600">Advanced reporting features coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
