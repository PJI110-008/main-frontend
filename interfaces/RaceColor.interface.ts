export interface MappedCorRacaData {
    corRaca: string
    percentage: number
}

export interface MappedRaceColorData {
    [key: string]: MappedCorRacaData[]
}
