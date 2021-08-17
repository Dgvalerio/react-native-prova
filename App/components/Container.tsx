import React, { FC } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';

import { StatusBar } from 'expo-status-bar';

import { container, signedContainer } from '../styles/global';
import { useSwipe } from '../utils/hooks';

const Container: FC<{
  scrollable?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onRefresh?: () => void;
}> = ({
  children,
  scrollable = true,
  onSwipeLeft,
  onSwipeRight,
  onRefresh,
}) => {
  const { signed } = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = React.useState(false);

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight);

  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (onRefresh) await onRefresh();
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ minHeight: '100%' }}
      scrollEnabled={scrollable}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={signed ? signedContainer : container}>
        <StatusBar style="auto" />
        {children}
      </View>
    </ScrollView>
  );
};

export default Container;
