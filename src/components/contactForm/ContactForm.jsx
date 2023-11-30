import React, { Component } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import css from "./contactForm.module.css";


export class ContactForm extends Component {
    state = { name: "", number: "" };
    nameId = nanoid();
    numberId = nanoid();

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, number } = this.state;

        if (!name || !number) {
            alert("Some field is empty");
            return;
        }

        this.props.onSubmit(name, number);
        this.reset();
        };

        reset = () => {
            this.setState({ name: "", number: "" });
        };

        handleChange = (e) => {
            const { name, value } = e.currentTarget;
            this.setState({ [name]: value });
        };


    render() {
        const { name, number } = this.state;
        return (
            <form className={css.form} onSubmit={this.handleSubmit}>
                <label htmlFor={this.nameId}>Name
                <input
                    className={css.input}
                    type="text"
                    name="name"
                    value={name}
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)?"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={this.handleChange}
                    id={this.nameId}
                    placeholder="Adrian Smith"
                /></label>
                <label htmlFor={this.numberId}>Number
                <input
                    className={css.input}
                    name="number"
                    value={number}
                    type="tel"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={this.handleChange}
                    id={this.numberId}
                    placeholder="+48 123-456-789"
                /></label><div className={css.divider}>
                <button className={css.button} type="submit">
                    Add contact
                </button></div>
            </form>
        );
    };
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};