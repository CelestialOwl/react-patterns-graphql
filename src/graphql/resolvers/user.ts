//todo get Users
import {doLogin, getUserBy} from '../../lib/auth'
import {} from '../../lib/jwt'
import {IUser, IToken, ILoginInput, ICreateUserInput, IModels} from '../../types'

export default {
    Query: {
        getUsers: (
            _: any,
            ctx: { models: IModels }
        ): IUser[] => ctx.models.User.findAll(),
        // getUsers: (
        //     _: any,
        //     args: any,
        //     { models }: { models: Imodels }

        // ): Iuser[] => ctx.models.user.FindAll()
        getUser: async (
            _: any,
            {at} : {at: string},
            {models}: {models: IModels}
        ): Promise<any> => {
            const connectedUser = await getUserData(at)
            if (connectedUser){
                const user = await getUserBy({
                    id: connectedUser.id,
                    email: connectedUser.email,
                    active: connectedUser.active
                },
            [connectedUser.role],
            models
            )

            return {
                id: '',
                username: '',
                password: '',
                email: '',
                role: '',
                active: false
            }
            }
        }
    },
    Mutation: {
        createUser: (
            _: any,
            {input } : { input: ICreateUserInput },
            { models }: { models: IModels },
        ): IUser => models.User.create({ ...input}),
        login: (
            _: any,
            {input}: {input: ILoginInput},
            {models} : {models: IModels }
        ): Promise<IToken> => doLogin(input.email, input.password, models)
    }
}