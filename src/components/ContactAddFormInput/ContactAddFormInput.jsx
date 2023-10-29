import css from './ContactAddFormInput.module.css';
export const ContactAddFormInput = ({ type, name, onFilterInput = null }) => {
  return (
    <label className={css.label}>
      {name}
      <input
        className={css.input}
        type={type}
        name={name}
        onInput={onFilterInput}
        required
      />
    </label>
  );
};