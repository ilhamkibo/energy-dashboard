// DataTable.js
import React from "react";

const DataTable = ({ data }) => {
  const renderTable = (group) => {
    const isTemperatureController = group.name.includes(
      "Temperature Controller"
    );

    return (
      <div key={group.name} className="overflow-x-auto my-2 p-2">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-2 border-b">No</th>
              <th className="py-2 px-2 border-b">Name</th>
              {group.values.map((val, idx) => (
                <th key={idx} className="py-2 px-2 border-b">
                  {val.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-2 border-b">1</td>
              <td className="py-2 px-2 border-b">{group.name}</td>
              {group.values.map((val, idx) => (
                <td key={idx} className="py-2 px-2 border-b">
                  {val.raw_data !== undefined && val.raw_data !== null
                    ? val.raw_data
                    : "No data"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return <div>{data && data.map((group) => renderTable(group))}</div>;
};

export default DataTable;
