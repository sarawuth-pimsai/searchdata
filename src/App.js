import "./App.css";
import React, { useState } from "react";
import { generateData } from "./data";

const limit = 10;
const data = generateData(1500);
const search = (s, begin, result) => {
  if (begin > data.length || result.length >= limit) return result;
  const r = data
    .slice(begin, begin + 10)
    .filter((d) => d.display.indexOf(s) > -1);
  const searchResult = search(s, begin + limit, [...result, ...r]);
  return searchResult;
};
export default function App(props) {
  const defaultBegin = data.slice(0, 10);
  const [result2, setResult2] = useState(defaultBegin);
  const [result, setResult] = useState(defaultBegin);
  const handleChange = (e) => {
    const r = search(e.target.value, 0, []);
    setResult(r);
    const r2 = data.filter((d) => d.display.indexOf(e.target.value) > -1);
    setResult2(r2);
  };
  return (
    <div className="App">
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
