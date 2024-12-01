import { ProfileCompletion } from '@/components/ProfileCompletion'

export default function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Welcome to your Dashboard!</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Complete Your Profile</h2>
        <ProfileCompletion />
      </div>
    </div>
  )
}

