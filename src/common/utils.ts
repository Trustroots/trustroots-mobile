import { UserReference } from '../declarations'

export const userImageURL = (user: UserReference, size: number = 64): string =>
  user.avatarSource === 'local' ? `https://www.trustroots.org/uploads-profile/${user._id}/avatar/${size}.jpg` :
  user.avatarSource === 'facebook' ? `https://graph.facebook.com/${user.additionalProvidersData.facebook.id}/picture/?width=${size}&height=${size}` :
  user.avatarSource === 'gravatar' ? `https://gravatar.com/avatar/${user.emailHash}?s=${size}` :
  null
