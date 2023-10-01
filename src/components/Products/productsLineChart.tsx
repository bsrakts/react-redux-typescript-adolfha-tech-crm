import React, { useEffect } from "react"
import ReactApexChart from "react-apexcharts"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { fetchProductsByLaptopAsync } from "../../features/productSlice"


export const ProductsLineChart: React.FC = () => {
    const productsData = useSelector((state: RootState) => state.products.productsLaptop)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchProductsByLaptopAsync());
    }, [dispatch]);

    console.log(productsData);

    const stockValue = productsData?.map((stock) => stock?.stock)

    const series = [{
        name: 'Stock',
        data: productsData.map(product => product.stock)
    }];

    const categories = productsData.map(product => product.title);


    const apexChartConfig = {
        series,
        options: {
            chart: {
                height: 350,
                type: 'line' as const,
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 10,
                    left: 7,
                    blur: 10,
                    opacity: 0.1,
                },
                toolbar: {
                    show: true,
                    download: true,
                },
            },
            title: {
                text: "Laptop Stock",
                align: 'center' as const,
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: "Helvetica",
                    color: '#D602D4'
                },
            },
            colors: ['#D602D4'],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: 'smooth' as const,
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.1
                },
            },
            markers: {
                size: 1,
            },
            xaxis: {
                categories: categories,
                title: {
                    text: 'Category',
                },
                type: 'category' as const,
            },
            yaxis: {
                title: {
                    text: 'Aktivite',
                },
                min: Math.min(...stockValue) > 5 ? Math.min(...stockValue) - 5 : Math.min(...stockValue),
                max: Math.max(...stockValue) + 5,
                forceNiceScale: true,
                tickAmount: 5
            },
            tooltip: {
                style: {
                    fontSize: '13px',
                },
                y: {
                    formatter: function (val: any) {
                        return val + ''
                    },
                },
                x: {
                    formatter: function () {
                        return ''
                    },
                },
            },
            legend: {
                position: 'top' as const,
                horizontalAlign: 'right' as const,
                floating: true,
                offsetY: -25,
                offsetX: -5,
            },
        },
    }


    return (
        <div className="p-5 bg-white shadow">
            <ReactApexChart
                series={apexChartConfig?.series}
                options={apexChartConfig?.options}
                type="line"
                height={400}
            />
        </div>
    )
}