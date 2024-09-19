export default function StatCard({ title, value }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    )
  }