import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Assignment from '@material-ui/icons/Assignment';
import { withRouter } from 'react-router';

import Print from '@material-ui/icons/Print';
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
import LoadingTable from '../../Components/Loading/LoadingTable';

import FastCoolingCreate from './Create/create.container';

import style from '../../Assets/Jss/extendedTablesStyle';

class FastCooling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCreateModal: false,
      displayDeleteModal: false,
      displayUpdateModal: false,
      selectedDeleteItem: {},
      selectedUpdateItem: {},
      selectedUpdateItemIndex: 0,
    };
  }

  componentDidMount() {
    const { listFastCoolings } = this.props;
    listFastCoolings();
  }

  showCreateModal() {
    this.setState({
      displayCreateModal: true,
    });
  }

  hideCreateModal() {
    this.setState({
      displayCreateModal: false,
    });
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

  showUpdateModal(item, index) {
    this.setState({
      displayUpdateModal: true,
      selectedUpdateItem: item,
      selectedUpdateItemIndex: index,
    });
  }

  hideUpdateModal() {
    this.setState({
      displayUpdateModal: false,
      selectedUpdateItem: {},
      selectedUpdateItemIndex: 0,
    });
  }

  render() {
    const {
      classes, items, loading,
    } = this.props;
    const {
      displayCreateModal, displayDeleteModal, selectedDeleteItem,
      displayUpdateModal, selectedUpdateItem, selectedUpdateItemIndex,
    } = this.state;
    const simpleButtons = (item, index) => [
      { color: 'warning', icon: Print },
      { color: 'success', icon: Open },
      { color: 'danger', icon: Delete },
    ].map((prop, key) => {
      let onClick;
      switch (key) {
        case 1: {
          onClick = () => this.showUpdateModal(item, index);
          break;
        }
        case 2: {
          onClick = () => this.showDeleteModal(item.id, index);
          break;
        }
        default: {
          onClick = () => {};
        }
      }
      return (
        <Button
          color={prop.color}
          className={classes.actionButton}
          key={key}
          onClick={onClick}
        >
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    const tableData = items.map((_item, index) => {
      const item = [_item.createdAt, _item.user, _item.comments,
        _item.foodItem, _item.temperature, simpleButtons(_item, index)];
      return item;
    });
    return (
      <div>
        <FastCoolingCreate
          visible={displayCreateModal}
          classes={classes}
          close={() => this.hideCreateModal()}
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
                  onClick={() => this.showCreateModal()}
                >
                  New
                </Button>
              </CardHeader>
              <CardBody>
                {!loading && (
                <Table
                  hover
                  tableHead={[
                    'Created',
                    'User',
                    'Comments',
                    'Food Item',
                    'Temperature',
                  ]}
                  tableData={tableData}
                  customCellClasses={[
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                  ]}
                  customClassesForCells={[0, 1, 2, 3, 4]}
                  customHeadCellClasses={[
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                    classes.left,
                  ]}
                  customHeadClassesForCells={[0, 1, 2, 3 ,4]}
                />
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

FastCooling.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,

  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,

  listFastCoolings: PropTypes.func.isRequired,
};

export default withRouter(withStyles(style)(FastCooling));