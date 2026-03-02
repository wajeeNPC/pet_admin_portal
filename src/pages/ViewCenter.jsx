import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { centersAPI } from '../services/api';
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  PawPrint,
  FileText,
  Ban,
  CheckCircle,
  Trash2
} from 'lucide-react';

export default function ViewCenter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [center, setCenter] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      fetchCenterDetails();
      fetchCenterStats();
    }
  }, [id]);

  const fetchCenterDetails = async () => {
    try {
      setLoading(true);
      const result = await centersAPI.getCenterById(id);
      if (result.success) {
        setCenter(result.data);
      } else {
        setError(result.message || 'Failed to fetch center details');
      }
    } catch (err) {
      setError(err.message || 'Failed to load center details');
    } finally {
      setLoading(false);
    }
  };

  const fetchCenterStats = async () => {
    try {
      const result = await centersAPI.getCenterStats(id);
      if (result.success) {
        setStats(result.data);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const handleSuspend = async () => {
    if (!confirm('Are you sure you want to suspend this center?')) return;

    try {
      const result = await centersAPI.suspendCenter(id);
      if (result.success) {
        fetchCenterDetails();
      } else {
        alert(result.message || 'Failed to suspend center');
      }
    } catch (err) {
      alert(err.message || 'Failed to suspend center');
    }
  };

  const handleReactivate = async () => {
    if (!confirm('Are you sure you want to reactivate this center?')) return;

    try {
      const result = await centersAPI.reactivateCenter(id);
      if (result.success) {
        fetchCenterDetails();
      } else {
        alert(result.message || 'Failed to reactivate center');
      }
    } catch (err) {
      alert(err.message || 'Failed to reactivate center');
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        'Are you sure you want to DELETE this center? This action cannot be undone and will delete all associated data.'
      )
    ) {
      return;
    }

    try {
      const result = await centersAPI.deleteCenter(id);
      if (result.success) {
        alert('Center deleted successfully');
        navigate('/centers');
      } else {
        alert(result.message || 'Failed to delete center');
      }
    } catch (err) {
      alert(err.message || 'Failed to delete center');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !center) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate('/centers')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Centers
        </button>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800">
          {error || 'Center not found'}
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'suspended':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/centers')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Centers
      </button>

      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <Building2 className="w-8 h-8 text-gray-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{center.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    center.status
                  )}`}
                >
                  {center.status}
                </span>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(center.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {center.status === 'active' && (
              <button
                onClick={handleSuspend}
                className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Ban className="w-4 h-4" />
                Suspend
              </button>
            )}
            {center.status === 'suspended' && (
              <button
                onClick={handleReactivate}
                className="flex items-center gap-2 px-4 py-2 text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Reactivate
              </button>
            )}
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-900">{center.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm font-medium text-gray-900">{center.phoneNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-medium text-gray-900">
                {center.address?.city}, {center.address?.province}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Users className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.userCount || 0}</p>
                <p className="text-sm text-gray-600">Staff Members</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-200 rounded-lg">
                <PawPrint className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.petCount || 0}</p>
                <p className="text-sm text-gray-600">Available Pets</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <FileText className="w-6 h-6 text-gray-800" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.applicationCount || 0}</p>
                <p className="text-sm text-gray-600">Applications</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('address')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'address'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Address Details
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                <p className="text-gray-900">{center.description || 'No description provided'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Website</h3>
                <p className="text-gray-900">{center.website || 'Not provided'}</p>
              </div>
            </div>
          )}

          {activeTab === 'address' && center.address && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Street Address</h3>
                  <p className="text-gray-900">{center.address.street || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">City</h3>
                  <p className="text-gray-900">{center.address.city || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Province</h3>
                  <p className="text-gray-900">{center.address.province || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Postal Code</h3>
                  <p className="text-gray-900">{center.address.postalCode || 'N/A'}</p>
                </div>
              </div>
              {center.location && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Coordinates</h3>
                  <p className="text-gray-900">
                    Latitude: {center.location.coordinates[1]}, Longitude:{' '}
                    {center.location.coordinates[0]}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
