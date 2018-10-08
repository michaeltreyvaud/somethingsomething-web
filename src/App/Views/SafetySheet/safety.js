import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import SweetAlert from 'react-bootstrap-sweetalert';
import Assignment from '@material-ui/icons/Assignment';
import Tooltip from '@material-ui/core/Tooltip';
// core components
import Open from '@material-ui/icons/OpenInNew';
import Delete from '@material-ui/icons/Delete';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import Card from '../../Components/Card/Card';
import CardBody from '../../Components/Card/CardBody';
import CardHeader from '../../Components/Card/CardHeader';
import CardIcon from '../../Components/Card/CardIcon';
import Button from '../../Components/CustomButtons';
import Table from '../../Components/Table';
import CustomDropdown from '../../Components/CustomDropdown';
import LoadingTable from '../../Components/Loading/LoadingTable';

import SafetyDelete from './Delete/delete.container';

import style from '../../Assets/Jss/style';

class Safety extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDeleteModal: false,
      selectedDeleteItem: {},
      displayErrorMessage: false,
    };
  }

  componentDidMount() {
    const { listSafetys } = this.props;
    listSafetys();
  }

  showDeleteModal(createdAt, index) {
    this.setState({
      displayDeleteModal: true,
      selectedDeleteItem: {
        createdAt,
        index,
      },
    });
  }

  hideDeleteModal() {
    this.setState({
      displayDeleteModal: false,
      selectedDeleteItem: {},
    });
  }

  closeErrorMessage() {
    this.setState({
      displayErrorMessage: false,
    });
  }

  renderErrorMessage() {
    const { displayErrorMessage } = this.state;
    const { classes } = this.props;
    const { success, button } = classes;
    return (
      <SweetAlert
        show={displayErrorMessage}
        warning
        title="Please create a Food Item before adding a Hot Holding Item"
        onConfirm={() => this.closeErrorMessage()}
        confirmBtnCssClass={`${button} ${success}`}
        confirmBtnText="Ok"
      />
    );
  }  

  render() {
    const {
      classes, items, loading, history,
    } = this.props;
    const {
      displayDeleteModal, selectedDeleteItem,
    } = this.state;
    const simpleButtons = (item, index) => [
      { color: 'success', icon: Open, tooltip: 'Edit' },
      { color: 'danger', icon: Delete, tooltip: 'Delete' },
    ].map((prop, key) => {
      let onClick;
      switch (key) {
        case 0: {
          onClick = () => history.push(`/dashboard/safety/${item.createdAt}`);
          break;
        }
        case 1: {
          onClick = () => this.showDeleteModal(item.createdAt, index);
          break;
        }
        default: {
          onClick = () => {};
        }
      }
      return (
        <Tooltip
          id="tooltip-top"
          title={prop.tooltip}
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color={prop.color}
            className={classes.actionButton}
            key={key}
            onClick={onClick}
          >
            <prop.icon className={classes.icon} />
          </Button>
        </Tooltip>
      );
    });
    const tableData = items.map((_item, index) => {
      const item = [_item.title, `${_item.user.firstName} ${_item.user.lastName}`, moment(_item.createdAt).format('DD/MM/YYYY'), 
      _item.file, _item.comments, simpleButtons(_item, index)];
      return item;
    });
    return (
      <div>
        {this.renderErrorMessage()}
        <SafetyDelete
          item={selectedDeleteItem}
          visible={displayDeleteModal}
          classes={classes}
          close={() => this.hideDeleteModal()}
        />        
        <Button color="info" className={classes.marginRight} onClick={() => this.props.history.push('/dashboard/safetys/create')}>
        New
        </Button>
        <CustomDropdown
          hoverColor="black"
          buttonText="Export"
          buttonProps={{
            minHeight: 'auto',
            minWidth: 'auto',            
            style: { marginBottom: '0', float: 'right', },
            color: 'warning',
          }}
          dropdownHeader="Actions"
          dropdownList={[
            'Export CSV',
            'Export PDF',
            'Email',
          ]}
        />        
        {this.state.alert}
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Assignment />
                </CardIcon>
              </CardHeader>
              <CardBody>
              {!loading && items && items.length > 0 && (
                <Table
                  tableHead={[
                    'Title',
                    'Operator',
                    'Date/Time',
                    'File',
                    'Comments',
                  ]}
                  tableData={tableData}
                  customCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right,
                  ]}
                  customClassesForCells={[0, 4, 5]}
                  customHeadCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right,
                  ]}
                  customHeadClassesForCells={[0, 4, 5]}
                />
                )}
                {!loading && items && items.length === 0 && (
                  <div style={{
                    display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center',
                  }}
                  >
                    <h2><small>No Items to display</small></h2>
                  </div>
                )}
                <LoadingTable visible={loading} color="red" />                
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Safety.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  listSafetys: PropTypes.func.isRequired,
};

export default withStyles(style)(Safety);