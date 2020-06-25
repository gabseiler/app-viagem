export class Hotel {
    id?: string;
    nome?: string;
    nota?: string;
    local?: string;
    preco?: string;
    fotoUrl?: string;
    checkIn?: string;
    adultos?: string;
    noites?: string;
    quartos?: string;
    // 1 = voo, 2 = hotel
    tipo = 2;
    storageKey?: string;
}

export class Local {
    id?: string;
    nome?: string;
}
