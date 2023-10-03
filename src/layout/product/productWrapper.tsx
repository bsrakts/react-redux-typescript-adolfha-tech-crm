import React, { useEffect } from 'react'
import { ProductsLineChart } from '../../components/Products/productsLineChart'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import ProductsPieChart from '../../components/Products/productsPieChart'
import { fetchProductsByAutomotiveAsync, fetchProductsByLaptopAsync, fetchProductsBySmartPhonesAsync } from '../../features/productSlice'
import ProductsBarChart from '../../components/Products/productsBarChart'

const ProductWrapper:React.FC = () => {
    const laptopData = useSelector((state: RootState) => state.products.productsLaptop)
    const smartPhoneData = useSelector((state: RootState) => state.products.productsSmartphones)
    const automotiveData = useSelector((state: RootState) => state.products.productsAutomotive)
    const dispatch = useDispatch<AppDispatch>()

    const laptopDataConfig = {
        series: [{
            name: 'Stock',
            data: laptopData.map(laptop => laptop.stock)
        }],
        categories:laptopData.map(laptopData => laptopData.title),
        stockValue: laptopData?.map((item) => item?.stock)
    }

    const smartPhoneConfig = {
        series:smartPhoneData?.map((smart:any) => smart?.stock),
        label:smartPhoneData?.map((smart: any) => smart?.title)
    }

    const automotiveConfig = {
        series:automotiveData?.map((automative:any) => automative?.stock),
        categories:automotiveData?.map((automative: any) => automative?.title)
    }

    useEffect(() => {
        dispatch(fetchProductsByLaptopAsync());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchProductsBySmartPhonesAsync());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchProductsByAutomotiveAsync())
    }, [dispatch]);

  return (
    <div className='container flex flex-col'>
        <div className='flex flex-col md:flex-row justify-between pb-20'>
        <div className='overflow-hidden' id='chart'>
        <ProductsPieChart series={smartPhoneConfig.series} label={smartPhoneConfig.label} text='SmartPhone Stock'/>
        </div>
        <div className='overflow-hidden' id='chart'>
        <ProductsBarChart series={automotiveConfig.series} categories={automotiveConfig.categories} text='Automotive Stock'/>
        </div>
        </div>
        <div className=''>
            <ProductsLineChart series={laptopDataConfig.series} categories={laptopDataConfig.categories} stockValue={laptopDataConfig.stockValue} text='Laptop Stock'/>
        </div>
    </div>
  )
}

export default ProductWrapper