import { mergeTypeDefs } from '@graphql-tools/merge'
import Scalar from './Scaler'
import User from './User'
export default mergeTypeDefs([Scalar, User])
