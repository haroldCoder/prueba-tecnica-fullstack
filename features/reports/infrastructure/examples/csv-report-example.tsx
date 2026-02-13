"use client";

import React from "react";
import { useCsvReport } from "../hooks/use-csv-report";
import { Button } from "@/common/components/ui/button";
import { GoDownload } from "react-icons/go";

export function CsvReportExample() {
    const { data, isLoading, error, refetch } = useCsvReport();

    const handleDownload = () => {
        if (!data?.csv) return;

        const blob = new Blob([data.csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `report-${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    if (isLoading) {
        return (
            <div className="flex items-center gap-2">
                <Button disabled>
                    <GoDownload className="mr-2" />
                    Generando reporte...
                </Button>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col gap-2">
                <p className="text-red-500">Error al cargar el reporte: {error.message}</p>
                <Button onClick={() => refetch()} variant="outline">
                    Reintentar
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <Button onClick={handleDownload} className="flex items-center gap-2">
                <GoDownload />
                Descargar Reporte CSV
            </Button>

            <details className="text-sm">
                <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                    Ver vista previa del CSV
                </summary>
                <pre className="mt-2 p-4 bg-gray-100 rounded overflow-x-auto max-h-64">
                    {data?.csv}
                </pre>
            </details>
        </div>
    );
}
