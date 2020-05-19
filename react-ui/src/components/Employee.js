import React from 'react'
import Header from './Header'
import EmployeeTable from './EmployeeTable'
import EmployeeTable1 from './EmployeeTable1';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import logo from '../assets/logo.png';

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
                    <div class="header"><img src={logo} /></div>
                    <div class="bodyContainer">
                        <div class="container">
                        <h1>Welcome To Quarkus UI</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        
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
                                TBD
                            </TabPanel>
                        </div>
                        <div class="footer">© Copyright 2020. Prolifics</div>
                        </div>
                    </div>
                    
                </div>
            </>
        )

}

export default Employee