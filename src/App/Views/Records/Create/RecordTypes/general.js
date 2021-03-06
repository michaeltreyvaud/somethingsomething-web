import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import CustomInput from '../../../../Components/CustomInput';
import extendedFormsStyle from '../../../../Assets/Jss/extendedFormsStyle';

const General = (props) => {
  const { setRecordValue, record } = props;
  const { name, comments } = record;
  return (
    <div>
      <CustomInput
        labelText="Name"
        value={name}
        formControlProps={{ fullWidth: true }}
        inputProps={{ type: 'text' }}
        onChange={e => setRecordValue('name', e.target.value)}
      />
      <CustomInput
        value={comments}
        labelText="Comments"
        formControlProps={{ fullWidth: true }}
        inputProps={{ multiline: true, rows: 3 }}
        onChange={e => setRecordValue('comments', e.target.value)}
      />
    </div>
  );
};

General.propTypes = {
  setRecordValue: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
};

export default withStyles(extendedFormsStyle)(General);
