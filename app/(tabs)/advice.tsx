import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, Platform } from 'react-native';
import { Text, Card, Avatar } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function PersonalAdvice() {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/images/PersonalAdvice.jpg')}
				style={styles.header}
			>
				<View style={styles.headerOverlay}>
					<Text variant="headlineMedium" style={styles.headerTitle}>
						Personal Advice
					</Text>
					<Text style={styles.headerSubtitle}>
						Connect with Ayurvedic Experts
					</Text>
				</View>
			</ImageBackground>

			<ScrollView style={styles.content}>
				<Card style={styles.infoCard}>
					<Card.Content>
						<Text variant="titleLarge" style={styles.infoTitle}>
							Expert Consultation
						</Text>
						<Text style={styles.infoText}>
							Consult with experienced Ayurvedic practitioners for personalized treatment plans and expert guidance.
						</Text>
					</Card.Content>
				</Card>

				<Card style={styles.comingSoonCard}>
					<Card.Content>
						<View style={styles.comingSoonContent}>
							<Avatar.Icon 
								size={80} 
								icon="clock-time-four-outline" 
								style={styles.comingSoonIcon}
								color="#D4B895"
							/>
							<Text variant="headlineSmall" style={styles.comingSoonTitle}>
								Coming Soon!
							</Text>
							<Text style={styles.comingSoonText}>
								We're working on bringing you direct access to experienced Ayurvedic practitioners. Soon, you'll be able to connect with certified doctors for personalized consultations and expert guidance.
							</Text>
							<Text style={styles.stayTunedText}>
								Stay tuned for this exciting feature!
							</Text>
						</View>
					</Card.Content>
				</Card>
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
		borderRadius: 12,
		elevation: 4,
	},
	infoTitle: {
		color: '#D4B895',
		marginBottom: 8,
		fontFamily: 'Poppins-Bold',
	},
	infoText: {
		color: 'white',
		fontSize: 16,
		lineHeight: 24,
		fontFamily: 'Poppins-Regular',
	},
	comingSoonCard: {
		marginBottom: 16,
		borderRadius: 12,
		elevation: 2,
		backgroundColor: 'white',
	},
	comingSoonContent: {
		alignItems: 'center',
		padding: 16,
	},
	comingSoonIcon: {
		backgroundColor: '#0B3B2D',
		marginBottom: 16,
	},
	comingSoonTitle: {
		color: '#0B3B2D',
		fontFamily: 'Poppins-Bold',
		marginBottom: 16,
	},
	comingSoonText: {
		color: '#0B3B2D',
		fontSize: 16,
		lineHeight: 24,
		textAlign: 'center',
		fontFamily: 'Poppins-Regular',
		marginBottom: 12,
	},
	stayTunedText: {
		color: '#D4B895',
		fontSize: 18,
		fontFamily: 'Poppins-SemiBold',
		textAlign: 'center',
	},
});