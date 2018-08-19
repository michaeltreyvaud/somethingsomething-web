import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Assignment from '@material-ui/icons/Assignment';
import { withRouter } from 'react-router';

import Print from '@material-ui/icons/Print';
import Open from '@material-ui/icons/OpenInNew';
import Delete from '@material-ui/icons/Delete';
import GridContainer from '../../../Components/Grid/GridContainer';
import GridItem from '../../../Components/Grid/GridItem';
import Card from '../../../Components/Card/Card';
import CardBody from '../../../Components/Card/CardBody';
import CardHeader from '../../../Components/Card/CardHeader';
import CardIcon from '../../../Components/Card/CardIcon';
import Button from '../../../Components/CustomButtons';
import Table from '../../../Components/Table';
import extendedTablesStyle from '../../../Assets/Jss/extendedTablesStyle';

class FridgeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;
    const simpleButtons = [
      { color: 'warning', icon: Print },
      { color: 'success', icon: Open },
      { color: 'danger', icon: Delete },
    ].map((prop, key) => (
      <Button
        color={prop.color}
        simple
        className={classes.actionButton}
        key={key}
      >
        <prop.icon className={classes.icon} />
      </Button>
    ));
    return (
      <div>
        <Button color="info" className={classes.marginRight} onClick={() => this.props.history.push('/FridgeItem/Create')}>
          New
        </Button>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Assignment />
                </CardIcon>
              </CardHeader>
              <CardBody>
                <Table
                  tableHead={[
                    'ID',
                    'Image',
                    'Name',
                    'Description',
                    'Actions',
                  ]}
                  tableData={[
                    [
                      '1',
                      '',
                      'Cold Fridge 1',
                      'Its Cold',
                      simpleButtons,
                    ],
                    [
                      '2',
                      '',
                      'Cold Fridge 2',
                      'Its Cold',
                      simpleButtons,
                    ],
                    [
                      '3',
                      '',
                      'Cold Fridge 3',
                      'Its Cold',
                      simpleButtons,
                    ],
                  ]}
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
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withRouter(withStyles(extendedTablesStyle)(FridgeItem));
