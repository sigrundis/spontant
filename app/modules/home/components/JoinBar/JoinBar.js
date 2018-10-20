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
    const joinPercentage = (joinCount / maxAttendees) * 100;
    const availableSpotsPercentage = 100 - joinPercentage;
    return (
      <View style={styles.container}>
        <Text
          style={styles.text}
        >{`Min: ${minAttendees} Max:${maxAttendees}`}</Text>
        <View style={styles.bottom}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <View style={styles.bar}>
              <View
                style={[
                  styles.joined,
                  {
                    width: `${joinPercentage}%`,
                    backgroundColor:
                      joinCount < minAttendees
                        ? color.themeRed
                        : color.themeBlue,
                  },
                ]}
              />
              <View
                style={[
                  styles.avaibaleSpots,
                  {
                    width: `${availableSpotsPercentage}%`,
                  },
                ]}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name={'ios-people'}
              type="ionicon"
              color={color.themeRed}
              size={20}
            />
            <Text
              style={{
                fontSize: normalize(12),
                lineHeight: normalize(17),
                color: color.themeRed,
                fontFamily: fontFamily.regular,
                padding: 4,
              }}
            >{`${joinCount}/${maxAttendees}`}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default JoinBar;
