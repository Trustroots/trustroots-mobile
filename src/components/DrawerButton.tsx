import React, { PureComponent } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from '../common/colors'

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  label: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
    paddingBottom: 3
  },
  text: {
    color: colors.drawerText
  },
  highlight: {
    color: colors.drawerHighlight,
    fontWeight: 'bold'
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 5
  }
})

type Props = {
  icon: string,
  label: string,
  highlight?: boolean,
  onPress: () => void
}

export default class DrawerButton extends PureComponent<Props> {
  render() {
    const { onPress, icon, label, highlight } = this.props

    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.container}
        testID={label}
      >
        <View>
          <Icon
            name={icon}
            size={26}
            color={highlight ? colors.background : colors.drawerIcon}
          />
        </View>
        <View style={styles.label}>
          <Text style={[styles.text, highlight && styles.highlight]}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}