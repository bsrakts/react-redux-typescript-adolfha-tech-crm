export interface Todo {
    id: number;
    userId: number;
    todo: string;
    completed: boolean;
}

export interface Product {
    id: number;
    title: string;
    stock: number;
    category: string;
}