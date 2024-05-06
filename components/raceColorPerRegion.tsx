'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { MapBrazil } from 'react-brazil-map'
import DonutChart from "./DonutChart"

const regionPerState: any = {
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
    const [apiData, setApiData] = useState<MappedData>()
    const [selectedData, setSelectedData] = useState<MappedCorRacaData[]>()

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (district) showDataPerRegion()
    }, [district])

    const showDataPerRegion = () => {
        const region = regionPerState[district]
        const dataByRegion = apiData![region]
        setSelectedData(dataByRegion)
    }

    const fetchData = async () => {
        const apiURL = process.env.NEXT_PUBLIC_API_URL
        const { data } = await axios.get<CorRacaData[]>(apiURL!)
        const regionKeys = [...new Set(data.map(e => e.Grande_Regiao))]
        const mappedData: MappedData = {}

        regionKeys.forEach(region => mappedData[region] = [])

        data.reverse().forEach((value) => {
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
            <div className="max-w-6xl mx-auto px-4 sm:px-6" id="main-charts">
                {/* Section header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                    <h2 className="h2 mb-4">
                        Classificação por Região { selectedData ? `(${regionPerState[district]})` : '' }
                    </h2>
                    <p className="text-xl text-gray-400">
                        Veja abaixo as classificações realizadas por região brasileira, baseado nos dados do IBGE. Selecione o estado e veja os dados correspondente à região.
                    </p>
                </div>
                <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-1 lg:grid-cols-2 lg:gap-16 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks>
                    <div className='sm:flex sm:justify-center' data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
                        <MapBrazil onChange={setDistrict} />
                    </div>
                    <div className='sm:flex sm:justify-center' data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
                        {
                            selectedData ? (
                                <DonutChart state={{
                                    options: {
                                        labels: selectedData!.map(e => e.corRaca),
                                        // markers: {
                                            // colors: ['#fff']
                                            
                                        // }
                                    },
                                    series: selectedData!.map(e => e.percentage)
                                }} />
                            ) : ''
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
