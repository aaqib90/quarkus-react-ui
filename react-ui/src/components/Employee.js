import React from 'react';
import EmployeeTable1 from './EmployeeTable1';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import logo from '../assets/logo.png';
import EmployeeTable2 from './EmployeeTable2';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
}));

function Employee()  {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

        return (
            <>
                <div className="wrapper">
                    <div className="header"><img alt="logo" src={logo} /></div>
                    <div className="bodyContainer">
                        <div className="container">
                        <h1>Quarkus POC</h1>
                        <p>This poc is developed on Quarkus Micro-services and ReactJS UI. There are two microservices of Employee record, one is integrated with MongoDB and another one is integrated with MySQL. This application is deployed in Heroku with automatic CI/CD pipelines.</p>
                        
                        <div className={classes.root}>
                            <AppBar position="static">
                                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                <Tab label="MongoDB" {...a11yProps(0)} />
                                <Tab label="MySQL" {...a11yProps(1)} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                <EmployeeTable1 />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <EmployeeTable2 />
                            </TabPanel>
                        </div>
                        <div className="footer">© Copyright 2020. Prolifics</div>
                        </div>
                    </div>
                    
                </div>
            </>
        )

}

export default Employee