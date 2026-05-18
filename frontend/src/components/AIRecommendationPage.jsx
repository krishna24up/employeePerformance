export default function AIRecommendationPage({ recommendation }) {
  return (
    <section className="card">
      <h3>AI Recommendations</h3>
      <div className="ai-box">
        {recommendation ? <pre>{recommendation}</pre> : <p>Generate recommendations from employee analytics.</p>}
      </div>
    </section>
  );
}
