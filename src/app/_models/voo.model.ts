export class Voo {
    id?: string;
    preco?: string;
    direto?: string;
    companhiaIda?: string;
    origemIda?: string;
    destinoIda?: string;
    dataIda?: string;
    companhiaVolta?: string;
    origemVolta?: string;
    destinoVolta?: string;
    dataVolta?: string;
}

export class Companhia {
    CarrierId?: string;
    Name?: string;
}

export class Aeroporto {
    PlaceId?: string;
    Name?: string;
    CityName?: string;
}