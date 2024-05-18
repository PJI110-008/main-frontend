'use client'
import { useEffect, useState } from "react"
import { MapBrazil } from 'react-brazil-map'
import DonutChart from "./DonutChart"
import { getRaceColorPerRegion } from "@/services/api"
import { MappedCorRacaData, MappedRaceColorData } from "@/interfaces/RaceColor.interface"
import { regionPerState } from "@/data/regionsPerState.data"

export default function RaceColorPerRegion() {
    const [district, setDistrict] = useState('')
    const [apiData, setApiData] = useState<MappedRaceColorData>()
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
        const data = await getRaceColorPerRegion()
        const regionKeys = [...new Set(data.map(e => e.grande_regiao))]
        const mappedData: MappedRaceColorData = {}

        regionKeys.forEach(region => mappedData[region] = [])

        data.reverse().forEach((value) => {
            const mappedRegionRaca = mappedData[value.grande_regiao].find((region) => region.corRaca === value.cor_ou_raca)
            if (!mappedRegionRaca) {
                mappedData[value.grande_regiao].push({
                    corRaca: value.cor_ou_raca,
                    percentage: value.porcentagem
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
