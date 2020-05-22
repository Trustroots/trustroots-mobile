import agent from './agent'
import { User, MessagesCount, Messages } from '../declarations.d'

export const login = (username: string, password: string): Promise<User> =>
  agent('login', {username, password})

export const logout = (): Promise<void> =>
  agent('logout')

export const messagesCount = async (): Promise<number> =>
  (await agent('messagesCount') as MessagesCount).unread

export const messages = async (): Promise<Messages> =>
  agent('messages')