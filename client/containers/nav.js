import Nav from '../components/nav/Nav';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { toggleUpload } from '../actions/upload';
import { loadData } from '../actions/grid';

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
    id: state.user.id,
    username: state.user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutClick: () => {
      dispatch(logoutUser());
    },
    onToggleUpload: () => {
      dispatch(toggleUpload());
    },
    onSearchSubmit: (id, searchInput) => {
      console.log('searchinput: ', searchInput);
      dispatch(loadData(id, null, 0, searchInput));
    }
  }
}
// if the second parameter is left out, then it defaults to injecting dispatch only as the second arg
const container = connect(mapStateToProps, mapDispatchToProps)(Nav);

export default container
