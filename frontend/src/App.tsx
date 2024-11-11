import Price from "./components/Price";

function App() {
  return (
    <div className="App">
      <div className="flex flex-col min-h-screen justify-center items-center">
        <h1 className="text-2xl font-bold h-8">Crypto Price</h1>
        <Price></Price>
      </div>
    </div>
  );
}

export default App;
