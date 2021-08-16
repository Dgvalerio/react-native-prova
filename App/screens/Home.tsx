import React, { FC, useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Feather, MaterialIcons } from '@expo/vector-icons';

import Container from '../components/Container';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Text from '../components/Text';
import { back } from '../services/api';
import { signOut } from '../store/auth/actions';
import {
  header,
  headerIcon,
  headerLogo,
  headerLogoGreen,
  headerLogoTitle,
  title,
  main,
  btnFilters,
  btnType,
  filtersText,
  betItem,
  pagination,
  filtersContainer,
} from '../styles/home';
import { IBetWithType, IType } from '../types/interfaces';
import { HomeProps } from '../types/navigation';
import { formatDate, formatMoney, handleError } from '../utils';

const Home: FC<HomeProps> = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => dispatch(signOut());

  const [bets, setBets] = useState<IBetWithType[]>([]);
  const [types, setTypes] = useState<IType[]>();
  const [selectedType, setSelectedType] = useState<number>();
  const [haveAnyError, setHaveAnyError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadTypes = useCallback(() => {
    back.types
      .index({})
      .then(({ data }) => setTypes(data))
      .catch((error) => {
        handleError(error, 'Houve um problema ao carregar os tipos de aposta.');
        setHaveAnyError(true);
      });
  }, []);

  const loadBets = useCallback((type_id: number, pg: number) => {
    back.bets
      .index({ page: pg, limit: 5, type_id })
      .then(({ data }) => {
        setBets(
          data.data.map((bet: IBetWithType) => ({
            ...bet,
            created_at: bet.created_at ? formatDate(bet.created_at) : '',
            numbers: `${bet.numbers}`.match(/[\d]+/g)?.join(', '),
            type: {
              ...bet.type,
              price: formatMoney(bet.type.price),
            },
          }))
        );
        setTotalPages(data.meta.last_page);
      })
      .catch((error) => {
        handleError(error, 'Houve um problema ao carregar as apostas.');
        setHaveAnyError(true);
      });
  }, []);

  useEffect(() => loadTypes(), []);
  useEffect(() => {
    if (types) {
      if (types.length > 0) {
        setSelectedType(types[0].id);
        setHaveAnyError(false);
      } else {
        setHaveAnyError(true);
      }
    }
  }, [types]);
  useEffect(() => {
    if (selectedType) loadBets(selectedType, page);
  }, [selectedType, page, loadBets]);

  if (haveAnyError)
    return (
      <Container>
        <View style={header}>
          <View style={headerLogo}>
            <Text style={headerLogoTitle}>TGL</Text>
            <View style={headerLogoGreen} />
          </View>
          <TouchableOpacity onPress={handleSignOut}>
            <MaterialIcons
              name="logout"
              size={24}
              color="#C1C1C1"
              style={headerIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={title}>Recent Games</Text>
        <Text>You have no bets.</Text>
      </Container>
    );

  if (!types || !selectedType || !bets) return <Loading />;

  const handleChangeSelectedType = (type: number) => {
    setSelectedType(type);
    setPage(1);
  };

  const pageBack = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));
  const pageNext = () =>
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));

  return (
    <Container>
      <View style={header}>
        <View style={headerLogo}>
          <Text style={headerLogoTitle}>TGL</Text>
          <View style={headerLogoGreen} />
        </View>
        <TouchableOpacity onPress={handleSignOut}>
          <MaterialIcons
            name="logout"
            size={24}
            color="#C1C1C1"
            style={headerIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={main}>
        <Text style={title}>Recent Games</Text>
        <View style={filtersContainer}>
          <Text style={filtersText}>Filters</Text>
          <ScrollView contentContainerStyle={btnFilters} horizontal>
            {types.map((type) => (
              <TouchableOpacity
                style={btnType(selectedType === type.id, type.color).btn}
                key={type.type}
                onPress={() => handleChangeSelectedType(type.id)}
              >
                <Text
                  style={btnType(selectedType === type.id, type.color).text}
                >
                  {type.type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {bets.length > 0 ? (
          bets.map((bet) => (
            <View key={bet.id} style={betItem(bet.type.color).item}>
              <View style={betItem(bet.type.color).before} />
              <View style={betItem(bet.type.color).content}>
                <Text style={betItem(bet.type.color).textBold}>
                  {bet.numbers}
                </Text>
                <Text>
                  {bet.created_at} - ({bet.type.price})
                </Text>
                <Text style={betItem(bet.type.color).textColor}>
                  {bet.type.type}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text>You have no bets of the selected type.</Text>
        )}
        <View style={pagination}>
          <TouchableOpacity
            onPress={pageBack}
            disabled={page <= 1}
            style={{ opacity: page <= 1 ? 0.4 : 1 }}
          >
            <Feather name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <Text>
            Page {page} of {totalPages}
          </Text>
          <TouchableOpacity
            onPress={pageNext}
            disabled={page >= totalPages}
            style={{ opacity: page >= totalPages ? 0.4 : 1 }}
          >
            <Feather name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </Container>
  );
};

export default Home;
