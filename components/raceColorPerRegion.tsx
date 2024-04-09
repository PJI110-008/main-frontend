'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { MapBrazil } from 'react-brazil-map'
import { StringLiteral } from "typescript"

const regionPerState = {
    // Norte
    'AM': 'Norte',
    'RR': 'Norte',
    'AP': 'Norte',
    'PA': 'Norte',
    'TO': 'Norte',
    'RO': 'Norte',
    'AC': 'Norte',

    // Nordeste
    'MA': 'Nordeste',
    'PI': 'Nordeste',
    'CE': 'Nordeste',
    'RN': 'Nordeste',
    'PE': 'Nordeste',
    'PB': 'Nordeste',
    'SE': 'Nordeste',
    'AL': 'Nordeste',
    'BA': 'Nordeste',
    
    // Centro-Oeste
    'MT': 'Centro-Oeste',
    'MS': 'Centro-Oeste',
    'GO': 'Centro-Oeste',
    'DF': 'Centro-Oeste',

    // Sudeste
    'SP': 'Sudeste',
    'RJ': 'Sudeste',
    'ES': 'Sudeste',
    'MG': 'Sudeste',
    
    // Sul
    'PR': 'Sul',
    'RS': 'Sul',
    'SC': 'Sul',
}

interface CorRacaData {
    id: number
    Cor_ou_raca: string
    Grande_Regiao: string
    Porcentagem: number
}

interface MappedCorRacaData {
    corRaca: string
    percentage: number
}

interface MappedData {
    [key: string]: MappedCorRacaData[]
}

export default function RaceColorPerRegion() {
    const [district, setDistrict] = useState('')
    const [apiData, setApiData] = useState<any>()

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (district) showDataPerRegion()
    }, [district])

    const showDataPerRegion = () => {
        const region = regionPerState[district]
        const dataByRegion = apiData[region]
        console.log({ region, dataByRegion })
    }

    const fetchData = async () => {
        const apiURL = process.env.NEXT_PUBLIC_API_URL
        const { data } = await axios.get<CorRacaData[]>(apiURL!)
        const regionKeys = [...new Set(data.map(e => e.Grande_Regiao))]
        const mappedData: MappedData = {}

        regionKeys.forEach(region => mappedData[region] = [])

        data.reverse().forEach((value) =>{
            const mappedRegionRaca = mappedData[value.Grande_Regiao].find((region) => region.corRaca === value.Cor_ou_raca)
            if (!mappedRegionRaca) {
                mappedData[value.Grande_Regiao].push({
                    corRaca: value.Cor_ou_raca,
                    percentage: value.Porcentagem
                })
            }
        })

        setApiData(mappedData)
    }

    return (
        <section>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                    <h2 className="h2 mb-4">
                        Classificação por Região
                    </h2>
                    <p className="text-xl text-gray-400">
                        Veja abaixo as classificações realizadas por região brasileira, baseado nos dados do IBGE. Selecione o estado e veja os dados correspondente à região.
                    </p>
                </div>
                <MapBrazil onChange={setDistrict} />
            </div>
        </section>
    )
}
