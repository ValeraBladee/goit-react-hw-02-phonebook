import css from './ContactsAddFormButton.module.css';
export const ContactAddFormButton = ({ text, type }) => {
  return (
    <button className={css.button} type={type}>
      {text}
    </button>
  );
};