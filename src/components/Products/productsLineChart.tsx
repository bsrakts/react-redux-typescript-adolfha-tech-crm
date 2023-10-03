import React, { useEffect } from "react"
import ReactApexChart from "react-apexcharts"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { apexLineConfig } from "../../data"
import { SeriesType } from "../../type"

interface LineProps {
    series: SeriesType[];
    categories: string[];
    stockValue: number[];
    text?: string;
}


export const ProductsLineChart: React.FC<LineProps> = ({series,categories,stockValue,text}) => {
    const config = apexLineConfig(series,categories, stockValue)


    return (
        <div id='chart' className='border border-stone-200 px-2 md:px-12 py-8 rounded-2xl mb-20'>
            <h1 className='text-[#D602D4] font-bold text-center w-2/4 md:w-2/12 text-xl border-b border-[#D602D4] mb-4'>{text}</h1>
            <ReactApexChart
                series={config?.series}
                options={config?.options}
                type="line"
                height={400}
            />
        </div>
    )
}