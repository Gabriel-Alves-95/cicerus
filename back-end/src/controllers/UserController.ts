import User from '../models/User';
import { default as bcrypt } from 'bcryptjs';
import UserInterface from '../interfaces/user_interface';

class UserController {
    
    async login(data: UserInterface) {

        const { email, password } = data;

        const user: any = await User.findOne({
            where: {
                email
            }
        });

        if(user) {

            const verifyPassword = bcrypt.compareSync(password, user.password);

            if(verifyPassword) {

                const { id, name, email, createdAt, updatedAt } = user;

                return(
                    {
                        status: 200,
                        data: {
                            msg: `Bem-vindo, ${name}!`,
                            user: {
                                id,
                                name,                               
                                email,
                                createdAt,
                                updatedAt      
                            }
                        }
                    }
                );               

            }

            return(
                {
                    status: 401,
                    data: {
                        msg: "Email ou senha inválidos.",
                        user: {}                    
                    }
                }
            );

        }

        return(
            {
                status: 404,
                data: {
                    msg: "Email não cadastrado.",
                    user: {}                    
                }
            }
        );

    }

    async register(data: UserInterface) {

        let { name, email, password } = data;        

        let user: any = await User.findOne({
            where: {
                email: email
            }
        });

        if(user) {

            return(
                {
                    status: 409,
                    data: {
                        msg: `O email ${email} já foi cadastrado.`
                    }
                }
            );

        }

        user = await User.create({        
            name,            
            email,
            password: bcrypt.hashSync(password, 10)            
        });

        return({
            status: 201,
            data: {
                msg: "Conta criada com sucesso!",
                user
            }
        });        

    }

    async editProfile(data: UserInterface) {

        const { id, name, password } = data;         

        const user = await User.findByPk(id);

        if(user) {            

            const dataArray = [
                {"name": name ? name : null} ,                
                {"password": password ? bcrypt.hashSync(password, 10) : null },                
            ].filter( item => Object.values(item)[0] !== null);            

            if(dataArray) {

                let dataJson = {};
                dataArray.forEach( item => dataJson = { ...dataJson, ...item } );

                await user.update(dataJson);
                await user.save();

                return(
                    {
                        status: 200,
                        data: {
                            msg: "Dados alterados com sucesso!",
                            user
                        }
                    }
                );

            }

            return(
                {
                    status: 204,
                    data: {
                        msg: "Você não passou nenhum dado para ser alterado."
                    }
                }
            );
        
        }

        return(
            {
                status: 404,
                data: {
                    msg: "Usuário não encontrado."
                }
            }
        );                 

    }
    
    async confirmEmail(data: any) {        
        
        const { id, url_token, input_token } = data;
        const user = await User.findByPk(id);

        if(user) {

            if( await bcrypt.compareSync(input_token, url_token) ) {

                await user.update({"isEmailValid": true});
                await user.save();
                return(
                    {
                        status: 200,
                        msg: "Parabéns! Conta ativida com sucesso."                        
                    }
                );

            }

            return(
                {
                    status: 400,
                    message: "Token inválido."
                }
            );

        }

        return(
            {
                status: 404,
                message: "Usuário não encontrado.",
                hashed: `${bcrypt.hashSync(input_token)}`
            }
        );

    }

    async resetPassword(data: any) {

        const { id, input_token, url_token } = data;
        const user = await User.findByPk(id);

        if(user) {

            if( await bcrypt.compareSync(input_token, url_token) ) {
                return(
                    {
                        status: 200,
                        message: "Token válido!",
                        redirect: true
                    }
                );
            }

            return(
                {
                    status: 400,
                    message: "Token inválido.",
                    redirect: false
                }
            );

        }

        return(
            {
                status: 404,                
                message: "Usuário não encontrado.",
                redirect: false
            }
        );

    }

}

export default UserController;