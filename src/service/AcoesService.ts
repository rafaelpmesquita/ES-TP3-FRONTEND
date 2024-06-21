import Usuario from "@/models/Usuario";
import axios from "@/axiosConfig";
import Acoes from "@/models/Acoes";

export class AcoesService {


    // public async recalcularAcordoExtrajudicial(request: ParcelaAlteradaExtrajudicialRequest) {
    //     return this.ajustarParcelas(request);

    //     let params = '?';

    //     for (const [chave, valor] of Object.entries(request)) {
    //         if (valor && chave !== 'pagina') {
    //             params += `&${chave}=${valor}`;
    //         }
    //     }
    //     const url = 'api/calculo-parcela-acordo'.concat(params);
    //     return await this.http.get(url);
    // }

    public async buscarAcoes() {
        try {
            const response = await axios.get('/actions');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async adicionarAcao(data: Acoes) {
        try {
            const response = await axios.post('/actions', data);
            return response.data;
        } catch (error) {
            throw error;
        }

    }
}   