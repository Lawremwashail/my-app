// import './App.css';
// import Accordian from './components/accordian';
// import QrCodeGenerator from './components/qr-code-generator';
// import LightDarkTheme from './components/theme-change';
// import LoadMoreImages from './components/load-more-images';
// import ImageSlider from './components/image-slider';
// import RandomColor from './components/random-color';
// import StarRating from './components/star-rating';
// import TreeView from './components/recursive-tree-menu';
// import LoadMoreImages from './components/load-more-images';
// import ScrollIndicator from "./components/scroll-indicator";
// import Tabs from "./components/custom-tabs";
// import TabsTest from "./components/custom-tabs/tab-test";
import './Weather.css'

import Weather from "./components/weather-app";



function App() {
  return (
    <div className="App">
      {/* <Accordian/> */}
      {/* <RandomColor/> */}
      {/* <StarRating /> */}
      {/* <ImageSlider
      url={"https://picsum.photos/v2/list"}
      limit={'10'}
      page={'1'}      
      /> */}
      {/* <LoadMoreImages /> */}
      {/* <QrCodeGenerator/> */}
      {/* <LightDarkTheme/> */}
      {/* <TreeView menus={menus}/> */}
      {/* <ScrollIndicator url={"https://dummyjson.com/products?limit=100"} /> */}
      {/* <TabsTest/> */}


      {/* Weather App */}
      <Weather />
    </div>
  );
}

export default App;