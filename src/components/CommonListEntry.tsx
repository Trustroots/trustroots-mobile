import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'

import moment, { Moment } from 'moment'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from '../common/colors'

const { width } = Dimensions.get('window')

type Props = {
  onPress: () => void
  onLongPress?: () => void
  testID: string
  timestamp: number | Moment,
  isUnread: boolean,
  picture: string,
  icon?: string,
  title: string,
  displayTimeAgo?: boolean
  isLast: boolean
  subtitle: string
  subtitlePhoto?: string
}

export default class CommonListEntry extends PureComponent<Props> {
  render() {
    const { onPress, onLongPress, testID, timestamp, icon, isUnread, picture, title, displayTimeAgo, subtitlePhoto, isLast, subtitle } = this.props
        , date = (timestamp instanceof moment ? timestamp : moment(timestamp)) as Moment
        , isToday = date.isSame(new Date(), 'day')
        , isYesterday = date.isSame(new Date(Date.now() - 24*60*60*1000), 'day')

    return (
      <>
        <TouchableOpacity
          style={[styles.container, isUnread && {backgroundColor: colors.messageUnreadBackground}]}
          onPress={onPress}
          onLongPress={onLongPress}
          testID={testID}
        >
          <View style={styles.image}>
            {!!picture &&
              <FastImage
                style={{width: 64, height: 64}}
                source={{uri: picture}}
                resizeMode="contain"
              />
            }
            {!!icon &&
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Icon name={icon} size={36} color={colors.background} />
              </View>
            }
          </View>

          <View style={{flex: 1, padding: 10}}>
            <View style={styles.header}>
              <View style={{flex: 1}}>
                <Text
                  numberOfLines={1}
                  style={[styles.name, isUnread && {color: colors.messageUnread}]}
                >
                  {title}
                </Text>
              </View>
              <View>
                <Text style={[styles.date, isUnread && {color: colors.messageUnread}]}>
                  {!!displayTimeAgo ? date.fromNow() :
                    isYesterday ? 'yesterday' :
                    isToday ? date.format('HH:mm') :
                    date.format('LL').split(/,* \d{4}$/)[0]
                  }
                </Text>
              </View>
            </View>

            <View style={[styles.lastMessage]}>
              {!!subtitlePhoto &&
                <View style={styles.lastMessageImage}>
                  <FastImage
                    source={{uri: subtitlePhoto}}
                    style={{width: 18, height: 18}}
                    resizeMode="contain"
                  />
                </View>
              }
              <Text
                style={[styles.lastMessageText, isUnread && {fontWeight: 'bold'}]}
                numberOfLines={1}
                ellipsizeMode="tail"
                testID={testID + '.last'}
              >
                {subtitle}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {!isLast &&
          <View style={styles.separator} />
        }
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height: width * 0.19 + 10,
    flexDirection: 'row'
  },
  lastMessage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  image: {
    width: width * 0.22,
    padding: 10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 3
  },
  name: {
    fontSize: 14,
    fontWeight: '400'
  },
  date: {
    color: colors.messageDate,
    fontSize: 11
  },
  lastMessageImage: {
    width: 18,
    marginRight: 8
  },
  lastMessageText: {
    fontSize: 11,
    flex: 1,
    color: colors.messagePreview
  },
  separator: {
    height: 1,
    width: width * 0.78 - 10,
    backgroundColor: colors.separator,
    position: 'absolute',
    right: 0,
    bottom: 1
  }
})