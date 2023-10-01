import { AxiosError } from "axios";
import { Product } from "../type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductByAutomotive, fetchProductByLaptops, fetchProductBySmartPhones } from "../api/api";


interface ProductState {
    productsLaptop:Product[];
    productsSmartphones: Product[];
    productsAutomotive: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: AxiosError | any;
}

const initialState: ProductState = {
    productsLaptop: [],
    productsSmartphones: [],
    productsAutomotive: [],
    status: 'idle',
    error: null
}

export const fetchProductsByLaptopAsync = createAsyncThunk('products/fetchProduct', async () => {
    try {
        const response = await fetchProductByLaptops();
        return response?.data?.products;
    } catch (error: AxiosError | any) {
        throw Error(error);
    }
});

export const fetchProductsBySmartPhonesAsync = createAsyncThunk('products/fetchProduct', async () => {
    try {
        const response = await fetchProductBySmartPhones();
        return response?.data?.products;
    } catch (error: AxiosError | any) {
        throw Error(error);
    }
});

export const fetchProductsByAutomotiveAsync = createAsyncThunk('products/fetchProduct', async () => {
    try {
        const response = await fetchProductByAutomotive();
        return response?.data?.products;
    } catch (error: AxiosError | any) {
        throw Error(error);
    }
});

const productSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByLaptopAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByLaptopAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productsLaptop = action.payload || [];
            })
            .addCase(fetchProductsByLaptopAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default productSlice.reducer;