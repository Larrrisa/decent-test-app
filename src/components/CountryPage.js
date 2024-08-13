import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountry } from "../redux/CountrySlice";

export default function CountryPage() {
  let { countryCode } = useParams();

  const dispatch = useDispatch();
  const {
    entities: country,
    status,
    error,
  } = useSelector((state) => state.country);

  useEffect(() => {
    if (countryCode) {
      dispatch(fetchCountry(countryCode));
    }
  }, [countryCode, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (status === "succeeded" && country.length > 0) {
    return (
      <div className="country-card">
        <div className="country-card__info">
          <h1>{country[0].name?.common}</h1>
          <p>Capital: {country[0].capital}</p>
          <p>Region: {country[0].region}</p>
          <p>Population: {country[0].population}</p>
        </div>
        <div className="country-card__img">
          <img
            src={country[0].flags.svg}
            alt={`Flag of ${country[0].name.common}`}
          />
        </div>
      </div>
    );
  }
}
