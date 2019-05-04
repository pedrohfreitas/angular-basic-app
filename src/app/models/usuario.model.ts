export class Usuario {
    constructor(id: number, nome:string, sobrenome: string, dataNascimento: Date, situacao: string){
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dataNascimento = dataNascimento;    
        this.situacao = situacao;
    }
    
    id: Number;
    nome: string;
    sobrenome: string;
    dataNascimento: Date;
    situacao: string;
}