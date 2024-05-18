'use client'
import { getPcdIncome } from "@/services/api"
import { useEffect, useState } from "react"
import { MappedPcdIncomeInterface } from "@/interfaces/PcdIncome.interface"
import ColumnChart from "./ColumnChart"

export default function PcdIncome() {

    const [PCDData, setPCDData] = useState<MappedPcdIncomeInterface[]>()
    const [dataForChart, setDataForChart] = useState<any>()

    const [etnias, setEtnias] = useState<string[]>()

    const [selectedGender, setSelectedGender] = useState('');
    const [selectedEthnicity, setSelectedEthnicity] = useState('');

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        handleSelection()
    }, [selectedGender, selectedEthnicity])

    const fetchData = async () => {
        const data = await getPcdIncome()
        const etnias: string[] = []
        const mappedData: MappedPcdIncomeInterface[] = [...new Set(data)]
            .filter(e => !e.rotulo.toLowerCase().includes('total') && e.rotulo.includes('_'))
            .map(e => {
                const [genero, etnia] = e.rotulo.split('_')
                if (!etnias.includes(etnia)) etnias.push(etnia)
                return {
                    ...e,
                    genero: genero.toLowerCase() === 'm' ? 'Masculino' : 'Feminino',
                    etnia: etnia
                }
            })

        setPCDData(mappedData)
        setEtnias(etnias)
    }

    const handleGenderChange = (event: any) => {
        setSelectedGender(event.target.value);
        setSelectedEthnicity('');
    };

    const handleEthnicityChange = (event: any) => {
        setSelectedEthnicity(event.target.value);
        setSelectedGender('');
    };

    const handleSelection = () => {
        const series: any[] = []
        const categories: string[] = ['Com deficiência', 'Sem deficiência']
        if (!PCDData || !PCDData.length) return

        PCDData?.forEach(e => {
            if (e.genero === selectedGender) {
                const foundIndex = series.findIndex(s => s.name === e.etnia)
                if (foundIndex === -1 && e.etnia) {
                    series.push({
                        name: e.etnia,
                        data: [e.pessoa_com_deficiencia, e.pessoa_sem_deficiencia]
                    })
                }
            }
            if (e.etnia === selectedEthnicity) {
                const foundIndex = series.findIndex(s => s.name === e.genero)
                if (foundIndex === -1 && e.etnia) {
                    series.push({
                        name: e.genero,
                        data: [e.pessoa_com_deficiencia, e.pessoa_sem_deficiencia]
                    })
                }
            }
        })
        setDataForChart({ categories, series })
    }

    return (
        <section>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6" id="main-charts">
                {/* Section header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                    <h2 className="h2 mb-4">
                        Diferenças Salariais por Sexo e Deficiência
                    </h2>
                    <p className="text-xl text-gray-400">
                        O gráfico abaixo apresenta as diferenças salariais entre homens e mulheres, com e sem deficiência, com base em dados do IBGE. Utilize o seletor para escolher entre visualizar as diferenças salariais por sexo ou por condição de deficiência:
                    </p>
                    <p className="text-xl text-gray-400">
                        - <strong>Selecione Sexo</strong>: Escolha entre masculino e feminino para ver as diferenças salariais entre pessoas com e sem deficiência.
                        <br />
                        - <strong>Selecione Deficiência</strong>: Escolha entre pessoas com ou sem deficiência para ver as diferenças salariais entre homens e mulheres dentro dessa categoria.
                    </p>
                </div>

                <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-1 lg:grid-cols-2 lg:gap-16 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks>
                    <div className="lg:ml-32" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
                        {/* GENDER SELECTION */}
                        <div className="my-4">
                            <label htmlFor="gender-select" className="block text-lg text-gray-200">
                            Selecione o Gênero:
                            </label>
                            <select
                                id="gender-select"
                                value={selectedGender}
                                onChange={handleGenderChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-700 text-white"
                            >
                                <option disabled value="">Escolha um gênero</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </select>
                        </div>
                        {/* ETNIA SELECION */}
                        <div className="my-4">
                            <label htmlFor="ethnicity-select" className="block text-lg text-gray-200">
                                Selecione a Etnia:
                            </label>
                            <select
                                id="ethnicity-select"
                                value={selectedEthnicity}
                                onChange={handleEthnicityChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-700 text-white"
                            >
                                <option disabled value="">Escolha uma etnia</option>
                                {etnias && etnias.map(etnia => <option key = {etnia} value={etnia}>{etnia}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className='sm:flex sm:justify-center' data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
                        {
                            dataForChart ? (
                                <ColumnChart state={{
                                    options: {
                                        xaxis: {
                                            categories: dataForChart.categories,
                                        }
                                        // markers: {
                                            // colors: ['#fff']
                                            
                                        // }
                                    },
                                    series: dataForChart.series
                                }} />
                            ) : ''
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
