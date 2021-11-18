import QuestionView from "../QuestionCards/QuestionView";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (evt, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="Unanswered Questions" />
            <Tab label="Answered Questions" />
          </Tabs>
        </Box>
        {selectedTab === 0 && <p>I'm number 0</p>}
        {selectedTab === 1 && <p>I'm number 1</p>}
      </Box>
    </div>
  );
};

export default Dashboard;
