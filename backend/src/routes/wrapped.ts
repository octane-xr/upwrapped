import express from 'express';
import { z } from 'zod';
import { generateWrapped } from '../services/wrappedService';
import { generatePDF } from '../services/pdfService';
import type { WrappedRequest } from '../types';

const router = express.Router();


const wrappedRequestSchema = z.object({
  username: z.string().min(1).max(100).trim(),
  password: z.string().min(1).max(100),
  year: z.number().int().min(2000).max(new Date().getFullYear()).optional(),
});


router.post('/', async (req, res, next) => {
  try {

    const validationResult = wrappedRequestSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: validationResult.error.errors,
      });
    }

    const request: WrappedRequest = validationResult.data;


    const wrappedData = await generateWrapped(request);

    res.json(wrappedData);
  } catch (error: any) {

    if (error.message?.includes('credenciales')) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    
    if (error.message?.includes('disponible') || error.message?.includes('timeout')) {
      return res.status(503).json({ 
        error: 'MyUP no está disponible en este momento. Por favor, probá más tarde.' 
      });
    }

    next(error);
  }
});


router.post('/pdf', async (req, res, next) => {
  try {
    const validationResult = wrappedRequestSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: validationResult.error.errors,
      });
    }

    const request: WrappedRequest = validationResult.data;


    const wrappedData = await generateWrapped(request);


    const pdfBuffer = await generatePDF(wrappedData);


    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="UPWrapped-${request.year || new Date().getFullYear()}.pdf"`);
    res.send(pdfBuffer);
  } catch (error: any) {
    if (error.message?.includes('credenciales')) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    
    if (error.message?.includes('disponible') || error.message?.includes('timeout')) {
      return res.status(503).json({ 
        error: 'MyUP no está disponible en este momento. Por favor, probá más tarde.' 
      });
    }

    next(error);
  }
});

export default router;

