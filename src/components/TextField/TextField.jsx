import React from 'react';

const TextField = (props) => {
  const { disabled = '', value = '' ,style = {} } = props;
  const mystyle = {
    width: '97%',
    height: '20%',
    padding: '1%',
    ...style,
    borderRadius: '4px',
  };
  if (disabled === true) {
    return (<input type="text" className="text-field" disabled value={value} style={mystyle} />);
  }
  return (<input type="text" className="text-field" value={value} style={mystyle} />);
};
export default TextField;
