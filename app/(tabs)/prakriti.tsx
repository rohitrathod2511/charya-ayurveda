import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, Platform } from 'react-native';
import { Text, Card, RadioButton, Button, IconButton } from 'react-native-paper';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

interface Question {
	id: number;
	text: string;
	choices: {
		value: string;
		text: string;
		type: 'vata' | 'pitta' | 'kapha';
	}[];
}

const questions: Question[] = [
	{
		id: 1,
		text: "तुमची शारीरिक बांधणी कशी आहे?",
		choices: [
			{ value: 'a', text: "सडपातळ, हलकी", type: 'vata' },
			{ value: 'b', text: "मध्यम, सुडौल", type: 'pitta' },
			{ value: 'c', text: "भरदार, मजबूत", type: 'kapha' },
		]
	},
	{
		id: 2,
		text: "तुमची त्वचा कशी आहे?",
		choices: [
			{ value: 'a', text: "कोरडी, खरखरीत", type: 'vata' },
			{ value: 'b', text: "मऊ, तेलकट", type: 'pitta' },
			{ value: 'c', text: "चिकट, गुळगुळीत", type: 'kapha' },
		]
	},
	{
		id: 3,
		text: "तुमची भूक कशी असते?",
		choices: [
			{ value: 'a', text: "अनियमित", type: 'vata' },
			{ value: 'b', text: "तीव्र, नियमित", type: 'pitta' },
			{ value: 'c', text: "कमी, नियमित", type: 'kapha' },
		]
	},
	{
		id: 4,
		text: "तुमचे स्वभाव कसे आहे?",
		choices: [
			{ value: 'a', text: "चंचल, अस्थिर", type: 'vata' },
			{ value: 'b', text: "तीव्र, महत्त्वाकांक्षी", type: 'pitta' },
			{ value: 'c', text: "शांत, धीर", type: 'kapha' },
		]
	},
	{
		id: 5,
		text: "तुम्हाला कोणत्या हवामानात त्रास होतो?",
		choices: [
			{ value: 'a', text: "थंड हवामान", type: 'vata' },
			{ value: 'b', text: "उष्ण हवामान", type: 'pitta' },
			{ value: 'c', text: "दमट हवामान", type: 'kapha' },
		]
	},
	{
		id: 6,
		text: "झोपेचे स्वरूप कसे आहे?",
		choices: [
			{ value: 'a', text: "अनियमित, खंडित", type: 'vata' },
			{ value: 'b', text: "मध्यम, नियमित", type: 'pitta' },
			{ value: 'c', text: "जास्त, गाढ", type: 'kapha' },
		]
	},
];

const prakritiDescriptions = {
	vata: {
		title: "वात प्रकृती",
		description: "तुमची प्रकृती वात प्रधान आहे.",
		remedies: [
			"१. नियमित दिनचर्या ठेवा",
			"२. गरम अन्न आणि पेय घ्या",
			"३. तेलाने मालिश करा",
			"४. योग आणि प्राणायाम करा",
			"५. पुरेशी झोप घ्या",
			"६. अश्वगंधा चूर्णाचे सेवन करा",
			"७. ताज्या अन्नाचे सेवन करा",
			"८. नियमित व्यायाम करा"
		]
	},
	pitta: {
		title: "पित्त प्रकृती",
		description: "तुमची प्रकृती पित्त प्रधान आहे.",
		remedies: [
			"१. तीखट, आंबट पदार्थ टाळा",
			"२. थंड पेय घ्या",
			"३. मध्यम व्यायाम करा",
			"४. त्रिफळा चूर्णाचे सेवन करा",
			"५. चंदन पावडर वापरा",
			"६. योग आणि ध्यान करा",
			"७. रागावर नियंत्रण ठेवा",
			"८. भरपूर पाणी प्या"
		]
	},
	kapha: {
		title: "कफ प्रकृती",
		description: "तुमची प्रकृती कफ प्रधान आहे.",
		remedies: [
			"१. नियमित व्यायाम करा",
			"२. हलके अन्न घ्या",
			"३. मध आणि आल्याचे सेवन करा",
			"४. त्रिफळा चूर्णाचे सेवन करा",
			"५. कटु, तिखट पदार्थांचे सेवन करा",
			"६. सकाळी लवकर उठा",
			"७. दिवसा झोप टाळा",
			"८. गरम पाणी प्या"
		]
	}
};

