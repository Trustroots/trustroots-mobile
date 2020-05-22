import agent from './agent'
import { User } from '../declarations.d'

export const login = (username: string, password: string): Promise<User> =>
  agent('login', {username, password})

export const logout = (): Promise<void> =>
  agent('logout')