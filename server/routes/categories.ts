import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth, adminAuth } from '../middleware/auth';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

const categorySchema = z.object({
  name: z.string().min(2),
  icon: z.string().min(1),
  slug: z.string().min(2)
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { restaurants: true }
        }
      }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
});

// Create category (admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const validatedData = categorySchema.parse(req.body);
    const category = await prisma.category.create({
      data: validatedData
    });
    res.status(201).json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Error creating category' });
  }
});

// Update category (admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = categorySchema.parse(req.body);
    
    const category = await prisma.category.update({
      where: { id },
      data: validatedData
    });
    
    res.json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Error updating category' });
  }
});

// Delete category (admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
});

export default router;