import { reactIcons } from '@/utils/icons';
import React from 'react';
import PropTypes from 'prop-types';

const EventSearch = ({ onChange, value, name }) => {
  return (
    <div className="w-full relative mb-3">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Search Events"
        className="h-[32px] !bg-transparent rounded-lg  px-4 text-white outline-0 text-14 border border-white w-full"
      />
      <span className="ay-center absolute right-3 top-4 text-white">
        {reactIcons.search}
      </span>
    </div>
  );
};
EventSearch.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
};
export default EventSearch;
