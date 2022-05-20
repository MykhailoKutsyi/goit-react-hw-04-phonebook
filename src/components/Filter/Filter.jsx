import PropTypes from 'prop-types';

const Filter = ({ value, changeFilter }) => {
  return (
    <label>
      Filter
      <input
        type="text"
        value={value}
        onChange={changeFilter}
        placeholder="Search..."
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

export default Filter;
