import React from 'react'
import MessageModal from '../../containers/messageModal.container'


class MessageFeed extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  render() {
    let { messages, conversations, toggleMessageModal } = this.props
    return (
      <div>
        { conversations.map((conversation, index) => (
          <div 
            key={index}
            onClick={ () => {
              toggleMessageModal(index);
            }}
          >
            {'conversation with: ' + conversation.person_name}
          </div>
        ))}
        <MessageModal/>
      </div>
    )
  }
}




export default MessageFeed







