import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Resolve shared configs/landingPageConfig.json from monorepo root
const CONFIG_PATH = path.join(process.cwd(), '..', '..', 'configs', 'landingPageConfig.json');

export async function GET() {
    try {
        const configData = fs.readFileSync(CONFIG_PATH, 'utf8');
        const config = JSON.parse(configData);
        return NextResponse.json(config);
    } catch (error) {
        console.error('Failed to read landing page config:', error);
        return NextResponse.json({ error: 'Failed to load configuration' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body || typeof body !== 'object') {
            return NextResponse.json({ error: 'Invalid configuration data' }, { status: 400 });
        }
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(body, null, 2));
        return NextResponse.json({ success: true, message: 'Configuration updated successfully' });
    } catch (error) {
        console.error('Failed to save landing page config:', error);
        return NextResponse.json({ error: 'Failed to save configuration' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { section, field, value } = body ?? {};
        if (!section || !field) {
            return NextResponse.json({ error: 'Section and field are required' }, { status: 400 });
        }
        const configData = fs.readFileSync(CONFIG_PATH, 'utf8');
        const config = JSON.parse(configData);
        if (!config[section]) config[section] = {};
        config[section][field] = value;
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
        return NextResponse.json({ success: true, message: 'Configuration field updated successfully' });
    } catch (error) {
        console.error('Failed to update landing page config:', error);
        return NextResponse.json({ error: 'Failed to update configuration' }, { status: 500 });
    }
}
