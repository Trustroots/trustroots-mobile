import agent from './agent'
import { User, MessagesCount, Messages, Conversation, Offers } from '../declarations.d'

export const login = (username: string, password: string): Promise<User> =>
  agent('login', {username, password})

export const logout = (): Promise<void> =>
  agent('logout')

export const unreadCount = async (): Promise<number> =>
  (await agent('messagesCount') as MessagesCount).unread

export const markRead = async (messageIds: string[]): Promise<void> =>
  agent('markRead', {messageIds})

export const messages = async (): Promise<Messages> =>
  agent('messages')

export const conversation = async (conversationId: string): Promise<Conversation> =>
  agent('conversation', null, {conversationId})

export const offers = async (northEastLat: number, northEastLng: number, southWestLat: number, southWestLng: number, filters: any = {}): Promise<Offers> =>
  agent('offers', null, {northEastLat, northEastLng, southWestLat, southWestLng, filters: JSON.stringify(filters)})

export const offer = async (offerId: string): Promise<Conversation> =>
  agent('offer', null, {offerId})
