import "./App.css";
import React, { useMemo, useState } from "react";
import { generateData } from "./data";

let caches = {};
const limit = 20;
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
  const [worlding, setWording] = useState("");
  const memoResult = useMemo(() => {
    return getResult(worlding).slice(0, limit);
  }, [worlding]);
  return (
    <div className="App" style={{ paddingTop: "20px" }}>
      <input
        type="text"
        onChange={(event) => setWording(event.currentTarget.value)}
        autoFocus
      />
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
                Memo
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
                {memoResult.map((v, i) => (
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
                  {memoResult.map((d, i) => {
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
