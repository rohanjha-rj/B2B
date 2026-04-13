# KRISHICOM — B2B Agri-Commodity Trading & Intelligence

KRISHICOM is India's premier B2B intelligence platform for the fertilizer and agri-commodity ecosystem. It provides real-time market benchmarks, verified marketplace listings, and expert-driven intelligence reports.

## 🚀 Recent Feature Overhaul

### 💼 Multi-Role Registration (Buyer & Seller)
- **Buyer Registration**: Seamless access to market reports, pricing benchmarks, and inquiry instruments.
- **Seller Registration**: Authorized access for manufacturers and importers to list commodities and receive direct B2B inquiries.
- **Role-Based Badges**: Professional visual identification for Buyers, Sellers, and Administrators.

### 🏛️ Professional Aesthetic & UX
- **Iconic Upgrade**: Replaced standard emojis with premium, industry-specific SVG icons for a professional "State-of-the-Art" appearance.
- **Advanced Dashboard**: Live-synced price indices tracking Urea, DAP, and MOP CFR India benchmarks.
- **Interactive Marketplace**: Enhanced B2B inquiry flow with success validation and supplier routing.

### 🛠️ Architecture Optimization
- **Centralized Service Layer**: Consolidated all API logic into `src/services/`, improving maintainability and scalability.
- **Configuration Management**: Unified API endpoint management via `apiConfig.js`.
- **Modular Design**: Separated UI components from data fetching logic for cleaner, testable code.

## 🌲 Technical Stack

- **Frontend**: React (Vite), React Router, Chart.js, Vanilla CSS.
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB Atlas (with localized fallback support).

## 🛠️ Setup Instructions

### 1. Backend Configuration
1. Navigate to `server/`.
2. Create/edit `.env` and add:
   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   ```
3. Run the server:
   ```bash
   node index.js
   ```

### 2. Frontend Launch
1. In the root directory, install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## 🔐 Authentication Rules
- **Admin Access**: Accounts with "admin" in their company name are automatically granted elevated system privileges and pricing controls.

---

*© 2026 KRISHICOM Intelligence. All rights reserved.*
