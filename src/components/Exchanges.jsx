import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { server } from "../index";
import { useState } from "react";
import { Box, Center, Container, HStack, Spinner } from "@chakra-ui/react";
import ExchangeCard from "./ExchangeCard";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
      setExchanges(data);
      setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if(error){
    return "error"
  }
  return (
    <>
      <Container maxW={{base:"container.lg","2xl":"100vw"}}>
        {loading ? (
          <Center >
            <Box w={"100vw"} h={"100vh"}>
          <Spinner size={"xl"}/>
          </Box>
        </Center>
        ) : (
          <>
            <HStack wrap={"wrap"} justifyContent={{base:"center"}} >
              {exchanges.map((e) => {
                return (
                  <ExchangeCard
                    key={e.id}
                    name={e.name}
                    img={e.image}
                    rank={e.trust_score_rank}
                    url={e.url}
                  />
                );
              })}
            </HStack>
          </>
        )}
      </Container>
    </>
  );
};

export default Exchanges;