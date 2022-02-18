import "./TLTList.css";

const TLTList = ({ displayList, listDisplayToggle, setListDisplayToggle }) => {
  return (
    <>
      <div className="tlt-header text-center">
        <h1>{listDisplayToggle === "tlt" ? "To-Listen-To" : "Listened-To"}</h1>
        <div className="list-selector">
          <select
            className="form-select"
            defaultValue={"tlt"}
            onChange={(event) => setListDisplayToggle(event.target.value)}
          >
            <option value="tlt">To-Listen-To</option>
            <option value="lt">Listened-To</option>
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <ul className="tlt-list">{displayList}</ul>
      </div>
    </>
  );
};

export default TLTList;
