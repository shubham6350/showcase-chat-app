import React, { useState } from "react";

import { CometChatManager } from '../../../utils/controller';
import { AddMembersManager } from './controller';


const func=()=>{

    const[userList,setUserList]=useState([]);




   const  getUsers = () => {
        new CometChatManager()
          .getLoggedInUser()
          .then(() => {
            this.AddMembersManager.fetchNextUsers()
              .then((userList) => {
                const filteredUserList = userList.filter((user) => {
                  const found = this.context.memberList.find(
                    (member) => user.uid === member.uid,
                  );
                  const foundBanned = this.context.bannedMemberList.find(
                    (member) => user.uid === member.uid,
                  );
                  if (found || foundBanned) {
                    return false;
                  }
                  return true;
                });
    
                if (filteredUserList.length === 0) {
                  this.decoratorMessage = 'No users found';
                }
    
                this.setState({
                  userList: [...this.state.userList, ...userList],
                  filteredList: [...this.state.filteredList, ...filteredUserList],
                });
              })
              .catch((error) => {
                const errorCode = error?.message || 'ERROR';
                this.dropDownAlertRef?.showMessage('error', errorCode);
                this.decoratorMessage = 'Error';
                logger(
                  '[CometChatAddGroupMemberList] getUsers fetchNext error',
                  error,
                );
              });
          })
          .catch((error) => {
            this.decoratorMessage = 'Error';
            logger(
              '[CometChatAddGroupMemberList] getUsers getLoggedInUser error',
              error,
            );
          });
      };
    
    return(

    )
}