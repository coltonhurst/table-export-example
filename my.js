function downloadTableAsExcel() {
    // Create the table with the appropriate properties
    var table = TableExport(document.getElementsByTagName("table"), {
        headers: true,                      // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
        footers: true,                      // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
        formats: ["xlsx"],                  // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
        filename: "testfilename",           // (id, String), filename for the downloaded file, (default: 'id')
        bootstrap: false,                   // (Boolean), style buttons using bootstrap, (default: true)
        exportButtons: false,               // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
        position: "bottom",                 // (top, bottom), position of the caption element relative to table, (default: 'bottom')
        ignoreRows: null,                   // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
        ignoreCols: null,                   // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
        trimWhitespace: true,               // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
        RTL: false,                         // (Boolean), set direction of the worksheet to right-to-left (default: false)
        sheetname: "testsheetname"          // (id, String), sheet name for the exported spreadsheet, (default: 'id')
    });

    // Get the table's export data
    var exportData = table.getExportData();

    // Fill the exportDataProperties array with confirmed properties it actually owns
    var exportDataProperties = [];
    for (var property in exportData) {
        if (exportData.hasOwnProperty(property)) {
            exportDataProperties.push(property);
        }
    }

    // If there is at least 1 property, the first (and likely only) property *should be* the excel data
    // We need this property name to get the xlsx data, and then we can actually export the data to a file for download
    if (exportDataProperties.length > 0) {
        var xlsxData = exportData[exportDataProperties[0]].xlsx;
        table.export2file(xlsxData.data, xlsxData.mimeType, xlsxData.filename, xlsxData.fileExtension, xlsxData.merges, xlsxData.RTL, xlsxData.sheetname);
    }
}