export default function PrakritiScreen() {
	const [answers, setAnswers] = useState<{ [key: number]: string }>({});
	const [showResult, setShowResult] = useState(false);
	const [prakritiType, setPrakritiType] = useState<'vata' | 'pitta' | 'kapha' | null>(null);
	const navigation = useNavigation();

	const handleAnswer = (questionId: number, value: string) => {
		setAnswers(prev => ({
			...prev,
			[questionId]: value
		}));
	};

	const calculatePrakriti = () => {
		if (Object.keys(answers).length < questions.length) {
			// Show alert if not all questions are answered
			alert('कृपया सर्व प्रश्नांची उत्तरे द्या');
			return;
		}

		let vataCount = 0;
		let pittaCount = 0;
		let kaphaCount = 0;

		// Count the number of each dosha type selected
		questions.forEach(question => {
			const selectedChoice = question.choices.find(
				choice => choice.value === answers[question.id]
			);
			if (selectedChoice) {
				switch (selectedChoice.type) {
					case 'vata':
						vataCount++;
						break;
					case 'pitta':
						pittaCount++;
						break;
					case 'kapha':
						kaphaCount++;
						break;
				}
			}
		});

		// Determine dominant prakriti
		if (vataCount >= pittaCount && vataCount >= kaphaCount) {
			setPrakritiType('vata');
		} else if (pittaCount >= vataCount && pittaCount >= kaphaCount) {
			setPrakritiType('pitta');
		} else {
			setPrakritiType('kapha');
		}

		setShowResult(true);
	};

	const handleReset = () => {
		setAnswers({});
		setShowResult(false);
		setPrakritiType(null);
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/images/PrakurtiParikshan.jpg')}
				style={styles.header}
			>
				<View style={styles.headerOverlay}>
					<Text variant="headlineMedium" style={styles.headerTitle}>
						प्रकृती परीक्षण
					</Text>
					<Text style={styles.headerSubtitle}>
						तुमची शारीरिक प्रकृती जाणून घ्या
					</Text>
				</View>
			</ImageBackground>

			<ScrollView style={styles.content}>
				<Card style={styles.infoCard}>
					<Card.Content>
						<Text variant="titleLarge" style={styles.infoTitle}>
							प्रकृती म्हणजे काय?
						</Text>
						<Text style={styles.infoText}>
							प्रकृती हा तुमच्या शरीर आणि मनाचा मूळ स्वभाव आहे. त्यावरून तुमच्या शारीरिक आणि मानसिक गुणधर्मांची माहिती मिळते.
						</Text>
					</Card.Content>
				</Card>

				{!showResult ? (
					<>
						{questions.map((question) => (
							<Card key={question.id} style={styles.questionCard}>
								<Card.Content>
									<Text variant="titleMedium" style={styles.question}>
										{question.text}
									</Text>
									<RadioButton.Group
										onValueChange={(value) => handleAnswer(question.id, value)}
										value={answers[question.id] || ''}
									>
										{question.choices.map((choice) => (
											<RadioButton.Item
												key={choice.value}
												label={choice.text}
												value={choice.value}
												style={styles.radioItem}
												labelStyle={styles.radioLabel}
												color="#0B3B2D"
											/>
										))}
									</RadioButton.Group>
								</Card.Content>
							</Card>
						))}

						<View style={styles.buttonContainer}>
							<Button
								mode="contained"
								onPress={calculatePrakriti}
								style={styles.button}
								contentStyle={styles.buttonContent}
								labelStyle={styles.buttonLabel}
							>
								माझी प्रकृती तपासा
							</Button>

							<Button
								mode="outlined"
								onPress={handleReset}
								style={[styles.button, styles.resetButton]}
								contentStyle={styles.buttonContent}
								labelStyle={[styles.buttonLabel, styles.resetButtonLabel]}
							>
								फॉर्म रीसेट करा
							</Button>
						</View>
					</>
				) : (
					<Card style={styles.resultCard}>
						<Card.Content>
							<Text style={styles.resultTitle}>
								{prakritiDescriptions[prakritiType!].title}
							</Text>
							<Text style={styles.resultDescription}>
								{prakritiDescriptions[prakritiType!].description}
							</Text>
							<Text style={styles.remediesTitle}>उपाय:</Text>
							{prakritiDescriptions[prakritiType!].remedies.map((remedy, index) => (
								<Text key={index} style={styles.remedyText}>
									{remedy}
								</Text>
							))}
							<Button
								mode="contained"
								onPress={handleReset}
								style={[styles.button, { marginTop: 20 }]}
								contentStyle={styles.buttonContent}
								labelStyle={styles.buttonLabel}
							>
								पुन्हा टेस्ट करा
							</Button>
						</Card.Content>
					</Card>
				)}
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
	content: {
		flex: 1,
		padding: 16,
	},
	infoCard: {
		marginBottom: 16,
		backgroundColor: '#0B3B2D',
		borderRadius: 10,
		elevation: 4,
	},
	infoTitle: {
		color: '#D4B895',
		marginBottom: 8,
		fontFamily: 'Poppins-Bold',
		fontSize:20
	},
	infoText: {
		color: 'white',
		lineHeight: 24,
		fontFamily: 'Poppins-Regular',
	},
	questionCard: {
		marginBottom: 16,
		borderRadius: 12,
		elevation: 2,
		backgroundColor: 'white',
	},
	question: {
		fontWeight: 'bold',
		marginBottom: 12,
		color: '#0B3B2D',
		fontFamily: 'Poppins-Bold',
	},
	radioItem: {
		marginVertical: 4,
	},
	radioLabel: {
		color: '#444',
		fontFamily: 'Poppins-Regular',
	},
	button: {
		marginVertical: 16,
		backgroundColor: '#0B3B2D',
		borderRadius: 12,
		elevation: 10,
	},
	buttonContent: {
		height: 50,
	},
	buttonLabel: {
		fontSize: 14,
		fontFamily: 'Poppins-Bold',
		color: '#D4B895',
	},
	resultCard: {
		marginBottom: 20,
		backgroundColor: '#0B3B2D',
		borderRadius: 12,
	},
	resultTitle: {
		fontSize: 22,
		fontFamily: 'Poppins-Bold',
		color: '#D4B895',
		marginBottom: 8,
	},
	resultDescription: {
		fontSize: 16,
		fontFamily: 'Poppins-Regular',
		color: 'white',
		marginBottom: 16,
	},
	remediesTitle: {
		fontSize: 18,
		fontFamily: 'Poppins-Bold',
		color: '#D4B895',
		marginBottom: 8,
	},
	remedyText: {
		fontSize: 16,
		fontFamily: 'Poppins-Regular',
		color: 'white',
		marginBottom: 6,
	},
	buttonContainer: {
		paddingHorizontal: 16,
		paddingBottom: 20,
	},
	resetButton: {
		borderColor: '#0B3B2D',
		backgroundColor: 'transparent',
		marginTop: 8,
	},
	resetButtonLabel: {
		color: '#0B3B2D',
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