from pathlib import Path
import json
from fastapi import FastAPI
from pydantic import BaseModel, Field

DATA = json.loads((Path(__file__).parents[1] / "data" / "demo.json").read_text())
app = FastAPI(title="FirmTrial API", version="0.1.0")

class Submission(BaseModel):
    id: str = Field(min_length=1, max_length=80)
    name: str = Field(min_length=1, max_length=80)
    accuracy: float = Field(ge=0, le=100)
    response: float = Field(ge=0, le=100)
    review: float = Field(ge=0, le=100)
    privacy: float = Field(ge=0, le=100)
    flags: int = Field(ge=0, le=10)
    note: str = Field(max_length=500)

class ScoreRequest(BaseModel):
    submissions: list[Submission] = Field(min_length=1, max_length=50)

def score(row: Submission) -> dict:
    weights = DATA["weights"]
    raw = sum(getattr(row, key) * weights[key] for key in weights) / 100
    final = max(0, round(raw - row.flags * 2, 1))
    grade = "A" if final >= 90 else "B" if final >= 80 else "C" if final >= 70 else "Needs review"
    return {**row.model_dump(), "score": final, "grade": grade}

@app.get("/health")
def health():
    return {"status": "ok", "catalogVersion": "fictional-2026-11-18"}

@app.post("/score")
def score_submissions(request: ScoreRequest):
    ranked = sorted((score(row) for row in request.submissions), key=lambda row: row["score"], reverse=True)
    return {"scorecards": ranked, "disclaimer": DATA["disclaimer"]}
