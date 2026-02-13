import React from 'react'
import { ShowBalance } from './components/show-balance'
import { DownloadReportCSV } from './components/download-report-csv'
import { ChartDataExample } from '../infrastructure/examples/chart-data-example'

const Reports = () => {
    return (
        <div className='w-full h-full  max-h-[calc(100vh-134px)]'>
            <div className='flex justify-end px-16 py-4 mb-8'>
                <ShowBalance balance={1000000} />
            </div>
            <div className='w-full flex justify-center items-center h-64'>
                <ChartDataExample />
            </div>
            <div className='mt-24 flex justify-center'>
                <DownloadReportCSV />
            </div>
        </div>
    )
}

export default Reports