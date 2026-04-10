import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, Linking, TouchableOpacity } from 'react-native';
import { Text, Card, List, IconButton, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

interface BookItem {
	subtitle: string;
	description: string;
	points: string[];
	link?: string;
}

interface Section {
	title: string;
	items: BookItem[];
}

interface ContentType {
	title: string;
	subtitle: string;
	introduction: string;
	sections: Section[];
}

interface Content {
	en: ContentType;
	mr: ContentType;
}

const content: Content = {
	en: {
		title: "Ayurvedic Books",
		subtitle: "Ancient Wisdom for Modern Life",
		introduction: `Ayurveda, often called the "Science of Life," has been practiced for over 5,000 years in India. This ancient system of medicine focuses on the balance of the body, mind, and spirit to promote overall well-being.`,
		sections: [
			{
				title: "Introduction to Ancient Ayurvedic Wisdom",
				items: [
					{
						subtitle: "Ayurveda's Timeless Legacy",
						description: "This ancient system of medicine focuses on the balance of the body, mind, and spirit to promote overall well-being.",
						points: [
							"Practiced for over 5,000 years in India",
							"Focuses on complete harmony between body, mind, and environment",
							"Emphasizes living in tune with natural cycles"
						]
					}
				]
			},
			{
				title: "The Roots of Ayurveda",
				items: [
					{
						subtitle: "Vedic Scriptures",
						description: "Ayurveda originates from the Vedic texts, including the Rigveda, Atharvaveda, and the Yajurveda.",
						points: [
							"Contains earliest references to health and wellness",
							"Charaka Samhita focuses on internal medicine",
							"Sushruta Samhita dedicated to surgery and external therapies"
						]
					},
					{
						subtitle: "Rishi Knowledge",
						description: "Revealed to ancient sages through deep meditation and spiritual practice.",
						points: [
							"Wisdom imparted through generations",
							"Emphasis on natural healing methods",
							"Deep connection to spiritual practices"
						]
					}
				]
			},
			{
				title: "The Three Pillars of Ayurveda",
				items: [
					{
						subtitle: "Balanced Diet (Ahara)",
						description: "Food is medicine, and a balanced, dosha-specific diet is essential for health.",
						points: [
							"Eating in harmony with seasons",
							"Focus on digestive capacity",
							"Mindful eating practices"
						]
					},
					{
						subtitle: "Restorative Sleep (Nidra)",
						description: "Sleep is considered critical for healing and longevity.",
						points: [
							"Alignment with natural circadian rhythms",
							"Importance of deep, restorative sleep",
							"Sleep patterns based on dosha"
						]
					},
					{
						subtitle: "Balanced Lifestyle (Vihara)",
						description: "Daily routines (Dinacharya) and seasonal routines (Ritucharya) that align with body's needs.",
						points: [
							"Structured daily routines",
							"Seasonal adaptations",
							"Dosha-specific practices"
						]
					}
				]
			},
			{
				title: "Healing Practices",
				items: [
					{
						subtitle: "Ayurvedic Herbs",
						description: "Over 700 herbs and plant-based remedies for physical and mental health.",
						points: [
							"Tulsi (Holy Basil) for immunity and stress",
							"Ashwagandha for adaptation to stress",
							"Brahmi for mental clarity"
						]
					},
					{
						subtitle: "Panchakarma",
						description: "Ancient Ayurvedic detox program designed to cleanse accumulated toxins (Ama).",
						points: [
							"Comprehensive detoxification",
							"Rejuvenation therapies",
							"Personalized treatment plans"
						]
					}
				]
			},
			{
				title: "Classical Ayurvedic Texts",
				items: [
					{
						subtitle: "Charaka Samhita",
						description: "The foundational text of Ayurveda, focusing on internal medicine and treatment principles.",
						points: [
			"Principles of health and disease",
			"Eight branches of Ayurveda",
			"Detailed treatment methods",
			"Herbal medicine preparations"
						],
						link: "https://www.carakasamhitaonline.com/mediawiki-1.32.1/index.php?title=Charaka_Samhita"
					},
					{
						subtitle: "Sushruta Samhita",
						description: "Ancient Sanskrit text on surgery and surgical procedures in Ayurvedic medicine.",
						points: [
			"Surgical procedures and instruments",
			"Anatomy and physiology",
			"Disease classifications",
			"Treatment protocols"
						],
						link: "https://www.wisdomlib.org/hinduism/book/sushruta-samhita-volume-1-sutrasthana"
					},
					{
						subtitle: "Ashtanga Hridaya",
						description: "Comprehensive treatise on Ayurvedic medicine and healthcare practices.",
						points: [
			"Daily and seasonal routines",
			"Diagnosis methods",
			"Treatment principles",
			"Preventive medicine"
						],
						link: "https://www.wisdomlib.org/hinduism/book/ashtanga-hridaya-sutrasthana"
					}
				]
			}
		]
	},
	mr: {
		title: "आयुर्वेदिक पुस्तके",
		subtitle: "आधुनिक जीवनासाठी प्राचीन ज्ञान",
		introduction: `आयुर्वेद, जे नेहमी "जीवनाचे विज्ञान" म्हणून ओळखले जाते, भारतात 5,000 वर्षांपेक्षा जास्त काळ आचरणात आहे. प्राचीन वैद्यकीय पद्धती संपूर्ण कल्याण प्रोत्साहित करण्यासाठी शरीर, मन आणि आत्मा यांच्या संतुलनावर लक्ष केंद्रित करते.`,
		sections: [
			{
				title: "प्राचीन आयुर्वेदिक ज्ञानाची ओळख",
				items: [
					{
						subtitle: "आयुर्वेदाचा कालातीत वारसा",
						description: "ही प्राचीन वैद्यकीय पद्धती संपूर्ण कल्याण प्रोत्साहित करण्यासाठी शरीर, मन आणि आत्मा यांच्या संतुलनावर लक्ष केंद्रित करते.",
						points: [
							"भारतात 5,000 वर्षांपेक्षा जास्त काळ आचरणात",
							"शरीर, मन आणि पर्यावरण यांच्यातील संपूर्ण सुसंवादावर लक्ष केंद्रित",
							"नैसर्गिक चक्रांशी जुळवून घेण्यावर भर"
						]
					}
				]
			},
			{
				title: "आयुर्वेदाची मुळे",
				items: [
					{
						subtitle: "वैदिक ग्रंथ",
						description: "आयुर्वेद वैदिक ग्रंथांमधून उद्भवला, ज्यामध्ये ऋग्वेद, अथर्ववेद आणि यजुर्वेद यांचा समावेश आहे.",
						points: [
							"आरोग्य आणि कल्याणाचे सर्वात जुने संदर्भ",
							"चरक संहिता अंतर्गत औषधांवर केंद्रित",
							"सुश्रुत संहिता शस्त्रक्रिया आणि बाह्य उपचारांना समर्पित"
						]
					},
					{
						subtitle: "ऋषी ज्ञान",
						description: "खोल ध्यान आणि आध्यात्मिक साधनेद्वारे प्राचीन ऋषींना प्रकट झाले.",
						points: [
							"पिढ्यांमधून दिलेले ज्ञान",
							"नैसर्गिक उपचार पद्धतींवर भर",
							"आध्यात्मिक साधनेशी खोल संबंध"
						]
					}
				]
			},
			{
				title: "आयुर्वेदाचे तीन स्तंभ",
				items: [
					{
						subtitle: "संतुलित आहार",
						description: "अन्न हे औषध आहे, आणि संतुलित, दोष-विशिष्ट आहार आरोग्यासाठी आवश्यक आहे.",
						points: [
							"ऋतूंशी सुसंगत आहार",
							"पचनशक्तीवर लक्ष",
							"जाणीवपूर्वक खाण्याच्या पद्धती"
						]
					},
					{
						subtitle: "पुनर्संचयी झोप",
						description: "झोप ही बरे होण्यासाठी आणि दीर्घायुष्यासाठी महत्त्वाची मानली जाते.",
						points: [
							"नैसर्गिक दैनंदिन लयीशी जुळवून",
							"खोल, पुनर्संचयी झोपेचे महत्त्व",
							"दोषावर आधारित झोपेची नमुने"
						]
					},
					{
						subtitle: "संतुलित जीवनशैली",
						description: "दैनंदिन दिनचर्या आणि ऋतुचर्या जी शरीराच्या गरजांशी जुळते.",
						points: [
							"संरचित दैनंदिन दिनचर्या",
							"ऋतुनुसार बदल",
							"दोष-विशिष्ट पद्धती"
						]
					}
				]
			},
			{
				title: "उपचार पद्धती",
				items: [
					{
						subtitle: "आयुर्वेदिक औषधी",
						description: "शारीरिक आणि मानसिक आरोग्यासाठी 700 पेक्षा जास्त औषधी वनस्पती आणि वनस्पती-आधारित उपचार.",
						points: [
							"तुळस प्रतिकारशक्ती आणि तणावासाठी",
							"अश्वगंधा तणावाशी जुळवून घेण्यासाठी",
							"ब्राह्मी मानसिक स्पष्टतेसाठी"
						]
					},
					{
						subtitle: "पंचकर्म",
						description: "साठलेले विष (आम) शुद्ध करण्यासाठी डिझाइन केलेला प्राचीन आयुर्वेदिक विषमुक्ती कार्यक्रम.",
						points: [
							"सर्वांगीण विषमुक्ती",
							"कायाकल्प उपचार",
							"वैयक्तिक उपचार योजना"
						]
					}
				]
			},
			{
				title: "शास्त्रीय आयुर्वेदिक ग्रंथ",
				items: [
					{
						subtitle: "चरक संहिता",
						description: "आयुर्वेदाचा मूलभूत ग्रंथ, अंतर्गत औषधे आणि उपचार तत्त्वांवर केंद्रित.",
						points: [
							"आरोग्य आणि रोगांची तत्त्वे",
							"आयुर्वेदाच्या आठ शाखा",
							"सविस्तर उपचार पद्धती",
							"औषधी वनस्पतींची तयारी"
						],
						link: "https://www.carakasamhitaonline.com/mediawiki-1.32.1/index.php?title=Charaka_Samhita"
					},
					{
						subtitle: "सुश्रुत संहिता",
						description: "आयुर्वेदिक वैद्यकीय शस्त्रक्रिया आणि शल्यचिकित्सा पद्धतींवरील प्राचीन संस्कृत ग्रंथ.",
						points: [
							"शस्त्रक्रिया पद्धती आणि उपकरणे",
							"शरीररचना आणि शरीरक्रिया",
							"रोगांचे वर्गीकरण",
							"उपचार प्रोटोकॉल"
						],
						link: "https://www.wisdomlib.org/hinduism/book/sushruta-samhita-volume-1-sutrasthana"
					},
					{
						subtitle: "अष्टांग हृदय",
						description: "आयुर्वेदिक वैद्यकीय आणि आरोग्य पद्धतींवरील सर्वसमावेशक ग्रंथ.",
						points: [
							"दैनंदिन आणि ऋतुनुसार दिनचर्या",
							"रोगनिदान पद्धती",
							"उपचार तत्त्वे",
							"प्रतिबंधात्मक वैद्यकीय"
						],
						link: "https://www.wisdomlib.org/hinduism/book/ashtanga-hridaya-sutrasthana"
					}
				]
			}
		]
	}
};

export default function BooksScreen() {
	const navigation = useNavigation();
	const [language, setLanguage] = useState<'en' | 'mr'>('en');

	const openDrawer = () => {
		// @ts-ignore: dispatch exists but TypeScript doesn't recognize it
		navigation.dispatch(DrawerActions.openDrawer());
	};

	const toggleLanguage = () => {
		setLanguage(prev => prev === 'en' ? 'mr' : 'en');
	};

	const openLink = (url: string | undefined) => {
		if (url) {
			Linking.openURL(url);
		}
	};

	const currentContent = content[language];

	const renderReadOnlineButton = (link?: string) => {
		if (!link) return null;
		return (
			<Button
				mode="contained"
				onPress={() => openLink(link)}
				style={styles.readButton}
				labelStyle={styles.readButtonLabel}
				buttonColor="#0B3B2D"
			>
				Read Online
			</Button>
		);
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/images/Books.jpg')}
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
													left={props => <List.Icon {...props} icon="book-open-variant" color="#0B3B2D" />}
													titleStyle={styles.pointText}
													titleNumberOfLines={3}
									/>
								))}
							</List.Section>
									)}
									{renderReadOnlineButton(item.link)}
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
	readButton: {
		marginTop: 12,
		borderRadius: 8,
		elevation: 4,
	},
	readButtonLabel: {
		color: '#D4B895',
		fontFamily: 'Poppins-Bold',
		fontSize: 14,
		letterSpacing: 0.5,
	},
});