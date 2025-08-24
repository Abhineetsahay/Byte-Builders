'use client'
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Star, FileText, CheckCircle, Award, User, Trophy, Users, Target } from 'lucide-react';

// Types
interface NgoData {
  rank: number;
  name: string;
  impactScore: number;
  activeCampaigns: number;
  resolvedIssues: number;
}

interface CitizenData {
  rank: number;
  name: string;
  impactScore: number;
  reportsFiled: number;
  issuesResolved: number;
}

type SortField = 'rank' | 'name' | 'impactScore' | 'activeCampaigns' | 'resolvedIssues' | 'reportsFiled' | 'issuesResolved';
type SortDirection = 'asc' | 'desc';

const CityHeroesDashboard = () => {
  const [ngoSortField, setNgoSortField] = useState<SortField>('rank');
  const [ngoSortDirection, setNgoSortDirection] = useState<SortDirection>('asc');
  const [citizenSortField, setCitizenSortField] = useState<SortField>('rank');
  const [citizenSortDirection, setCitizenSortDirection] = useState<SortDirection>('asc');

  const ngoData: NgoData[] = [
    {
      rank: 1,
      name: "Green Spaces Initiative",
      impactScore: 95,
      activeCampaigns: 12,
      resolvedIssues: 250
    },
    {
      rank: 2,
      name: "Community Clean-Up Crew",
      impactScore: 92,
      activeCampaigns: 10,
      resolvedIssues: 220
    },
    {
      rank: 3,
      name: "Urban Renewal Project",
      impactScore: 88,
      activeCampaigns: 8,
      resolvedIssues: 180
    },
    {
      rank: 4,
      name: "Neighborhood Watch Alliance",
      impactScore: 85,
      activeCampaigns: 7,
      resolvedIssues: 150
    },
    {
      rank: 5,
      name: "Youth Empowerment League",
      impactScore: 80,
      activeCampaigns: 5,
      resolvedIssues: 120
    }
  ];

  const citizenData: CitizenData[] = [
    {
      rank: 1,
      name: "Sophia Clark",
      impactScore: 98,
      reportsFiled: 30,
      issuesResolved: 150
    },
    {
      rank: 2,
      name: "Ethan Miller",
      impactScore: 96,
      reportsFiled: 28,
      issuesResolved: 140
    },
    {
      rank: 3,
      name: "Olivia Davis",
      impactScore: 94,
      reportsFiled: 25,
      issuesResolved: 130
    },
    {
      rank: 4,
      name: "Noah Wilson",
      impactScore: 92,
      reportsFiled: 22,
      issuesResolved: 120
    },
    {
      rank: 5,
      name: "Ava Martinez",
      impactScore: 90,
      reportsFiled: 20,
      issuesResolved: 110
    }
  ];

  const handleNgoSort = (field: SortField) => {
    if (ngoSortField === field) {
      setNgoSortDirection(ngoSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setNgoSortField(field);
      setNgoSortDirection('asc');
    }
  };

  const handleCitizenSort = (field: SortField) => {
    if (citizenSortField === field) {
      setCitizenSortDirection(citizenSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setCitizenSortField(field);
      setCitizenSortDirection('asc');
    }
  };

  const sortedNgoData = [...ngoData].sort((a, b) => {
    let aValue: any = a[ngoSortField as keyof NgoData];
    let bValue: any = b[ngoSortField as keyof NgoData];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (ngoSortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const sortedCitizenData = [...citizenData].sort((a, b) => {
    let aValue: any = a[citizenSortField as keyof CitizenData];
    let bValue: any = b[citizenSortField as keyof CitizenData];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (citizenSortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const NgoSortIcon: React.FC<{ field: SortField }> = ({ field }) => {
    if (ngoSortField !== field) return <ChevronUp className="w-4 h-4 opacity-30" />;
    return ngoSortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-yellow-600" /> : 
      <ChevronDown className="w-4 h-4 text-yellow-600" />;
  };

  const CitizenSortIcon: React.FC<{ field: SortField }> = ({ field }) => {
    if (citizenSortField !== field) return <ChevronUp className="w-4 h-4 opacity-30" />;
    return citizenSortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-orange-600" /> : 
      <ChevronDown className="w-4 h-4 text-orange-600" />;
  };

  const getRankBadge = (rank: number) => {
    const colors: Record<number, string> = {
      1: 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-yellow-300 shadow-lg',
      2: 'bg-gradient-to-r from-gray-300 to-gray-400 text-white border-gray-300 shadow-lg',
      3: 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-orange-300 shadow-lg',
    };
    
    return colors[rank] || 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-300';
  };

  const getImpactColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 90) return 'text-blue-600';
    return 'text-purple-600';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map((n: string) => n[0]).join('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">City Heroes and Top NGOs</h1>
            </div>
            <p className="text-yellow-100 text-lg">Recognizing outstanding organizations and citizens making our city better</p>
          </div>

          {/* Overall Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Top NGOs</p>
                  <p className="text-2xl font-bold text-gray-800">5</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-orange-600 text-sm font-medium">Active Heroes</p>
                  <p className="text-2xl font-bold text-gray-800">5</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-green-600 text-sm font-medium">Total Issues Resolved</p>
                  <p className="text-2xl font-bold text-gray-800">1,570</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Avg Impact Score</p>
                  <p className="text-2xl font-bold text-gray-800">91</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* NGO Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-yellow-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-6">
            <div className="flex items-center gap-3">
              <Trophy className="w-7 h-7 text-white" />
              <h2 className="text-2xl font-bold text-white">Top NGOs</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-yellow-100">
                    <th 
                      className="text-left py-4 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-yellow-50 transition-colors rounded-l-lg"
                      onClick={() => handleNgoSort('rank')}
                    >
                      <div className="flex items-center gap-2">
                        Rank
                        <NgoSortIcon field="rank" />
                      </div>
                    </th>
                    <th 
                      className="text-left py-4 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-yellow-50 transition-colors"
                      onClick={() => handleNgoSort('name')}
                    >
                      <div className="flex items-center gap-2">
                        NGO
                        <NgoSortIcon field="name" />
                      </div>
                    </th>
                    <th 
                      className="text-left py-4 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-yellow-50 transition-colors"
                      onClick={() => handleNgoSort('impactScore')}
                    >
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Impact Score
                        <NgoSortIcon field="impactScore" />
                      </div>
                    </th>
                    <th 
                      className="text-left py-4 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-yellow-50 transition-colors"
                      onClick={() => handleNgoSort('activeCampaigns')}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Active Campaigns
                        <NgoSortIcon field="activeCampaigns" />
                      </div>
                    </th>
                    <th 
                      className="text-left py-4 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-yellow-50 transition-colors rounded-r-lg"
                      onClick={() => handleNgoSort('resolvedIssues')}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Resolved Issues
                        <NgoSortIcon field="resolvedIssues" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedNgoData.map((ngo, index) => (
                    <tr 
                      key={ngo.name} 
                      className="border-b border-gray-100 hover:bg-yellow-50 transition-colors group"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold text-lg ${getRankBadge(ngo.rank)}`}>
                            {ngo.rank}
                          </span>
                          {ngo.rank <= 3 && <Trophy className="w-5 h-5 text-yellow-500" />}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                          {ngo.name}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-bold ${getImpactColor(ngo.impactScore)}`}>
                            {ngo.impactScore}
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                ngo.impactScore >= 90 ? 'bg-green-500' : 
                                ngo.impactScore >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${ngo.impactScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          {ngo.activeCampaigns}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {ngo.resolvedIssues}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Active Citizens Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-6">
            <div className="flex items-center gap-3">
              <Star className="w-7 h-7 text-yellow-300 fill-yellow-300" />
              <h2 className="text-2xl font-bold text-white">Active Citizens</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-orange-100">
                    <th 
                      className="text-left py-4 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-orange-50 transition-colors rounded-l-lg"
                      onClick={() => handleCitizenSort('rank')}
                    >
                      <div className="flex items-center gap-2">
                        Rank
                        <CitizenSortIcon field="rank" />
                      </div>
                    </th>
                    <th 
                      className="text-left py-4 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-orange-50 transition-colors"
                      onClick={() => handleCitizenSort('name')}
                    >
                      <div className="flex items-center gap-2">
                        Citizen
                        <CitizenSortIcon field="name" />
                      </div>
                    </th>
                    <th 
                      className="text-left py-4 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-orange-50 transition-colors"
                      onClick={() => handleCitizenSort('impactScore')}
                    >
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Impact Score
                        <CitizenSortIcon field="impactScore" />
                      </div>
                    </th>
                    <th 
                      className="text-left py-4 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-orange-50 transition-colors"
                      onClick={() => handleCitizenSort('reportsFiled')}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Reports Filed
                        <CitizenSortIcon field="reportsFiled" />
                      </div>
                    </th>
                    <th 
                      className="text-left py-4 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-orange-50 transition-colors rounded-r-lg"
                      onClick={() => handleCitizenSort('issuesResolved')}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Issues Resolved
                        <CitizenSortIcon field="issuesResolved" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCitizenData.map((citizen, index) => (
                    <tr 
                      key={citizen.name} 
                      className="border-b border-gray-100 hover:bg-orange-50 transition-all duration-200 group"
                    >
                      <td className="py-5 px-4">
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold text-lg ${getRankBadge(citizen.rank)}`}>
                            {citizen.rank}
                          </span>
                          {citizen.rank <= 3 && (
                            <div className="flex flex-col items-center">
                              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                              {citizen.rank === 1 && <span className="text-xs text-yellow-600 font-semibold">HERO</span>}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {getInitials(citizen.name)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                              {citizen.name}
                            </div>
                            <div className="text-sm text-gray-500">Active Citizen</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-4">
                        <div className="flex items-center gap-3">
                          <span className={`text-2xl font-bold ${getImpactColor(citizen.impactScore)}`}>
                            {citizen.impactScore}
                          </span>
                          <div className="w-20 bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full transition-all duration-700 ${
                                citizen.impactScore >= 95 ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                                citizen.impactScore >= 90 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 
                                'bg-gradient-to-r from-orange-500 to-orange-600'
                              }`}
                              style={{ width: `${citizen.impactScore}%` }}
                            ></div>
                          </div>
                          {citizen.impactScore >= 95 && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                              Excellent
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            {citizen.reportsFiled}
                          </span>
                          <FileText className="w-4 h-4 text-yellow-500" />
                        </div>
                      </td>
                      <td className="py-5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 font-semibold">
                            {citizen.issuesResolved}
                          </span>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Hero Spotlight */}
            <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <h3 className="text-lg font-semibold text-gray-800">Hero of the Month</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  SC
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">Sophia Clark</h4>
                  <p className="text-gray-600">Outstanding community engagement with 98 impact score and 150 resolved issues!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityHeroesDashboard;