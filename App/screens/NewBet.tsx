import React, { FC, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Text from '../components/Text';
import { back } from '../services/api';
import { theme, main } from '../styles/global';
import {
  btnFilters,
  btnType,
  filtersContainer,
  filtersText,
  flexRow,
  title,
} from '../styles/home';
import {
  button,
  buttons,
  buttonText,
  descriptionText,
  description,
  greenButton,
  greenButtonText,
  miniNumberButton,
  numberButton,
  numbersButtons,
  descriptionTitle,
  cartTitle,
  cartView,
  cartHeader,
  cartTotal,
  cartItem,
  cartButtonSave,
  cartButtonSaveText,
  cartOverview,
} from '../styles/newBet';
import { IBetWithType, IType } from '../types/interfaces';
import { NewBetProps } from '../types/navigation';
import { formatDate, formatMoney, handleError } from '../utils';

const NewBet: FC<NewBetProps> = ({ navigation }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState<IBetWithType[]>([]);
  const [types, setTypes] = useState<IType[]>();
  const [selectedType, setSelectedType] = useState<IType>();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [haveAnyError, setHaveAnyError] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  const loadTypes = () => {
    back.types
      .index({})
      .then(({ data }) => setTypes(data))
      .catch((error) => {
        handleError(error, 'Houve um problema ao carregar os tipos de aposta.');
        setHaveAnyError(true);
      });
  };

  useEffect(() => loadTypes(), []);
  useEffect(() => {
    if (types) setSelectedType((prev) => prev || types[0]);
  }, [types]);

  if (haveAnyError)
    return (
      <Container>
        <Header navigation={navigation} />
        <View style={main}>
          <Text style={title}>New Bet</Text>
          <Text>There&apos;s nothing around here right now.</Text>
        </View>
      </Container>
    );
  if (!types || !selectedType) return <Loading />;

  const handleChangeSelectedType = (type: string) => {
    if (selectedType.type !== type) {
      setSelectedType(types.find((one) => one.type === type));
      setSelectedNumbers([]);
    }
  };

  const handleSelectNumber = (number: string) => {
    if (selectedNumbers.indexOf(+number) >= 0) {
      setSelectedNumbers((prevState) => prevState.filter((n) => n !== +number));
    } else if (selectedNumbers.length === selectedType.max_number) {
      alert(
        `Você não pode marcar mais que ${selectedType.max_number} números!`
      );
    } else {
      setSelectedNumbers((prevState) => prevState.concat(+number));
    }
  };

  const handleClearGame = () => setSelectedNumbers([]);

  const handleCompleteGame = () => {
    const numbers = selectedNumbers;

    if (numbers.length === selectedType.max_number) {
      alert('Todos os números já estão marcados.');
      return;
    }

    while (numbers.length < selectedType.max_number) {
      const n = Math.floor(Math.random() * selectedType.range);
      if (numbers.indexOf(n) < 0) numbers.push(+n);
    }

    setSelectedNumbers([...numbers]);
  };

  const handleAddToCart = () => {
    if (selectedNumbers.length === selectedType.max_number) {
      setCart((prev) =>
        prev.concat({
          type: selectedType,
          numbers: selectedNumbers,
          id: `${new Date().getTime()}`,
        })
      );
      setTotalPrice((prev) => prev + selectedType.price);

      handleClearGame();
    } else {
      alert(`Você precisa selecionar ${selectedType.max_number} números!`);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    const thisBet = cart.find((bet) => bet.id === id);
    if (!thisBet) return;
    setCart((prev) => prev.filter((bet) => bet.id !== id));
    setTotalPrice((prev) => prev - thisBet.type.price);
  };

  const handleSaveCart = async () => {
    if (totalPrice > 30) {
      back.bets
        .multiCreate(
          cart.map((bet) => ({ numbers: bet.numbers, type_id: bet.type.id }))
        )
        .then(() => navigation.navigate('RecentGames'))
        .catch((error) =>
          error.response.data
            ? Object.entries(error.response.data).forEach((e) =>
                alert(`${e[1] as string}`)
              )
            : alert('Houve um erro ao salvar suas apostas!')
        );
    } else {
      alert('Você deve mais que R$ 30,00 em apostas para salvar!');
    }
  };

  const handleShowCart = () => setCartVisible(true);

  const handleHideCart = () => setCartVisible(false);

  return (
    <Container
      scrollable={!cartVisible}
      onSwipeLeft={handleShowCart}
      onSwipeRight={handleHideCart}
    >
      <Header
        navigation={navigation}
        cartButton={selectedNumbers.length > 0 || cart.length > 0}
        onCartPress={handleShowCart}
      />
      <View style={main}>
        <Text style={title}>New Bet for loto</Text>
        <View style={filtersContainer}>
          <Text style={filtersText}>Choose a game</Text>
          <ScrollView contentContainerStyle={btnFilters} horizontal>
            {types.map((type) => (
              <TouchableOpacity
                style={btnType(selectedType.id === type.id, type.color).btn}
                key={type.type}
                onPress={() => handleChangeSelectedType(type.type)}
              >
                <Text
                  style={btnType(selectedType.id === type.id, type.color).text}
                >
                  {type.type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {selectedNumbers.length > 0 ? (
          <>
            <View style={numbersButtons}>
              {selectedNumbers.map((number) => (
                <TouchableOpacity
                  style={miniNumberButton(selectedType.color).btn}
                  key={number}
                  onPress={() => handleSelectNumber(`${number}`)}
                >
                  <Text style={miniNumberButton(selectedType.color).txt}>
                    {`0${number}`.slice(-2)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={buttons}>
              <TouchableOpacity onPress={handleCompleteGame} style={button}>
                <Text style={buttonText}>Complete game</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleClearGame} style={button}>
                <Text style={buttonText}>Clear game</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddToCart} style={greenButton}>
                <Text style={greenButtonText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={description}>
            <Text style={descriptionTitle}>Fill your bet</Text>
            <Text style={descriptionText}>{selectedType.description}</Text>
          </View>
        )}
        <View style={numbersButtons}>
          {[...new Array(selectedType.range)]
            .map((value, pos) => `0${pos}`.slice(-2))
            .map((number) => (
              <TouchableOpacity
                style={
                  numberButton(
                    selectedNumbers.indexOf(+number) >= 0
                      ? selectedType.color
                      : ''
                  ).btn
                }
                key={number}
                onPress={() => handleSelectNumber(number)}
              >
                <Text
                  style={
                    numberButton(
                      selectedNumbers.indexOf(+number) >= 0
                        ? selectedType.color
                        : ''
                    ).txt
                  }
                >
                  {number}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
      {cartVisible && (
        <View style={cartOverview}>
          <View style={cartView}>
            <View style={cartHeader}>
              <AntDesign
                name="shoppingcart"
                size={24}
                color={theme.colors.primary}
              />
              <Text style={cartTitle}>Cart</Text>
              <TouchableOpacity
                onPress={handleHideCart}
                style={{ marginLeft: 'auto', padding: 4 }}
              >
                <AntDesign
                  name="close"
                  size={24}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ height: '100%' }}>
              {cart.length > 0 ? (
                cart.map((bet) => (
                  <View key={bet.id} style={cartItem(bet.type.color).item}>
                    <View style={cartItem(bet.type.color).before} />
                    <View style={cartItem(bet.type.color).content}>
                      <Text style={cartItem(bet.type.color).textBold}>
                        {bet.numbers
                          .map((pos) => `0${pos}`.slice(-2))
                          .join(', ')}
                      </Text>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Text style={cartItem(bet.type.color).textNormal}>
                          {formatDate(new Date().toISOString())} - (
                          {formatMoney(bet.type.price)})
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleRemoveFromCart(bet.id)}
                          style={{ marginLeft: 'auto', padding: 8 }}
                        >
                          <Feather
                            name="trash-2"
                            size={12}
                            color={theme.colors.textColor}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={cartItem(bet.type.color).textColor}>
                        {bet.type.type}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text>You have no bets in cart.</Text>
              )}
            </ScrollView>
            <View
              style={{
                ...flexRow,
                paddingTop: 24,
                marginTop: 'auto',
              }}
            >
              <Text style={cartTotal} bold>
                Cart{' '}
              </Text>
              <Text style={cartTotal}>total:</Text>
              <Text style={{ ...cartTotal, marginLeft: 'auto' }} bold>
                {formatMoney(totalPrice)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleSaveCart()}
              style={cartButtonSave}
            >
              <Text style={cartButtonSaveText}>
                Save{' '}
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={30}
                  color={theme.colors.primary}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Footer />
    </Container>
  );
};

export default NewBet;
