const TLTList = ({ displayList, setListDisplayToggle }) => {
  return (
    <>
      <h1>T-L-T List Page</h1>
      <select onChange={(event) => setListDisplayToggle(event.target.value)}>
        <option value="tlt">To-Listen-To</option>
        <option value="lt">Listened-To</option>
      </select>
      <ul>{displayList}</ul>
    </>
  );
};

export default TLTList;
