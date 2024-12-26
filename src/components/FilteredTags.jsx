import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NoteCards from "./NoteCards";
import { DataContext } from "../App";

function FilteredTagsPage() {
  const location = useLocation();
  const selectedTag = location.state?.selectedTag; 
const{searchResults} = useContext(DataContext)
  useEffect(() => {
    if (selectedTag) {
      dispatchNotes({ type: "UPDATE_TAG", payload: { tag: selectedTag } });
    }
  }, [selectedTag]); 

  return (
    <div>
      {selectedTag ? (
        <NoteCards data={searchResults} /> 
      ) : (
        <p>No tag selected or notes available.</p>
      )}
    </div>
  );
}
export default FilteredTagsPage;