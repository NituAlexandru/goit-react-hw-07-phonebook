import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button({ children, action, type = 'button' }) {
  return (
    <button className={styles.button} onClick={action} type={type}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  action: PropTypes.func,
  button: PropTypes.string,
};

export default Button;
