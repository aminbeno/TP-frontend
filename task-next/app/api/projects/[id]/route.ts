import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id, 10);

    if (isNaN(projectId)) {
      return NextResponse.json({ message: 'ID de projet invalide' }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ message: 'Projet non trouvé' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('GET Project Error:', error);
    return NextResponse.json({ message: 'Erreur lors de la récupération' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id, 10);

    if (isNaN(projectId)) {
      return NextResponse.json({ message: 'ID de projet invalide' }, { status: 400 });
    }

    const body = await request.json();

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        name: body.name,
        color: body.color,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('PUT Project Error:', error);
    return NextResponse.json({ message: 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id, 10);

    if (isNaN(projectId)) {
      return NextResponse.json({ message: 'ID de projet invalide' }, { status: 400 });
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json({ message: 'Projet supprimé' });
  } catch (error) {
    console.error('DELETE Project Error:', error);
    return NextResponse.json({ message: 'Erreur lors de la suppression' }, { status: 500 });
  }
}
