interface StatCardProps {
   label: string;
   value: string | number;
}

export function StatCard({ label, value }: StatCardProps) {
   return (
     <div className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-md border border-white/30">
       <div className="text-sm text-gray-600 uppercase tracking-wide">{label}</div>
       <div className="mt-2 text-3xl font-bold text-orange-500">{value}</div>
     </div>
   );
 }