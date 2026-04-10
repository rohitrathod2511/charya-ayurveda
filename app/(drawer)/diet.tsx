import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Card, List, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const content = {
	en: {
		title: "Ayurvedic Diet",
		subtitle: "Food as Medicine",
		introduction: `In Ayurveda, food is considered medicine, and diet plays a crucial role in maintaining balance between the body, mind, and spirit. Ayurveda emphasizes the importance of eating according to your dosha (Vata, Pitta, Kapha) to achieve optimal health.`,
		sections: [
			{
				title: "Introduction to Ayurvedic Diet",
				items: [
					{
						subtitle: "Agni (Digestive Fire)",
						description: "A strong Agni is central to digestion, nutrient absorption, and overall health. Ayurveda promotes eating in ways that support a balanced Agni.",
						points: [
							"Eat warm, cooked foods",
							"Drink warm water before meals",
							"Include digestive spices"
						]
					},
					{
						subtitle: "Mindful Eating",
						description: "Eat with awareness, focusing on the quality and quantity of food, the environment, and emotional state while eating.",
						points: [
							"Focus on the act of eating",
							"Create a peaceful eating environment",
							"Pay attention to portion sizes"
						]
					}
				]
			},
			{
				title: "Dosha-Specific Diet Recommendations",
				items: [
					{
						subtitle: "Vata Diet",
						description: "Warm, nourishing, and grounding foods to balance the dry, cold, and light qualities of Vata.",
						points: [
							"Recommended: Warm soups, stews, root vegetables, whole grains, nuts, dairy, and healthy oils",
							"Avoid: Raw foods, cold foods, dry snacks, and excessive caffeine",
							"Eat regularly and avoid skipping meals"
						]
					},
					{
						subtitle: "Pitta Diet",
						description: "Cooling, hydrating, and calming foods to balance the hot, intense, and sharp qualities of Pitta.",
						points: [
							"Recommended: Fresh fruits, leafy greens, cucumbers, coconut, dairy, mild spices",
							"Avoid: Spicy, fried, oily, or overly sour foods",
							"Eat in a calm, stress-free environment"
						]
					},
					{
						subtitle: "Kapha Diet",
						description: "Light, stimulating, and warm foods to balance the heavy, cold, and moist qualities of Kapha.",
						points: [
							"Recommended: Light grains, leafy vegetables, legumes, spicy foods",
							"Avoid: Heavy, greasy, and dairy-rich foods",
							"Eat small, frequent meals"
						]
					}
				]
			},
			{
				title: "Seasonal Diet (Ritucharya)",
				items: [
					{
						subtitle: "Spring (Kapha season)",
						description: "Light and detoxifying foods to balance excess Kapha.",
						points: [
							"Focus on light, warm foods",
							"Include bitter and astringent tastes",
							"Reduce heavy, sweet foods"
						]
					},
					{
						subtitle: "Summer (Pitta season)",
						description: "Cooling, hydrating foods to reduce Pitta's heat and intensity.",
						points: [
							"Choose cooling, sweet foods",
							"Include plenty of fresh fruits",
							"Avoid hot, spicy foods"
						]
					},
					{
						subtitle: "Autumn/Winter",
						description: "Warm, grounding, and moist foods to calm Vata and balance Kapha.",
						points: [
							"Focus on warm, nourishing foods",
							"Include healthy fats and oils",
							"Choose cooked over raw foods"
						]
					}
				]
			},
			{
				title: "The Six Tastes (Shad Rasa)",
				items: [
					{
						subtitle: "Primary Tastes",
						description: "A balanced meal should contain all six tastes in proper proportion according to your dosha.",
						points: [
							"Sweet: Nourishing and grounding (grains, dairy, sweet fruits)",
							"Sour: Stimulating digestion (citrus, yogurt, fermented foods)",
							"Salty: Enhancing flavor (natural salts, seaweed)",
							"Bitter: Detoxifying (leafy greens, turmeric)",
							"Pungent: Stimulating metabolism (ginger, pepper, garlic)",
							"Astringent: Cooling and drying (beans, pomegranate)"
						]
					}
				]
			}
		]
	},
	mr: {
		title: "आयुर्वेदिक आहार",
		subtitle: "अन्न हेच औषध",
		introduction: `आयुर्वेदात, अन्नाला औषध मानले जाते, आणि आहार शरीर, मन आणि आत्मा यांच्यातील संतुलन राखण्यात महत्त्वाची भूमिका बजावतो. उत्तम आरोग्य प्राप्त करण्यासाठी आयुर्वेद तुमच्या दोषानुसार (वात, पित्त, कफ) जेवणाच्या महत्त्वावर भर देतो.`,
		sections: [
			{
				title: "आयुर्वेदिक आहाराची ओळख",
				items: [
					{
						subtitle: "अग्नी (पचनशक्ती)",
						description: "मजबूत अग्नी हा पचन, पोषक तत्त्वांचे शोषण आणि एकूण आरोग्यासाठी महत्त्वाचा आहे. आयुर्वेद संतुलित अग्नीला समर्थन देणाऱ्या पद्धतीने जेवण्यास प्रोत्साहन देतो.",
						points: [
							"गरम, शिजवलेले अन्न खा",
							"जेवणापूर्वी कोमट पाणी प्या",
							"पचनास मदत करणारे मसाले समाविष्ट करा"
						]
					},
					{
						subtitle: "जाणीवपूर्वक जेवण",
						description: "अन्नाची गुणवत्ता आणि प्रमाण, वातावरण आणि जेवताना भावनिक स्थितीवर लक्ष केंद्रित करून जाणीवपूर्वक जेवा.",
						points: [
							"जेवण्याच्या क्रियेवर लक्ष केंद्रित करा",
							"शांत जेवणाचे वातावरण तयार करा",
							"अन्नाच्या प्रमाणाकडे लक्ष द्या"
						]
					}
				]
			},
			{
				title: "दोष-विशिष्ट आहार शिफारसी",
				items: [
					{
						subtitle: "वात आहार",
						description: "वाताच्या कोरड्या, थंड आणि हलक्या गुणधर्मांना संतुलित करण्यासाठी गरम, पोषक आणि स्थिर अन्न.",
						points: [
							"शिफारस केलेले: गरम सूप, स्टू, मुळा भाज्या, संपूर्ण धान्ये, काजू-बदाम, दुग्धजन्य पदार्थ आणि आरोग्यदायी तेले",
							"टाळा: कच्चे अन्न, थंड अन्न, कोरडे स्नॅक्स आणि जास्त कॅफीन",
							"नियमित जेवा आणि जेवण टाळणे टाळा"
						]
					},
					{
						subtitle: "पित्त आहार",
						description: "पित्ताच्या गरम, तीव्र आणि तीक्ष्ण गुणधर्मांना संतुलित करण्यासाठी थंड, पाणीयुक्त आणि शांत अन्न.",
						points: [
							"शिफारस केलेले: ताजी फळे, पालेभाज्या, काकडी, नारळ, दुग्धजन्य पदार्थ, सौम्य मसाले",
							"टाळा: तिखट, तळलेले, तेलकट किंवा अति आंबट अन्न",
							"शांत, तणावमुक्त वातावरणात जेवा"
						]
					},
					{
						subtitle: "कफ आहार",
						description: "कफाच्या जड, थंड आणि ओलसर गुणधर्मांना संतुलित करण्यासाठी हलके, उत्तेजक आणि गरम अन्न.",
						points: [
							"शिफारस केलेले: हलकी धान्ये, पालेभाज्या, डाळी, मसालेदार अन्न",
							"टाळा: जड, तेलकट आणि दुग्धजन्य पदार्थांनी समृद्ध अन्न",
							"लहान, वारंवार जेवणे घ्या"
						]
					}
				]
			},
			{
				title: "ऋतुनुसार आहार (ऋतुचर्या)",
				items: [
					{
						subtitle: "वसंत (कफ ऋतु)",
						description: "अतिरिक्त कफ संतुलित करण्यासाठी हलके आणि विषमुक्त अन्न.",
						points: [
							"हलके, गरम अन्नावर लक्ष केंद्रित करा",
							"कडू आणि तुरट चवींचा समावेश करा",
							"जड, गोड अन्न कमी करा"
						]
					},
					{
						subtitle: "उन्हाळा (पित्त ऋतु)",
						description: "पित्ताची उष्णता आणि तीव्रता कमी करण्यासाठी थंड, पाणीयुक्त अन्न.",
						points: [
							"थंड, गोड अन्न निवडा",
							"भरपूर ताजी फळे समाविष्ट करा",
							"गरम, तिखट अन्न टाळा"
						]
					},
					{
						subtitle: "शरद/हिवाळा",
						description: "वात शांत करण्यासाठी आणि कफ संतुलित करण्यासाठी गरम, स्थिर आणि ओलसर अन्न.",
						points: [
							"गरम, पोषक अन्नावर लक्ष केंद्रित करा",
							"आरोग्यदायी चरबी आणि तेले समाविष्ट करा",
							"कच्च्या ऐवजी शिजवलेले अन्न निवडा"
						]
					}
				]
			},
			{
				title: "सहा रस (षड्रस)",
				items: [
					{
						subtitle: "प्राथमिक चवी",
						description: "संतुलित जेवणात तुमच्या दोषानुसार योग्य प्रमाणात सर्व सहा चवी असाव्यात.",
						points: [
							"गोड: पोषक आणि स्थिर (धान्ये, दुग्धजन्य पदार्थ, गोड फळे)",
							"आंबट: पचन उत्तेजित करणारे (लिंबूवर्गीय फळे, दही, आंबवलेले पदार्थ)",
							"खारट: चव वाढवणारे (नैसर्गिक मीठ, समुद्री शैवाल)",
							"कडू: विषमुक्त करणारे (पालेभाज्या, हळद)",
							"तिखट: चयापचय उत्तेजित करणारे (आले, मिरी, लसूण)",
							"तुरट: थंड आणि कोरडे करणारे (शेंगा, डाळिंब)"
						]
					}
				]
			}
		]
	}
};

