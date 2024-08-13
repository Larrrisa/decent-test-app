import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCountries } from "../redux/AllCountriesSlice";

export default function MainPage() {
  const dispatch = useDispatch();
  const {
    entities: countries,
    status,
    error,
  } = useSelector((state) => state.countries);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCountries());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-page">
      <h1>List of countries</h1>
      {countries.map((country) => (
        <div key={country.cca3} className="countries__item">
          <Link to={`/${country.cca3}`}> {country.name.common}</Link>
        </div>
      ))}
    </div>
  );
}
