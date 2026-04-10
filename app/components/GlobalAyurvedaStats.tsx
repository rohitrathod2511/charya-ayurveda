import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Card, Button, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarChart, PieChart } from 'react-native-chart-kit';

const globalStats = {
  totalPractitioners: '1.2M+',
  annualGrowthRate: '16.8%',
  marketSize: '$9.5B',
  regions: [
    { name: 'India', percentage: 55, color: '#FF9F40' },
    { name: 'North America', percentage: 18, color: '#4CAF50' },
    { name: 'Europe', percentage: 12, color: '#36A2EB' },
    { name: 'Asia Pacific', percentage: 10, color: '#9966FF' },
    { name: 'Others', percentage: 5, color: '#FF6384' },
  ],
  yearlyAdoption: [
    { year: 2019, users: 4.8 },
    { year: 2020, users: 5.7 },
    { year: 2021, users: 7.1 },
    { year: 2022, users: 8.4 },
    { year: 2023, users: 9.5 },
  ],
};

export default function GlobalAyurvedaStats() {
  const [selectedView, setSelectedView] = useState('regional');
  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  const pieChartData = globalStats.regions.map(region => ({
    name: region.name,
    population: region.percentage,
    color: region.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));



  const renderRegionalData = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Global Distribution</Text>
      <PieChart
        data={pieChartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );

  const renderOverview = () => (
    <View style={styles.statsContainer}>
      <Surface style={styles.statCard} elevation={4}>
        <MaterialCommunityIcons name="account-group" size={32} color="#4CAF50" />
        <Text style={styles.statNumber}>{globalStats.totalPractitioners}</Text>
        <Text style={styles.statLabel}>Practitioners</Text>
      </Surface>
      <Surface style={styles.statCard} elevation={4}>
        <MaterialCommunityIcons name="trending-up" size={32} color="#4CAF50" />
        <Text style={styles.statNumber}>{globalStats.annualGrowthRate}</Text>
        <Text style={styles.statLabel}>Annual Growth</Text>
      </Surface>
      <Surface style={styles.statCard} elevation={4}>
        <MaterialCommunityIcons name="currency-usd" size={32} color="#4CAF50" />
        <Text style={styles.statNumber}>{globalStats.marketSize}</Text>
        <Text style={styles.statLabel}>Market Size</Text>
      </Surface>
    </View>
  );


  const renderGrowthTrend = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Adoption Growth Trend</Text>
      <BarChart
        data={{
          labels: globalStats.yearlyAdoption.map(item => item.year.toString().slice(-2)),
          datasets: [{
            data: globalStats.yearlyAdoption.map(item => item.users)
          }]
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        showValuesOnTopOfBars
        fromZero
        yAxisLabel=""
        yAxisSuffix="%"
      />
    </View>
  );

  return (
    <Card style={styles.container}>
      <View style={styles.headerBanner}>
        <MaterialCommunityIcons name="leaf" size={24} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Global Ayurveda Impact</Text>
      </View>
      <Card.Content style={styles.content}>
        <View style={styles.buttonGroup}>
         
          <Button
            mode={selectedView === 'regional' ? 'contained' : 'outlined'}
            onPress={() => setSelectedView('regional')}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            buttonColor={selectedView === 'regional' ? '#0B3B2D' : 'transparent'}
            textColor={selectedView === 'regional' ? '#FFFFFF' : '#0B3B2D'}
          >
            Regional Data
          </Button>
           <Button
            mode={selectedView === 'overview' ? 'contained' : 'outlined'}
            onPress={() => setSelectedView('overview')}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            buttonColor={selectedView === 'overview' ? '#0B3B2D' : 'transparent'}
            textColor={selectedView === 'overview' ? '#FFFFFF' : '#0B3B2D'}
          >
            Overview
          </Button>
          <Button
            mode={selectedView === 'growth' ? 'contained' : 'outlined'}
            onPress={() => setSelectedView('growth')}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            buttonColor={selectedView === 'growth' ? '#0B3B2D' : 'transparent'}
            textColor={selectedView === 'growth' ? '#FFFFFF' : '#0B3B2D'}
          >
            Growth Trend
          </Button>
        </View>

        {selectedView === 'regional' && renderRegionalData()}
        {selectedView === 'overview' && renderOverview()}
        {selectedView === 'growth' && renderGrowthTrend()}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    elevation: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  headerBanner: {
    backgroundColor: '#0B3B2D',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  content: {
    paddingTop: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    gap: 8,
    paddingHorizontal: 4,
  },
  button: {
    flex: 1,
    borderColor: '#0B3B2D',
  },
  buttonContent: {
    height: 40,
  },
  buttonLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 12,
    paddingVertical: 8,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    minWidth: 100,
    borderWidth: 1,
    borderColor: 'rgba(11, 59, 45, 0.1)',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0B3B2D',
    marginTop: 8,
    fontFamily: 'Poppins-Bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0B3B2D',
    fontFamily: 'Poppins-Bold',
  },
}); 