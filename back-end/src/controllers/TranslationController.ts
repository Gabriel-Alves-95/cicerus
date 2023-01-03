import { Translation } from '../models/Translation';
import GenericController from './GenericController';
import TranslationInterface from '../interfaces/translation_interface';

class TranslationController extends GenericController {

    constructor() {
        super()
    }    

    async createTranslation(data: TranslationInterface) {        

        try {
            await Translation.create(data);
            return(
                {
                    status: 201,
                    message: "Tradução criada com sucesso!"                    
                }
            );
        } catch(err) {
            return(
                {
                    status: 500,
                    message: "Erro ao criar tradução.", 
                    errorDescription: err                   
                }
            );
        }
        
    }

    async updateTranslation(_id: string, data: TranslationInterface) {

        try {
            await Translation.findByIdAndUpdate(_id, data);
            return(
                {
                    status: 200,
                    message: "Tradução editada com sucesso!"    
                }        
            );
        } catch(err) {
            return(
                {
                    status: 500,
                    message: "Erro ao editar tradução.", 
                    errorDescription: err                   
                }
            );
        }
        
    }

    async deleteTranslation(_id: string) {

        try {
            await Translation.findByIdAndDelete(_id);
            return(
                {
                    status: 200,
                    message: "Tradução deletada com sucesso!"
                }
            );
        } catch(err) {
            return(
                {
                    status: 500,
                    message: "Erro ao deletar tradução.", 
                    errorDescription: err                   
                }
            );
        }
        
    }

    async getTranslation(_id: string) {

        try {
            const translation = await Translation.findById(_id);
            return(
                {
                    status: 200,
                    translation
                }
            );
        } catch(err) {
            return(
                {
                    status: 500,
                    message: "Erro ao buscar tradução.", 
                    errorDescription: err                   
                }
            );
        }

    }

    async getTranslations(query: any) {       

        try {           
            let { user_id, page, limit } = query;

            let res = this.generatePagination(limit, page);
            limit = res[0];
            page = res[1];

            const translations = await Translation.find({user_id}).skip(page*limit).limit(limit);
            const total = await Translation.find({user_id});
            const count = Math.ceil( total.length / limit );

            return(
                {
                    status: 200,
                    rows: translations,
                    count
                }
            );
        } catch(err) {
            return(
                {
                    status: 500,
                    message: "Erro ao buscar traduções.", 
                    errorDescription: err                   
                }
            );
        }

    }    
    
}

export default TranslationController;