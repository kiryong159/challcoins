import {
  faArrowTrendDown,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

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
interface IProps {
  coinId: string;
  tickersData?: ITickers;
}

const Overview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.bgColor};
  margin: 10px;
  border-radius: 10px;
  padding: 13px;
  span:first-child {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 7px;
  }
`;

const PriceCard = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
`;

const AthCard = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  text-align: center;
  font-size: 25px;
  padding: 10px 20px;
  margin: 10px;
`;

const PercentText = styled.span<{ isGreen: boolean }>`
  font-size: 25px;
  font-weight: bold;
  color: ${(props) => (props.isGreen ? "green" : "red")};
`;

function Price({ coinId, tickersData }: IProps) {
  return (
    <>
      {tickersData ? (
        <Overview>
          <AthCard>
            <span>
              최고가 : {tickersData?.quotes.USD.ath_price.toFixed(2)}$
            </span>
          </AthCard>
          <PriceCard>
            <OverviewItem>
              <span>1시간 전보다</span>
              <PercentText
                isGreen={tickersData.quotes.USD.percent_change_1h >= 0}
              >
                {tickersData?.quotes.USD.percent_change_1h}%
                {tickersData.quotes.USD.percent_change_1h > 0 ? (
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowTrendDown} />
                )}
              </PercentText>
            </OverviewItem>
            <OverviewItem>
              <span>12시간 전보다</span>
              <PercentText
                isGreen={tickersData.quotes.USD.percent_change_12h >= 0}
              >
                {tickersData?.quotes.USD.percent_change_12h}%
                {tickersData.quotes.USD.percent_change_12h > 0 ? (
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowTrendDown} />
                )}
              </PercentText>
            </OverviewItem>
            <OverviewItem>
              <span>24시간 전보다</span>
              <PercentText
                isGreen={tickersData.quotes.USD.percent_change_24h >= 0}
              >
                {tickersData?.quotes.USD.percent_change_24h}%
                {tickersData.quotes.USD.percent_change_24h > 0 ? (
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowTrendDown} />
                )}
              </PercentText>
            </OverviewItem>
            <OverviewItem>
              <span>7일 전보다</span>
              <PercentText
                isGreen={tickersData.quotes.USD.percent_change_7d >= 0}
              >
                {tickersData?.quotes.USD.percent_change_7d}%
                {tickersData.quotes.USD.percent_change_7d > 0 ? (
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowTrendDown} />
                )}
              </PercentText>
            </OverviewItem>
            <OverviewItem>
              <span>30일 전보다</span>
              <PercentText
                isGreen={tickersData.quotes.USD.percent_change_30d >= 0}
              >
                {tickersData?.quotes.USD.percent_change_30d}%
                {tickersData.quotes.USD.percent_change_30d > 0 ? (
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowTrendDown} />
                )}
              </PercentText>
            </OverviewItem>
            <OverviewItem>
              <span>1년 전보다</span>
              <PercentText
                isGreen={tickersData.quotes.USD.percent_change_1y >= 0}
              >
                {tickersData?.quotes.USD.percent_change_1y}%
                {tickersData.quotes.USD.percent_change_1y > 0 ? (
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowTrendDown} />
                )}
              </PercentText>
            </OverviewItem>
          </PriceCard>
        </Overview>
      ) : (
        "Loading"
      )}
    </>
  );
}

export default Price;
