# 🚀 **JVS FinTech** 💼

<p align="left">
  <a href="https://github.com/JV-Vigneesh/JVS-FinTech/releases/latest">
    <img src="https://img.shields.io/badge/Download-Latest_Release-ED3237?style=for-the-badge&logo=windows&logoColor=white" alt="Download Latest Release" />
  </a>
  <a href="https://docs.google.com/forms/d/e/1FAIpQLSf-TtOgweFKTWt3jG5VL5hPjt60G1yM-rUKN09f2genJd17KQ/viewform">
    <img src="https://img.shields.io/badge/Report_Bug-Google_Form-orange?style=for-the-badge&logo=google&logoColor=white" alt="Report Bug / Feedback" />
  </a>
</p>

[![Version](https://img.shields.io/badge/Version-12.2.4-success?style=flat-square)](https://github.com/JVS-Technologies/JVS-FinTech/releases)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vite.dev/)
[![Electron](https://img.shields.io/badge/Electron-22.3-47848F?logo=electron&logoColor=white&style=flat-square)](https://www.electronjs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3.0-003B57?logo=sqlite&logoColor=white&style=flat-square)](https://sqlite.org/)
[![Security](https://img.shields.io/badge/Encryption-AES--256--GCM-2ea44f?logo=shield&style=flat-square)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-EULA-blue?style=flat-square)](public/license.rtf)

**JVS FinTech** is a modern, high-performance, offline-first double-entry accounting and financial management software designed for businesses, accountants, and enterprises. Developed under [JVS Tech](https://jvs-technologies.github.io/), it operates seamlessly either as a standalone cross-platform desktop application powered by **Electron** (with proprietary encrypted `.jvsdb` database storage) or directly within web browsers using WebAssembly SQLite (`sql.js`).

From comprehensive double-entry bookkeeping and multi-company database isolation to automated GST compliance, GSTR-2B reconciliation, bidirectional Tally XML interoperability, cryptographic audit chains, and high-fidelity vector PDF generation, **JVS FinTech** delivers an enterprise-grade accounting workspace with 100% data privacy and speed. 📊✨

---

## 🏗️ **Core Architecture & Security**

*   **🔒 Authenticated AES-256-GCM Encrypted Storage (`.jvsdb`):** 
    *   All financial records, company ledgers, and global settings are stored in proprietary `.jvsdb` encrypted containers with custom `JVSDB` magic byte headers and cryptographic authentication.
    *   Features transparent automatic background migration from legacy unencrypted `.db` files to `.jvsdb`.
    *   Registers native Windows OS file associations for direct double-click database opening.
*   **🏢 Two-Tier Relational Database Isolation:**
    *   **Master Database (`master.jvsdb`):** Centralized global database storing company profiles, user preferences, and global application configurations (`app_settings` table).
    *   **Company Databases (`{companyId}.jvsdb`):** Completely isolated relational database per business entity and financial year (stored at `Documents/JVS FinTech/{CompanyName}/{companyId}.jvsdb`), guaranteeing zero cross-entity data pollution and enabling effortless file-based backups.
*   **⚖️ GAAP-Compliant Double-Entry Posting Engine:** Formal transaction engine translating sales invoices, purchase bills, payments, receipts, journals, contras, credit notes, and debit notes into balanced dual-entry debits and credits.
*   **⚡ Dynamic Multi-Threading Worker Pool:** Utilizes background Web Workers and Node child worker threads to process compute-heavy cryptography, report calculations, and bulk imports without blocking the UI thread.
*   **📄 Vector-Fidelity PDF & Print Engine:** Integrates Chromium's native vector printing pipeline in Electron to render pixel-perfect, selectable vector PDF documents for invoices, delivery challans, vouchers, and financial statements.
*   **🔄 Bidirectional Tally XML Interoperability:** Complete two-way synchronization supporting both **Tally XML Import** and **Tally XML Export** (Masters & Transactions) with full compatibility for Tally Prime and Tally.ERP 9.
*   **🛡️ Per-Company Cryptographic Audit Chaining:** Every database change is recorded in an immutable SHA-256 cryptographic chain isolated per company, featuring real-time tampering detection, visual corruption alerts, and automated chain repair.

---

## 📋 **Comprehensive Feature Suite**

### 📊 **1. Financial Dashboard & Visual Analytics**
*   **Real-Time KPIs:** Live metric cards for Sales, Purchases, Administrative Expenses, Net Profit/Loss, Cash & Bank Balances, and Total Outstanding Receivables.
*   **Interactive Visualizations:** Monthly sales and purchase trend curves powered by **Recharts**.
*   **Automated Inventory Alerts:** Real-time **Low Stock Alerts** and instant tracking of top-selling products and high-value clients.
*   **Live Activity Stream:** Chronological feed tracking recent sales invoices, supplier purchases, and voucher postings.

### 🏢 **2. Company & Financial Year Management**
*   **✨ Interactive Onboarding Wizard:** First-launch walkthrough configuring system preferences, theme styles, global date formatting, personal Google Drive backup sync, and initial company registration.
*   **⚙️ Dynamic Company Features (F11):** Toggle core accounting and inventory modules per company (invoicing, batch tracking, zero-valued transactions, discount columns, debit/credit notes) on demand.
*   **📅 Multi-Financial Year (FY) Management:** Create and switch between distinct financial years with automated closing-to-opening balance carry-forward.
*   **♾️ Continuous Accounting Mode:** Enable multi-year ledger continuity, allowing voucher entry across financial year boundaries without rigid year-end lockouts.
*   **📂 Custom Workspace Directory:** Configurable local storage directory for `.jvsdb` database files on your computer.

### 🔑 **3. Accounting & Inventory Masters**
*   **Account Groups:** Hierarchical chart of accounts supporting standard categories (Assets, Liabilities, Capital, Income, Expenses, Debtors, Creditors).
*   **Ledgers:** Comprehensive party profiles (Customers/Suppliers), bank accounts, tax brackets, and expense accounts with complete GSTIN, PAN, and banking metadata.
*   **Voucher Types:** Pre-configured and customizable voucher types for streamlined data entry channels.
*   **Inventory Masters:** Stock Groups, Units of Measure (e.g., Nos, Kgs, Pcs, Box), and Stock Items (products and services) with manual and automated stock tracking.
*   **📦 Batch & Expiry Tracking:** Manage batch numbers, manufacturing dates, and expiry dates linked directly to stock inventory.
*   **⚡ On-the-Fly Master Creation:** Create new ledgers and stock items inline directly within invoice and voucher screens without leaving your workflow.
*   **✏️ Bulk Operations Support:** Multi-select checkbox mode for batch inline editing and multi-item deletion across ledgers, stock items, and groups.

### 💸 **4. Transactions Suite**
*   **Sales Invoices:** Draft, edit, and print professional GST tax invoices with automated multi-tier tax computations (CGST/SGST/IGST), line-item discounts, and round-offs.
*   **🚚 Dedicated Ship-To Consignee Tracking:** Independent storage of Ship-To delivery consignees vs. Bill-To parties with automatic ledger updates upon saving.
*   **🚚 Automated Delivery Challan Generation:** Saving a sales invoice automatically creates a linked Delivery Challan with matching items, quantities, and shipping details.
*   **📱 Dynamic Bank UPI QR Codes:** Embed dynamic payment UPI QR codes directly onto printed invoices for instant customer smartphone settlement.
*   **🎨 Custom Invoice Print Themes:** Multiple selectable visual templates for printed invoices and vector PDFs.
*   **Purchase Bills:** Record supplier invoices with itemized inventory inflows and automatic input tax credit (ITC) calculations.
*   **Quotations & Estimates:** Generate proposals and estimates ready for instant conversion into active sales invoices.
*   **Double-Entry Vouchers:**
    *   *Payments:* Supplier disbursements and expense payments.
    *   *Receipts:* Customer collections and liquid inflows.
    *   *Journals:* Adjustments, depreciation, and opening balances.
    *   *Contras:* Cash-to-bank deposits and inter-bank transfers.
    *   *Credit Notes & Debit Notes:* Sales and purchase returns with tax adjustments.
    *   *Stock Journals:* Inventory adjustments, transfers, and internal stock movements.
    *   *Physical Stock Vouchers:* Record physical inventory counts and reconcile variances.
*   **💰 Live Ledger Balances:** Instant display of real-time account balances directly within transaction forms to prevent over-payments or credit breaches.

### 📈 **5. Financial Reporting & Drill-Down Analysis**
*   **One-Click Multi-Format Export:** Instant export of all reports and registers to high-fidelity **Vector PDF**, formatted **Excel** (`.xlsx`), and **CSV** files.
*   **📂 Direct OS Integration:** Automatic "Open File" and "Show in Folder" launch actions upon file download.
*   **Standard Financial Statements:**
    *   **Balance Sheet:** Real-time assets vs. liabilities representation with hierarchical drill-down.
    *   **Profit & Loss (P&L) Statement:** Detailed gross and net profit computations with operational expense breakdowns.
    *   **Trial Balance:** Multi-level debit and credit balance summary with mathematical equality verification.
*   **Registers & Ledgers:**
    *   **Day Book:** Chronological ledger log of daily transactions.
    *   **Ledger Reports:** Filtered transaction history with running balances per party or account.
    *   **Sales & Purchase Registers:** Monthly and date-filtered transaction registers.
    *   **Cash & Bank Books:** Isolated liquid cash flow trackers with opening and closing balances.
    *   **Voucher Register:** Comprehensive register of all accounting vouchers.
    *   **Item-Wise & Party-Wise Sales Analysis:** Granular sales performance breakdowns by product and customer.
    *   **Stock Summary:** Comprehensive inventory stock valuation and quantity overview.
*   **Unified Back & Drill-Down Navigation:** Seamless contextual back-button navigation across all deeply nested report hierarchies.

### 🏛️ **6. GST Compliance & Reconciliation Engine**
*   **Government-Ready GSTR JSON Exports:** One-click generation of **GSTR-1** and **GSTR-3B** JSON payloads validated against official GST portal schemas.
*   **🧾 E-Invoice JSON Export (v1.1):** Dynamic generation of government-compliant E-Invoice JSON payloads containing seller/buyer information, itemized taxes, and HSN codes.
*   **🔍 Interactive GSTR-2B Reconciliation:** Compare auto-drafted supplier ITC statements (GSTR-2B JSON) against local purchase records. Features status badges (*Matched*, *Mismatch*, *Missing in Books*, *Missing in Portal*), configurable tolerance thresholds, and claimable ITC metrics.
*   **⚖️ GST Anomaly Scoring Engine:** Rules-based tax auditing system inspecting invoices for dual-taxation errors, CGST/SGST asymmetries, interstate state code mismatches, and invalid GSTIN formats with transaction-level health ratings (0-100%).
*   **HSN/SAC Summaries:** Quantitative aggregates grouped by HSN/SAC codes for simplified tax filing.

### 🏦 **7. Banking & Statement Reconciliation**
*   **Bank Reconciliation Module:** Reconcile cash/bank ledgers with bank statements.
*   **CSV Statement Upload:** Upload bank CSV statements with automatic column mapping.
*   **Automated Matching:** Match entries within configurable date clearance windows.
*   **Batch Clearance:** Apply clearance dates in bulk and track bank ledger balance vs. actual bank balance.

### ⚙️ **8. Data Management, Security & Administration**
*   **📥 Bi-Directional Tally Hub (Import & Export):** 
    *   Import ledgers, stock groups, stock items, and units from **Tally XML Master exports** (with UTF-16LE encoding support).
    *   Export complete databases, masters, or transactions to standard **Tally XML format** compatible with Tally Prime and Tally.ERP 9.
*   **🛡️ Cryptographic Audit Trail & Self-Repair:** SHA-256 hash chains per company database. Detects unauthorized tampering, highlights corrupted entries with visual alerts, and provides a one-click automated cryptographic chain repair utility.
*   **🛡️ Trial Balance Integrity Checker:** Automated diagnostic panel verifying double-entry equations, checking for orphaned ledger IDs, and catching duplicate primary keys.
*   **🧹 Data Cleanup Hub:** Safe maintenance tool for purging unused ledgers, archiving old records, and running SQLite compaction (`VACUUM`) to reclaim disk space.
*   **☁️ Google Drive Backup Sync (Desktop):** Automated background database backups to personal Google Drive storage with custom OAuth client credential override and sync-on-close protection.
*   **🔏 Multi-Instance Concurrency Lock:** Enforces a single write-master lock to prevent database corruption. Secondary instances launch safely in **View-Only Mode** with operational reporting and dashboards.
*   **🔄 Over-The-Air (OTA) Auto-Updates:** Seamless background updates via GitHub Releases using `electron-updater` with release notes preview.
*   **🔍 Global Command Palette:** Instant keyboard-driven navigation (`Ctrl + K`) to access pages, ledgers, and actions across the app.
*   **⌨️ Application-Wide Hotkeys:** Quick navigation (`Ctrl + S` save, `Ctrl + P` print, `Ctrl + Alt + I` invoice, `Ctrl + Alt + V` voucher, `Escape` back/close).
*   **🌓 Dark / Light / System Theme:** Curated modern themes with smooth transitions.

---

## 🛠️ **Technology Stack**

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Core Framework** | React 19 + TypeScript 5.8 | Reactive component hierarchy with strict static type safety. |
| **Build Tool** | Vite 8 | Fast ESM development server and optimized rollup bundler. |
| **Desktop Shell** | Electron 22 | Native OS shell integration, file system storage, and window lifecycle. |
| **Relational DB** | SQL.js / SQLite 3 | In-memory and local file-based relational database engine. |
| **Database Encryption** | AES-256-GCM (Node Crypto / Web Crypto) | Authenticated encryption at rest for proprietary `.jvsdb` containers. |
| **UI Components** | Radix UI + shadcn/ui | Accessible, unstyled primitives styled with Tailwind CSS. |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS framework with curated dark/light design tokens. |
| **Visual Charts** | Recharts 3.8 | Dynamic responsive SVGs for rendering financial analytics. |
| **PDF Rendering** | Playwright Chromium | Headless browser rendering high-fidelity vector document PDFs. |
| **Spreadsheet Engine** | ExcelJS | Multi-sheet workbook generation and cell styling. |
| **XML Engine** | fast-xml-parser | High-performance XML parser and builder for Tally interoperability. |

---

## 📥 **Download & Installation**

JVS FinTech is distributed as a ready-to-run desktop application for Windows.

1. Go to the **[Releases / Assets](https://github.com/JV-Vigneesh/JVS-FinTech/releases)** section on GitHub.
2. Download the latest installer executable: `JVS-FinTech-Setup.exe` (or latest available release asset).
3. Run the installer on your system and launch **JVS FinTech**.
4. Follow the built-in setup wizard to create your company profile and start accounting immediately.

---

## 🚀 **Quick Start Guide**

1. **Onboarding:** Launch the app and complete the setup wizard to configure your theme preferences, fiscal calendar, and first Company profile.
2. **Setup Masters:** Add your Customer and Supplier Ledgers and Stock Items (or let the app auto-create them on the fly during transaction entry).
3. **Record Transactions:** Navigate to **Sales Invoices** or **Vouchers**, add items, and click Save to automatically generate your tax invoice PDF, linked Delivery Challan, and double-entry ledger postings.
4. **View Financials & Compliance:** Inspect real-time **Balance Sheet**, **Profit & Loss**, **GSTR-2B Reconciliation**, and **GST Reports** with one-click Excel and PDF exports.

---

## 💾 **Data Storage & Privacy**

JVS FinTech is 100% offline-first. Your financial data is stored exclusively on your local device and is never transmitted externally without explicit user configuration (e.g., Google Drive Backup).

*   **Master Database:** Stored at `Documents/JVS FinTech/master.jvsdb` (Company profiles & global settings).
*   **Company Databases:** Stored at `Documents/JVS FinTech/{CompanyName}/{companyId}.jvsdb` (Complete financial & ledger data).
*   **File Format:** Proprietary AES-256-GCM encrypted containers (`.jvsdb`) with `JVSDB` container headers and SHA-256 integrity verification.
*   **Manual Backups:** Simply copy `.jvsdb` files or use the built-in **Backup Management** panel to create compressed snapshots.

---

## 🗺️ **Roadmap & Future Enhancements**

For an in-depth breakdown of upcoming architecture, AI copilot, multi-user sync, and enterprise modules, see the **[Future Enhancements](FUTURE_ENHANCEMENTS.md)** document.

---

## 📜 **License & Credits**

*   **Organization:** [JVS Tech](https://jvs-technologies.github.io/)
*   **Author & Maintainer:** [JV Vigneesh](https://github.com/JV-Vigneesh)
*   **License:** Licensed under the End User License Agreement (EULA) — see [license.rtf](public/license.rtf) for details.
