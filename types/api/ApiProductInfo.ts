export default interface ApiProductInfo {
    id?: number
    name: string
    image?: File
    image_url?: string
    description: string
    category_id: number | string
    category?: {
        id: number
        name: number
    }
    price: number
    supply_quantum: number
    stock: number
}