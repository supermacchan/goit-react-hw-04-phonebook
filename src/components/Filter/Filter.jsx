import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({value, onChange}) => {
    return (
        <label>
            <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className={css.filterInput}
            />
        </label>
    );
};

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};