# 🚀 **JVS FinTech** 💼

[![React](https://img.shields.io/badge/React-19.0-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Electron](https://img.shields.io/badge/Electron-22.3-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3.0-003B57?logo=sqlite&logoColor=white)](https://sqlite.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-EULA-blue)](public/license.rtf)

**JVS FinTech** is a professional, high-performance, offline-first double-entry accounting software designed for modern businesses. Built as a hybrid application, it runs seamlessly either in a web browser using WebAssembly SQLite (`sql.js`) or as a standalone cross-platform desktop application using **Electron**.

From core bookkeeping and multi-company database isolation to dynamic reporting (Balance Sheets, P&Ls, GST Reports) and high-fidelity vector PDF printing, **JVS FinTech** brings a clean, responsive, and robust accounting experience to your local desktop. 📊✨

---

## 🏗️ **Core Architecture & Design**

*   **💾 Offline-First & Local-First Storage:** Uses WebAssembly-based SQLite (`sql.js`) to provide rapid local querying and data manipulation. Under Electron, the app reads and writes data directly to localized database files (`.db`) on the host system.
*   **🏢 Two-Tier Database Isolation:** Replaces simple legacy localStorage with a structured SQLite database isolation model:
    *   **Master Database (`master.db`):** Globally stores company profiles and centralized application settings (`app_settings` table).
    *   **Company Databases (`{companyId}.db`):** Fully isolated local database per business entity (stored in `Documents/JVS FinTech/{CompanyName}/{companyId}.db`), guaranteeing zero cross-company data pollution and making backups as easy as copying a single file.
*   **⚖️ Double-Entry Posting Engine:** Powered by a formal ledger posting engine that processes transactions (sales, purchases, vouchers) into dual-entry credits and debits matching standard GAAP accounting guidelines.
*   **📄 Vector-Fidelity PDF & Print Engine:** Integrates a Playwright-based headless Chromium PDF service in the Electron main process to render pixel-perfect, selectable vector PDF documents for invoices, challans, and reports.

---

## 📋 **Comprehensive Features**

### 📊 **1. Financial Dashboard**
*   **Key Metrics (KPIs):** Real-time tracking of Sales, Purchases, Administrative Expenses, Net Profit/Loss, Cash/Bank Balances, and Outstanding Receivables.
*   **Visual Analytics:** Interactive monthly sales and purchase trend lines powered by **Recharts**.
*   **Critical Alerts:** Highlighting top customers, top product items, and automated **Low Stock Alerts** based on real-time inventory levels.
*   **Recent Activity Feed:** Live chronological log of all recent sales, purchases, and voucher postings.

### 🏢 **2. Company & Financial Year Management**
*   **✨ Interactive Onboarding Wizard:** First-time launch walkthrough that helps set up default system preferences (layout theme, global date formats), link personal Google Drive for desktop backup sync, and register the primary company profile.
*   Create, modify, or delete companies with custom addresses, tax registration info, and logos.
*   Manage multiple **Financial Years (FY)** with independent periods, enforcing ledger postings only within selected fiscal date boundaries.
*   Custom workspace selection to modify database file directory location.

### 🔑 **3. Accounting Masters**
*   **Account Groups:** Hierarchical structure supporting standard categories (Assets, Liabilities, Capital, Income, Expenses, Debtors, Creditors).
*   **Ledgers:** Build custom accounts for parties, sales/purchase books, bank accounts, tax brackets, and expenses.
*   **Voucher Types:** Configure pre-defined and custom voucher types for different entry channels.
*   **Inventory Masters:** Stock Groups, Units of Measure (e.g., Nos, Kg, Pcs), and Stock Items (products and services with manual/automatic tracking).
*   **✏️ Bulk Operations Support:** Toggles bulk modes for ledgers, products, groups, and units, enabling checkbox multi-selection for fast inline bulk edits and multi-item deletion.

### 💸 **4. Transactions Suite**
*   **Sales Invoices:** Draft, modify, and print comprehensive invoices with automatic tax (GST/CGST/SGST/IGST), discount, and subtotal calculations.
*   **Quotations & Estimates:** Create professional estimates and proposals.
*   **Purchase Bills:** Record itemized inventory inflows and supplier bills.
*   **Delivery Challans:** Issue goods delivery documents syncing inventory stock.
*   **🚚 Automated Delivery Challan Generation:** Saving a new sales invoice automatically generates a draft Delivery Challan containing matching items, quantity, and values. Respects ship-to vs. bill-to parameters, automatically routing details from shipping records.
*   **Double-Entry Vouchers:** Core accounting vouchers:
    *   *Payments:* Supplier and expense payments.
    *   *Receipts:* Cash or bank deposits from clients.
    *   *Journals:* Adjustments, depreciation, and opening balance entries.
    *   *Contras:* Bank-to-cash or inter-bank transfers.
    *   *Stock Journals:* Record stock adjustments, damages, or manual corrections.

### 📈 **5. Dynamic Financial Reporting & Reconciliation**
*   **Export Options:** All standard statements, ledger books, and registers support instant one-click exports to print-ready **PDF** documents and fully formatted **Excel** (`.xlsx`/`.xls`) sheets.
*   **Standard Statements:**
    *   **Balance Sheet:** Real-time assets vs. liabilities representation.
    *   **Profit & Loss (P&L) Statement:** Detailed gross profit and net profit calculations.
    *   **Trial Balance:** Multi-level debit and credit balance sheet summary.
*   **Registers & Ledgers:**
    *   **Day Book:** Comprehensive daily ledger logs.
    *   **Ledger Reports:** Filtered transactions per-party or per-account.
    *   **Sales/Purchase Registers:** Chronological ledger summaries of sales and purchases.
    *   **Cash & Bank Books:** Isolated liquid cash flow trackers.
*   **Sales Analysis & GST:**
    *   **GST Compliance Dashboard:** Outward sales tax mapping for CGST, SGST, and IGST with one-click **GSTR-1 & GSTR-3B JSON exports** formatted exactly for the official government e-filing portal.
    *   **🧾 E-Invoice Export:** Dynamic generation of government-compliant E-Invoice JSON files (v1.1) containing billing details, itemized tax computations, and seller/buyer info for direct schema validation.
    *   **⚖️ GST Anomaly Scoring Engine:** Rules-based tax auditing system (assessing dual taxation, CGST/SGST asymmetries, state mismatches, invalid GSTIN formats, and missing registers) that generates transaction-level compliance scores (0-100%) and overall health ratings.
    *   **HSN/SAC Summaries:** Quantitative transaction aggregates grouped by HSN/SAC codes for simple product tax categorization.
    *   **Deep Sales Reports:** Item-wise sales registers, party-wise transaction balances, and cross-referenced party-item sales charts.
*   **Reconciliation Engines:**
    *   **🔍 GSTR-2B Reconciliation:** Interactive tool to compare supplier-filed auto-drafted ITC statements (GSTR-2B JSON) against local purchase books. Features status badges (Matched, Mismatch, Missing in Books, Missing in Portal), amount tolerance configuration, and claimable ITC calculations.
    *   **🏦 Bank Reconciliation:** Reconcile cash/bank book ledgers with bank statements. Supports CSV statement uploads, automated matching within standard clearance windows, tracking bank ledger balance vs. actual bank balance, and batch-applying clearance dates.

### ⚙️ **6. Utilities & Compliance**
*   **🔄 Over-The-Air (OTA) Auto Updates:** Seamless background application updates via GitHub Releases using `electron-updater`, ensuring you always have the latest features and patches without manual re-installation.
*   **🔍 Command Palette (Global Search):** A unified search interface (triggered via hotkey) to instantly navigate between pages, find specific ledgers, or access quick actions across the app.
*   **☁️ Google Drive Cloud Sync (Desktop Only):** Securely back up local SQLite databases to personal Google Drive storage. Supports automatic background backups, custom Google Cloud console OAuth client credentials integration (Client ID/Secret override), and full synchronization on app close with an overlay screen.
*   **📂 Configurable Export Paths:** Custom directory configuration for saving exported PDFs, Excel sheets, and backup files with automated settings migration across versions.
*   **📦 Batch & Expiry Tracking:** Support for batch numbers, manufacture dates, and expiry dates (linked directly to products/services in stock).
*   **📋 EULA Agreement Block:** Integrated End-User License Agreement (EULA) pop-up that blocks application actions until terms are accepted, persisting consent securely in the global SQLite settings table.
*   **📥 Bulk Import Engine (CSV / Excel / Tally XML):** Upload massive databases of Ledgers, Stock Groups, Stock Items, Opening Balances, Account Groups, and Units of Measure using customizable templates with client-side syntax checks. Features native support for importing **Tally XML Master exports** (with UTF-16LE compatibility) for seamless ledger and inventory migrations.
*   **🔒 Cryptographic Audit Chain:** Audit logs are secured using a SHA-256 cryptographic chaining mechanism (each entry links to the previous entry's hash). Features built-in chain validation to detect logs tampering or database pollution, along with interactive side-by-side visual diffs showing exactly which fields changed.
*   **🛡️ Trial Balance Data Integrity Checker:** Diagnostic panel checking credit/debit double-entry equations, flagging orphaned ledger ids in transactions, and detecting duplicate keys to prevent data corruption.
*   **💾 Database Backup & Direct Restore:** Download complete binary dumps (`.db`) or restore your databases in the web/desktop UI.
*   **⚙️ Database Compaction:** One-click SQLite size optimization (`VACUUM`) inside Data Settings to clean up deleted records and reclaim disk space.
*   **⌨️ Keyboard Shortcuts:** Global application-wide hotkeys (e.g., `Ctrl + S` to save forms, `Ctrl + P` to print/generate PDFs, `Ctrl + Alt + I` for new invoices, `Ctrl + Alt + V` for payment vouchers, `Ctrl + F` to search, and `Escape` to close modals or go back).

---

## 🛠️ **Technology Stack**

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Core Framework** | React 19 + TypeScript | Static type safety and fast reactive UI component hierarchy. |
| **Build System** | Vite 8 | Super-fast compilation and HMR development server. |
| **Desktop Shell** | Electron 22 | Native OS shell integration, file system storage, and local window menus. |
| **Database** | SQL.js / SQLite | In-memory/local file-based relational database. |
| **UI Components** | Radix UI + shadcn/ui | Beautiful, accessible, unstyled primitives styled with Tailwind CSS. |
| **Styling** | Tailwind CSS 3.4 | Utility-first styling framework with custom color tokens. |
| **Visual Charts** | Recharts 3.8 | Dynamic responsive SVGs for rendering accounting data trends. |
| **PDF Rendering** | Playwright Chromium | Headless browser engine to print high-fidelity vector document PDFs. |
| **Excel Export** | ExcelJS | Generation and formatting of workbook file formats. |

---

## 🧑‍💻 **Installation & Setup**

### **Prerequisites**
Make sure you have [Node.js](https://nodejs.org/) (v18+) and [npm](https://www.npmjs.com/) installed.

### **1. Clone & Install**
```bash
# Clone the repository
git clone https://github.com/JV-Vigneesh/JVS-AccounTally.git

# Navigate into the project folder
cd JVS-AccounTally

# Install project dependencies
npm install
```

### **2. Development Mode**

#### **Option A: Run Web Version (Browser)**
Starts a fast development server.
```bash
npm run dev
```
Open [http://localhost:8080](http://localhost:8080) to access the app in your browser.

#### **Option B: Run Desktop Version (Electron)**
Runs the application inside the native Electron window with direct file-system capabilities.
```bash
npm run electron:dev
```

### **3. Production Build & Packaging**

To compile the React bundle and build the Electron desktop installer (`.exe` for Windows, executable for target OS):

```bash
# Build & package distribution binaries
npm run dist
```
*   The web distribution files will be compiled under `dist/`.
*   The packaged installers (e.g., Setup `.exe` files) will be located inside the `out/` or `dist/` directory as configured in `electron-builder.json`.

---

## 📂 **Project Directory Structure**

```
JVS-AccounTally/
├── electron/                 # Electron main process, preload, and PDF rendering service
│   ├── main.cjs              # Electron entrypoint & IPC communication
│   ├── preload.cjs           # Secure renderer API bindings (contextBridge)
│   └── pdf-service.cjs       # Playwright integration for PDF generation
├── src/                      # Frontend source directory
│   ├── components/           # Common layout elements and shadcn/ui primitives
│   ├── contexts/             # Company, Theme, and Database state contexts
│   ├── core/                 # Relational DB initialization, schemas, and queries
│   │   ├── database/         # SQLite schemas & operations
│   │   └── posting-engine/   # Double-entry debit/credit ledger calculations
│   ├── features/             # Business logic modules (inventory, transactions, vouchers)
│   ├── hooks/                # Common stateful hooks
│   ├── pages/                # High-level route views (Dashboard, Invoices, Reports, etc.)
│   │   ├── masters/          # Accounting & Stock configuration dashboards
│   │   ├── transactions/     # Accounting Voucher creation forms
│   │   ├── reports/          # Financial report modules (Balance Sheet, P&L, GST)
│   │   └── utilities/        # Audit Logs, Bulk Import, Data Integrity checkers
│   ├── shared/               # Utility functions, formatting, constants
│   └── types/                # TypeScript interfaces and type definitions
├── index.html                # App entrypoint
├── package.json              # Script configurations and dependency definitions
└── tsconfig.json             # TypeScript configuration options
```

---

## 🗺️ **Roadmap & Future Work**

*   **📱 Multi-Platform Sync:** Cloud-assisted syncing between multiple client devices.
*   **🔗 Bank Feeds Integration:** Auto-import transaction statements from major banking systems.
*   **🚀 Automated Tax Filing:** Direct e-filing pipeline matching localized compliance guidelines.

---

## 📜 **License**

Copyright (c) 2026 | JV Vigneesh
All Rights Reserved.

Unauthorized copying of this file, via any medium, is strictly prohibited.
