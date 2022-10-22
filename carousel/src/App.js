import Carousel from "./components/Carousel";

function App() {
  return (
    <div className="container">
      <Carousel Slides="1" Infinite="false" />
      <Carousel Slides="4" Infinite="true" />
      <Carousel Slides="10" Infinite="false" />
    </div>
  );
}

export default App;
