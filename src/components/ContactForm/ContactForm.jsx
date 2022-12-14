import { Component } from "react";
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    state = {
        name: '',
        number: '',
    };

    hadleInputChange = event => {
        this.setState({
        [event.currentTarget.name]: event.currentTarget.value,
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    }

    reset = () => {
        this.setState({
        name: '',
        number: '',
        });
    }

    render() {
        return (
            <form
                className={css.phonebook__form}
                onSubmit={this.handleFormSubmit}
            >
                <label
                    htmlFor="nameInputId"
                    className={css.phonebook__label}
                >
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    id="nameInputId"
                    required
                    onChange={this.hadleInputChange}
                    className={css.phonebook__input}
                    value={this.state.name}
                />
                <label
                    htmlFor="telInputId"
                    className={css.phonebook__label}
                >
                    Number
                </label>
                < input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    id="telInputId"
                    required
                    onChange={this.hadleInputChange}
                    className={css.phonebook__input}
                    value={this.state.number}
                />
                <button
                    type="submit"
                    className={css.phonebook__button}
                >
                    Add Contact
                </button>
            </form>
        )
    };
}