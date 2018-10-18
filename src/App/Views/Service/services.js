import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Assignment from '@material-ui/icons/Assignment';
import { withRouter } from 'react-router';
import moment from 'moment';

import Print from '@material-ui/icons/Print';
import Open from '@material-ui/icons/OpenInNew';
import Delete from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import SweetAlert from 'react-bootstrap-sweetalert';

import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import Card from '../../Components/Card/Card';
import CardBody from '../../Components/Card/CardBody';
import CardHeader from '../../Components/Card/CardHeader';
import CardIcon from '../../Components/Card/CardIcon';
import Button from '../../Components/CustomButtons';
import Table from '../../Components/Table';
import LoadingTable from '../../Components/Loading/LoadingTable';

import ServicesDelete from './Delete/delete.container';

import style from '../../Assets/Jss/extendedTablesStyle';

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDeleteModal: false,
      selectedDeleteItem: {},
      displayErrorMessage: false,
    };
  }

  componentDidMount() {
    const { listServices } = this.props;
    listServices();
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

  create() {
    const { foodItems, history } = this.props;
    if (foodItems.length === 0) {
      return this.setState({
        displayErrorMessage: true,
      });
    }
    return history.push('/dashboard/service/create');
  }

  renderErrorMessage() {
    const { displayErrorMessage } = this.state;
    const { classes } = this.props;
    const { success, button } = classes;
    return (
      <SweetAlert
        show={displayErrorMessage}
        warning
        title="Please create a Food Item before adding a Services Item"
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
      displayCreateModal, displayDeleteModal, selectedDeleteItem,
    } = this.state;
    const simpleButtons = (item, index) => [
      { color: 'warning', icon: Print, tooltip: 'Print' },
      { color: 'success', icon: Open, tooltip: 'Edit' },
      { color: 'danger', icon: Delete, tooltip: 'Delete' },
    ].map((prop, key) => {
      let onClick;
      switch (key) {
        case 1: {
          onClick = () => history.push(`/dashboard/service/${item.createdAt}`);
          break;
        }
        case 2: {
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
      const item = [_item.foodItem.displayName, _item.temperature, `${_item.user.firstName} ${_item.user.lastName}`,
        _item.comments, moment(_item.createdAt).format('DD/MM/YYYY'), simpleButtons(_item, index)];
      return item;
    });
    return (
      <div>
        {this.renderErrorMessage()}
        <ServicesDelete
          item={selectedDeleteItem}
          visible={displayDeleteModal}
          classes={classes}
          close={() => this.hideDeleteModal()}
        />
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Assignment />
                </CardIcon>
                <Button
                  color="info"
                  className={classes.marginRight}
                  onClick={() => this.create()}
                >
                  Create
                </Button>
              </CardHeader>
              <CardBody>
                {!loading && items && items.length > 0 && (
                <Table
                  hover
                  tableHead={[
                    'Food Item',
                    'Temperature',
                    'User',
                    'Comments',
                    'Created',
                  ]}
                  tableData={tableData}
                  customCellClasses={[
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.right,
                  ]}
                  customClassesForCells={[0, 1, 2, 3, 4, 5]}
                  customHeadCellClasses={[
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.right,
                  ]}
                  customHeadClassesForCells={[0, 1, 2, 3, 4, 5]}
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

Services.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  foodItems: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  listServices: PropTypes.func.isRequired,
};

export default withRouter(withStyles(style)(Services));