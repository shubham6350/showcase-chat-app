import { CometChatSharedMedia } from '../../Shared';
import React from 'react';
import { View } from 'react-native';
import theme from '../../../resources/theme';
import style from './styles';
export default class CometChatMedia extends React.Component {
  constructor(props) {
    super(props);

    this.viewTheme = { ...theme, ...this.props.theme };
    this.sheetRef = React.createRef(null);
    // this.state = {
    //   // status: this.props.item.status,
    //   restrictions: null,
    // };
  }

  // componentDidMount() {
  //   this.checkRestrictions();
  // }

  // checkRestrictions = async () => {
  //   let isSharedMediaEnabled =
  //     await this.context.FeatureRestriction.isSharedMediaEnabled();

  //   this.setState({
  //     restrictions: {
  //       isSharedMediaEnabled,
  //     },
  //   });
  // };

  render() {
    let sharedMediaView = (
      <CometChatSharedMedia
        theme={this.props.theme}
        containerHeight={50}
        showMessage={(type, message) => {
          this.dropDownAlertRef?.showMessage(type, message);
        }}
        item={this.props.item}
        type={this.props.type}
      />
    );

    // if (!this.state.restrictions?.isSharedMediaEnabled) {
    //   sharedMediaView = null;
    // }

    return <View style={style.optionsContainer}>{sharedMediaView}</View>;
  }
}
