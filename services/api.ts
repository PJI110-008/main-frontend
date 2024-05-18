import { PcdIncomeInterface } from "@/interfaces/PcdIncome.interface"
import axios from "axios"

interface CorRacaData {
    id: number
    cor_ou_raca: string
    grande_regiao: string
    porcentagem: number
}

const apiURL = process.env.NEXT_PUBLIC_API_URL

const baseApi = axios.create({
    baseURL: apiURL
})

export const getRaceColorPerRegion: () => Promise<CorRacaData[]> = async () => {
    try {
        const { data } = await baseApi.get<CorRacaData[]>('/')
        return data
    } catch (error) {
        console.log(error)
        return []
    }
}

export const getPcdIncome: () => Promise<PcdIncomeInterface[]> = async () => {
    try {
        const { data } = await baseApi.get<PcdIncomeInterface[]>('/rendimento-pcd')
        return data
    } catch (error) {
        console.log(error)
        return []
    }
}
