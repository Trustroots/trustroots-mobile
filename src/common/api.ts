import agent from './agent'
import { User, MessagesCount, Messages, Conversation } from '../declarations.d'

export const login = (username: string, password: string): Promise<User> =>
  agent('login', {username, password})

export const logout = (): Promise<void> =>
  agent('logout')

export const unreadCount = async (): Promise<number> =>
  (await agent('messagesCount') as MessagesCount).unread

export const markRead = async(messageIds: string[]): Promise<void> =>
  agent('markRead', {messageIds})

export const messages = async(): Promise<Messages> =>
  agent('messages')

export const conversation = async(conversationId: string): Promise<Conversation> =>
  agent('conversation', null, {conversationId})