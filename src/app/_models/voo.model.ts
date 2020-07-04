export class Voo {
    id?: string;
    precoUnit?: number;
    precoTotal?: number;
    direto?: string;
    companhiaIda?: string;
    origemIda?: string;
    origemSiglaIda?: string;
    destinoIda?: string;
    destinoSiglaIda?: string;
    dataIda?: string;
    companhiaVolta?: string;
    origemVolta?: string;
    origemSiglaVolta?: string;
    destinoVolta?: string;
    destinoSiglaVolta?: string;
    dataVolta?: string;
    qtd?: number;
    cidadeDestino?: string;
    paisDestino?: string;
    // 1 = voo, 2 = hotel
    tipo = 1;
    storageKey?: string;
}

export class Companhia {
    CarrierId?: string;
    Name?: string;
}

export class Aeroporto {
    PlaceId?: string;
    Name?: string;
    CityName?: string;
    CountryName?: string;
    IataCode?: string;
}
