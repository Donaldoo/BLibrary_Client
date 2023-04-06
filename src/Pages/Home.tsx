import React from "react";
import { BookList } from "../Components/Page";
import Banner from "../Components/Common/Banner";


function Home() {
  return (
    <div>
      <div>
        <Banner />
        <BookList />
      </div>
    </div>
  );
}

export default Home;
