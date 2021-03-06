import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import style from './InputBase.module.scss';

const InputBase = ({
  icon, placeholder, inputName, classCSS, inputValue, actionType, inputType, otherOnChange
}) => {
  const dispatch = useDispatch();
  return (
    <div className={`${style[classCSS]} ${style.inputContainer}`}>
      {icon
      && (
      <div>
        { icon
        && <FontAwesomeIcon icon={icon} />}
      </div>
      )}
      <input
        type={inputType}
        className={style.inputContainer__input}
        placeholder={placeholder}
        name={inputName}
        value={inputValue}
        onChange={(event) => {
          dispatch({
            type: actionType,
            inputField: inputName,
            newValue: event.target.value,
          });
          if (otherOnChange)otherOnChange(event.target.value);
        }}
      />
    </div>
  );
};

InputBase.propTypes = {
  placeholder: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  classCSS: PropTypes.string.isRequired,
  actionType: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  otherOnChange: PropTypes.func
};

export default InputBase;
