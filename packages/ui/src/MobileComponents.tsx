import React from 'react';
import { CheckCircle, Clock, Trophy, Flame } from 'lucide-react';
import { clsx } from 'clsx';

interface TaskCardProps {
    id: string;
    title: string;
    completed: boolean;
    streak: number;
    onToggle: (id: string) => void;
    className?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({
    id,
    title,
    completed,
    streak,
    onToggle,
    className
}) => {
    return (
        <div className={clsx(
            "bg-white rounded-lg shadow-md p-4 transition-all duration-200",
            "hover:shadow-lg active:scale-95",
            className
        )}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onToggle(id)}
                        className={clsx(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                            completed
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-300 hover:border-purple-500'
                        )}
                    >
                        {completed && <CheckCircle className="w-4 h-4" />}
                    </button>
                    <div>
                        <p className={clsx(
                            "font-medium",
                            completed ? 'line-through text-gray-500' : 'text-gray-800'
                        )}>
                            {title}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-orange-600">
                            <Flame className="w-3 h-3" />
                            <span>{streak} day streak</span>
                        </div>
                    </div>
                </div>
                <Clock className="w-5 h-5 text-gray-400" />
            </div>
        </div>
    );
};

interface ProgressCardProps {
    completedTasks: number;
    totalTasks: number;
    currentStreak: number;
    totalPoints: number;
    className?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
    completedTasks,
    totalTasks,
    currentStreak,
    totalPoints,
    className
}) => {
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <div className={clsx(
            "bg-white rounded-xl shadow-lg p-4",
            className
        )}>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Today's Progress</h2>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Tasks Completed</span>
                <span className="text-sm font-medium">{completedTasks}/{totalTasks}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div
                    className="bg-gradient-to-r from-purple-500 to-cyan-400 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-purple-600">
                    <Trophy className="w-4 h-4" />
                    <span>{totalPoints} Points</span>
                </div>
                <div className="flex items-center gap-1 text-orange-600">
                    <Flame className="w-4 h-4" />
                    <span>{currentStreak} Day Streak</span>
                </div>
            </div>
        </div>
    );
};

interface BadgeCardProps {
    id: string;
    name: string;
    description: string;
    icon: string;
    earned: boolean;
    className?: string;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({
    name,
    description,
    icon,
    earned,
    className
}) => {
    return (
        <div className={clsx(
            "bg-white rounded-lg shadow-md p-4 transition-all duration-200",
            !earned && "opacity-50",
            earned && "hover:shadow-lg",
            className
        )}>
            <div className="text-3xl mb-2">{icon}</div>
            <h3 className="font-semibold text-gray-800 text-sm">{name}</h3>
            <p className="text-xs text-gray-600">{description}</p>
            {earned && <div className="mt-2 text-xs text-green-600 font-medium">Earned!</div>}
        </div>
    );
};

interface MobileHeaderProps {
    title: string;
    subtitle: string;
    currentStreak: number;
    className?: string;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
    title,
    subtitle,
    currentStreak,
    className
}) => {
    return (
        <div className={clsx(
            "bg-purple-500 text-white p-4 shadow-lg",
            className
        )}>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-purple-100">{subtitle}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-purple-100">Current Streak</p>
                    <div className="flex items-center justify-end gap-1">
                        <Flame className="w-5 h-5 text-orange-400" />
                        <span className="text-xl font-bold">{currentStreak}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
