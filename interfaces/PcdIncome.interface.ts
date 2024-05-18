export interface PcdIncomeInterface {
    id:                     number;
    pessoa_com_deficiencia: number;
    pessoa_sem_deficiencia: number;
    rotulo:                 string;
}

export interface MappedPcdIncomeInterface extends PcdIncomeInterface {
    etnia: string
    genero: 'Masculino' | 'Feminino'
}
