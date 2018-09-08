import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Close from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import ImageUpload from '../../../../Components/CustomUpload/ImageUpload';
import CustomInput from '../../../../Components/CustomInput';
import Button from '../../../../Components/CustomButtons';

const Transition = props => <Slide direction="down" {...props} />;

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      freezerName: '',
      freezerDescription: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = this.props;
    const { item } = nextProps;
    this.setState({
      freezerName: item.name,
      freezerDescription: item.description,
    });
    if (loading && nextProps.loading === false && nextProps.success) {
      this.closeModal();
    }
  }

  closeModal() {
    const { close } = this.props;
    this.setState({
      freezerName: '',
      freezerDescription: '',
    }, () => {
      close();
    });
  }

  updateFreezer() {
    const { updateFreezer, item, index } = this.props;
    const { freezerName, freezerDescription } = this.state;
    const updatedItem = {
      id: item.id,
      name: freezerName,
      description: freezerDescription,
    };
    updateFreezer(updatedItem, index);
  }

  render() {
    const { classes, visible } = this.props;
    const { freezerName, freezerDescription } = this.state;
    return (
      <Dialog
        classes={{
          root: `${classes.center} ${classes.modalRoot}`,
          paper: classes.modal,
        }}
        open={visible}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => this.closeModal()}
        aria-labelledby="notice-modal-slide-title"
        aria-describedby="notice-modal-slide-description"
      >
        <DialogTitle
          id="notice-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            justIcon
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="transparent"
            onClick={() => this.closeModal()}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>Update Freezer Item</h4>
        </DialogTitle>
        <DialogContent
          id="notice-modal-slide-description"
          className={classes.modalBody}
        >
          <ImageUpload
            avatar
            addButtonProps={{
              color: 'rose',
              round: true,
            }}
            changeButtonProps={{
              color: 'rose',
              round: true,
            }}
            removeButtonProps={{
              color: 'danger',
              round: true,
            }}
          />
          <CustomInput
            labelText="Name"
            id="freezerName"
            value={freezerName}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: 'text',
            }}
            onChange={e => this.setState({ freezerName: e.target.value })}
          />
          <CustomInput
            labelText="Description"
            id="description"
            value={freezerDescription}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              multiline: true,
              rows: 3,
            }}
            onChange={e => this.setState({ freezerDescription: e.target.value })}
          />
        </DialogContent>
        <DialogActions
          className={
        `${classes.modalFooter
        } ${
          classes.modalFooterCenter}`
      }
        >
          <Button
            onClick={() => this.updateFreezer()}
            color="info"
            round >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Update.propTypes = {
  classes: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateFreezer: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Update;