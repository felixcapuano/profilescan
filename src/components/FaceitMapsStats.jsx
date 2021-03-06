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

const FaceitMapsStats = ({ faceitStats }) => {
  if (faceitStats.maps.length === 0) return null;

  const maps = faceitStats.maps.sort(
    (a, b) => b.stats["Matches"] - a.stats["Matches"]
  );

  const renderTable = (map, index) => {
    return (
      <tr key={map.label}>
        <th scope="row">{index + 1}</th>
        <td className="d-none d-sm-block">
          <img src={map.img_small} alt={map.label} />
        </td>
        <td>{mapMapping[map.label] || map.label}</td>
        <td>{map.stats["Matches"]}</td>
        <td>{map.stats["Win Rate %"]}%</td>
        <td>{map.stats["Average Kills"]}</td>
      </tr>
    );
  };

  const Table = () => {
    return (
      <table className="table table-striped">
        <thead className="text-center">
          <tr>
            <th scope="col">#</th>
            <th scope="col" className="d-none d-sm-block">
              Image
            </th>
            <th scope="col">Name</th>
            <th scope="col">Games</th>
            <th scope="col">Win(%)</th>
            <th scope="col">Kills(Avg)</th>
          </tr>
        </thead>
        <tbody className="align-middle text-center">
          {maps.map(renderTable)}
        </tbody>
      </table>
    );
  };

  return (
    <div className="card h-100">
      <div className="d-lg-flex card-body">
        <Table />
      </div>
    </div>
  );
};

export default FaceitMapsStats;