export default function DietScreen() {
	const navigation = useNavigation();
	const [language, setLanguage] = useState<'en' | 'mr'>('en');

	const openDrawer = () => {
		// @ts-ignore: dispatch exists but TypeScript doesn't recognize it
		navigation.dispatch(DrawerActions.openDrawer());
	};

	const toggleLanguage = () => {
		setLanguage(prev => prev === 'en' ? 'mr' : 'en');
	};

	const currentContent = content[language];

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/images/Diet.jpg')}
				style={styles.header}
			>
				<View style={styles.headerOverlay}>
					<View style={styles.headerTop}>
						<IconButton
							icon="menu"
							iconColor="#FFFFFF"
							size={28}
							onPress={openDrawer}
							style={styles.menuButton}
						/>
						<View style={styles.translateContainer}>
							<TouchableOpacity 
								style={styles.translateWrapper}
								onPress={toggleLanguage}
							>
								<IconButton
									icon="translate"
									iconColor="#FFFFFF"
									size={24}
									style={styles.translateButton}
								/>
								<Text style={styles.translateText}>
									{language === 'en' ? 'मराठी' : 'ENG'}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<Text variant="headlineMedium" style={styles.headerTitle}>
						{currentContent.title}
					</Text>
					<Text style={styles.headerSubtitle}>
						{currentContent.subtitle}
					</Text>
				</View>
			</ImageBackground>

			<ScrollView 
				style={styles.content}
				contentContainerStyle={styles.contentContainer}
			>
				<Card style={styles.introCard}>
					<Card.Content>
						<Text style={styles.introText}>
							{currentContent.introduction}
						</Text>
					</Card.Content>
				</Card>

				{currentContent.sections.map((section, sectionIndex) => (
					<Card key={sectionIndex} style={styles.sectionCard}>
						<Card.Content>
							<Text variant="titleLarge" style={styles.sectionTitle}>
								{section.title}
							</Text>
							{section.items.map((item, itemIndex) => (
								<View key={itemIndex} style={styles.itemContainer}>
									{item.subtitle && (
										<Text variant="titleMedium" style={styles.itemSubtitle}>
											{item.subtitle}
										</Text>
									)}
									{item.description && (
										<Text style={styles.itemDescription}>
											{item.description}
										</Text>
									)}
									{item.points && (
										<List.Section>
											{item.points.map((point, pointIndex) => (
												<List.Item
													key={pointIndex}
													title={point}
													left={props => <List.Icon {...props} icon="food-apple" color="#0B3B2D" />}
													titleStyle={styles.pointText}
													titleNumberOfLines={3}
												/>
											))}
										</List.Section>
									)}
								</View>
							))}
						</Card.Content>
					</Card>
				))}

				<View style={styles.bottomPadding} />
			</ScrollView>
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
		height: '100%',
		backgroundColor: 'rgba(11, 59, 45, 0.6)',
		padding: 16,
	},
	headerTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 8,
	},
	menuButton: {
		margin: 0,
		backgroundColor: 'rgba(11, 59, 45, 0.5)',
		borderRadius: 8,
	},
	translateContainer: {
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#FFFFFF',
	},
	translateWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: 12,
	},
	translateButton: {
		margin: 0,
	},
	translateText: {
		color: '#FFFFFF',
		fontFamily: 'Poppins-Medium',
		fontSize: 14,
		marginLeft: -8,
	},
	headerTitle: {
		color: 'white',
		fontWeight: 'bold',
		marginBottom: 8,
		fontFamily: 'Poppins-Bold',
		marginTop: 'auto',
	},
	headerSubtitle: {
		color: 'white',
		fontSize: 16,
		fontFamily: 'Poppins-Regular',
	},
	content: {
		flex: 1,
		padding: 16,
	},
	contentContainer: {
		paddingBottom: 24,
	},
	introCard: {
		marginBottom: 16,
		backgroundColor: '#0B3B2D',
		borderRadius: 12,
	},
	introText: {
		color: 'white',
		fontSize: 16,
		lineHeight: 24,
		fontFamily: 'Poppins-Regular',
	},
	sectionCard: {
		marginBottom: 16,
		borderRadius: 12,
		backgroundColor: '#FFFFFF',
		elevation: 4,
	},
	sectionTitle: {
		fontWeight: 'bold',
		color: '#0B3B2D',
		marginBottom: 16,
		fontFamily: 'Poppins-Bold',
	},
	itemContainer: {
		marginBottom: 16,
	},
	itemSubtitle: {
		color: '#0B3B2D',
		marginBottom: 8,
		fontFamily: 'Poppins-SemiBold',
	},
	itemDescription: {
		color: '#0B3B2D',
		marginBottom: 8,
		opacity: 0.8,
		fontFamily: 'Poppins-Regular',
	},
	pointText: {
		color: '#0B3B2D',
		fontFamily: 'Poppins-Regular',
	},
	bottomPadding: {
		height: 16,
	},
}); 