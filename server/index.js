require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { setupDB, User, Product, Report } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

setupDB().catch(err => {
  console.error("MongoDB Setup Error:", err);
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, company, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Email already exists' });
    
    const newUser = await User.create({ name, email, password, company, role: role || 'User' });
    res.json({ success: true, user: { id: newUser._id, name: newUser.name, email: newUser.email, company: newUser.company, role: newUser.role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, company: user.company, role: user.role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/auth/profile', async (req, res) => {
  const { id, name, email, password, company } = req.body;
  try {
    const updateData = { name, email, company };
    if (password) updateData.password = password;
    
    const existing = await User.findOne({ email, _id: { $ne: id } });
    if (existing) return res.status(400).json({ success: false, message: 'Email already mapped to an existing user.' });

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) return res.status(404).json({ success: false, message: 'User configuration invalid or expired.' });
    
    res.json({ success: true, user: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, company: updatedUser.company, role: updatedUser.role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products.map(p => ({ id: p._id, name: p.name, category: p.category, region: p.region, price: p.price, supplier: p.supplier })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/reports', async (req, res) => {
  try {
    const reports = await Report.find({});
    res.json(reports.map(r => ({ id: r._id, title: r.title, date: r.date, preview: r.preview, content: r.content, isPremium: r.isPremium })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/dashboard', async (req, res) => {
  try {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      urea: [24800, 25200, 25400, 26000, 26200, 26000],
      dap: [38000, 39500, 39700, 40000, 40500, 40300]
    };
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
