import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { apexBarConfig } from '../../data'

interface PieProps {
    series:number[],
    categories:string[]
    text?: string
}

const ProductsBarChart:React.FC<PieProps> = ({series,categories,text}) => {
    const config = apexBarConfig(series,categories)

    return (
        <div id='chart' className='border border-stone-200 px-2 md:px-12 py-8 rounded-2xl'>
            <h1 className='text-[#D602D4] font-bold text-center w-2/4 md:w-1/3 text-xl border-b border-[#D602D4] mb-4'>{text}</h1>
            <ReactApexChart options={config.options} series={config.series} type="bar" width={600}/>
        </div>
    )
}

export default ProductsBarChart