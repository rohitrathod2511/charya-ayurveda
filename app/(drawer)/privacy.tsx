import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import { Text, Card, IconButton, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const content = {
	en: {
		title: "Privacy Policy & Disclaimers",
		subtitle: "Important Information About Your Use",
		introduction: "Welcome to Ayurvedic Self-Med, an Ayurvedic Remedies app. This document outlines our privacy practices, important disclaimers, and terms of use. Please read this information carefully before using our app.",
		sections: [
			{
				title: "Medical Disclaimer",
				content: [
					"The information provided in this app is for educational and informational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment.",
					"All remedies are sourced from traditional Ayurvedic knowledge, books, and professional practitioners. However, you should follow these remedies at your own risk and responsibility.",
					"Do not use any substance, food, or items if you have known allergies or sensitivities to them.",
					"Avoid overdosing on any remedies. Follow instructions step by step and consider your body type (prakriti) and nature.",
					"Children under 18 must follow these remedies only under the guidance of parents or guardians.",
					"Always consult with a qualified healthcare provider before starting any new treatment or making changes to existing treatment."
				]
			},
			{
				title: "Content Sources & Credits",
				content: [
					"Images and wallpapers used in this app are sourced from Unsplash and Pexels. We acknowledge and thank these platforms and their contributors.",
					"Remedies and treatments are compiled from traditional Ayurvedic knowledge, published literature, and consultations with professional Ayurvedic practitioners.",
					"While we strive for accuracy, we cannot guarantee the completeness or reliability of the information provided.",
					"This app is for personal, non-commercial use only. No content should be reproduced without proper attribution."
				]
			},
			{
				title: "Information Collection",
				content: [
					"We collect minimal personal information necessary for app functionality.",
					"Usage data is collected anonymously to improve app performance and user experience.",
					"We do not share your personal information with third parties except as required by law.",
					"Your health-related inputs are stored locally on your device and are not transmitted to our servers."
				]
			},
			{
				title: "User Responsibilities",
				content: [
					"Users are responsible for verifying the suitability of any remedy for their specific condition.",
					"Report any adverse reactions to a healthcare provider immediately.",
					"Keep track of your responses to different remedies and maintain a health diary.",
					"Do not rely solely on this app for serious medical conditions."
				]
			},
			{
				title: "Intellectual Property",
				content: [
					"The app's content, including text, graphics, and code, is protected by copyright and other intellectual property laws.",
					"Remedies and treatments are based on traditional knowledge and publicly available information.",
					"We do not claim ownership of traditional Ayurvedic knowledge.",
					"Attribution is given where required for third-party content and resources."
				]
			},
			{
				title: "Limitations & Liability",
				content: [
					"We are not liable for any adverse effects or complications arising from the use of remedies suggested in this app.",
					"The app does not guarantee specific results or outcomes.",
					"Users acknowledge that Ayurvedic treatments may take time to show results and effectiveness may vary.",
					"We are not responsible for any allergic reactions or contraindications with other medications."
				]
			},
			{
				title: "Special Acknowledgments",
				content: [
					"Special thanks to our developer Rohit Rathod",
					"email: rdrathod2511@gmail.com",
					"We express our deepest gratitude for the dedication and commitment in bringing traditional Ayurvedic knowledge to the digital platform."
				]
			}
		],
		contact: {
			title: "Contact Us",
			content: "If you have any questions about our privacy policy or terms of use, please contact us at: prasadabuj300@gmail.com"
		}
	},
	mr: {
		title: "गोपनीयता धोरण आणि अस्वीकरण",
		subtitle: "तुमच्या वापराबद्दल महत्त्वाची माहिती",
		introduction: "आयुर्वेदिक सेल्फ-मेड, एक आयुर्वेदिक उपचार अॅपमध्ये आपले स्वागत आहे. हा दस्तऐवज आमच्या गोपनीयता पद्धती, महत्त्वाची अस्वीकरणे आणि वापराच्या अटी स्पष्ट करतो. कृपया अॅप वापरण्यापूर्वी ही माहिती काळजीपूर्वक वाचा.",
		sections: [
			{
				title: "वैद्यकीय अस्वीकरण",
				content: [
					"या अॅपमध्ये दिलेली माहिती केवळ शैक्षणिक आणि माहितीपूर्ण उद्देशांसाठी आहे. ती व्यावसायिक वैद्यकीय सल्ला, निदान किंवा उपचार यांची जागा घेण्यासाठी नाही.",
					"सर्व उपचार पारंपारिक आयुर्वेदिक ज्ञान, पुस्तके आणि व्यावसायिक चिकित्सकांकडून घेतले आहेत. तथापि, तुम्ही या उपचारांचे पालन तुमच्या स्वतःच्या जोखमीवर आणि जबाबदारीवर करावे.",
					"तुम्हाला ज्ञात अॅलर्जी किंवा संवेदनशीलता असलेले कोणतेही पदार्थ, अन्न किंवा वस्तू वापरू नका.",
					"कोणत्याही उपचारांचे अतिमात्र टाळा. सूचनांचे टप्प्याटप्प्याने पालन करा आणि तुमचा शरीर प्रकार (प्रकृती) आणि स्वभाव विचारात घ्या.",
					"18 वर्षांखालील मुलांनी हे उपचार केवळ पालक किंवा पालकांच्या मार्गदर्शनाखाली करावेत.",
					"कोणताही नवीन उपचार सुरू करण्यापूर्वी किंवा विद्यमान उपचारात बदल करण्यापूर्वी नेहमी पात्र आरोग्य सेवा प्रदात्याचा सल्ला घ्या."
				]
			},
			{
				title: "सामग्री स्रोत आणि श्रेय",
				content: [
					"या अॅपमध्ये वापरलेली छायाचित्रे आणि वॉलपेपर Unsplash आणि Pexels वरून घेतली आहेत. आम्ही या प्लॅटफॉर्म आणि त्यांच्या योगदानकर्त्यांचे आभार मानतो.",
					"उपचार आणि चिकित्सा पारंपारिक आयुर्वेदिक ज्ञान, प्रकाशित साहित्य आणि व्यावसायिक आयुर्वेदिक चिकित्सकांच्या सल्ल्यातून संकलित केले आहेत.",
					"आम्ही अचूकतेसाठी प्रयत्न करत असलो तरी, आम्ही दिलेल्या माहितीच्या पूर्णत्वाची किंवा विश्वसनीयतेची हमी देऊ शकत नाही.",
					"हा अॅप केवळ वैयक्तिक, अ-व्यावसायिक वापरासाठी आहे. योग्य श्रेय न देता कोणतीही सामग्री पुनरुत्पादित करू नये."
				]
			},
			{
				title: "माहिती संकलन",
				content: [
					"आम्ही अॅप कार्यक्षमतेसाठी आवश्यक किमान वैयक्तिक माहिती गोळा करतो.",
					"अॅपची कामगिरी आणि वापरकर्ता अनुभव सुधारण्यासाठी वापर डेटा अनामिकपणे गोळा केला जातो.",
					"कायद्याने आवश्यक असल्याशिवाय आम्ही तुमची वैयक्तिक माहिती तृतीय पक्षांसह शेअर करत नाही.",
					"तुमची आरोग्य-संबंधित इनपुट तुमच्या डिव्हाइसवर स्थानिक पातळीवर साठवली जातात आणि आमच्या सर्व्हरवर प्रसारित केली जात नाहीत."
				]
			},
			{
				title: "वापरकर्त्यांच्या जबाबदाऱ्या",
				content: [
					"वापरकर्ते त्यांच्या विशिष्ट स्थितीसाठी कोणत्याही उपचाराची योग्यता पडताळण्यास जबाबदार आहेत.",
					"कोणत्याही प्रतिकूल प्रतिक्रियांची तात्काळ आरोग्य सेवा प्रदात्यास माहिती द्या.",
					"विविध उपचारांना तुमच्या प्रतिसादांचा मागोवा ठेवा आणि आरोग्य डायरी ठेवा.",
					"गंभीर वैद्यकीय स्थितीसाठी केवळ या अॅपवर अवलंबून राहू नका."
				]
			},
			{
				title: "बौद्धिक संपदा",
				content: [
					"अॅपची सामग्री, मजकूर, ग्राफिक्स आणि कोड यांसह, कॉपीराइट आणि इतर बौद्धिक संपदा कायद्यांद्वारे संरक्षित आहे.",
					"उपचार आणि चिकित्सा पारंपारिक ज्ञान आणि सार्वजनिकरित्या उपलब्ध माहितीवर आधारित आहेत.",
					"आम्ही पारंपारिक आयुर्वेदिक ज्ञानाची मालकी दावा करत नाही.",
					"तृतीय-पक्ष सामग्री आणि संसाधनांसाठी आवश्यक तेथे श्रेय दिले जाते."
				]
			},
			{
				title: "मर्यादा आणि उत्तरदायित्व",
				content: [
					"या अॅपमध्ये सुचवलेल्या उपचारांच्या वापरातून उद्भवणाऱ्या कोणत्याही प्रतिकूल परिणामांसाठी किंवा गुंतागुंतीसाठी आम्ही जबाबदार नाही.",
					"अॅप विशिष्ट परिणामांची किंवा निष्पत्तींची हमी देत नाही.",
					"वापरकर्ते मान्य करतात की आयुर्वेदिक उपचारांना परिणाम दाखवण्यास वेळ लागू शकतो आणि प्रभावीता बदलू शकते.",
					"आम्ही कोणत्याही अॅलर्जिक प्रतिक्रिया किंवा इतर औषधांसह विरोधाभासांसाठी जबाबदार नाही."
				]
			},
			{
				title: "विशेष आभार",
				content: [
					"आमचे डेव्हलपर रोहित राठोड यांचे विशेष आभार",
					"email: rdrathod2511@gmail.com",
					"पारंपारिक आयुर्वेदिक ज्ञान डिजिटल प्लॅटफॉर्मवर आणण्यासाठी केलेल्या समर्पण आणि वचनबद्धतेबद्दल आम्ही मनापासून कृतज्ञता व्यक्त करतो."
				]
			}
		],
		contact: {
			title: "आमच्याशी संपर्क साधा",
			content: "आमच्या गोपनीयता धोरणाबद्दल किंवा वापराच्या अटींबद्दल तुम्हाला काही प्रश्न असल्यास, कृपया आम्हाला येथे संपर्क साधा: prasadabuj300@gmail.com"
		}
	}
};

export default function PrivacyScreen() {
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

	const handleEmailPress = (email: string) => {
		Linking.openURL(`mailto:${email}`);
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/images/Privacy.jpg')}
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

			<ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
				<Card style={styles.introCard}>
					<Card.Content>
						<Text style={styles.introText}>
							{currentContent.introduction}
						</Text>
					</Card.Content>
				</Card>

				{currentContent.sections.map((section, index) => (
					<Card key={index} style={styles.sectionCard}>
						<Card.Content>
							<Text variant="titleMedium" style={styles.sectionTitle}>
								{section.title}
							</Text>
							{section.content.map((item, itemIndex) => (
								<View key={itemIndex}>
									{item.startsWith('email:') ? (
										<TouchableOpacity 
											onPress={() => handleEmailPress(item.split(': ')[1])}
											style={styles.emailButton}
										>
											<Text style={styles.emailButtonText}>
												Email
											</Text>
										</TouchableOpacity>
									) : (
										<Text style={styles.sectionContent}>
											• {item}
										</Text>
									)}
								</View>
							))}
						</Card.Content>
					</Card>
				))}

				<Card style={styles.contactCard}>
					<Card.Content>
						<Text variant="titleMedium" style={styles.contactTitle}>
							{currentContent.contact.title}
						</Text>
						<Text style={styles.contactText}>
							{currentContent.contact.content}
						</Text>
					</Card.Content>
				</Card>

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
	sectionContent: {
		color: '#0B3B2D',
		marginBottom: 8,
		lineHeight: 22,
		fontFamily: 'Poppins-Regular',
	},
	contactCard: {
		marginBottom: 24,
		borderRadius: 12,
		backgroundColor: '#FFFFFF',
		elevation: 4,
	},
	contactTitle: {
		fontWeight: 'bold',
		color: '#0B3B2D',
		marginBottom: 8,
		fontFamily: 'Poppins-Bold',
	},
	contactText: {
		color: '#0B3B2D',
		lineHeight: 22,
		fontFamily: 'Poppins-Regular',
	},
	bottomPadding: {
		height: 16,
	},
	emailButton: {
		backgroundColor: '#0B3B2D',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		alignSelf: 'flex-start',
		marginLeft: 8,
		marginBottom: 12,
		elevation: 2,
	},
	emailButtonText: {
		color: '#FFFFFF',
		fontFamily: 'Poppins-Medium',
		fontSize: 14,
	},
});