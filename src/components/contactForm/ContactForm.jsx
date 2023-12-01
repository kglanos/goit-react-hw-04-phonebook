import React, { useState } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import css from "./contactForm.module.css";

const ContactForm = ({ onSubmit }) => {
    const [contacts, setContacts] = useState({
        name: "",
        number: "",
});

    const nameId = nanoid();
    const numberId = nanoid(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const { name, number } = contacts;
        if (!name || !number) {
            alert("Some field is empty");
            return;
        }

        onSubmit(name, number);
        reset();
    };

    const reset = () => {
        setContacts({ name: "", number: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setContacts((prevContacts) => ({ ...prevContacts, [name]: value }));
    };

    const { name, number } = contacts;

    return (
            <form className={css.form} onSubmit={handleSubmit}>
                <label htmlFor={nameId}>Name
                <input
                    className={css.input}
                    type="text"
                    name="name"
                    value={name}
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)?"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={handleChange}
                    id={nameId}
                    placeholder="Adrian Smith"
                /></label>
                <label htmlFor={numberId}>Number
                <input
                    className={css.input}
                    name="number"
                    value={number}
                    type="tel"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={handleChange}
                    id={numberId}
                    placeholder="+48 123-456-789"
                /></label><div className={css.divider}>
                <button className={css.button} type="submit">
                    Add contact
                </button></div>
            </form>
        );
    };

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;