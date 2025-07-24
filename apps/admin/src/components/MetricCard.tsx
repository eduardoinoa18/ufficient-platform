'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MetricCardProps {
    title: string;
    value: number | string;
    change?: string;
    icon?: ReactNode;
    gradient?: string;
}

export default function MetricCard({ title, value, change, icon, gradient }: MetricCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient || 'from-[#6C00FF] to-[#4CD7F8]'}`}>
                    {icon || <div className="w-6 h-6 bg-white rounded opacity-80"></div>}
                </div>
                {change && (
                    <span className={`text-sm font-semibold px-2 py-1 rounded-full ${change.startsWith('+')
                            ? 'text-[#00D27F] bg-green-50'
                            : 'text-red-500 bg-red-50'
                        }`}>
                        {change}
                    </span>
                )}
            </div>

            <h3 className="text-sm font-poppins font-medium text-slate-600 mb-2">{title}</h3>
            <p className="text-3xl font-montserrat font-bold text-[#29006E] mb-1">{value}</p>
        </motion.div>
    );
}
