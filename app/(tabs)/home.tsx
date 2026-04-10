import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { Searchbar, Text, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Animated, { 
	FadeInDown, 
	FadeInRight,
	withSpring,
	useAnimatedStyle,
	withRepeat,
	withTiming,
	withSequence,
	withDelay,
	useSharedValue,
	FadeIn,
	Easing,
} from 'react-native-reanimated';
import disordersData from '../data/disorders.json';
import GlobalAyurvedaStats from '../components/GlobalAyurvedaStats';

interface Disorder {
	id: number;
	name: string;
	description: string;
	category: string;
}

const sections = [
	{ 
		id: 1, 
		title: 'Ayurveda for Life', 
		route: '/(drawer)/importance', 
		image: require('../../assets/images/Diet.jpg'),
		description: 'Science of life and longevity'
		
	},
	{ 
		id: 2, 
		title: 'Diet is Medicine', 
		route: '/(drawer)/diet-hygiene', 
		image: require('../../assets/images/Ayurveda.jpg'),
		description: 'Ancient wisdom for modern wellness'
	},
	{ 
		id: 3, 
		title: 'Prakruti Parikshan', 
		route: '/(tabs)/prakriti', 
		image: require('../../assets/images/PrakurtiParikshan.jpg'),
		description: 'Discover your constitution'
	},
	{ 
		id: 4, 
		title: 'Personal Advice', 
		route: '/(tabs)/advice', 
		image: require('../../assets/images/PersonalAdvice.jpg'),
		description: 'Expert ayurvedic guidance'
	},
];

export default function HomePage() {
	const router = useRouter();
	const navigation = useNavigation();
	
	const [fontsLoaded] = useFonts({
		'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
		'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
		'Sanskrit': require('../../assets/fonts/NotoSansDevanagari-Regular.ttf'),
		'Amita-Bold': require('../../assets/fonts/Amita-Bold.ttf'),
	});
	
	const [searchQuery, setSearchQuery] = useState('');
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [filteredDisorders, setFilteredDisorders] = useState<Disorder[]>([]);
	const translateX = useSharedValue(400);
	const opacity = useSharedValue(0);
	const [searchPlaceholder, setSearchPlaceholder] = useState('Search disorders...');

	useEffect(() => {
		// Animation for the Sanskrit quote
		translateX.value = withRepeat(
			withSequence(
				withTiming(-400, {
					duration: 10000,
					easing: Easing.linear
				}),
				withTiming(400, { 
					duration: 0,
					easing: Easing.linear
				})
			),
			-1,
			false
		);

		// Animation for search placeholder
		const placeholders = [
			'Search disorders...',
			'विकार शोधा...',
			'रोग खोजें...',
		];
		let currentIndex = 0;

		const changePlaceholder = () => {
			currentIndex = (currentIndex + 1) % placeholders.length;
			setSearchPlaceholder(placeholders[currentIndex]);
		};

		const intervalId = setInterval(changePlaceholder, 2000);

		return () => {
			clearInterval(intervalId);
			translateX.value = 400; // Reset animation when component unmounts
		};
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	if (!fontsLoaded) {
		return null;
	}

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		if (query.trim()) {
			const filtered = disordersData.disorders.filter(disorder =>
				disorder.name.toLowerCase().includes(query.toLowerCase()) ||
				disorder.description.toLowerCase().includes(query.toLowerCase())
			);
			setFilteredDisorders(filtered);
			setShowSuggestions(true);
		} else {
			setFilteredDisorders([]);
			setShowSuggestions(false);
		}
	};

	const handleDisorderSelect = (disorderId: number) => {
		setSearchQuery('');
		setShowSuggestions(false);
		router.push(`/symptoms/${disorderId}`);
	};

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#F5F5F5',
		},
		header: {
			height: 200,
			width: '100%',
		},
		headerImage: {
			opacity: 0.9,
		},
		headerOverlay: {
			flex: 1,
			justifyContent: 'flex-start',
			padding: 16,
		},
		headerContent: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginTop: Platform.OS === 'ios' ? 40 : 20,
		},
		menuButton: {
			margin: 0,
			...Platform.select({
				web: {
					cursor: 'pointer',
				},
			}),
		},
		menuIcon: {
			boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.75)',
		},
		searchBarContainer: {
			paddingHorizontal: 16,
			marginTop: -30,
			zIndex: 1,
		},
		searchBar: {
			borderRadius: 10,
			elevation: 4,
			backgroundColor: '#FFFFFF',
			...Platform.select({
				ios: {
					shadowColor: '#000',
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.25,
					shadowRadius: 3.84,
				},
				android: {
					elevation: 5,
				},
				web: {
					boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
				},
			}),
		},
		content: {
			flex: 1,
			paddingHorizontal: 16,
			paddingTop: 20,
		},
		sectionsGrid: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
		},
		sectionCard: {
			width: '48%',
			aspectRatio: 0.8,
			marginBottom: 16,
			borderRadius: 15,
			overflow: 'hidden',
			...Platform.select({
				ios: {
					shadowColor: '#000',
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.25,
					shadowRadius: 3.84,
				},
				android: {
					elevation: 5,
				},
				web: {
					boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
				},
			}),
		},
		sectionImage: {
			width: '100%',
			height: '100%',
		},
		sectionImageStyle: {
			borderRadius: 16,
		},
		sectionOverlay: {
			flex: 1,
			backgroundColor: 'rgba(0, 0, 0, 0.3)',
			justifyContent: 'center',
			alignItems: 'center',
			padding: 16,
		},
		sectionTitle: {
			color: '#FFFFFF',
			fontSize: 20,
			fontFamily: 'Poppins-Bold',
			textAlign: 'center',
			marginBottom: 8,
			textShadowColor: 'rgba(0, 0, 0, 0.75)',
			textShadowOffset: { width: 0, height: 1 },
			textShadowRadius: 3,
		},
		sectionDescription: {
			color: '#D4B895',
			fontSize: 14,
			fontFamily: 'Poppins-Regular',
			textAlign: 'center',
			opacity: 2,
			textShadowColor: 'rgba(0, 0, 0, 0.75)',
			textShadowOffset: { width: 0, height: 1 },
			textShadowRadius: 3,
		},
		quoteContainer: {
			paddingVertical: 16,
			backgroundColor: 'transparent',
		},
		quoteContent: {
			overflow: 'hidden',
			alignItems: 'center',
			justifyContent: 'center',
			height: 70,
			width: '100%',
		},
		quoteText: {
			color: '#0B3B2D',
			fontSize: 32,
			fontFamily: 'Amita-Bold',
			textAlign: 'center',
			letterSpacing: 1.5,
			lineHeight: 48,
			position: 'absolute',
			paddingHorizontal: 20,
			minWidth: 1600,
		},
		quoteTranslation: {
			color: '#FFFFFF666',
			fontSize: 14,
			fontFamily: 'Poppins-Regular',
			fontStyle: 'italic',
			textAlign: 'center',
			letterSpacing: 0.5,
			marginTop: 28,
		},
		statsSection: {
			marginTop: 4,
			marginBottom: 24,
		},
		suggestionsContainer: {
			position: 'absolute',
			top: '100%',
			left: 16,
			right: 16,
			backgroundColor: 'white',
			borderRadius: 12,
			marginTop: 4,
			paddingVertical: 8,
			elevation: 5,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			maxHeight: 200,
			borderWidth: 1,
			borderColor: '#0B3B2D20',
		},
		suggestionItem: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingVertical: 12,
			paddingHorizontal: 16,
			borderBottomWidth: 1,
			borderBottomColor: '#f0f0f0',
		},
		suggestionText: {
			marginLeft: 12,
			fontSize: 16,
			color: '#0B3B2D',
			fontFamily: 'Poppins-Regular',
		},
		noResultsText: {
			padding: 16,
			textAlign: 'center',
			color: '#FFFFFF',
			fontFamily: 'Poppins-Regular',
		},
	});

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/images/Home.jpg')}
				style={styles.header}
				imageStyle={styles.headerImage}
			>
				<View style={[styles.headerOverlay, {
					backgroundColor: 'rgba(11, 59, 45, 0.2)',
				}]}>
					<View style={styles.headerContent}>
						<IconButton
							icon={({ size, color }) => (
								<MaterialIcons 
									name="menu" 
									size={32} 
									color="#FFFFFF" 
									style={styles.menuIcon}
								/>
							)}
							size={40}
							iconColor="white"
							style={styles.menuButton}
							onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
						/>
						
						<IconButton
							icon={({ size, color }) => (
								<MaterialIcons name="notifications" size={24} color="#FFFFFF" />
							)}
							iconColor="white"
							style={{ marginRight: 16 }}
							onPress={() => {/* Handle notifications */}}
						/>
					</View>
				</View>
			</ImageBackground>

			<View style={styles.searchBarContainer}>
				<Searchbar
					placeholder={searchPlaceholder}
					onChangeText={handleSearch}
					value={searchQuery}
					style={styles.searchBar}
					iconColor="#0B3B2D"
					placeholderTextColor="#0B3B2D"
					elevation={4}
				/>
				
				{showSuggestions && searchQuery.trim() !== '' && (
					<View style={styles.suggestionsContainer}>
						{filteredDisorders.map((disorder) => (
							<TouchableOpacity
								key={disorder.id}
								
								style={styles.suggestionItem}
								onPress={() => handleDisorderSelect(disorder.id)}
							>
								<MaterialIcons name="healing" size={20} color="#0B3B2D" />
								<Text style={styles.suggestionText}>{disorder.name}</Text>
							</TouchableOpacity>
						))}
						{filteredDisorders.length === 0 && (
							<Text style={styles.noResultsText}>No disorders found</Text>
						)}
					</View>
				)}
			</View>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.sectionsGrid}>
					{sections.map((section) => (
						<TouchableOpacity
							key={section.id}
							style={styles.sectionCard}
							onPress={() => router.push(section.route as any)}
							activeOpacity={0.8}
						>
							<ImageBackground 
								source={section.image} 
								style={styles.sectionImage}
								imageStyle={styles.sectionImageStyle}
							>
								<View style={styles.sectionOverlay}>
									<Text style={styles.sectionTitle}>{section.title}</Text>
									<Text style={styles.sectionDescription}>{section.description}</Text>
								</View>
							</ImageBackground>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.quoteContainer}>
					<View style={styles.quoteContent}>
						<Animated.Text 
							style={[styles.quoteText, animatedStyle]}
							numberOfLines={1}
						>
							॥ स्वस्थस्य स्वास्थ्य रक्षणं, आतुरस्य विकार प्रशमनं ॥    ॥ स्वस्थस्य स्वास्थ्य रक्षणं, आतुरस्य विकार प्रशमनं ॥
						</Animated.Text>
					</View>
				</View>

				<Animated.View 
					entering={FadeInDown.delay(100).springify()}
					style={styles.statsSection}
				>
					<GlobalAyurvedaStats />
				</Animated.View>
			</ScrollView>
		</View>
	);
}