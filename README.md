# 📝 Log Monitoring App

## 📌 Overview

This project is a **log monitoring web application** built with **vanilla JavaScript and HTML**.  
It reads a `logs.log` file, calculates job durations, and flags jobs that exceed processing time limits:

- ⚠️ `[WARNING]` if duration > 5 minutes  
- ❌ `[ERROR]` if duration > 10 minutes

---

## 📁 Folder Structure

log-monitoring-app/
├── index.html # Main UI
├── app.js # Log processing logic
├── logs.log # Input log file
├── test.js # sample test cases
├── output/
│ └── log.log # Output warnings/errors for download
| └── log-report.xlsx # Output warnings/errors for download


## 🚀 How to Run

### ✅ Using Live Server (Recommended)

1. Open the project folder in **VS Code**.
2. Ensure `logs.log` is in the **project root folder** (next to `index.html`).
3. Install and start **Live Server** extension.
4. Right-click `index.html` and select **"Open with Live Server"**.
5. The log monitor will automatically read `logs.log` and display:

   - A plain text log report by default
   - A summary of job durations, warnings, and errors
   - Toggle view for table display

---

## 🧭 How to Use

- 📄 `logs.log` must follow the format:
HH:MM:SS,Description,START|END,PID



- 🔁 Use the **"Switch to Table View"** button to toggle between:
- Plain text report (with logs and summary)
- Table view with only warnings and errors

- 📥 Use **"Download Report"** to export:
- `.log` file in **plain text view** (only warnings/errors)
- `.xlsx` file in **table view**

---

## 📊 Features

| Feature               | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| ⏱ Duration Parsing    | Calculates job duration between START and END                               |
| ⚠️ Warnings & Errors  | Jobs > 5 min → WARNING, > 10 min → ERROR                                     |
| 📄 Incomplete Handling| Skipped from output, but counted in summary                                 |
| 📋 Summary            | Total jobs, completed, incomplete, warnings, errors, longest job            |
| 📥 Download Report    | `.log` or `.xlsx` file based on view                                        |
| 🔄 Toggle View        | Switch between plain text and table view                                    |

---

## 🧪 Sample Log Entry Format
11:35:23,scheduled task 032, START,37980
11:35:56,scheduled task 032, END,37980

---

## 🧾 Output Summary Example
[WARNING] Job 45135 (scheduled task 515) took 320 seconds (5.33 min).
[ERROR] Job 70808 (scheduled task 182) took 1001 seconds (16.68 min).

=== Summary ===
Total Jobs: 45
Completed Jobs: 43
Incomplete Jobs: 2
Jobs > 5 minutes: 3
Jobs > 10 minutes: 1
Longest Job: 182 (scheduled task 182) took 1001 seconds (16.68 min)

---

## 📦 External Libraries Used

- [SheetJS](https://sheetjs.com/) – for exporting table view as Excel file
  - Dynamically imported via CDN in `index.html` when needed:
    ```html
    <script type="module">
      import * as XLSX from 'https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs';
    </script>
    ```

---

## 🙋 Notes

- This is a frontend-only solution — no backend required
- It reads directly from `logs.log` file and processes everything in the browser
- Make sure file paths remain intact when moving folders

---

## 📬 Author

Built as part of a frontend coding challenge  
Demonstrates:
- File parsing
- Duration calculations
- Conditional formatting
- Dynamic DOM rendering
- Excel/text file exports

---
