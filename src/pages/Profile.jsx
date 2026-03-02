import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { User, Mail, Shield, Key, AlertCircle, CheckCircle } from 'lucide-react';

export default function Profile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const result = await authAPI.getProfile();
      if (result.success) {
        setAdmin(result.data);
      } else {
        setError(result.message || 'Failed to load profile');
      }
    } catch (err) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    try {
      setChangingPassword(true);
      const result = await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (result.success) {
        setPasswordSuccess('Password changed successfully');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        setPasswordError(result.message || 'Failed to change password');
      }
    } catch (err) {
      setPasswordError(err.message || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !admin) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800">
        {error || 'Failed to load profile'}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your platform admin account</p>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Account Information</h2>

        <div className="space-y-6">
          {/* Name */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <User className="w-5 h-5 text-gray-900" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
              <p className="text-gray-900 font-medium">
                {admin.firstName} {admin.lastName}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-800" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <p className="text-gray-900 font-medium">{admin.email}</p>
            </div>
          </div>

          {/* Admin Status */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-200 rounded-lg">
              <Shield className="w-5 h-5 text-gray-900" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-500 mb-1">Admin Type</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-medium">
                  {admin.isSuperAdmin ? 'Super Admin' : 'Admin'}
                </span>
                {admin.isSuperAdmin && (
                  <span className="px-2 py-0.5 bg-black text-white text-xs font-medium rounded">
                    Full Access
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5 text-gray-700" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-500 mb-2">Permissions</label>
              <div className="flex flex-wrap gap-2">
                {admin.permissions?.map((permission) => (
                  <span
                    key={permission}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
                  >
                    {permission.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          {passwordError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{passwordError}</p>
            </div>
          )}

          {passwordSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">{passwordSuccess}</p>
            </div>
          )}

          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, currentPassword: e.target.value })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
              }
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={changingPassword}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {changingPassword ? 'Changing Password...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
