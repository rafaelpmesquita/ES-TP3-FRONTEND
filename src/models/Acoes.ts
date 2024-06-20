export default class Acoes {
    public nomeDaAcao!: string;
    public nomeDoUsuario!: string;
    public tipoDeAcao!: string;
    public temperatura!: string;
    public data!: Date;

    constructor(nomeDaAcao: string, nomeDoUsuario: string, tipoDeAcao: string, temperatura: string, data: Date) {
        this.nomeDaAcao = nomeDaAcao;
        this.nomeDoUsuario = nomeDoUsuario;
        this.tipoDeAcao = tipoDeAcao;
        this.temperatura = temperatura;
        this.data = data;
    }
}