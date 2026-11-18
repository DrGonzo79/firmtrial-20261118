import demo from "@/data/demo.json";
export type Submission={id:string;name:string;accuracy:number;response:number;review:number;privacy:number;flags:number;note:string};
export type Scorecard=Submission&{score:number;grade:string};
const fields=["accuracy","response","review","privacy"] as const;
export function scoreSubmission(row:Submission):Scorecard{
  if(!row.name.trim()) throw new Error("Firm name is required");
  for(const field of fields) if(!Number.isFinite(row[field])||row[field]<0||row[field]>100) throw new Error(`${field} must be between 0 and 100`);
  if(!Number.isInteger(row.flags)||row.flags<0||row.flags>10) throw new Error("Exception flags must be a whole number from 0 to 10");
  const w=demo.weights;
  const raw=(row.accuracy*w.accuracy+row.response*w.response+row.review*w.review+row.privacy*w.privacy)/100;
  const score=Math.max(0,Math.round((raw-row.flags*2)*10)/10);
  return {...row,score,grade:score>=90?"A":score>=80?"B":score>=70?"C":"Needs review"};
}
export function rankSubmissions(rows:Submission[]){if(!rows.length)throw new Error("Add at least one submission");return rows.map(scoreSubmission).sort((a,b)=>b.score-a.score)}
