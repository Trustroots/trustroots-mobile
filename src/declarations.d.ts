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

  // In case the login fails
  message: string
}

export type MessageCount = {
  unread: number
}