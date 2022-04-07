import React from "react";

const mapMapping = {
  de_inferno: "Inferno",
  de_mirage: "Mirage",
  de_dust2: "Dust 2",
  de_overpass: "Overpass",
  de_vertigo: "Vertigo",
  de_nuke: "Nuke",
  de_cache: "Cache",
  de_train: "Train",
  de_ancient: "Ancient",
  de_cbble: "Cobblestone",
};

const FaceitMaps = ({ faceitStats }) => {
  if (!faceitStats.maps) return null;

  const maps = faceitStats.maps.sort(
    (a, b) => b.stats["Matches"] - a.stats["Matches"]
  );

  const renderTable = (map, index) => {
    return (
      <tr key={map.label}>
        <th scope="row">{index + 1}</th>
        <td>
          <img src={map.img_small} alt={map.label} />
        </td>
        <td className="text-center">{mapMapping[map.label] || map.label}</td>
        <td className="text-center">{map.stats["Matches"]}</td>
        <td className="text-center">{map.stats["Win Rate %"]}%</td>
        <td className="text-center">{map.stats["Average Kills"]}</td>
      </tr>
    );
  };

  const Table = () => {
    return (
      <table className="table table-striped">
        <thead className="">
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Games</th>
            <th scope="col">Win %</th>
            <th scope="col">Average Kills</th>
          </tr>
        </thead>
        <tbody>{maps.map(renderTable)}</tbody>
      </table>
    );
  };
  return (
    <div className="row gutters-sm">
      <div className="col-lg-7 mb-3">
        <div className="card h-100">
          <div className="d-lg-flex justify-content-center card-body">
            <div className="d-flex justify-content-center">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceitMaps;
