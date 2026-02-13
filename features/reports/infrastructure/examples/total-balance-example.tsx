"use client";

import React from "react";
import { useTotalBalance } from "../hooks/use-total-balance";
import { Button } from "@/common/components/ui/button";
import { RefreshCw } from "lucide-react";

export function TotalBalanceExample() {
    const { data, isLoading, error, refetch, isFetching } = useTotalBalance();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-6 bg-gray-100 rounded-lg">
                <div className="animate-pulse">
                    <div className="h-8 w-48 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 w-32 bg-gray-300 rounded mx-auto"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-700 mb-3">Error al cargar el balance: {error.message}</p>
                <Button onClick={() => refetch()} variant="outline" size="sm">
                    Reintentar
                </Button>
            </div>
        );
    }

    const balance = data?.balance ?? 0;
    const isPositive = balance >= 0;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Balance Total</h3>
                <Button
                    onClick={() => refetch()}
                    variant="ghost"
                    size="sm"
                    disabled={isFetching}
                    className="flex items-center gap-2"
                >
                    <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
                    Actualizar
                </Button>
            </div>

            <div className="text-center">
                <p
                    className={`text-4xl font-bold ${isPositive ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {formatCurrency(balance)}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    {isPositive
                        ? "Tienes un balance positivo"
                        : "Tienes un balance negativo"}
                </p>
            </div>
        </div>
    );
}
