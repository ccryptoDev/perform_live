import { useDispatch, useSelector } from 'react-redux';
import { setSidebarView } from '../state/audience.actions';

export default () => {
  const dispatch = useDispatch();
  const setCurrentSidebarView = view => dispatch(setSidebarView(view));
  const currentSidebarView = useSelector(state => state.audience.sidebarView);
  return [currentSidebarView, setCurrentSidebarView];
};
