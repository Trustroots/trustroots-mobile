import agent from './agent'
import { User, MessageCount } from '../declarations.d'

export const login = (username: string, password: string): Promise<User> =>
  agent('login', {username, password})

export const logout = (): Promise<void> =>
  agent('logout')

export const messageCount = async (): Promise<number> =>
  (await agent('messageCount') as MessageCount).unread