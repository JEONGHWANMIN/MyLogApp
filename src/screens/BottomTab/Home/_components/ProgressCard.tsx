import {theme} from '@/styles/theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';

interface ProgressCardProps {
  writePercent: number;
  writeDays: number;
  totalDays: number;
}

const ProgressCard = ({writeDays, totalDays, writePercent}: ProgressCardProps) => {
  return (
    <View style={styles.monthCard}>
      <Text style={styles.monthCardTitle}>이번달 작성한 일기</Text>
      <View style={styles.monthSubTitle}>
        <Text>{writePercent}%</Text>
        <Text>{`${writeDays}일 / ${totalDays}일`}</Text>
      </View>
      <ProgressBar
        progress={writePercent / 100}
        color={theme.colors.point.mintGreen}
        style={styles.progressBar}
      />
    </View>
  );
};

export {ProgressCard};

const styles = StyleSheet.create({
  progressBar: {
    height: 16,
    borderRadius: 10,
    borderColor: theme.colors.point.mintGreen,
    borderWidth: 1,
  },
  monthCardTitle: {
    fontSize: theme.typography.size.body1,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.gray[600],
  },
  monthSubTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  monthCard: {
    marginTop: 12,
    borderColor: theme.colors.gray[100],
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
  },
});
