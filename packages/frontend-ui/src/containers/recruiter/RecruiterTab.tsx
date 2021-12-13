import React, { useState } from "react";
import { Tabs, Layout, Breadcrumb } from "antd";
import BasicInfo from "../../components/candidate-info-read-only/basic-info/BasicInfo";
import EducationDetails from "../../components/candidate-info-read-only/education/EducationDetails";
import ExperienceDetails from "../../components/candidate-info-read-only/experience/ExperienceDetails";
import IdDocDetails from "../../components/candidate-info-read-only/id-docs/IdDocDetails";
import DocumentService from "../../services/DocumentService";
import "./../../styles/CandidateDetailsForHRAndRecruiter.css";
import { Link } from "react-router-dom";

const { TabPane } = Tabs;
const { Content } = Layout;

const RecruiterTab: React.FC = () => {
  const [totalCount1, setTotalCount] = useState(0);
  const [raCount1, setRaCount] = useState(0);
  const [rrCount1, setRrCount] = useState(0);
  var candUserId = window.location.pathname.split("/")[3];

  async function getAllDocs() {
    const docdata = await DocumentService.getAllDocumentsByCandIdforrec(
      candUserId
    );
    //console.log("Info of all dox", docdata);

    setTotalCount(docdata.data.total);
    setRaCount(docdata.data.ra);
    setRrCount(docdata.data.rr);
    //console.log("Again info", raCount1, rrCount1, totalCount1);
  }
  return (
    <Layout className="candidate-details">
      <Breadcrumb
        style={{
          margin: "1rem 0 -1.5rem 0.1rem",
        }}
      >
        <Breadcrumb.Item>
          <Link to="/recruiter/workspace">My Workspace</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {" "}
          <Link to="/recruiter/manage-candidates">Manage Candidates</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Candidate Details</Breadcrumb.Item>
      </Breadcrumb>
      <Content className="candidate-details__content">
        <Tabs
          defaultActiveKey="1"
          className="tab"
          onChange={() => getAllDocs()}
        >
          <TabPane tab="Basic Info" key="1">
            <BasicInfo />
          </TabPane>
          <TabPane tab="Education Details" key="2">
            <EducationDetails />
          </TabPane>
          <TabPane tab="Experience Details" key="3">
            <ExperienceDetails />
          </TabPane>
          <TabPane tab="ID Documents" key="4">
            <IdDocDetails
              getAllDocs={getAllDocs}
              totalCount1={totalCount1}
              raCount1={raCount1}
              rrCount1={rrCount1}
            />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default RecruiterTab;
