const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../helpers/dataStore');
const { v4: uuidv4 } = require('uuid');

// GET /api/equipment
router.get('/', async (req, res) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// POST /api/equipment
router.post('/', async (req, res) => {
  try {
    const { name, type, status, lastCleanedDate } = req.body;
    if (!name || !type || !status) return res.status(400).json({ error: 'Name, type and status are required' });
    const data = await readData();
    const newItem = { id: uuidv4(), name, type, status, lastCleanedDate: lastCleanedDate || null };
    data.push(newItem);
    await writeData(data);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create equipment' });
  }
});

// PUT /api/equipment/:id
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, type, status, lastCleanedDate } = req.body;
    if (!name || !type || !status) return res.status(400).json({ error: 'Name, type and status are required' });
    const data = await readData();
    const idx = data.findIndex((d) => d.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    data[idx] = { ...data[idx], name, type, status, lastCleanedDate: lastCleanedDate || null };
    await writeData(data);
    res.json(data[idx]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update equipment' });
  }
});

// DELETE /api/equipment/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await readData();
    const filtered = data.filter((d) => d.id !== id);
    if (filtered.length === data.length) return res.status(404).json({ error: 'Not found' });
    await writeData(filtered);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete equipment' });
  }
});

module.exports = router;
