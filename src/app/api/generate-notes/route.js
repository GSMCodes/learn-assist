// src/app/api/generate-notes/route.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import PDFDocument from 'pdfkit';
import { NextResponse } from 'next/server';
import fs from 'fs/promises'; // For file system operations (saving PDF and reading font)
import path from 'path'; // For path manipulation
import { v4 as uuidv4 } from 'uuid'; // To generate unique filenames

// Initialize AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Define the path to your font file
// process.cwd() gets the root of your Next.js project
const FONT_PATH = path.join(process.cwd(), 'src', 'assets', 'fonts', 'OpenSans-VariableFont_wdth,wght.ttf');
let fontBuffer = null; // To store the font data once read

export async function POST(req) {
  try {
    console.log("API route /api/generate-notes received request.");
    const { topics } = await req.json();
    console.log("Received topics:", topics);

    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      console.error("Validation error: No topics provided or topics format is incorrect.");
      return NextResponse.json({ error: 'No topics provided or topics format is incorrect.' }, { status: 400 });
    }

    // Read the font file once and store it
    if (!fontBuffer) {
      try {
        fontBuffer = await fs.readFile(FONT_PATH);
        console.log("Font loaded successfully from:", FONT_PATH);
      } catch (fontError) {
        console.error("ERROR: Failed to load font file:", FONT_PATH, fontError);
        return NextResponse.json({ error: 'Internal Server Error: Failed to load font for PDF.', details: fontError.message }, { status: 500 });
      }
    }

    const doc = new PDFDocument({
    font: null // This tells pdfkit NOT to load a default font initially
  });
    // Set the custom font directly
    doc.font(fontBuffer); // Use the buffer directly with .font()

    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));

    const pdfPromise = new Promise((resolve, reject) => {
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });
      doc.on('error', (err) => {
        console.error("PDFKit error during generation:", err);
        reject(err);
      });
    });

    doc.fontSize(24).text('LearnAssist Short Notes', { align: 'center' });
    doc.moveDown(2);

    for (const topic of topics) {
      console.log(`Processing topic: "${topic}"`);
      doc.fontSize(18).text(`Topic: ${topic}`, { underline: true });
      doc.moveDown(0.5);

      const prompt = `Provide concise, detailed short notes on the topic: "${topic}". Focus on key concepts, definitions, and essential information. Structure it clearly. Aim for 2-3 paragraphs.`;
      let aiText = "Could not retrieve notes for this topic.";

      try {
        console.log("Calling AI for topic:", topic);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        aiText = response.text();
        console.log(`AI response for "${topic}" received (length: ${aiText.length}).`);
      } catch (aiError) {
        console.error(`ERROR: AI content generation failed for topic "${topic}":`, aiError);
        aiText += ` (Error: ${aiError.message})`;
      }

      doc.fontSize(12).text(aiText);
      doc.moveDown(2);
    }

    doc.end();
    console.log("PDF generation finished, waiting for promise to resolve.");
    const finalPdfBuffer = await pdfPromise;
    console.log("PDF buffer obtained.");

    const filename = `${uuidv4()}.pdf`;
    const publicPdfPath = path.join(process.cwd(), 'public', 'pdfs', filename);

    try {
      console.log("Ensuring public/pdfs directory exists:", path.dirname(publicPdfPath));
      await fs.mkdir(path.dirname(publicPdfPath), { recursive: true });
      console.log("Writing PDF to:", publicPdfPath);
      await fs.writeFile(publicPdfPath, finalPdfBuffer);
      console.log("PDF successfully written to disk.");
    } catch (fsError) {
      console.error("ERROR: File system operation failed (mkdir or writeFile):", fsError);
      throw fsError; // Re-throw to be caught by outer catch block
    }

    const pdfUrl = `/pdfs/${filename}`;
    console.log("Returning PDF URL:", pdfUrl);
    return NextResponse.json({ pdfPath: pdfUrl }, { status: 200 });

  } catch (error) {
    console.error('Final Catch Block ERROR in API route:', error);
    return NextResponse.json({ error: 'Internal Server Error: Failed to generate notes or PDF.', details: error.message }, { status: 500 });
  }
}