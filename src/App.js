import "./App.css";
import React, { useState } from "react";
import { generateData } from "./data";

let caches = {};
const limit = 100;
const data = generateData(1500);
const search = (s, begin, result) => {
  if (begin >= data.length) return result;
  const end = begin + limit;
  const r = data.slice(begin, end).filter((d) => d.display.indexOf(s) > -1);
  caches[s] = { begin, end, result: [...result, ...r] };
  if ([...result, ...r].length >= limit) return [...result, ...r];
  return search(s, end, [...result, ...r]);
};
const getResult = (w) => {
  if (caches[w]) return caches[w].result;
  if (caches[w.slice(0, -1)]) {
    return search(
      w,
      caches[w.slice(0, -1)].end,
      caches[w.slice(0, -1)].result.filter((r) => r.display.indexOf(w) > -1)
    );
  }
  return search(w, 0, []);
};
export default function App(props) {
  const defaultBegin = data.slice(0, limit);
  const [result2, setResult2] = useState(defaultBegin);
  const [result, setResult] = useState(defaultBegin);
  const handleChange = (e) => {
    const w = e.target.value;
    setResult(getResult(w).slice(0, 20));
    const r2 = data.filter((d) => d.display.indexOf(e.target.value) > -1);
    setResult2(r2);
  };
  return (
    <div className="App" style={{ paddingTop: "20px" }}>
      <input type="text" onChange={handleChange} autoFocus />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th
                style={{
                  verticalAlign: "top",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                Base
              </th>
              <th
                style={{
                  verticalAlign: "top",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                Performance
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  verticalAlign: "top",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                {result2.map((v, i) => (
                  <p key={`n_${i}`}>{i + 1}</p>
                ))}
              </td>
              <td
                style={{
                  verticalAlign: "top",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <div>
                  {result2.map((d, i) => {
                    return <p key={`b_${i}`}>{d.display}</p>;
                  })}
                </div>
              </td>
              <td
                style={{
                  verticalAlign: "top",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <div>
                  {result.map((d, i) => {
                    return <p key={`p_${i}`}>{d.display}</p>;
                  })}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
