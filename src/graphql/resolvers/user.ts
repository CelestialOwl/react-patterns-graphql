//todo get Users
import { doLogin, getUserBy } from '../../lib/auth'
import { getUserData } from '../../lib/jwt'
import models from 'models'
import {
  IUser,
  IToken,
  ILoginInput,
  ICreateUserInput,
  IModels,
} from '../../types'

export default {
  Query: {
    getUsers: (_: any, args: any, {models}: { models: IModels }): IUser[] => {console.log(models, "conkfjsdalkfjsdl");return models.User.findAll()},
    getUser: async (
      _: any,
      { at }: { at: string },
      { models }: { models: IModels }
    ): Promise<any> => {
      const connectedUser = await getUserData(at)
      console.log("afsdfaf", at, connectedUser)
      if (connectedUser) {
        const user = await getUserBy(
          {
            id: connectedUser.id,
            email: connectedUser.email,
            active: connectedUser.active,
            role: connectedUser.role,
          },
          models
        )
        if (user){
          return {
            ...connectedUser
          }
        }

      }else
      return {
        id: '',
        username: '',
        password: '',
        email: '',
        role: '',
        active: false,
      }
    },
  },
  Mutation: {
    createUser: (
      _: any,
      { input }: { input: ICreateUserInput },
      { models }: { models: IModels }
    ): IUser => models.User.create({ ...input }),
    login: (
      _: any,
      { input }: { input: ILoginInput },
      { models }: { models: IModels }
    ): Promise<IToken> => doLogin(input.email, input.password, models),
  },
}
