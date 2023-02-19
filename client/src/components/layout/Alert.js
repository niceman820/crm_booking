import React from 'react';
import { connect } from 'react-redux';
import { Alert as AlertMui } from '@mui/material';

const Alert = ({ alerts }) => (
  <div className="alert-wrapper">
    {alerts.map((alert, index) => (
      <AlertMui
        key={index}
        severity={alert.alertType}
        variant='filled'
        sx={{ mt: 1 }}
        // onClose={() => { }}
      >
        {alert.msg} — check it out
      </AlertMui>
    ))}
  </div>
);

Alert.defaultProps = {
  alerts: []
}

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);