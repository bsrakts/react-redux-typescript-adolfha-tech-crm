import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { apexPieConfig } from '../../data'

interface PieProps {
    series:number[],
    label:string[]
}

const ProductsPieChart:React.FC<PieProps> = ({series,label}) => {
    const config = apexPieConfig(series,label)

    return (
        <div id='chart'>
            <ReactApexChart options={config.options} series={config.series} type="pie" width={380} />
        </div>
    )
}

export default ProductsPieChart