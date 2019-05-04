export class Menu {

    id: number;
    nome: string;
    url: string;
    nomeIcone: string;
    codigoReferencia: string;
    visivel: boolean;
    menuPai: Menu;
    filhos: Array<Menu>;
}