import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ImageBackground, TouchableOpacity, Platform } from 'react-native';
import { Searchbar, Text, Card, Divider, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import disordersData from '../data/disorders.json';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export default function DisordersPage() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredDisorders, setFilteredDisorders] = useState(disordersData.disorders);
	const navigation = useNavigation();

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		const filtered = disordersData.disorders.filter(disorder =>
			disorder.name.toLowerCase().includes(query.toLowerCase()) ||
			disorder.description.toLowerCase().includes(query.toLowerCase())
		);
		setFilteredDisorders(filtered);
	};

	const renderDisorderItem = ({ item }: { item: any }) => (
		<TouchableOpacity 
			onPress={() => router.push(`/symptoms/${item.id}`)}
			activeOpacity={0.8}
		>
			<Card style={styles.card}>
				<Card.Content>
					<View style={styles.cardHeader}>
						<MaterialIcons name="healing" size={24} color="#D4B895" />
						<Text variant="titleLarge" style={styles.disorderName}>
							{item.name}
						</Text>
					</View>
					<Divider style={styles.divider} />
					<Text variant="bodyMedium" style={styles.description}>
						{item.description}
					</Text>
					<View style={styles.categoryContainer}>
						<MaterialIcons name="category" size={16} color="#0B3B2D" />
						<Text variant="labelSmall" style={styles.category}>
							{item.category}
						</Text>
					</View>
				</Card.Content>
			</Card>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/images/Disorders.jpg')}
				style={styles.header}
			>
				<View style={styles.headerOverlay}>
					<Text variant="headlineMedium" style={styles.headerTitle}>
						Ayurvedic Disorders
					</Text>
				</View>
			</ImageBackground>

			<View style={styles.searchContainer}>
				<Searchbar
					placeholder="Search disorders..."
					onChangeText={handleSearch}
					value={searchQuery}
					style={styles.searchBar}
					inputStyle={styles.searchInput}
					iconColor="#0B3B2D"
					placeholderTextColor="#0B3B2D"
				/>
			</View>

			<Card style={styles.introCard}>
				<Card.Content>
					<Text style={styles.introText}>
						Explore Ayurvedic approaches to common health conditions and their natural remedies.
					</Text>
				</Card.Content>
			</Card>

			<FlatList
				data={filteredDisorders}
				renderItem={renderDisorderItem}
				keyExtractor={item => item.id.toString()}
				contentContainerStyle={styles.listContainer}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F3F8F4',
	},
	header: {
		height: 200,
	},
	headerOverlay: {
		height: '96%',
		backgroundColor: 'rgba(11, 59, 45, 0.6)',
		justifyContent: 'flex-end',
		padding: 16,
		paddingTop: Platform.OS === 'ios' ? 40 : 32,
	},
	headerTitle: {
		color: 'white',
		fontWeight: 'bold',
		marginBottom: 8,
		fontFamily: 'Poppins-Bold',
	},
	headerSubtitle: {
		color: 'white',
		fontSize: 16,
		fontFamily: 'Poppins-Regular',
	},
	searchContainer: {
		position: 'relative',
		marginTop: -25,
		zIndex: 1,
		paddingHorizontal: 16,
	},
	searchBar: {
		borderRadius: 25,
		elevation: 8,
		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.25,
		shadowRadius: 5,
		borderWidth: 1,
		borderColor: 'rgba(11, 59, 45, 0.2)',
	},
	searchInput: {
		fontFamily: 'Poppins-Regular',
		fontSize: 16,
		color: '#0B3B2D',
	},
	introCard: {
		margin: 16,
		marginTop: 8,
		backgroundColor: '#0B3B2D',
		borderRadius: 12,
		elevation: 4,
	},
	introText: {
		color: 'white',
		fontFamily: 'Poppins-Regular',
		fontSize: 16,
		lineHeight: 24,
	},
	listContainer: {
		padding: 20,
		paddingTop: 0,
	},
	card: {
		marginBottom: 12,
		borderRadius: 12,
		elevation: 2,
		backgroundColor: 'white',
	},
	cardHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	disorderName: {
		fontFamily: 'Poppins-Bold',
		fontSize:20,
		color: '#0B3B2D',
		marginLeft: 12,
		flex: 1,
	},
	divider: {
		backgroundColor: '#D4B89533',
		height: 1,
		marginBottom: 12,
	},
	description: {
		color: '#0B3B2D',
		marginBottom: 12,
		fontFamily: 'Poppins-Regular',
		lineHeight: 22,
	},
	categoryContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	category: {
		color: '#0B3B2D',
		fontFamily: 'Poppins-Bold',
		marginLeft: 8,
	},
	headerContent: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 8,
		marginBottom: 16,
	},
	menuButton: {
		margin: 0,
	},
});