function Loader({ errorMessage }: { errorMessage: string }) {
  return errorMessage ? (
    <div className="flex-row m-5 text-red-600">{errorMessage}</div>
  ) : (
    <div className="flex-row m-5">Fetching data...</div>
  );
}

export default Loader;
