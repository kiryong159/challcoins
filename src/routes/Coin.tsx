import styled from "styled-components";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoin, fetchCoinTickers } from "../api";
import Price from "./Price";
import Chart from "./Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

const Container = styled.div`
  margin: 0 auto;
  padding: 0px 20px;
  max-width: 480px;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  align-items: center;
  span:first-child {
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 17px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
`;

interface CoinParams {
  coinId: string;
}

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: Date;
  first_data_at: Date;
  last_data_at: Date;
}

interface ITickers {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: Date;
      percent_from_price_ath: number;
    };
  };
}

interface RouteState {
  name: string;
}

function Coin() {
  const { coinId } = useParams<CoinParams>();
  const location = useLocation<RouteState>();
  const priceMatch = useRouteMatch(`/${coinId}/price`);
  const chartMatch = useRouteMatch(`/${coinId}/chart`);
  const { data: coinData, isLoading: coinLoading } = useQuery<ICoin>(
    ["coin", `${coinId}`],
    () => fetchCoin(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<ITickers>(
    ["tickers", `${coinId}`],
    () => fetchCoinTickers(coinId)
  );

  return (
    <Container>
      <Helmet>
        <title>{coinData ? coinData.name : "코인"}</title>
        <link
          rel="icon"
          href={`https://coinicons-api.vercel.app/api/icon/${coinData?.symbol.toLowerCase()}`}
          sizes="16x16"
          type="image/png"
        />
      </Helmet>
      <Header>
        <Title>
          {location.state?.name
            ? location.state?.name
            : coinData?.name
            ? coinData.name
            : "Loading..."}
        </Title>
      </Header>
      {coinLoading ? (
        "Loading..."
      ) : tickersLoading ? (
        "Loading..."
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{coinData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <Img
                src={`https://coinicons-api.vercel.app/api/icon/${coinData?.symbol.toLowerCase()}`}
              />
            </OverviewItem>
            <OverviewItem>
              <span>Price</span>
              <span>{tickersData?.quotes.USD.price.toFixed(2)}$</span>
            </OverviewItem>
          </Overview>
          <Description>{coinData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Home</span>
              <Link to="/">
                <FontAwesomeIcon icon={faHouse} />
              </Link>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} tickersData={tickersData} />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
