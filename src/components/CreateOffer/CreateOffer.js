import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import style from './CreateOffer.module.scss';
import { TOGGLE_PRINT_MODAL, SET_MODAL_CONTENT } from '../../store/actions';

const CreateOffer = () => {
  const dispatch = useDispatch();
  const isModalHidden = useSelector((state) => state.domSettings.isModalHidden);

  return (
    <div className={style.createOffer__main}>
      <div className={style.createOffer__second}>
        <div className={style.createOffer__second__left}>
          <FontAwesomeIcon
            icon={faPlusCircle}
            size="5x"
            onClick={() => {
              if (isModalHidden === false) {
                return;
              }
              // we print the modal
              dispatch({ type: TOGGLE_PRINT_MODAL });
              // we set which modal content do we want
              dispatch({ type: SET_MODAL_CONTENT, modalContent: 'isOffersModal' });
            }}
          />
          <h3>N'hésitez pas, créer votre propre annonce..</h3>
        </div>
        <div className={style.createOffer__second__right}>
          <h3>composant affichant les offres créer</h3>
        </div>
      </div>
    </div>
  );
};

export default CreateOffer;
