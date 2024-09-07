import React from 'react';
import { View, Text, Image } from 'react-native';
import Styles from './style';
const StatusReply = (props) => {
  // console.log(props);
  // let name = props?.message?.entities?.sender?.entity?.name || null;
  let caption = props.messsage.captionText || null;
  let reply = props.messsage.replyText || null;
  let url = props.messsage.url || null;
  let uname = props.messsage.entities.sender.entity.name || null;

  // console.log(props?.message?.entities?.sender?.entity?.name, '///////////====');
  return (
    <View style={Styles.Body_Content}>
      <View style={Styles.Staus_Detail_Container}>
        <View style={Styles.Text_Container}>
          <Text style={Styles.name_Box}>{uname}.Status</Text>
          {caption ? <Text style={Styles.caption_box}>{caption}</Text> : null}
        </View>
        <View style={Styles.Image_Box}>
          <Image style={Styles.Image} source={{ uri: url }} />
        </View>
      </View>
      <Text style={Styles.reply_Text}>{reply}</Text>
    </View>
  );
};
export default StatusReply;
