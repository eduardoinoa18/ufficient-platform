export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%' },
    { label: 'Active Today', value: '456', change: '+8%' },
    { label: 'Tasks Completed', value: '12,345', change: '+15%' },
    { label: 'Badges Earned', value: '789', change: '+23%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Overview of UFFICIENT app metrics and user activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              {stat.label}
            </h3>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <span className="text-sm font-medium text-green-600">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Users
          </h2>
          <div className="space-y-3">
            {[
              { name: 'John Doe', email: 'john@example.com', joined: '2 hours ago' },
              { name: 'Jane Smith', email: 'jane@example.com', joined: '5 hours ago' },
              { name: 'Mike Johnson', email: 'mike@example.com', joined: '1 day ago' },
            ].map((user) => (
              <div key={user.email} className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <span className="text-sm text-gray-400">{user.joined}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            System Health
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">API Response Time</span>
              <span className="text-green-600 font-medium">125ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Database Status</span>
              <span className="text-green-600 font-medium">Healthy</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">AI Service</span>
              <span className="text-green-600 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
