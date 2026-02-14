/**
 * CSV Report Headers
 * 
 * Define las columnas del reporte CSV generado para reportes financieros.
 * Estas columnas incluyen información básica del reporte y el usuario que lo generó.
 */
export const CSV_REPORT_HEADERS = [
    "ID",
    "Total Ingresos",
    "Total Egresos",
    "Balance",
    "Generado Por",
    "Fecha de Generación"
] as const;

export const CSV_REPORT_HEADERS_LINE = CSV_REPORT_HEADERS.join(",");
