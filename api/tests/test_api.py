from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
ROW = {"id":"one","name":"Example Firm","accuracy":90,"response":80,"review":100,"privacy":80,"flags":1,"note":"fictional"}

def test_health():
    assert client.get("/health").json()["status"] == "ok"

def test_score_is_weighted_explainable_and_penalized():
    response = client.post("/score", json={"submissions":[ROW]})
    assert response.status_code == 200
    result = response.json()["scorecards"][0]
    assert result["score"] == 87
    assert result["grade"] == "B"
    assert "Fictional" in response.json()["disclaimer"]

def test_ranks_highest_first():
    lower = {**ROW, "id":"two", "name":"Lower", "accuracy":60}
    rows = client.post("/score", json={"submissions":[lower, ROW]}).json()["scorecards"]
    assert [row["name"] for row in rows] == ["Example Firm", "Lower"]

def test_rejects_empty_out_of_range_and_fractional_flags():
    assert client.post("/score", json={"submissions":[]}).status_code == 422
    assert client.post("/score", json={"submissions":[{**ROW,"accuracy":101}]}).status_code == 422
    assert client.post("/score", json={"submissions":[{**ROW,"flags":1.5}]}).status_code == 422
