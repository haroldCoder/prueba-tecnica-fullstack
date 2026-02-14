import React from 'react'
import { ShowBalance } from './components/show-balance'
import { DownloadReportCSV } from './components/download-report-csv'
import { useChartData, useCsvReport, useTotalBalance } from '@/features/reports/infrastructure/hooks'
import { ChartDataMovements } from './components/chart-data-movements'

const Reports = () => {

    const { data: chartData, isLoading } = useChartData();
    const { data: balance } = useTotalBalance();
    const { data: reportCsv, isLoading: isLoadingReportCsv, error: errorReportCsv, refetch: refetchReportCsv } = useCsvReport();

    return (
        <div className='w-full h-full  max-h-[calc(100vh-134px)]'>
            <div className='flex justify-end px-16 py-4 mb-8'>
                <ShowBalance balance={balance?.balance || 0} />
            </div>
            <div className='w-full flex justify-center items-center'>
                <ChartDataMovements loading={isLoading} data={chartData} />
            </div>
            <div className='mt-24 flex justify-center'>
                <DownloadReportCSV data={reportCsv || { csv: "" }} isLoading={isLoadingReportCsv} error={errorReportCsv} refetch={refetchReportCsv} />
            </div>
        </div>
    )
}

export default Reports