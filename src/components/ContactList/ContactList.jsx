import PropTypes from 'prop-types';
import css from './ContactList.module.css';

import { ContactListItem } from "./ContactListItem";

export const ContactList = ({ contacts, onDeleteContact }) => {
        return (
            <ul className={css.contacts__list}>
                {contacts.map(contact =>
                    <ContactListItem
                        data={contact}
                        onDeleteContact={onDeleteContact}
                        key={contact.id}
                    />
                )}
            </ul>
        );
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};
