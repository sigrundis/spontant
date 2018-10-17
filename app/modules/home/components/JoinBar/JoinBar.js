import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';
import { theme } from '../../index';
const { color, normalize, fontFamily } = theme;

class JoinBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { minAttendees, maxAttendees, joinCount } = this.props;
    const joinPercentage = `${(joinCount / maxAttendees) * 100}%`;
    const availableSpotsPercentage = `${90 -
      (joinCount / maxAttendees) * 100}%`;
    return (
      <View
        style={{
          borderTopColor: color.grey,
          borderTopWidth: 1,
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: normalize(12),
            lineHeight: normalize(17),
            color: color.themeNight,
            fontFamily: fontFamily.regular,
          }}
        >{`Min: ${minAttendees} Max:${maxAttendees}`}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                height: 15,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: color.themeBlue,
                  width: joinPercentage,
                  borderTopStartRadius: 5,
                  borderBottomStartRadius: 5,
                  borderTopEndRadius: joinCount == maxAttendees ? 5 : 0,
                  borderBottomEndRadius: joinCount == maxAttendees ? 5 : 0,
                }}
              />
              <View
                style={{
                  backgroundColor: color.grey,
                  width: availableSpotsPercentage,
                  borderTopStartRadius: joinCount == 0 ? 5 : 0,
                  borderBottomStartRadius: joinCount == 0 ? 5 : 0,
                  borderTopEndRadius: 5,
                  borderBottomEndRadius: 5,
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name={'ios-people'}
              type="ionicon"
              color={color.themeNight}
              size={20}
            />
            <Text
              style={[
                {
                  fontSize: normalize(12),
                  lineHeight: normalize(17),
                  color: color.themeNight,
                  fontFamily: fontFamily.regular,
                },
                { padding: 4 },
              ]}
            >{`${joinCount}/${maxAttendees}`}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default JoinBar;
