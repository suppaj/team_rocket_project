import React from "react";

const Search = () => {
  return (
    <div id="admin-search">
      <form>
        <input
          type="text"
          id="name_field"
          class="nes-input"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            console.log("Search button has been clicked");
          }}
        >
          {/* Search */}
        </button>
      </form>
    </div>
  );
};

export default Search;
