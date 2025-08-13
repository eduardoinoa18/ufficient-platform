import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../lib/firebase-admin';

export async function GET(request: NextRequest) {
    try {
        if (!adminDb) {
            return NextResponse.json({
                totalUsers: 0,
                activeUsers7d: 0,
                proUsers: 0,
                averageTasksPerUser: 0,
                streakLeaders: 0,
                monthlyRevenue: 0,
                taskCategories: [
                    { name: 'Work', percentage: 0 },
                    { name: 'Personal', percentage: 0 },
                    { name: 'Fitness', percentage: 0 },
                    { name: 'Side Hustle', percentage: 0 },
                    { name: 'Social', percentage: 0 }
                ],
                recentActivity: [],
                lastUpdated: new Date().toISOString(),
                status: 'operational'
            });
        }

        const usersSnap = await adminDb.collection('users').get();
        const tasksSnap = await adminDb.collection('tasks').get();

        const totalUsers = usersSnap.size;
        const totalTasks = tasksSnap.size;
        const averageTasksPerUser = totalUsers > 0 ? Number((totalTasks / totalUsers).toFixed(2)) : 0;

        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const activeUsers7d = usersSnap.docs.filter((d: any) => {
            const lastActiveAt = d.data().lastActiveAt?.toDate?.() || d.data().lastActiveAt;
            return lastActiveAt && new Date(lastActiveAt) >= sevenDaysAgo;
        }).length;

        const proUsers = usersSnap.docs.filter((d: any) => d.data().plan === 'pro').length;

        const categoryCounts: Record<string, number> = {};
        tasksSnap.docs.forEach((d: any) => {
            const c = d.data().category || 'Personal';
            categoryCounts[c] = (categoryCounts[c] || 0) + 1;
        });
        const categories = ['Work', 'Personal', 'Fitness', 'Side Hustle', 'Social'];
        const totalCategory = Object.values(categoryCounts).reduce((a, b) => a + b, 0) || 1;
        const taskCategories = categories.map((c) => ({ name: c, percentage: Math.round(((categoryCounts[c] || 0) / totalCategory) * 100) }));

        const recentActivity = tasksSnap.docs
            .slice(0, 10)
            .map((d: any) => ({ id: d.id, title: d.data().title, userId: d.data().userId, createdAt: d.data().createdAt }));

        return NextResponse.json({
            totalUsers,
            activeUsers7d,
            proUsers,
            averageTasksPerUser,
            streakLeaders: 0,
            monthlyRevenue: 0,
            taskCategories,
            recentActivity,
            lastUpdated: new Date().toISOString(),
            status: 'operational'
        });
    } catch (error) {
        console.error('Metrics error:', error);
        return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
    }
}
