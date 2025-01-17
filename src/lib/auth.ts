import {encrypt, isPasswordMatch} from '@contentpi/lib'
import {IToken, IModels, IUser } from '../types'
import {createToken} from './jwt'

export const getUserBy = async (where: any, models: IModels): Promise<IUser> => {
const user = await models.User.findOne({
    where,
    raw: true
})
return user
}
export const doLogin = async (
    email: string,
    password: string,
    models: IModels
): Promise<IToken> => {
    const user = await getUserBy({email}, models)
    if (!user){
        throw new Error('Invalid Login')
    }

    const passwordMatch = isPasswordMatch(encrypt(password), user.password)

    const isActive = user.active

    if (!passwordMatch){
        throw new Error('Invalid Login')
    }

    if (!isActive){
        throw new Error('Your account is not activated yet')
    }

    const [token] = await createToken(user)

    return {token}
}