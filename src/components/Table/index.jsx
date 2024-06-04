import React from "react";

const DataTable = ({ data = [] }) => {
  const renderTemperatureTable = (temperatureData) => {
    return (
      <div className="overflow-x-auto my-2 p-2">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-2 border-b">No</th>
              <th className="py-2 px-2 border-b">Name</th>
              <th className="py-2 px-2 border-b">Temperature</th>
            </tr>
          </thead>
          <tbody>
            {temperatureData && temperatureData.length > 0 ? (
              temperatureData.map((group, index) => (
                <tr key={index}>
                  <td className="py-2 px-2 border-b">{index + 1}</td>
                  <td className="py-2 px-2 border-b">{group.name}</td>
                  <td className="py-2 px-2 border-b">
                    {group.values[0]?.raw_data ?? "No data"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-2 px-2 border-b">
                  Waiting for the data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderPowerMeterTable = (powerMeterData) => {
    return (
      <div className="overflow-x-auto my-2 p-2">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-2 border-b">No</th>
              <th className="py-2 px-2 border-b">Name</th>
              <th className="py-2 px-2 border-b">KVA</th>
              <th className="py-2 px-2 border-b">KW</th>
              <th className="py-2 px-2 border-b">T Current</th>
              <th className="py-2 px-2 border-b">S Current</th>
              <th className="py-2 px-2 border-b">R Current</th>
              <th className="py-2 px-2 border-b">Frequency</th>
              <th className="py-2 px-2 border-b">V3</th>
              <th className="py-2 px-2 border-b">V2</th>
              <th className="py-2 px-2 border-b">V1</th>
            </tr>
          </thead>
          <tbody>
            {powerMeterData && powerMeterData.length > 0 ? (
              powerMeterData.map((group, index) => (
                <tr key={index}>
                  <td className="py-2 px-2 border-b">{index + 1}</td>
                  <td className="py-2 px-2 border-b">{group.name}</td>
                  <td className="py-2 px-2 border-b">
                    {group.values.find((val) => val.name === "KVA")?.raw_data ??
                      "No data"}
                  </td>
                  <td className="py-2 px-2 border-b">
                    {group.values.find((val) => val.name === "KW")?.raw_data ??
                      "No data"}
                  </td>
                  <td className="py-2 px-2 border-b">
                    {group.values.find((val) => val.name === "T Current")
                      ?.raw_data ?? "No data"}
                  </td>
                  <td className="py-2 px-2 border-b">
                    {group.values.find((val) => val.name === "S Current")
                      ?.raw_data ?? "No data"}
                  </td>
                  <td className="py-2 px-2 border-b">
                    {group.values.find((val) => val.name === "R Current")
                      ?.raw_data ?? "No data"}
                  </td>
                  <td className="py-2 px-2 border-b">
                    {group.values.find((val) => val.name === "Frequency")
                      ?.raw_data ?? "No data"}
                  </td>
                  <td className="py-2 px-2 border-b">
                    {group.values.find((val) => val.name === "V3")?.raw_data ??
                      "No data"}
                  </td>
                  <td className="py-2 px-2 border-b">
                    {group.values.find((val) => val.name === "V2")?.raw_data ??
                      "No data"}
                  </td>
                  <td className="py-2 px-2 border-b">
                    {group.values.find((val) => val.name === "V1")?.raw_data ??
                      "No data"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="py-2 px-2 border-b">
                  Waiting for the data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const temperatureData = data.filter((group) =>
    group.name.toLowerCase().includes("temperature")
  );
  const powerMeterData = data.filter((group) =>
    group.name.toLowerCase().includes("power meter")
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Temperature Control Data</h2>
      {renderTemperatureTable(temperatureData)}
      <h2 className="text-xl font-bold mt-6 mb-4">Power Meter Data</h2>
      {renderPowerMeterTable(powerMeterData)}
    </div>
  );
};

export default DataTable;
