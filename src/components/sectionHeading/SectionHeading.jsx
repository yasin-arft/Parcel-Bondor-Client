import PropTypes from 'prop-types';

const SectionHeading = ({ children }) => {
  return <h2 className="text-center font-semibold text-3xl my-3 uppercase">{children}</h2>
    ;
};

SectionHeading.propTypes = {
  children: PropTypes.any
};

export default SectionHeading;