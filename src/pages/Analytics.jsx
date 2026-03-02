import { BarChart3 } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">
          Platform-wide analytics and insights
        </p>
      </div>

      {/* Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Analytics Dashboard Coming Soon
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Detailed analytics including adoption trends, center performance metrics, 
            user engagement statistics, and more will be available here.
          </p>
        </div>
      </div>
    </div>
  );
}
