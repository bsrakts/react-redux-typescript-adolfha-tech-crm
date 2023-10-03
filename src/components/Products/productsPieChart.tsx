import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { apexPieConfig } from '../../data'

interface PieProps {
    series:number[],
    label:string[]
    text?: string
}

const ProductsPieChart:React.FC<PieProps> = ({series,label,text}) => {
    const config = apexPieConfig(series,label)

    return (
        <div id='chart' className='border border-stone-200 px-2 md:px-12 py-7 rounded-2xl mb-20 md:mb-0'>
            <h1 className='text-[#D602D4] font-bold text-center w-2/4 md:w-1/3 text-xl border-b border-[#D602D4] mb-4'>{text}</h1>
            <ReactApexChart options={config.options} series={config.series} type="pie" width={600}/>
        </div>
    )
}

export default ProductsPieChart