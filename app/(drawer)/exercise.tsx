import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Card, List, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const content = {
	en: {
		title: "Exercise",
		subtitle: "Holistic Wellness Through Movement",
		introduction: `In Ayurveda, exercise is not just about physical fitness but a holistic practice that includes physical, mental, and emotional well-being. It balances the body's energy, strengthens muscles, improves circulation, and enhances overall vitality.

Exercise should be tailored to an individual's dosha (Vata, Pitta, Kapha) to maintain harmony and prevent imbalance.`,
		sections: [
			{
				title: "Dosha-Specific Exercise Recommendations",
				items: [
					{
						subtitle: "Vata Dosha",
						description: "Focus on gentle, grounding, and restorative exercises to calm Vata's anxious and unstable energy.",
						points: [
							"Recommended: Walking, yoga, swimming, Pilates, and moderate strength training",
							"Avoid: Intense endurance exercises or high-intensity training",
							"Duration: 20–30 minutes of moderate, consistent movement to avoid overstimulation"
						]
					},
					{
						subtitle: "Pitta Dosha",
						description: "Focus on cooling and moderate-intensity exercises to prevent overheating and overexertion.",
						points: [
							"Recommended: Swimming, cycling, yoga, walking, moderate weight training",
							"Avoid: High-intensity or extreme endurance activities, especially in hot environments",
							"Duration: 30–45 minutes with careful attention to cooling down"
						]
					},
					{
						subtitle: "Kapha Dosha",
						description: "Focus on stimulating and high-energy exercises to counteract Kapha's sluggishness and slow metabolism.",
						points: [
							"Recommended: Running, cycling, HIIT, dancing, strength training",
							"Avoid: Sedentary or slow exercises that may exacerbate Kapha's heavy qualities",
							"Duration: 45–60 minutes of vigorous exercise to increase energy and metabolism"
						]
					}
				]
			},
			{
				title: "Best Time for Exercise",
				items: [
					{
						subtitle: "Morning Exercise",
						description: "The best time to exercise as it helps stimulate Agni (digestive fire) and energizes the body for the day. It balances Vata and Pitta energies."
					},
					{
						subtitle: "Timing Considerations",
						points: [
							"Avoid late evening intense exercise as it may disturb sleep cycles",
							"Modify routines according to seasons - cooling exercises in summer, invigorating in winter"
						]
					}
				]
			},
			{
				title: "Mental and Physical Benefits",
				items: [
					{
						subtitle: "Mental Well-being",
						description: "Physical activity is crucial for reducing stress, managing anxiety, and improving mood by stimulating the release of endorphins.",
						points: [
							"Promotes mindfulness and enhances mind-body connection",
							"Helps calm Vata and Pitta, reduces Kapha's lethargy"
						]
					},
					{
						subtitle: "Digestive Health",
						description: "Regular exercise increases circulation and stimulates digestion (Agni).",
						points: [
							"Post-meal walking enhances digestion",
							"Avoid excessive intensity immediately after eating"
						]
					}
				]
			},
			{
				title: "Recovery and Maintenance",
				items: [
					{
						subtitle: "Post-Exercise Recovery",
						points: [
							"Practice Abhyanga (self-massage with warm oils)",
							"Hydrate with warm water or herbal teas",
							"Include stretching and light yoga",
							"Consume light, nourishing food"
						]
					},
					{
						subtitle: "Joint Health",
						points: [
							"Choose low-impact exercises like swimming for joint pain",
							"Regular stretching for flexibility",
							"Strengthening exercises for stability",
							"Focus on mobility to prevent injury"
						]
					}
				]
			}
		]
	},
	mr: {
		title: "व्यायाम",
		subtitle: "हालचालीद्वारे संपूर्ण आरोग्य",
		introduction: `आयुर्वेदात, व्यायाम हा केवळ शारीरिक तंदुरुस्तीबद्दल नाही तर शारीरिक, मानसिक आणि भावनिक कल्याणाचा समावेश असलेला एक समग्र सराव आहे. तो शरीराची ऊर्जा संतुलित करतो, स्नायू मजबूत करतो, रक्तप्रवाह सुधारतो आणि एकूण जीवनशक्ती वाढवतो.

व्यायाम हा व्यक्तीच्या दोषानुसार (वात, पित्त, कफ) सुसंगत असावा जेणेकरून सुसंवाद राखला जाईल आणि असंतुलन टाळता येईल.`,
		sections: [
			{
				title: "दोष-विशिष्ट व्यायाम शिफारसी",
				items: [
					{
						subtitle: "वात दोष",
						description: "वाताची चिंताग्रस्त आणि अस्थिर ऊर्जा शांत करण्यासाठी सौम्य, स्थिर आणि पुनर्संचयी व्यायामांवर लक्ष केंद्रित करा.",
						points: [
							"शिफारस केलेले: चालणे, योग, पोहणे, पिलेट्स, आणि मध्यम शक्ती प्रशिक्षण",
							"टाळा: तीव्र सहनशक्ती व्यायाम किंवा उच्च-तीव्रता प्रशिक्षण",
							"कालावधी: अति-उत्तेजना टाळण्यासाठी 20-30 मिनिटे मध्यम, सातत्यपूर्ण हालचाल"
						]
					},
					{
						subtitle: "पित्त दोष",
						description: "अति-तापमान आणि अति-श्रम टाळण्यासाठी शीतल आणि मध्यम-तीव्रता व्यायामांवर लक्ष केंद्रित करा.",
						points: [
							"शिफारस केलेले: पोहणे, सायकलिंग, योग, चालणे, मध्यम वजन प्रशिक्षण",
							"टाळा: उच्च-तीव्रता किंवा अत्यंत सहनशक्ती क्रियाकलाप, विशेषतः उष्ण वातावरणात",
							"कालावधी: थंड करण्याकडे लक्ष देऊन 30-45 मिनिटे"
						]
					},
					{
						subtitle: "कफ दोष",
						description: "कफाची सुस्ती आणि मंद चयापचय यांना प्रतिकार करण्यासाठी उत्तेजक आणि उच्च-ऊर्जा व्यायामांवर लक्ष केंद्रित करा.",
						points: [
							"शिफारस केलेले: धावणे, सायकलिंग, HIIT, नृत्य, शक्ती प्रशिक्षण",
							"टाळा: कफाच्या जड गुणधर्मांना वाढवू शकणारे निष्क्रिय किंवा मंद व्यायाम",
							"कालावधी: ऊर्जा आणि चयापचय वाढवण्यासाठी 45-60 मिनिटे जोरदार व्यायाम"
						]
					}
				]
			},
			{
				title: "व्यायामाची उत्तम वेळ",
				items: [
					{
						subtitle: "सकाळचा व्यायाम",
						description: "व्यायामाची सर्वोत्तम वेळ कारण ती अग्नी (पचन शक्ती) उत्तेजित करते आणि दिवसभरासाठी शरीराला ऊर्जा देते. ती वात आणि पित्त ऊर्जा संतुलित करते."
					},
					{
						subtitle: "वेळेचे विचार",
						points: [
							"रात्री उशिरा तीव्र व्यायाम टाळा कारण त्यामुळे झोपेचे चक्र बिघडू शकते",
							"ऋतुनुसार क्रम बदला - उन्हाळ्यात शीतल व्यायाम, हिवाळ्यात उत्तेजक"
						]
					}
				]
			},
			{
				title: "मानसिक आणि शारीरिक फायदे",
				items: [
					{
						subtitle: "मानसिक कल्याण",
						description: "शारीरिक क्रियाकलाप एंडोर्फिन्सचे उत्सर्जन उत्तेजित करून तणाव कमी करणे, चिंता व्यवस्थापन आणि मनःस्थिती सुधारण्यासाठी महत्त्वाचे आहे.",
						points: [
							"जागरूकता वाढवते आणि मन-शरीर जोडणी वाढवते",
							"वात आणि पित्त शांत करण्यास, कफाची सुस्ती कमी करण्यास मदत करते"
						]
					},
					{
						subtitle: "पचन आरोग्य",
						description: "नियमित व्यायामामुळे रक्तप्रवाह वाढतो आणि पचन (अग्नी) उत्तेजित होते.",
						points: [
							"जेवणानंतर चालणे पचनास मदत करते",
							"जेवणानंतर लगेच अति तीव्रता टाळा"
						]
					}
				]
			},
			{
				title: "पुनर्प्राप्ती आणि देखभाल",
				items: [
					{
						subtitle: "व्यायामानंतरची पुनर्प्राप्ती",
						points: [
							"अभ्यंग करा (उष्ण तेलांनी स्व-मालिश)",
							"कोमट पाणी किंवा मसाल्याच्या चहाने हायड्रेट करा",
							"ताणून-मोकळे करणे आणि हलका योग समाविष्ट करा",
							"हलके, पोषक अन्न सेवन करा"
						]
					},
					{
						subtitle: "सांधे आरोग्य",
						points: [
							"सांधे दुखण्यासाठी पोहण्यासारखे कमी-प्रभाव व्यायाम निवडा",
							"लवचिकतेसाठी नियमित ताणून-मोकळे करणे",
							"स्थिरतेसाठी बळकटीकरण व्यायाम",
							"दुखापत टाळण्यासाठी हालचालींवर लक्ष केंद्रित करा"
						]
					}
				]
			}
		]
	}
};

export default function ExerciseScreen() {
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
				source={require('../../assets/images/Exercise.jpg')}
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
													left={props => <List.Icon {...props} icon="run" color="#0B3B2D" />}
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