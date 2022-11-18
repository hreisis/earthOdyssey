import * as React from "react";
import Grid from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "../components/Header/Header";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Expense from "../components/Itinerary/Expense/Expense";
import SimpleMap from "../features/Map/SimpleMap";
import ImageGallery from "../components/Itinerary/ImageGallery";
import Reservation from '../components/Itinerary/Reservation';
import bg from "../assets/map.png";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const ItineraryPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
<>
      <Header />

      <Grid container spacing={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            textAlign: "left",
            paddingBottom: 2,
          }}
        >
          <Typography variant="h2">Itinerary Details</Typography>

          <Typography variant="overline" gutterBottom>
            Track your trvel details here
          </Typography>
        </Box>{" "}
        <Grid
          sx={{
            //backgroundImage: `url(${bg})`,
            height: "80vh",
            backgroundPosition: "center",              background: 'rgba(236, 233, 217, 0.8)', 
          }}
        >
          <Box
            sx={{
              flexGrow: 12,

              height: "100%",
            }}
          >
            <Tabs value={value} onChange={handleChange} sx={{ mt: 1 }}>
              <Tab label="Reservation" {...a11yProps(0)} />
              <Tab label="Explore" {...a11yProps(1)} />
              <Tab label="Budget" {...a11yProps(2)} />
              <Tab label="Album" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Reservation />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SimpleMap />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Expense />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <ImageGallery />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
      </>
  );
};

export default ItineraryPage;
