export default function MetricCard({ title, value }: { title: string; value: number | string }) {
    return (
        <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-lg font-poppins text-slate-700 mb-2">{title}</h3>
            <p className="text-3xl font-bold text-[#6C00FF]">{value}</p>
        </div>
    );
}
