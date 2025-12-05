import { NextRequest, NextResponse } from 'next/server';
import { writeFile, appendFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    
    // Créer le contenu à enregistrer
    const content = `Nom: ${name}\nEmail: ${email}\nMessage: ${message}\nDate: ${new Date().toLocaleString()}\n\n---\n\n`;
    
    // Chemin du fichier dans le dossier data à la racine du projet
    const filePath = join(process.cwd(), 'data', 'contacts.txt');
    
    // Ajouter le contenu au fichier (créer le fichier s'il n'existe pas)
    await appendFile(filePath, content, 'utf8');
    
    return NextResponse.json({ success: true, message: 'Message enregistré avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors de l\'enregistrement' }, { status: 500 });
  }
}
