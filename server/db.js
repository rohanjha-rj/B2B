const mongoose = require('mongoose');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, default: 'User' }
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  region: { type: String, required: true },
  price: { type: String, required: true },
  supplier: { type: String, required: true }
});

const ReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  preview: { type: String, required: true },
  content: { type: String, required: true },
  isPremium: { type: Boolean, required: true }
});

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const Report = mongoose.model('Report', ReportSchema);

async function setupDB() {
  let URI = process.env.MONGO_URI;
  
  // Zero-Config Auto-Fallback to In-Memory MongoDB if Atlas string is missing
  if (!URI || URI.includes('<username>')) {
    console.log("\n==================================================");
    console.log("⚠️ No Atlas URI detected in .env!");
    console.log("🚀 Automatically spinning up Local MongoDB Memory Server...");
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    URI = mongoServer.getUri();
    console.log("==================================================\n");
  }

  await mongoose.connect(URI);
  console.log('MongoDB Connected successfully to:', URI.includes('mongodb.net') ? 'Atlas Cloud' : 'Local Memory Server');

  const userCount = await User.countDocuments();
  if (userCount < 2) {
    if (userCount === 0) {
      await User.create({ name: 'Admin', email: 'admin@krishicom.com', password: 'admin123', company: 'KRISHICOM', role: 'Admin' });
    }
    const sampleUsers = [
      { name: 'Rahul Sharma', email: 'rahul.s@agriventures.in', password: 'user123', company: 'AgriVentures India', role: 'User' },
      { name: 'Priya Patel', email: 'priya@gujaratfert.com', password: 'user123', company: 'Gujarat Fertilizer Traders', role: 'User' },
      { name: 'Vikram Singh', email: 'vsingh@kisan.net', password: 'user123', company: 'Kisan Supply Co.', role: 'User' }
    ];
    for (const u of sampleUsers) {
      const exists = await User.findOne({ email: u.email });
      if(!exists) await User.create(u);
    }
  }

  const prodCount = await Product.countDocuments();
  if (prodCount < 10) {
    await Product.deleteMany({});
    const productsData = [
      { name: 'Granular Urea 46% N', category: 'Urea', region: 'Kandla, Gujarat', price: '₹268/bag', supplier: 'National Fertilizers Ltd' },
      { name: 'Prilled Urea', category: 'Urea', region: 'Haldia, WB', price: '₹266/bag', supplier: 'IFFCO' },
      { name: 'Neem Coated Urea', category: 'Urea', region: 'JNPT, Mumbai', price: '₹280/bag', supplier: 'KRIBHCO' },
      { name: 'DAP 18:46:0 Standard', category: 'DAP', region: 'Vizag, AP', price: '₹1,350/bag', supplier: 'Coromandel Int.' },
      { name: 'DAP Premium Quality', category: 'DAP', region: 'Paradip, Odisha', price: '₹1,375/bag', supplier: 'Paradeep Phosphates' },
      { name: 'MOP 60% K2O Red', category: 'MOP', region: 'Mundra, Gujarat', price: '₹1,655/bag', supplier: 'Indian Potash Ltd' },
      { name: 'MOP 60% White', category: 'MOP', region: 'Chennai, TN', price: '₹1,680/bag', supplier: 'Madras Fertilizers' },
      { name: 'NPK 10:26:26', category: 'NPK', region: 'Paradip, Odisha', price: '₹1,470/bag', supplier: 'IFFCO' },
      { name: 'NPK 12:32:16', category: 'NPK', region: 'Kakinada, AP', price: '₹1,450/bag', supplier: 'Godavari Biorefineries' },
      { name: 'Sulphuric Acid 98%', category: 'Chemicals', region: 'JNPT, Mumbai', price: '₹4,800/t', supplier: 'Gujarat State Chem' },
      { name: 'Phosphoric Acid', category: 'Chemicals', region: 'Kandla, Gujarat', price: '₹55,200/t', supplier: 'GSFC' },
      { name: 'Ammonia Anhydrous', category: 'Chemicals', region: 'Dahej, Gujarat', price: '₹42,000/t', supplier: 'Reliance Industries' },
      { name: 'Zinc Sulphate', category: 'Chemicals', region: 'Pune, Maharashtra', price: '₹3,200/bag', supplier: 'Aries Agro' }
    ];
    await Product.insertMany(productsData);
  }

  const reportsCount = await Report.countDocuments();
  if (reportsCount === 0) {
      const reports = [
        { title: 'India Urea Import Cost Analysis FY27', date: '10 April 2026', preview: 'Rising global Urea prices are compressing the government’s subsidy budget...', content: 'Full report reveals exact procurement costs and DoF\'s expected revision to S&T norms for the upcoming Kharif season before May 15. The total burden is expected to exceed ₹1.8 Lakh Crore.', isPremium: true },
        { title: 'Kharif 2026 Outlook: Demand Surges', date: '25 March 2026', preview: 'Normal monsoon forecast drives expected 4% growth in fertilizer offtake...', content: 'State-wise breakdown shows UP, Maharashtra, MP, and Rajasthan will lead the demand surge, pushing total requirement to 34 MT.', isPremium: false },
        { title: 'China DAP Export Curbs Impact', date: '8 April 2026', preview: 'Extended phosphate controls force Indian importers to alternate sources...', content: 'CFR premiums at Vizag and Paradip have widened to ₹40,300/t. Alternatives from Saudi Arabia and Morocco are securing volume but at a ₹1,200/t premium to historical spreads.', isPremium: true }
      ];
      await Report.insertMany(reports);
  }
}

module.exports = { setupDB, User, Product, Report };
