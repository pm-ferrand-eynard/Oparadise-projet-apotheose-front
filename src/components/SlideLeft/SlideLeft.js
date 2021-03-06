import { PropTypes } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import style from './SlideLeft.module.scss';
import { TOGGLE_OPEN_SLIDE } from '../../store/actions';

const SlideLeft = ({ children }) => {
  const dispatch = useDispatch();
  const isLeftSlideOpen = useSelector((state) => state.domSettings.isLeftSlideOpen);
  const offersTooltip = 'Içi, vous pouvez afficher le panneau des annonces!';

  return (
    <>
      <div className={isLeftSlideOpen ? style.slide__left__open : style.slide}>
        {children}
      </div>
      <ReactTooltip
        id={offersTooltip}
        place="top"
        effect="float"
      />
      <FontAwesomeIcon
        data-tip={offersTooltip}
        data-for={offersTooltip}
        icon={isLeftSlideOpen ? faChevronRight : faChevronLeft}
        // If the current slide content was ListCardOffer Slide, we set the state to false
        onClick={() => {
          dispatch({
            type: TOGGLE_OPEN_SLIDE,
            slide: 'isLeftSlideOpen',
          });
        }}
        size="4x"
        color="#406F8A"
        className={style.slide__icon}
      />
    </>
  );
};
SlideLeft.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SlideLeft;
