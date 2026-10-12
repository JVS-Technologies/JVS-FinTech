# 🚀 **JVS FinTech** 💼

<p align="left">
  <a href="https://github.com/JV-Vigneesh/JVS-FinTech/releases/latest">
    <img src="https://img.shields.io/badge/Download-Latest_Release-ED3237?style=for-the-badge&logo=windows&logoColor=white" alt="Download Latest Release" />
  </a>
  <a href="https://docs.google.com/forms/d/e/1FAIpQLSf-TtOgweFKTWt3jG5VL5hPjt60G1yM-rUKN09f2genJd17KQ/viewform">
    <img src="https://img.shields.io/badge/Report_Bug-Google_Form-orange?style=for-the-badge&logo=google&logoColor=white" alt="Report Bug / Feedback" />
  </a>
</p>

[![React](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vite.dev/)
[![Electron](https://img.shields.io/badge/Electron-44.1-47848F?logo=electron&logoColor=white&style=flat-square)](https://www.electronjs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3.0-003B57?logo=sqlite&logoColor=white&style=flat-square)](https://sqlite.org/)
[![Security](https://img.shields.io/badge/Encryption-AES--256--GCM-2ea44f?logo=shield&style=flat-square)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-EULA-blue?style=flat-square)](public/license.rtf)

**JVS FinTech** is a modern, high-performance, offline-first double-entry accounting and enterprise financial management platform built for businesses, chartered accountants, and enterprises. Developed under [JVS Tech](https://jvs-technologies.github.io/), it operates seamlessly either as a standalone cross-platform desktop application powered by **Electron** (with proprietary encrypted `.jvsdb` database containers) or directly inside modern web browsers using WebAssembly SQLite (`sql.js`).

From comprehensive double-entry bookkeeping and multi-company database isolation to automated GST compliance, official CBDT ITR E-Filing JSON generation, GSTR-2B reconciliation, multi-format bank statement auto-reconciliation, native SMTP & Google OAuth2 email dispatch, WhatsApp Business messaging, dynamic UPI QR codes, bidirectional Tally XML interoperability, and cryptographic SHA-256 audit chains, **JVS FinTech** delivers an enterprise-grade financial workspace with 100% local data privacy and speed. 📊✨

*   **🌐 Website :** [JVS-FinTech](https://jvs-technologies.github.io/JVS-FinTech/)
*   **🐙 GitHub Repository:** [JVS-FinTech](https://github.com/JV-Vigneesh/JVS-FinTech)
*   **🏢 Organization:** [JVS Tech](https://jvs-technologies.github.io/) / [JVS-Technologies](https://github.com/JVS-Technologies)

---

## 🏗️ **Core Architecture & Security Deep Dive**

*   **🔒 Authenticated AES-256-GCM Encrypted Storage (`.jvsdb`):** 
    *   All financial records, company ledgers, and global settings are stored in proprietary `.jvsdb` encrypted containers protected with custom `JVSDB` magic byte headers and cryptographic authentication tags at rest.
    *   Powered by Node Crypto in the Electron shell and Web Crypto API (`SubtleCrypto`) in web browser environments.
    *   Features transparent automatic background migration from legacy unencrypted `.db` files to encrypted `.jvsdb`.
    *   Registers native Windows OS file associations for direct double-click database opening.
*   **🏢 Three-Tier Relational Database Isolation:**
    *   **Master Database (`master.jvsdb`):** Centralized global database storing company profiles, user preferences, and global application configurations (`app_settings` table).
    *   **Company Metadata Database (`{CompanyName}.jvsdb`):** Dedicated company metadata container storing financial year rosters, company-level configuration flags, and statutory ITR profiles (`itr_profiles` table).
    *   **Financial Year Database (`{ShortName}_FY{FYName}.jvsdb`):** Completely isolated relational database per business entity and financial year (stored at `Documents/JVS FinTech/{CompanyName}/{FYName}/`), guaranteeing zero cross-entity or cross-year data pollution and enabling effortless file-based snapshots.
*   **⚖️ GAAP-Compliant Double-Entry Posting Engine:** Formal transaction validation engine translating sales invoices, purchase bills, payments, receipts, journals, contras, credit notes, and debit notes into balanced dual-entry debits and credits with arithmetical balance verification.
*   **🛡️ Per-Company Cryptographic Audit Chaining (SHA-256):** Every database change (create, update, delete, error) is recorded in an immutable SHA-256 cryptographic chain isolated per company. Includes real-time tamper detection, visual corruption alerts, and an automated cryptographic chain repair utility.
*   **🔏 Multi-Instance Concurrency Lock:** Enforces a single write-master lock on local database storage to prevent file corruption. Secondary application instances launch safely in **View-Only Mode** with operational reporting, searching, and dashboard analytics.
*   **⚡ Multi-Threaded Background Processing:** Background Web Workers and Node child worker threads (`electron/worker-pool.cjs`) offload compute-heavy cryptographic hashing, complex tax calculations, and multi-bank statement parsing without freezing the primary UI thread.
*   **📄 High-Fidelity Vector PDF & Print Customizer:** Integrates Chromium's native vector printing pipeline in Electron to render pixel-perfect, selectable vector PDF documents for invoices, challans, vouchers, and reports with customizable layouts, orientations, and print margins.
*   **🛡️ Automated AST Control-Flow Obfuscation & Security Pipeline:** Production Electron distributions run an automated security pipeline (`scripts/build-electron.cjs`) applying multi-pass AST control-flow obfuscation (`javascript-obfuscator`) with string array encoding, control-flow flattening, and identifier transformations to safeguard proprietary business logic, IPC contracts, and cryptographic keys.
*   **💾 WASM SQLite Memory Management & Safe Save Pipeline:** Hardened memory lifecycle handling for WebAssembly SQLite (`sql.js`), actively preventing memory leaks during rapid voucher posting and heavy report calculations, paired with non-blocking debounced disk flushing in Electron to prevent UI micro-stutters and ensure zero database corruption.
*   **🚪 Safe Window-Close Handshake & SQLite Durability:** Implements an automated window-close handshake between renderer and main processes, ensuring all active SQLite database transactions in memory are flushed to disk before Electron exits.
*   **🔐 OS-Level Credential Protection (`safeStorage`):** Sensitive integration credentials (such as Google OAuth2 tokens and SMTP passwords) are encrypted at rest using Electron's native `safeStorage` API backed by Windows DPAPI.
*   **🛡️ Developer PIN Authentication:** Protected developer controls and database administrative actions are guarded by an embedded PIN verification dialog (`electron/dev-auth.html` / `verifyDevAuth`).

---

## 📋 **Exhaustive Feature Suite**

### 📊 **1. Executive Financial Dashboard & Analytics**
*   **Real-Time Metric KPIs:** Live financial metric cards tracking Gross Sales, Supplier Purchases, Administrative & Operational Expenses, Net Profit/Loss, Cash & Bank Balances, and Total Outstanding Receivables.
*   **Interactive Visual Analytics:** Monthly sales and purchase comparative trend curves with interactive tooltips powered by **Recharts**.
*   **Automated Inventory & Customer Alerts:** Real-time **Low Stock Alerts** with reorder warnings, alongside instant rankings of top-selling products and highest-value customer accounts.
*   **Live Activity Stream:** Chronological feed tracking recent sales invoices, supplier purchases, and voucher postings with one-click drill-down navigation.

### 🏢 **2. Company & Financial Year Lifecycle Management**
*   **✨ Interactive Onboarding Wizard:** First-launch walkthrough configuring system preferences, theme styles, date formatting, personal Google Drive backup sync, and initial business profile creation.
*   **🌐 Company Website & Official Branding Integration:** Configure official business websites with live hyperlinks on customer-facing invoices, vouchers, and dispatched emails, alongside software branding personalization.
*   **⚙️ Dynamic Company Features (F11):** Toggle core accounting and inventory modules per company (accounts integration, batch tracking, zero-valued transactions, line-item discounts, debit/credit notes, multi-currency, cost centers, income & expenditure presentation) on demand.
*   **🏛️ Business Constitution Support:** Tailored metadata profiles for Individual/Proprietorship, Partnership Firms, Limited Liability Partnerships (LLP), Private/Public Limited Companies, and HUFs.
*   **📅 Multi-Financial Year (FY) Lifecycle:** Create and switch between distinct financial years with automated closing-to-opening balance carry-forward for all asset and liability ledgers.
*   **♾️ Continuous Accounting Mode:** Enable multi-year ledger continuity, allowing voucher entry across financial year boundaries without rigid year-end lockouts.
*   **📂 Custom Workspace Directory:** Configurable local storage directory for `.jvsdb` database files on your computer with folder browsing and relocation support.

### 🔑 **3. Accounting & Inventory Masters**
*   **Account Groups:** Hierarchical Chart of Accounts supporting standard primary and secondary categories (Assets, Liabilities, Capital, Income, Expenses, Sundry Debtors, Sundry Creditors) with custom parent-child tree nesting.
*   **Ledgers:** Comprehensive party profiles (Customers/Suppliers), liquid accounts (Cash, Bank Accounts), tax accounts (CGST, SGST, IGST, Cess), and nominal accounts with complete GSTIN, PAN, Bank IFSC, Bank A/c, Address, and State Code metadata.
*   **Multiple Shipping Addresses:** Store and manage multiple delivery locations per customer/party ledger with seamless selection during invoice creation.
*   **Account & Inventory Voucher Types:** Pre-configured and customizable voucher types for both Accounting (Sales, Purchase, Payment, Receipt, Contra, Journal, Debit Note, Credit Note) and Inventory (Delivery Challan, Stock Journal, Physical Stock, Stock Adjustments) with custom numbering prefixes, suffixes, and abbreviation codes.
*   **Inventory Masters & Services Stock Exclusion:** Stock Groups (hierarchical categories), Units of Measure (e.g., Nos, Kgs, Pcs, Box, Hrs, Mtr with formal names and UQC mappings), and Stock Items (Goods and Services) with standard rates, HSN/SAC codes, and tax rates. Service items are automatically excluded from physical stock counts and inventory valuation while preserving full GST tax invoicing.
*   **📦 Batch & Expiry Tracking:** Manage batch numbers, manufacturing dates, and expiry dates linked directly to stock item inventory.
*   **⚙️ Configurable Custom Supply Types:** User-customizable supply type registry (Taxable, Exempt, Nil-rated, Non-GST, Job Work, etc.) with configurable per-type inventory stock tracking.
*   **⚡ On-the-Fly Master Creation:** Create new ledgers and stock items inline directly within invoice and voucher screens without leaving your workflow.
*   **✏️ Bulk Operations Support:** Multi-select checkbox mode for batch inline editing and multi-item deletion across ledgers, stock items, and groups.

### 💸 **4. Complete Transactions Engine**
*   **Sales Invoices:** Draft, edit, and print professional GST tax invoices with automated multi-tier tax computations (CGST/SGST/IGST), line-item discounts (percent/amount), automated round-offs, proforma invoice conversions, and streamlined one-flow data entry.
*   **👤 Custom Buyer Names on Cash Sales:** Enter custom customer/buyer names directly on Cash and Cash Credit sales without having to create dedicated ledger masters for walk-in or one-time buyers.
*   **📱 Dynamic UPI Payment QR Codes & "Pay Custom Amount":** Embed dynamic payment UPI QR codes and UPI IDs directly onto invoices and estimates with support for instant smartphone scan-and-pay, desktop deep links (`upi://pay`), and a flexible "Pay Custom Amount" option for partial payments.
*   **🎨 5 Selectable Invoice Print Themes & Dispatch Switch:** Minimal Light, Minimal Dark, Minimal Grey, Professional, and Classic print themes with customizable accent colors, business logos, digital stamps, signature blocks, customizable jurisdiction footers, and a toggleable switch to show or hide dispatch metadata.
*   **📦 Packaging Types & Configurable Charges Taxability:** Define custom packaging units and assign flexible taxability modes to additional charges (Freight, Packaging, Insurance), keeping additional expenses clearly segregated from standard duties and taxes.
*   **🚚 Dedicated Ship-To Consignee Tracking:** Independent storage of Ship-To delivery consignees vs. Bill-To parties with automatic ledger updates upon saving.
*   **🚚 Automated Delivery Challan Generation:** Saving a sales invoice can automatically generate a linked Delivery Challan with matching items, quantities, vehicle number, and shipping details.
*   **📑 Delivery Challan Display Preferences:** Fine-grained toggles to show or hide item rates, tax amounts, totals, bank details, and delivery terms on challans.
*   **🔢 Custom Document Numbering Templates:** Dynamic template masks (`{NUM}`, `{YEAR}`, etc.) configured independently across 11 transaction types (Sales, Proforma, Purchase, Quotation, Challan, Payment, Receipt, Contra, Journal, Credit Note, Debit Note) with live dynamic preview.
*   **📝 Document Terms, Declarations & Notes:** Document-specific headers, delivery terms, standard conditions, and notes for Invoices, Proformas, Quotations, Challans, and Purchases with independent visibility switches.
*   **Purchase Bills:** Record supplier invoices with itemized inventory inflows, automatic Input Tax Credit (ITC) calculations, and Reverse Charge Mechanism (RCM) flags.
*   **Quotations & Estimates:** Generate proposals and estimates with expiration dates, ready for instant one-click conversion into active sales invoices.
*   **Double-Entry Accounting Vouchers:**
    *   *Payment:* Bank and cash disbursements with multi-entry dual-debit/credit lines.
    *   *Receipt:* Customer collections, advances, and liquid inflows.
    *   *Journal:* Adjustments, non-cash entries, depreciation, and opening balances.
    *   *Contra:* Cash deposits to bank, cash withdrawals, and inter-bank transfers.
    *   *Credit Note & Debit Note (Sales & Purchase Returns):* Full-featured return vouchers with original invoice linking, item-level return adjustments, automatic inventory stock restoration, and seamless reporting integration.
*   **Inventory Vouchers:**
    *   *Stock Journal Voucher:* Record stock transfers, repackaging, and internal warehouse stock adjustments.
    *   *Physical Stock Voucher:* Record physical inventory counts and automatically reconcile book variances.
    *   *Stock Adjustments:* Adjust stock quantities and values directly.
*   **💰 Live Ledger Balances:** Instant display of real-time account balances directly within transaction forms to prevent over-payments or credit breaches.

### 📈 **5. Financial Reporting & Vector Print Customizer**
*   **📊 Universal `MasterTable` Architecture:** Standardized enterprise table system across 35+ pages, masters, registers, and reports, featuring keyboard-accessible multi-column sorting, sticky headers, floating pagination with "Scroll to Top", and instant live search.
*   **🧭 Category Landing Hubs:** Dedicated visual dashboard landing cards for Masters (`/masters`), Transactions (`/transactions`), and Reports (`/reports`) providing fast feature discovery and direct navigation.
*   **Advanced Report Print & PDF Customizer:**
    *   Customizable report orientation (Portrait / Landscape), paper sizes (A4, Letter, Legal), font scaling, and custom print margins.
    *   Interactive column toggles, dense compact display modes, custom headers, footers, and company watermarks.
    *   **Persistent Customizer Options:** Automatically preserves and applies your chosen print margins, orientations, and display modes across report sessions.
*   **One-Click Multi-Format Export:** Instant export of all reports and registers to high-fidelity **Vector PDF**, formatted **Excel** (`.xlsx`), and **CSV** files with automatic "Open File" and "Show in Folder" launch actions.
*   **Standard Financial Statements:**
    *   **Balance Sheet:** Real-time assets vs. liabilities representation with hierarchical drill-down and net profit integration.
    *   **Profit & Loss (P&L) Statement:** Detailed gross and net profit computations with operational trading account and indirect expense breakdowns (dynamically switches to **Income & Expenditure Account** for non-profit/service profiles).
    *   **Trial Balance:** Multi-level debit and credit balance summary with mathematical equality verification.
    *   **Opening Balances Report:** Dedicated audit report reviewing initial ledger balances and stock opening balances with debit/credit balance verification.
*   **Registers & Ledgers:**
    *   **Day Book:** Chronological ledger log of daily transactions with filtering and print options.
    *   **Ledger Reports:** Filtered transaction history with running balances, totals, drill-downs, and dedicated party statement views.
    *   **Sales & Purchase Registers:** Monthly columnar and date-filtered transaction registers with toggleable **Summary** vs. **Detailed** (CGST/SGST/IGST breakdown) tax column layouts, plus direct **10-column GST Excel (`.xlsx`) exports** ready for the official GST Offline Tool.
    *   **Credit Note, Debit Note & Journal Registers:** Dedicated transaction registers for return vouchers and non-cash journal postings.
    *   **Cash & Bank Books:** Isolated liquid cash flow trackers with opening, running, and closing balances.
    *   **Voucher Register:** Comprehensive register of all accounting vouchers.
    *   **Item-Wise & Party-Wise Analysis:** Granular performance breakdowns across **Item-Wise Sales**, **Item-Wise Purchases**, **Party-Wise Sales & Purchases**, and cross-dimensional **Party-Item-Wise Sales & Purchases**.
    *   **Stock Summary:** Comprehensive inventory stock valuation, quantities, and inward/outward summaries.
    *   **HSN/SAC Summary Report:** Formal tax report displaying total taxable values, quantities, and CGST/SGST/IGST/Cess breakdowns per HSN/SAC code.
    *   **Batch & Expiry Report:** Detailed inventory shelf-life analysis tracking batch numbers, manufacturing dates, expiry dates, and countdown of days remaining.
    *   **Negative Stock Audit Report:** Inventory shortfall warning report identifying stock items with negative quantities and deficit valuations.
*   **Unified Back & Drill-Down Navigation:** Seamless contextual back-button navigation and topbar breadcrumbs across all deeply nested report hierarchies.

### 🏛️ **6. GST Compliance Suite & Anomaly Auditing**
*   **Government-Ready GSTR JSON Exports (GSTN v3.2.4 Schema):** One-click generation of **GSTR-1** and **GSTR-3B** JSON payloads compliant with official GSTN v3.2.4 schemas (Table 12 HSN B2B summaries, SEWP/SEWOP/DE/R flags). Exports generate standard GST Offline Tool filenames (`<company>_<DDMMYYYY>_R1_<GSTIN>_offline.json`) for direct portal compatibility.
*   **🧾 E-Invoice JSON Export (v1.1):** Dynamic generation of government-compliant E-Invoice JSON payloads containing seller/buyer information, itemized taxes, and HSN codes.
*   **🔍 Interactive GSTR-2B Reconciliation:** 
    *   Upload auto-drafted supplier ITC statements (GSTR-2B JSON) and compare against local purchase bills.
    *   Multi-tier matching statuses (*Matched*, *Tax Mismatch*, *Invoice Mismatch*, *Missing in Books*, *Missing in Portal*).
    *   Configurable tolerance thresholds (e.g., ±₹1 rounding variance) and claimable vs. ineligible ITC classification.
    *   **One-Click Purchase Bill Creation:** Instantly convert unmatched GSTR-2B portal entries into recorded Purchase Bills with auto-filled vendor and tax mappings.
*   **⚖️ GST Anomaly Scoring Engine:** Rules-based tax auditing system inspecting transactions for dual-taxation errors, CGST/SGST balance asymmetries on intra-state supplies, interstate state code mismatches, reverse charge errors, and invalid GSTIN checksums with visual health ratings (0-100%).
*   **HSN/SAC Summaries:** Quantitative aggregates grouped by HSN/SAC codes for simplified tax filing.

### 📑 **7. Income Tax Returns (ITR) E-Filing Module (CBDT Compliant)**
*   **Official CBDT E-Filing JSON Generation:**
    *   **ITR-4 (SUGAM):** Presumptive taxation returns under **Section 44AD** (business), **Section 44ADA** (professionals), and **Section 44AE** (goods carriages) for Individuals, HUFs, and Partnership Firms.
    *   **ITR-3:** Comprehensive business and professional returns for Individuals and HUFs maintaining formal accounts.
    *   **ITR-5:** Complete return payload for Partnership Firms, LLPs, and AOP/BOI entities.
    *   **ITR-6:** Corporate Income Tax return payload for private and public companies.
    *   **ITR Financials JSON:** Structured balance sheet and P&L payloads for direct portal upload.
*   **Automated Book-of-Accounts Extraction:**
    *   Automatically calculates **Digital Turnover** vs. **Cash Turnover** ratios from bank vs. cash voucher postings.
    *   Computes presumptive income thresholds (6% on digital receipts + 8% on cash receipts for Section 44AD; 50% for Section 44ADA).
    *   Extracts Schedule BP, Schedule PL, Schedule BS, Schedule GST, Schedule Chapter VI-A (80C, 80D, 80G, etc.), and Schedule Taxes Paid (Advance Tax, TDS, TCS, Self-Assessment Tax).
*   **Live New vs. Old Tax Regime Comparative Optimizer:**
    *   Real-time comparative computation of tax liability under the **New Tax Regime (Section 115BAC)** vs. **Old Tax Regime**, including standard deductions, Section 87A rebate, surcharge, and health & education cess.
*   **Pre-Flight ITD Schema Validation:** Comprehensive validation rules catching missing PAN, invalid bank details, or mismatched turnover figures before exporting JSON.

### 🏦 **8. Multi-Bank Statement Importer & Auto-Reconciliation**
*   **Multi-Format Statement Ingestion:** Import bank statements across all major file formats: **CSV**, **Excel (`.xlsx`, `.xls`)**, **OFX/QFX**, and **PDF**.
*   **Pre-Configured Indian Bank Presets:** Ready-made statement templates for SBI, HDFC Bank, ICICI Bank, Axis Bank, Kotak Mahindra, Punjab National Bank, Canara Bank, Bank of Baroda, and custom column mappers.
*   **🧠 Intelligent Narration Parsing:** Automatically detects and extracts party names, transaction modes (UPI, IMPS, NEFT, RTGS, POS, ATM, Cheque), and UTR/reference numbers from transaction descriptions.
*   **🎯 Automated Matching Engine:** Multi-factor scoring algorithm matching statement rows with internal bank ledger entries based on exact/fuzzy amounts, date proximity windows, and reference numbers.
*   **⚡ 1-Click Voucher Creation from Statement:** Generate Payment or Receipt vouchers directly from unmatched bank feed rows with auto-populated party, date, and amount fields.
*   **Batch Clearance & Difference Tracking:** Apply clearance dates in bulk and track cleared vs. uncleared variances in real time.

### ✉️ **9. Communication & Document Dispatch Hub**
*   **📧 Native SMTP & Google OAuth2 Email Engine:**
    *   Direct email dispatch supporting custom SMTP hosts (Gmail, Outlook, Yahoo, Zoho, AWS SES, or private SMTP) with SSL/TLS encryption.
    *   One-click **Google OAuth2** authentication for secure single-sign-on Gmail dispatch without requiring app passwords.
    *   Attach high-fidelity vector PDF invoices, challans, or account statements with a single click.
    *   Auto-BCC accounting archives and custom sender aliases.
*   **🎨 Dynamic Email Template Designer:** Rich markdown and HTML email body templates with live previews and runtime dynamic variables (`{customerName}`, `{invoiceNumber}`, `{totalAmount}`, `{dueDate}`, `{companyName}`, `{paymentLink}`).
*   **💬 WhatsApp Business API & Direct Sharing:**
    *   Deliver invoices, delivery challans, and dynamic UPI payment links directly to customer WhatsApp numbers via WhatsApp Business Cloud API or direct WhatsApp Web integration.
    *   Dynamic WhatsApp template designer with variable substitution.
*   **⏰ Automated Payment Reminders Dashboard:**
    *   Interactive overdue receivables management with aging analysis buckets (0-30 days, 31-60 days, 60+ days).
    *   One-click and batch payment reminder dispatch via WhatsApp and Email with dynamic invoice balances and payment links.

### 📥 **10. Centralized Settings, Utilities & Data Hub**
*   **⚙️ 10-Tab Unified Settings Dashboard:** Comprehensive management across Companies, Company Features (F11), Preferences, Backup & Restore, Import & Export, Data Management, Data Integrity, Audit Logs, App Updates, and Data Cleanup.
*   **📥 Multi-Entity Bulk Data Importer:**
    *   Import Ledgers, Products/Stock Items, Opening Balances, Account Groups, Stock Groups, Units of Measure, Invoices, Purchases, and Vouchers from CSV/Excel files.
    *   **Multi-Sheet All-in-One Excel Import:** Ingest complete company setups from a single multi-tabbed Excel workbook.
    *   **Downloadable Sample Templates:** Built-in download links for formatted Excel templates with valid column headers and sample rows.
    *   Data preview grid with error validation and batch insertion.
*   **🔄 Bidirectional Tally XML Interoperability:**
    *   Import ledgers, stock groups, stock items, and units from **Tally XML Master exports** (with UTF-16LE encoding support).
    *   Export complete databases, masters, or transactions to standard **Tally XML format** compatible with Tally Prime and Tally.ERP 9.
*   **🛡️ Data Integrity Diagnostics & 1-Click Auto-Resolve:** Deep transaction and voucher sanity checker detecting unlinked stock items, orphaned ledger references, duplicate keys, and dual-entry imbalances, backed by an automated **Auto-Resolve** engine that safely fixes data discrepancies without manual database intervention.
*   **🧹 Data Cleanup Hub:** Safe maintenance tool for purging unused ledgers, archiving old records, clearing sample data, and running SQLite compaction (`VACUUM`) to reclaim disk space.
*   **☁️ Resilient Google Drive Cloud Sync (Desktop):** Automated background database backups to personal Google Drive storage with granular sync status tracking, resilient delta uploads, custom OAuth client credential override, and sync-on-close protection.
*   **🔄 Over-The-Air (OTA) Auto-Updates:** Seamless background updates via GitHub Releases using `electron-updater` with release notes preview and auto-download toggling.
*   **ℹ️ Built-in About Us Page:** System information, current release version notes, architecture summary, and developer credits.

---

## ⌨️ **Keyboard Shortcuts & Hotkeys**

| Shortcut | Scope | Action |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> | Application-Wide | Open Global Command Palette (search pages, ledgers, items) |
| <kbd>Ctrl</kbd> + <kbd>S</kbd> | Forms & Modals | Save current invoice, voucher, quotation, or master dialog |
| <kbd>Ctrl</kbd> + <kbd>P</kbd> | Reports & Invoices | Open vector print dialog / PDF export customizer |
| <kbd>Ctrl</kbd> + <kbd>B</kbd> | Application-Wide | Toggle navigation sidebar collapse / expand |
| <kbd>Ctrl</kbd> + <kbd>F</kbd> | Tables & Reports | Focus search bar / master table filter input |
| <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>I</kbd> | Application-Wide | Jump to New Sales Invoice |
| <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>V</kbd> | Application-Wide | Jump to New Accounting Voucher |
| <kbd>F11</kbd> | Application-Wide | Open Company Features Configuration |
| <kbd>F2</kbd> | Reports | Focus Date / Period filter input |
| <kbd>Alt</kbd> + <kbd>F1</kbd> / <kbd>Alt</kbd> + <kbd>1</kbd> | Reports | Toggle Detailed / Condensed report view |
| <kbd>Ctrl</kbd> + <kbd>H</kbd> | Reports | Cycle View Mode (Standard / Monthly / Inventory Breakdown) |
| <kbd>Alt</kbd> + <kbd>N</kbd> | Reports | Cycle Multi-Column comparison periods (None / Monthly / Quarterly) |
| <kbd>/</kbd> | Category Hubs | Focus category landing search bar |
| <kbd>?</kbd> | Application-Wide | Show Keyboard Shortcuts Help Modal (outside inputs) |
| <kbd>Escape</kbd> | Application-Wide | Close active modal, dialog, command palette, or go back |

---

## 🛠️ **Technology Stack**

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Core Framework** | React 19.2.8 + TypeScript 6.0.3 | Modern reactive component hierarchy with strict static type safety. |
| **Build Tool** | Vite 8.2.2 | Ultra-fast ESM development server and optimized rollup bundler. |
| **Desktop Shell** | Electron 44.1.1 | Native OS shell integration, secure IPC channels, and local file storage. |
| **Packaging & Updates** | electron-builder 26.8.1 + updater 6.8.9 | Differential NSIS Windows auto-installer and background update pipeline. |
| **Code Protection** | JavaScript Obfuscator 5.7.0 | Automated multi-pass AST control-flow obfuscation and string encryption for Electron backend security. |
| **Relational Database** | SQL.js 1.14.2 / SQLite 3 | In-memory and local file-based WebAssembly relational database engine. |
| **Database Encryption** | AES-256-GCM (Node Crypto / Web Crypto) | Authenticated encryption at rest for proprietary `.jvsdb` containers. |
| **UI Components** | Radix UI (Latest 2026 suite) + shadcn/ui | Accessible, unstyled primitives styled with custom Tailwind CSS tokens. |
| **Styling & Icons** | Tailwind CSS 3.4.19 + Lucide Icons 1.39.0 | Utility-first CSS styling with dark/light themes and modern vector icons. |
| **Visual Charts** | Recharts 3.10.1 | Dynamic, responsive SVG charts for rendering business analytics. |
| **State & Cache** | TanStack React Query 5.102.8 | Asynchronous server-state management and query caching. |
| **Client Routing** | React Router 7.18.3 | High-performance declarative client-side application routing. |
| **Email Engine** | Nodemailer 9.1.1 + Google OAuth2 | Native SMTP client and OAuth2 mail dispatch pipeline. |
| **Payment QR & Links** | qrcode.react 4.2.0 | Dynamic UPI QR code generation and desktop `upi://` deep-linking. |
| **PDF Generation** | Chromium Vector Print / jsPDF 4.2.1 / pdf-lib 1.17.1 | Pixel-perfect vector PDF documents and statement rendering. |
| **Statement Parsers** | ExcelJS 4.4.0 + pdfjs-dist 6.3.289 + fast-xml-parser 5.11.1 | Multi-format parser for CSV, XLSX, XLS, OFX, and PDF bank statements. |

---

## 📥 **Download & Installation**

JVS FinTech is distributed as a ready-to-run desktop application for Windows.

1. Go to the **[Releases / Assets](https://github.com/JV-Vigneesh/JVS-FinTech/releases)** section on GitHub.
2. Download the latest installer executable: `JVS FinTech-Setup-x.x.x.exe` (or latest release).
3. Run the installer on your system and launch **JVS FinTech**.
4. Follow the built-in setup wizard to configure preferences and register your initial business entity.

---

## 🚀 **Quick Start Guide**

1. **Onboarding:** Launch the app and complete the setup wizard to configure your theme preferences, fiscal calendar, and first Company profile.
2. **Setup Masters:** Add your Customer and Supplier Ledgers and Stock Items (or let the app auto-create them on the fly during transaction entry).
3. **Record Transactions:** Navigate to **Sales Invoices** or **Vouchers**, add items, and click Save to automatically generate your tax invoice PDF, linked Delivery Challan, and double-entry ledger postings.
4. **View Financials & Compliance:** Inspect real-time **Balance Sheet**, **Profit & Loss**, **GSTR-2B Reconciliation**, and **GST Reports** with one-click Excel and PDF exports.

---

## 💾 **Data Storage & Privacy**

JVS FinTech is 100% offline-first. Your financial data is stored exclusively on your local device and is never transmitted externally without explicit user configuration (such as personal Google Drive Backup or configured SMTP/WhatsApp dispatch).

*   **Master Database:** Stored at `Documents/JVS FinTech/master.jvsdb` (Company profiles & global settings).
*   **Company Metadata Database:** Stored at `Documents/JVS FinTech/{CompanyName}/{CompanyName}.jvsdb` (Financial years & company settings).
*   **Financial Year Database:** Stored at `Documents/JVS FinTech/{CompanyName}/{FYName}/{ShortName}_FY{FYName}.jvsdb` (Complete financial transactions & ledger data).
*   **File Format:** Proprietary AES-256-GCM encrypted containers (`.jvsdb`) with `JVSDB` container headers and SHA-256 integrity verification.
*   **Manual Backups:** Simply copy `.jvsdb` files or use the built-in **Backup Management** panel to create compressed snapshots. Each file is distinctively named to prevent accidental mixing during manual file handling.

---

## 🗺️ **Roadmap & Future Enhancements**

For an in-depth breakdown of upcoming architecture, local AI Copilot (Text-to-SQL), OCR receipt parsing, multi-user sync, and enterprise manufacturing ERP modules, see the **[Future Enhancements](FUTURE_ENHANCEMENTS.md)** document.

---

## 📜 **License & Credits**

*   **Organization:** [JVS Tech](https://jvs-technologies.github.io/)
*   **Author & Maintainer:** [JV Vigneesh](https://github.com/JV-Vigneesh)
*   **Bug Reports & Feature Requests:** [Submit via Google Form](https://docs.google.com/forms/d/e/1FAIpQLSf-TtOgweFKTWt3jG5VL5hPjt60G1yM-rUKN09f2genJd17KQ/viewform) or [GitHub Issues](https://github.com/JV-Vigneesh/JVS-FinTech/issues)
*   **License:** Licensed under the End User License Agreement (EULA) — see [license.rtf](public/license.rtf) for details.
