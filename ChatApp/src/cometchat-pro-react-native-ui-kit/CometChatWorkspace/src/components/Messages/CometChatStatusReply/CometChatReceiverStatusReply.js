import React from 'react';
import { View, Text, Image } from 'react-native';
import Styles from './ReplyStyle';
const StatusReceiverReply = (props) => {
  // console.log(props);
  let caption = props.messsage.captionText || null;
  let reply = props.messsage.replyText || null;
  let url = props.messsage.url || null;
  let uname = props.messsage.entities.receiver.entity.name || null;

  // console.log(props.messsage.entities.receiver.entity.name, '///////////====');
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
export default StatusReceiverReply;