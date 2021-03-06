import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Assignment from '@material-ui/icons/Assignment';
import { withRouter } from 'react-router';

import Open from '@material-ui/icons/OpenInNew';
import Delete from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import SweetAlert from 'react-bootstrap-sweetalert';
import GridContainer from '../../../Components/Grid/GridContainer';
import GridItem from '../../../Components/Grid/GridItem';
import Card from '../../../Components/Card/Card';
import CardBody from '../../../Components/Card/CardBody';
import CardHeader from '../../../Components/Card/CardHeader';
import CardIcon from '../../../Components/Card/CardIcon';
import Button from '../../../Components/CustomButtons';
import Table from '../../../Components/Table';
import LoadingTable from '../../../Components/Loading/LoadingTable';

import UserDelete from './Delete/delete.container';

import style from '../../../Assets/Jss/extendedFormsStyle';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDeleteModal: false,
      selectedDeleteItem: {},
      displayErrorMessage: false,
    };
  }

  componentDidMount() {
    const { listUsers } = this.props;
    listUsers();
  }

  showDeleteModal(itemId, index) {
    this.setState({
      displayDeleteModal: true,
      selectedDeleteItem: {
        itemId,
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
        title="Please create a team before adding a user"
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
          onClick = () => history.push(`/dashboard/management/users/${item.userName}`);
          break;
        }
        case 1: {
          onClick = () => this.showDeleteModal(item.email, index);
          break;
        }
        default: {
          onClick = () => {};
        }
      }
      return (
        <Tooltip
          key={key}
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
      const item = [_item.firstName, _item.lastName, _item.email,
        _item.phoneNumber, _item.team, _item.position, _item.authorization,
        simpleButtons(_item, index)];
      return item;
    });
    return (
      <div>
        {this.renderErrorMessage()}
        <UserDelete
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
                  onClick={() => history.push('/dashboard/management/users/create')}
                >
                  Create
                </Button>
              </CardHeader>
              <CardBody>
                {!loading && items && items.length > 0 && (
                <Table
                  hover
                  tableHead={[
                    'First Name',
                    'Last Name',
                    'Email',
                    'Phone',
                    'Team',
                    'Position',
                    'Authorization',
                  ]}
                  tableData={tableData}
                  customCellClasses={[
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.right,
                  ]}
                  customClassesForCells={[0, 1, 2, 3, 4, 5, 6, 7]}
                  customHeadCellClasses={[
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.right,
                  ]}
                  customHeadClassesForCells={[0, 1, 2, 3, 4, 5, 6, 7]}
                />
                )}
                {!loading && items && items.length === 0 && (
                  <div style={{
                    display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center',
                  }}
                  >
                    <h2><small>No Users to display</small></h2>
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

Users.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  teams: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  listUsers: PropTypes.func.isRequired,
};

export default withRouter(withStyles(style)(Users));
