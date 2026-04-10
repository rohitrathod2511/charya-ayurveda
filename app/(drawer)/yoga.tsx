import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Card, List, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const content = {
	en: {
		title: "Yoga",
		subtitle: "A Holistic Path to Wellness",
		introduction: `Yoga integrates body, mind, and spirit, focusing on physical postures, breath control, and meditation. Working in harmony with Ayurveda, it maintains balance while addressing physical, mental, and spiritual aspects. The practice enhances flexibility, strength, mental clarity, emotional balance, and spiritual well-being.`,
		sections: [
			{
				title: "Dosha-Specific Yoga Practices",
				items: [
					{
						subtitle: "Vata Yoga",
						description: "Focus on grounding and calming movements.",
						points: [
							"Recommended poses: Forward bends, standing poses, and restorative poses like Child's Pose",
							"Pranayama: Ujjayi and Nadi Shodhana for stability and relaxation"
						]
					},
					{
						subtitle: "Pitta Yoga",
						description: "Focus on cooling and moderating intensity.",
						points: [
							"Recommended poses: Gentle backbends, twists, and seated poses",
							"Pranayama: Sheetali and Sitali to reduce excess heat"
						]
					},
					{
						subtitle: "Kapha Yoga",
						description: "Focus on energizing and stimulating practices.",
						points: [
							"Recommended poses: Sun Salutations, Warrior Pose, and Cobra Pose",
							"Pranayama: Kapalbhati and Bhastrika to increase energy and circulation"
						]
					}
				]
			},
			{
				title: "Yoga Sequences for Specific Needs",
				items: [
					{
						subtitle: "Morning Routine",
						description: "Energizing sequences to wake up the body and stimulate digestion",
						points: ["Sun Salutations", "Standing poses"]
					},
					{
						subtitle: "Digestion",
						description: "Poses that stimulate Agni (digestive fire)",
						points: ["Seated twists", "Forward bends"]
					},
					{
						subtitle: "Stress Relief",
						description: "Relaxing and restorative postures",
						points: ["Child's Pose", "Legs Up the Wall"]
					}
				]
			},
			{
				title: "Pranayama (Breathing Exercises)",
				items: [
					{
						subtitle: "Role of Pranayama",
						description: "Controls breath to influence body and mind, directly impacting doshic balance"
					},
					{
						subtitle: "Dosha-Specific Breathing",
						points: [
							"Vata: Ujjayi and Nadi Shodhana for calming",
							"Pitta: Sheetali and Sitali for cooling",
							"Kapha: Kapalbhati and Bhastrika for invigoration"
						]
					}
				]
			},
			{
				title: "Special Considerations",
				items: [
					{
						subtitle: "Women's Yoga",
						points: [
							"Gentle poses during menstruation",
							"Safe modifications for pregnancy",
							"Postpartum recovery sequences"
						]
					},
					{
						subtitle: "Daily Practice Tips",
						points: [
							"Maintain consistency with 10-20 minute daily sessions",
							"Practice according to your dosha",
							"Combine with Ayurvedic rituals like Abhyanga"
						]
					}
				]
			}
		]
	},
	mr: {
		title: "योग",
		subtitle: "संपूर्ण आरोग्यासाठी एक मार्ग",
		introduction: `योग शरीर, मन आणि आत्मा यांना एकत्र आणतो, शारीरिक मुद्रा, श्वास नियंत्रण आणि ध्यान यावर लक्ष केंद्रित करतो. आयुर्वेदासोबत सुसंवाद साधून, तो शारीरिक, मानसिक आणि आध्यात्मिक पैलूंना संबोधित करत संतुलन राखतो. सराव लवचिकता, शक्ती, मानसिक स्पष्टता, भावनिक संतुलन आणि आध्यात्मिक कल्याण वाढवतो.`,
		sections: [
			{
				title: "दोष-विशिष्ट योग पद्धती",
				items: [
					{
						subtitle: "वात योग",
						description: "स्थिर आणि शांत हालचालींवर लक्ष केंद्रित करा.",
						points: [
							"शिफारस केलेल्या मुद्रा: पुढे वाकणे, उभे राहण्याच्या मुद्रा, आणि बालासन सारख्या विश्रांती मुद्रा",
							"प्राणायाम: स्थिरता आणि विश्रांतीसाठी उज्जयी आणि नाडी शोधन"
						]
					},
					{
						subtitle: "पित्त योग",
						description: "शीतल आणि मध्यम तीव्रतेवर लक्ष केंद्रित करा.",
						points: [
							"शिफारस केलेल्या मुद्रा: सौम्य पाठीचे वाकणे, मुरडणे, आणि बसण्याच्या मुद्रा",
							"प्राणायाम: अतिरिक्त उष्णता कमी करण्यासाठी शीतली आणि सीतली"
						]
					},
					{
						subtitle: "कफ योग",
						description: "ऊर्जादायी आणि उत्तेजक सरावांवर लक्ष केंद्रित करा.",
						points: [
							"शिफारस केलेल्या मुद्रा: सूर्यनमस्कार, वीरासन, आणि भुजंगासन",
							"प्राणायाम: ऊर्जा आणि रक्तप्रवाह वाढवण्यासाठी कपालभाती आणि भस्त्रिका"
						]
					}
				]
			},
			{
				title: "विशिष्ट गरजांसाठी योग क्रम",
				items: [
					{
						subtitle: "सकाळचा क्रम",
						description: "शरीर जागे करण्यासाठी आणि पचन उत्तेजित करण्यासाठी ऊर्जादायी क्रम",
						points: ["सूर्यनमस्कार", "उभ्या मुद्रा"]
					},
					{
						subtitle: "पचनासाठी",
						description: "अग्नी (पचन शक्ती) उत्तेजित करणाऱ्या मुद्रा",
						points: ["बसून मुरडणे", "पुढे वाकणे"]
					},
					{
						subtitle: "तणाव मुक्ती",
						description: "आरामदायी आणि पुनर्संचयी मुद्रा",
						points: ["बालासन", "भित्तीवर पाय वर करून"]
					}
				]
			},
			{
				title: "प्राणायाम (श्वास व्यायाम)",
				items: [
					{
						subtitle: "प्राणायामाची भूमिका",
						description: "दोष संतुलनावर थेट प्रभाव टाकण्यासाठी श्वास नियंत्रित करतो"
					},
					{
						subtitle: "दोष-विशिष्ट श्वसन",
						points: [
							"वात: शांत करण्यासाठी उज्जयी आणि नाडी शोधन",
							"पित्त: शीतल करण्यासाठी शीतली आणि सीतली",
							"कफ: उत्तेजनासाठी कपालभाती आणि भस्त्रिका"
						]
					}
				]
			},
			{
				title: "विशेष विचार",
				items: [
					{
						subtitle: "महिलांसाठी योग",
						points: [
							"मासिक पाळीदरम्यान सौम्य मुद्रा",
							"गर्भावस्थेसाठी सुरक्षित बदल",
							"प्रसूतीनंतर पुनर्प्राप्तीसाठी क्रम"
						]
					},
					{
						subtitle: "दैनंदिन सराव टिप्स",
						points: [
							"10-20 मिनिटांच्या दैनंदिन सत्रांसह सातत्य राखा",
							"तुमच्या दोषानुसार सराव करा",
							"अभ्यंग सारख्या आयुर्वेदिक विधींसह संयोजित करा"
						]
					}
				]
			}
		]
	}
};

export default function YogaScreen() {
	const navigation = useNavigation();
	const [language, setLanguage] = useState<'en' | 'mr'>('mr');

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
				source={require('../../assets/images/Yoga.jpg')}
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
													left={props => <List.Icon {...props} icon="yoga" color="#0B3B2D" />}
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