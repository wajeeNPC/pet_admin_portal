import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyticsAPI } from '../services/api';
import {
  Building2,
  Users,
  PawPrint,
  FileText,
  TrendingUp,
  TrendingDown,
  ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const result = await analyticsAPI.getSystemStats();
      if (result.success) {
        setStats(result.data);
      } else {
        setError(result.message || 'Failed to fetch stats');
      }
    } catch (err) {
      setError(err.message || 'Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800">
        {error}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Adoption Centers',
      value: stats?.totalCenters || 0,
      icon: Building2,
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-600',
      change: stats?.centersGrowth || 0,
      link: '/centers'
    },
    {
      title: 'Center Users',
      value: stats?.totalCenterUsers || 0,
      icon: Users,
      color: 'from-gray-700 to-gray-800',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      change: stats?.usersGrowth || 0,
      link: '/users'
    },
    {
      title: 'Available Pets',
      value: stats?.totalPets || 0,
      icon: PawPrint,
      color: 'from-gray-900 to-black',
      bgColor: 'bg-gray-200',
      textColor: 'text-gray-900',
      change: stats?.petsGrowth || 0,
      link: '/centers'
    },
    {
      title: 'Applications',
      value: stats?.totalApplications || 0,
      icon: FileText,
      color: 'from-gray-600 to-gray-700',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700',
      change: stats?.applicationsGrowth || 0,
      link: '/analytics'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview of the Pet Adoption Platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change >= 0;

          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(stat.link)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                {stat.change !== 0 && (
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{Math.abs(stat.change)}%</span>
                  </div>
                )}
              </div>

              <div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/centers')}
            className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 hover:border-black hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-gray-600 group-hover:text-black" />
              <span className="font-medium text-gray-900">View All Centers</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black" />
          </button>

          <button
            onClick={() => navigate('/users')}
            className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 hover:border-black hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-600 group-hover:text-black" />
              <span className="font-medium text-gray-900">Manage Users</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black" />
          </button>

          <button
            onClick={() => navigate('/analytics')}
            className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 hover:border-black hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-gray-600 group-hover:text-black" />
              <span className="font-medium text-gray-900">View Analytics</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black" />
          </button>
        </div>
      </div>

      {/* Recent Activity Section (placeholder for future implementation) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="text-center py-8 text-gray-500">
          <p>Recent activity tracking coming soon...</p>
        </div>
      </div>
    </div>
  );
}
