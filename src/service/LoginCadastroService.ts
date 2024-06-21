import Usuario from "@/models/Usuario";
import axios from "@/axiosConfig";

export class LoginCadastroService {


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

    public async cadastrar(data: Usuario) {
        try {
            const response = await axios.post('/auth/register', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async login(data: Usuario) {
        try {
            const response = await axios.post('/auth/login', data);
            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            return response.data;
        } catch (error) {
            throw error;
        }

    }
}   