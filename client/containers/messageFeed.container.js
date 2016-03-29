import MessageFeed from '../components/messageFeed/messageFeed.js'
import { connect } from 'react-redux'


console.log(MessageFeed);
const mapStateToProps = (state) => {
  return {
    messages: state.messageFeed.messages
  }
}

const mapDispatchToProps = () => {
  return {

  }
}





const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageFeed);

export default container