import QuestionView from "../QuestionCards/QuestionView";

const Dashboard = () => {
  return (
    <div>
      <div>
        <h3>Unanswered Questions 2</h3>
        <QuestionView />
      </div>
      <div>
        <h3>Answered Questions 5</h3>
        <QuestionView />
      </div>
    </div>
  );
};

export default Dashboard;
