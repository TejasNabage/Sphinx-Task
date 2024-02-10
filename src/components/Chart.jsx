import React from "react";
import "./Chart.css";
import { useState, useEffect } from "react";
import Chart2 from "./ChartGenerator";
const Chart = () => {
  const [stage1, setStage1] = useState({ temp: 95, time: "3:00" });
  const [stage2, setStage2] = useState([
    { temp: 95, time: "0:30" },
    { temp: 60, time: "3:00" },
  ]);
  const [stage3, setStage3] = useState([
    { temp: 90, time: "3:00" },
    { temp: 60, time: "3:00" },
    { temp: 95, time: "3:00" },
  ]);
  const [activeStage, setActiveStage] = useState(null);
  const [activePoint, setActivePoint] = useState(0);
  const [temp, setTemp] = useState(0);
  const [time, setTime] = useState(0);
  const [data, setData] = useState([stage1, ...stage2, ...stage3]);
  const [tempArray, setTempArray] = useState([
    stage1.temp,
    ...stage2.map((item) => item.temp),
    ...stage3.map((item) => item.temp),
  ]);

  useEffect(() => {
    setTempArray([
      stage1.temp,
      ...stage2.map((item) => item.temp),
      ...stage3.map((item) => item.temp),
    ]);
  }, [data]);

  //   insert before the active point
  const addPointToLeft = () => {
    if (activeStage === 2 && stage2.length === 4) {
      alert("Stage 2 is full");
      setData([stage1, ...stage2, ...stage3]);
      return;
    }
    var updatedStage;
    if (activeStage === 2) {
      updatedStage = [...stage2];
      updatedStage.splice(activePoint, 0, { temp, time });
      setStage2(updatedStage);
    } else if (activeStage === 3) {
      updatedStage = [...stage3];
      updatedStage.splice(activePoint, 0, { temp, time });
      setStage3(updatedStage);
    }
    setData([stage1, ...updatedStage, ...stage3]);
    setActiveStage(null);
    setActivePoint(null);
  };

  //   insert afetr the active point
  const addPointToRights = () => {
    if (activeStage === 2 && stage2.length === 4) {
      alert("Stage 2 is full");
      setData([stage1, ...stage2, ...stage3]);

      return;
    }
    var updatedStage;
    if (activeStage === 2) {
      updatedStage = [...stage2];
      updatedStage.splice(activePoint + 1, 0, { temp, time });
      setStage2(updatedStage);
    } else if (activeStage === 3) {
      updatedStage = [...stage3];
      updatedStage.splice(activePoint + 1, 0, { temp, time });
      setStage3(updatedStage);
    }
    setData([stage1, ...updatedStage, ...stage3]);
    setActiveStage(null);
    setActivePoint(null);
  };

  const updateStage1 = () => {
    setStage1({ temp, time });
    setData([{ temp, time }, ...stage2, ...stage3]);
  };


  return (
    <>
      <div className="container">
        <h1>Temperature Chart</h1>
        <div className="chart-container">
          {/* stage1 box  */}
          <div className="stage1" style={{ width: `${800 / data.length}px` }}>
            <h5>Stage1</h5>
          </div>

          {/* stage2 box  */}
          <div
            className="stage2"
            style={{
              width: `${(800 / data.length) * stage2.length}px`,
              left: `${800 / data.length}px`,
            }}
          >
            <h5>Stage2</h5>
          </div>

          {/* stage3 box  */}
          <div
            className="stage3"
            style={{
              width: `${(800 / data.length) * stage3.length}px`,
              left: `${
                800 / data.length + (800 / data.length) * stage2.length
              }px`,
            }}
          >
            <h5>Stage3</h5>
          </div>

          {/* chart box  */}
          <div
            style={{
              marginTop: "50px",
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          >
            <Chart2
              chartData={tempArray}
              stageTwoLen={stage2.length}
              stageThreeLen={stage3.length}
              setActivePoint={setActivePoint}
              setActiveStage={setActiveStage}
            />
          </div>
        </div>

        <h1>Temperature Data</h1>

        {/* data container  */}
        <div className="data-container">
          <div className="data-tile">
          <div className="tile-inner">
                  <h4>Temperature</h4>
                  <h4>Time</h4>
                </div>
            {data.map((point) => {
              return (
                <div className="tile-inner">
                  <p>{point.temp}&#176;</p>
                  <p>{point.time}</p>
                </div>
              );
            })}
          </div>
          

          {activeStage !== null && (
            <div className="action-tile">
              <div className="values">
                <input
                  type="number"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                />
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              {activeStage === 1 ? (
                <div className="buttons">
                  <button onClick={updateStage1}>Update</button>
                </div>
              ) : (
                <div className="buttons">
                  <button onClick={addPointToLeft}>Before</button>
                  <button onClick={addPointToRights}>After</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chart;
