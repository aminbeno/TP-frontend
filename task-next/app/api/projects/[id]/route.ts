import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

interface Project {
  id: string;
  name: string;
  color: string;
}

interface DB {
  projects: Project[];
}

function readDB(): DB {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ projects: [] }, null, 2));
  }
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

function writeDB(data: DB) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const db = readDB();
  const project = db.projects.find(p => p.id === id);

  if (project) {
    return NextResponse.json(project);
  } else {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json();
  const db = readDB();
  const projectIndex = db.projects.findIndex(p => p.id === id);

  if (projectIndex !== -1) {
    db.projects[projectIndex] = {
      ...db.projects[projectIndex],
      name: body.name,
      color: body.color || db.projects[projectIndex].color,
    };
    writeDB(db);
    return NextResponse.json(db.projects[projectIndex]);
  } else {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const db = readDB();
  const initialLength = db.projects.length;
  db.projects = db.projects.filter(p => p.id !== id);

  if (db.projects.length < initialLength) {
    writeDB(db);
    return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }
}
