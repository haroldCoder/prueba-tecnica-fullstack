interface DataCSV {
    csv: string
}

export function downloadCSV(data: DataCSV) {
    const blob = new Blob([data.csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `report-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}