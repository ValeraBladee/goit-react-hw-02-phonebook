import css from './ContactsListItem.module.css';
export const ContactsListItem = ({ data, onContactDeleteButtonClick }) => {
  return (
    <li className={css.ContactsListItem} id={data.id}>
      <p>
        {data.name}: {data.tel}
      </p>
      <button
        className={css.button}
        onClick={onContactDeleteButtonClick}
        data-id={data.id}
      >
        Delete
      </button>
    </li>
  );
};
