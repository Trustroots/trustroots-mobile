import { TakeEffect, PutEffect } from "redux-saga/effects";

declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

export enum Results {
  MALFORMED,
  UNAUTHORIZED,
  FORBIDDEN,
  CONNECTION_ERROR,
  SERVER_ERROR,
  NOT_FOUND
}

export type User = {
  emailTemporary: string,
  tagline: string,
  description: string,
  gender: string,
  languages: string[],
  provider: string,
  avatarSource: string,
  avatarUploaded: boolean,
  newsletter: boolean,
  locale: string,
  public: boolean,
  acquisitionStory: string,
  _id: string,
  emailHash: string,
  displayName: string,
  username: string,
  created: string,
  email: string,
  lastName: string,
  firstName: string,
  additionalProvidersData: any, // TODO if ever needed
  locationFrom: string,
  locationLiving: string,
  birthdate: string,
  displayUsername: string,
  extSitesCS: string,
  member: {
    since: string,
    tribe: string
  }[],
  pushRegistration: {
    created: string,
    platform: string,
    token: string
  }[],
  seen: string,
  memberIds: string[],

  updated: string,
  // In case the login fails
  message: string
}

export type MessagesCount = {
  unread: number
}

export type UserReference = {
  avatarSource: string,
  avatarUploaded: boolean,
  _id: string,
  emailHash: string
  displayName: string
  username: string
  additionalProvidersData: any
  updated: string
}

export type Conversation = {
  read: boolean,
  _id: string,
  message: {
    _id: string,
    excerpt: string,
  },
  userTo: UserReference,
  userFrom: UserReference,
  updated: string
}
export type Messages = Conversation[]

export type Message = {
  content: string,
  read: boolean,
  _id: string,
  userTo: UserReference,
  userFrom: UserReference,
  created: string
}

export type Offer = {
  _id: string,
  location: number[],
  status: 'maybe' | 'yes',
  type: 'host' | 'meet'
}
export type Offers = Offer[]

export type ApiWatcher = Generator<TakeEffect | PutEffect<{type: string, payload: any}> | Promise<any>, void, never>